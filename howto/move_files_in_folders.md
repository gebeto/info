---
parent: How To
title: Move js files in folders
nav_order: 1
---


# How to move files in folders with names like filenames

```sh
ls | grep -oE "\w{3,}" | xargs -L 1 -I % sh -c 'mkdir %; mv %".js" %/index.js'
```