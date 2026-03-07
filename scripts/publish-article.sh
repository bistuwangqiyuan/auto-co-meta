#!/bin/bash
# Publish article to DEV.to and/or Hashnode
# Usage:
#   DEVTO_API_KEY=xxx ./scripts/publish-article.sh devto
#   HASHNODE_API_KEY=xxx HASHNODE_PUBLICATION_ID=xxx ./scripts/publish-article.sh hashnode
#   Both: set all env vars and run: ./scripts/publish-article.sh all

set -euo pipefail

ARTICLE_PATH="docs/marketing/devto-tutorial-how-to-build-ai-agent-team.md"
CANONICAL_URL="https://runautoco.com/blog/how-to-build-ai-agent-team"

publish_devto() {
  if [ -z "${DEVTO_API_KEY:-}" ]; then
    echo "ERROR: DEVTO_API_KEY not set"
    exit 1
  fi

  echo "Publishing to DEV.to..."
  # DEV.to accepts the full markdown with frontmatter
  BODY=$(cat "$ARTICLE_PATH")

  RESPONSE=$(curl -s -X POST https://dev.to/api/articles \
    -H "Content-Type: application/json" \
    -H "api-key: ${DEVTO_API_KEY}" \
    -d "$(jq -n --arg body "$BODY" '{"article": {"body_markdown": $body}}')")

  URL=$(echo "$RESPONSE" | jq -r '.url // empty')
  if [ -n "$URL" ]; then
    echo "Published to DEV.to: $URL"
  else
    echo "DEV.to publish failed:"
    echo "$RESPONSE" | jq .
    exit 1
  fi
}

publish_hashnode() {
  if [ -z "${HASHNODE_API_KEY:-}" ]; then
    echo "ERROR: HASHNODE_API_KEY not set"
    exit 1
  fi
  if [ -z "${HASHNODE_PUBLICATION_ID:-}" ]; then
    echo "ERROR: HASHNODE_PUBLICATION_ID not set"
    exit 1
  fi

  echo "Publishing to Hashnode..."

  # Strip frontmatter (everything between first --- and second ---)
  CONTENT=$(sed '1{/^---$/!q;};1,/^---$/d' "$ARTICLE_PATH")
  TITLE="How to Build an AI Agent Team: A Step-by-Step Guide"

  QUERY='mutation PublishPost($input: PublishPostInput!) { publishPost(input: $input) { post { id url slug } } }'

  RESPONSE=$(curl -s -X POST https://gql.hashnode.com \
    -H "Content-Type: application/json" \
    -H "Authorization: ${HASHNODE_API_KEY}" \
    -d "$(jq -n \
      --arg query "$QUERY" \
      --arg title "$TITLE" \
      --arg content "$CONTENT" \
      --arg pubId "$HASHNODE_PUBLICATION_ID" \
      --arg canonical "$CANONICAL_URL" \
      '{
        "query": $query,
        "variables": {
          "input": {
            "title": $title,
            "contentMarkdown": $content,
            "publicationId": $pubId,
            "slug": "how-to-build-ai-agent-team",
            "originalArticleURL": $canonical,
            "tags": [
              {"name": "AI", "slug": "ai"},
              {"name": "Open Source", "slug": "opensource"},
              {"name": "Tutorial", "slug": "tutorial"}
            ]
          }
        }
      }')")

  URL=$(echo "$RESPONSE" | jq -r '.data.publishPost.post.url // empty')
  if [ -n "$URL" ]; then
    echo "Published to Hashnode: $URL"
  else
    echo "Hashnode publish failed:"
    echo "$RESPONSE" | jq .
    exit 1
  fi
}

case "${1:-all}" in
  devto)    publish_devto ;;
  hashnode) publish_hashnode ;;
  all)      publish_devto; publish_hashnode ;;
  *)        echo "Usage: $0 [devto|hashnode|all]"; exit 1 ;;
esac
