---
title: Test No Canonical Link
description: This is a test post without canonical parameter
date: 2024-01-15
tags:
  - test
  - no-canonical
---

# Test No Canonical Link

This is a test post to verify that the canonical link transformer does NOT add a canonical link when the `canonical` parameter is missing from the frontmatter.

## Expected Result

The page should NOT have a canonical link in the HTML head since the `canonical` parameter is not set.

## Testing

1. Check the page source
2. Verify that there is NO `<link rel="canonical" href="...">` in the head section
3. This confirms the transformer only works when explicitly requested
