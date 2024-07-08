# vitepress-sls-blog-tmpl

Vitepress blog template for freedom sites by Ivan K.

## Install

See `example` dir

## Post meta data

You can publish all types of posts - article, post, video and audio. They are the same.

### All the posts have common parameters

```
---
title?: Use it only if you want to replace title which is got from H1 tag
description: content of meta descr and preview text if it allowed
# If true - then use description or first part of the post in a list and article
# If false | undefined - then use first part of the post in a list and don't use in article
descrAsPreview: true | false
# If has text - then use this text in a list and in an article
# If not set - then depend of descrAsPreview
# It won't shown in a post if media, embeddedVideo, embeddedAudio or cover is set
previewText: text for list item and article preview
pubDate: Publication date in iso format. Better to use time to order posts which are published at the same day
# ID of author of site team. It it some other author just put his name into the text
authorId: john-smith
# Url where you can find comments of it post in social media
commentUrl: https://...
# List of tags. Tags can include spaces
tags:
  - some

...special params
---
```

### Special parameters of posts

```
---
...common params

# Link to a video on youtube or another platform. It is used in a watch video button
videoLink: htts://...
# URL of a video which is embedded to the post. URL or local path
embeddedVideo: https://...
# URL of an audio which is embedded to the post. URL or local path
embeddedAudio: https://some.com/...
# Cover of an embedded video or an audio or as a main image for post if it have video as media. URL or local path
cover: https://some.com/img.jpg
# Images or video URLs or local paths to use as post's main media. One or more
media:
- /img/some.jpg
- https://somesite.video.mp4
---

If the post doesn't have any media, embeddedVideo or embeddedAudio then the first image will be used as main image to show in lists.
```

## Publish

```
yarn publish
```
