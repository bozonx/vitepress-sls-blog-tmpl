---
title: Test Canonical Link
description: This is a test post to verify canonical link functionality
date: 2024-01-15
canonical: "https://example.com/en/post/test-canonical"
tags:
  - test
  - canonical
---

# Test Canonical Link

This is a test post to verify that the canonical link transformer is working correctly.

When the `canonical` parameter is set in the frontmatter with a URL, a `<link rel="canonical">` tag should be added to the page head.

## Expected Result

The page should have a canonical link in the HTML head that points to the specified canonical URL, helping search engines understand that this is the primary version of the page.

## Testing

1. Check the page source
2. Look for `<link rel="canonical" href="https://example.com/en/post/test-canonical">` in the head section
3. Verify the href points to the specified canonical URL
