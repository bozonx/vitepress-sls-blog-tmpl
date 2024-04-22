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
type: article
previewText: text for list item
metaDescr: If set it will be used in a meta descr. If not set then previewText will be used
# ID of author of site team
authorId: 1
# set it for some other authores
authorCustom: [Ivan K](https://somesite.com)
# Url where you can find comments of it post in social media
commentUrl: https://...
tags:
  - some
---

# Title

some descr text
```

### Post

It doesn't have any title. It can has 0, 1 of more images and videos.


```
---
type: post 
media: 
  - https://....jpg
  - https://somesite.video.mp4
previewText: text for list item
metaDescr: If set it will be used in a meta descr. If not set then previewText will be used
# ID of author of site team
authorId: 1
# set it for some other authores
authorCustom: [Ivan K](https://somesite.com)
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
type: video
videoUrl: https://youtube.com/...
coverUrl: https://some.com/img.jpg
previewText: text for list item
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
type: audio
audioUrl: https://some.com/...
coverUrl: https://some.com/img.jpg
previewText: text for list item
metaDescr: If set it will be used in a meta descr. If not set then previewText will be used
# Url where you can find comments of it post in social media
commentUrl: https://...
tags:
  - some
---

# Title

some descr text
```
