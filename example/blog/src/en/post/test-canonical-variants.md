---
title: Test Canonical Link Variants
description: Testing different canonical parameter values
date: 2024-01-15
canonical: "https://example.com/en/post/test-canonical-variants"
tags:
  - test
  - canonical
  - variants
---

# Test Canonical Link Variants

This post tests the canonical parameter with a specific URL.

## URL Value

Using `canonical: "https://example.com/en/post/test-canonical-variants"` should add a canonical link with the specified URL.

## Expected Result

The page should have a canonical link in the HTML head pointing to the specified canonical URL.

## Testing

1. Check the page source
2. Look for `<link rel="canonical" href="https://example.com/en/post/test-canonical-variants">` in the head section
3. Verify the href points to the specified canonical URL
4. Confirm that the canonical URL is used exactly as specified
