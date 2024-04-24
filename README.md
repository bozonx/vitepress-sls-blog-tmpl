# vitepress-sls-blog-tmpl
Vitepress blog template

## Post meta data

### Post types

- article (have to has image)
- post (text of image, or images with texts)
- video
- audio

### Article

Image and title are mandatory.


```
---
title: some name
type: article
previewText: text for list item
metaDescr: If set it will be used in a meta descr. If not set then previewText will be used
# ID of author of site team
authorId: john-smith
youtubeLink: htts://...
# Url where you can find comments of it post in social media
commentUrl: https://...
tags:
  - some
---

# Title

some descr text
```

### Post

It can has 0, 1 of more images and videos.


```
---
title: some name
type: post 
media: 
  - https://....jpg
  - https://somesite.video.mp4
previewText: text for list item
metaDescr: If set it will be used in a meta descr. If not set then previewText will be used
# ID of author of site team
authorId: john-smith
# Url where you can find comments of it post in social media
commentUrl: https://...
tags:
  - some
---

some descr text
```

### Video

```
---
title: some name
type: video
videoUrl: https://youtube.com/...
coverUrl: https://some.com/img.jpg
previewText: text for list item
# ID of author of site team
authorId: john-smith
metaDescr: If set it will be used in a meta descr. If not set then previewText will be used
# Url where you can find comments of it post in social media
commentUrl: https://...
tags:
  - some
---

# Title

some descr text
```

### Audio

```
---
title: some name
type: audio
audioUrl: https://some.com/...
coverUrl: https://some.com/img.jpg
previewText: text for list item
# ID of author of site team
authorId: john-smith
metaDescr: If set it will be used in a meta descr. If not set then previewText will be used
# Url where you can find comments of it post in social media
commentUrl: https://...
tags:
  - some
---

# Title

some descr text
```
