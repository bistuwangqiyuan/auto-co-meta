import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { spawn } from "node:child_process";
import path from "node:path";

export interface AgentConfig {
  name: string;
  role: string;
  expert: string;
  layer: string;
  color: string;
  enabled: boolean;
}

const DEFAULT_AGENTS: AgentConfig[] = [
  { name: "ceo-bezos", role: "CEO", expert: "Jeff Bezos", layer: "Strategy", color: "#f97316", enabled: true },
  { name: "cto-vogels", role: "CTO", expert: "Werner Vogels", layer: "Strategy", color: "#3b82f6", enabled: true },
  { name: "critic-munger", role: "审视者", expert: "Charlie Munger", layer: "Strategy", color: "#ef4444", enabled: true },
  { name: "product-norman", role: "产品", expert: "Don Norman", layer: "Product", color: "#8b5cf6", enabled: true },
  { name: "ui-duarte", role: "界面设计", expert: "Matias Duarte", layer: "Product", color: "#ec4899", enabled: false },
  { name: "interaction-cooper", role: "交互", expert: "Alan Cooper", layer: "Product", color: "#6366f1", enabled: false },
  { name: "fullstack-dhh", role: "全栈", expert: "DHH", layer: "Engineering", color: "#22c55e", enabled: true },
  { name: "qa-bach", role: "QA", expert: "James Bach", layer: "Engineering", color: "#f59e0b", enabled: true },
  { name: "devops-hightower", role: "DevOps", expert: "Kelsey Hightower", layer: "Engineering", color: "#06b6d4", enabled: true },
  { name: "marketing-godin", role: "营销", expert: "Seth Godin", layer: "Business", color: "#7c3aed", enabled: true },
  { name: "operations-pg", role: "运营", expert: "Paul Graham", layer: "Business", color: "#14b8a6", enabled: false },
  { name: "sales-ross", role: "销售", expert: "Aaron Ross", layer: "Business", color: "#84cc16", enabled: false },
  { name: "cfo-campbell", role: "CFO", expert: "Patrick Campbell", layer: "Business", color: "#10b981", enabled: true },
  { name: "research-thompson", role: "研究", expert: "Ben Thompson", layer: "Intelligence", color: "#0ea5e9", enabled: true },
];

interface AgentSettingsFile {
  updatedAt: string;
  enabledByAgent: Record<string, boolean>;
}

const PROJECT_ROOT = path.resolve(process.cwd(), "..", "..");
const MEMORIES_DIR = path.join(PROJECT_ROOT, "memories");
const AGENT_SETTINGS_PATH = path.join(MEMORIES_DIR, "agent-settings.json");
const PID_FILE = path.join(PROJECT_ROOT, ".auto-loop.pid");
const STOP_FILE = path.join(PROJECT_ROOT, ".auto-loop-stop");

function toPosixPath(winPath: string): string {
  const normalized = winPath.replace(/\\/g, "/");
  const drive = normalized.slice(0, 1).toLowerCase();
  const rest = normalized.slice(2);
  return `/${drive}${rest}`;
}

function ensureMemoriesDir() {
  if (!existsSync(MEMORIES_DIR)) {
    mkdirSync(MEMORIES_DIR, { recursive: true });
  }
}

function getAgentSettings(): AgentSettingsFile {
  ensureMemoriesDir();
  if (!existsSync(AGENT_SETTINGS_PATH)) {
    return { updatedAt: new Date().toISOString(), enabledByAgent: {} };
  }
  try {
    const parsed = JSON.parse(readFileSync(AGENT_SETTINGS_PATH, "utf-8")) as AgentSettingsFile;
    return {
      updatedAt: parsed.updatedAt || new Date().toISOString(),
      enabledByAgent: parsed.enabledByAgent || {},
    };
  } catch {
    return { updatedAt: new Date().toISOString(), enabledByAgent: {} };
  }
}

function writeAgentSettings(settings: AgentSettingsFile) {
  ensureMemoriesDir();
  writeFileSync(AGENT_SETTINGS_PATH, JSON.stringify(settings, null, 2), "utf-8");
}

export function listAgents(): AgentConfig[] {
  const settings = getAgentSettings();
  return DEFAULT_AGENTS.map((agent) => ({
    ...agent,
    enabled: settings.enabledByAgent[agent.name] ?? agent.enabled,
  }));
}

export function updateAgentsEnabled(updates: Array<{ name: string; enabled: boolean }>): AgentConfig[] {
  const settings = getAgentSettings();
  for (const update of updates) {
    settings.enabledByAgent[update.name] = update.enabled;
  }
  settings.updatedAt = new Date().toISOString();
  writeAgentSettings(settings);
  return listAgents();
}

function readPid(): number | null {
  if (!existsSync(PID_FILE)) return null;
  const raw = readFileSync(PID_FILE, "utf-8").trim();
  const pid = Number(raw);
  return Number.isInteger(pid) && pid > 0 ? pid : null;
}

export function isLoopRunning(): boolean {
  // On Windows + Git Bash, PID semantics can be inconsistent across runtimes.
  // Prefer a conservative guard: if PID file exists with a numeric value, treat it as running.
  if (process.platform === "win32") {
    return readPid() !== null;
  }

  const pid = readPid();
  if (!pid) return false;
  try {
    process.kill(pid, 0);
    return true;
  } catch {
    return false;
  }
}

export function runSingleCycle(): { started: boolean; message: string } {
  if (isLoopRunning()) {
    return {
      started: false,
      message: "主循环正在运行。请先停止主循环，再使用“运行一轮周期”。",
    };
  }

  if (process.platform === "win32") {
    const bashPath = "C:\\Program Files\\Git\\bin\\bash.exe";
    if (!existsSync(bashPath)) {
      return { started: false, message: "未找到 Git Bash，无法启动单轮周期。" };
    }
    const projectPosix = toPosixPath(PROJECT_ROOT);
    const child = spawn(
      bashPath,
      ["-lc", `cd '${projectPosix}' && MAX_CYCLES=1 MAX_CONSECUTIVE_ERRORS=1 COOLDOWN_SECONDS=1 RETRY_BASE_SECONDS=1 RETRY_MAX_SECONDS=1 ./auto-loop.sh`],
      { detached: true, stdio: "ignore" }
    );
    child.unref();
    return { started: true, message: "已开始执行一轮周期任务。" };
  }

  const child = spawn(
    "bash",
    ["-lc", `cd '${PROJECT_ROOT}' && MAX_CYCLES=1 MAX_CONSECUTIVE_ERRORS=1 COOLDOWN_SECONDS=1 RETRY_BASE_SECONDS=1 RETRY_MAX_SECONDS=1 ./auto-loop.sh`],
    {
    detached: true,
    stdio: "ignore",
    }
  );
  child.unref();
  return { started: true, message: "已开始执行一轮周期任务。" };
}

export function emergencyStop(): { ok: boolean; message: string; details?: string } {
  writeFileSync(STOP_FILE, "", "utf-8");
  const pid = readPid();

  if (!pid) {
    return { ok: true, message: "已写入停止信号。当前未检测到运行中的循环进程。" };
  }

  if (process.platform === "win32") {
    try {
      const bashPath = "C:\\Program Files\\Git\\bin\\bash.exe";
      const projectPosix = toPosixPath(PROJECT_ROOT);
      const stopper = spawn(
        bashPath,
        ["-lc", `cd '${projectPosix}' && ./stop-loop.sh`],
        {
          detached: true,
          stdio: "ignore",
        }
      );
      stopper.unref();
      return { ok: true, message: "已发送紧急停止信号。若正处于当前周期，将在本轮后停止。" };
    } catch {
      return { ok: true, message: "已写入停止信号，请等待当前周期结束后停止。" };
    }
  }

  try {
    process.kill(pid, "SIGTERM");
    return { ok: true, message: "已发送紧急停止信号。" };
  } catch {
    return { ok: true, message: "已写入停止信号，请等待当前周期结束后停止。" };
  }
}
