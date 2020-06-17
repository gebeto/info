---
parent: Scripts
title: Hex IP to Dec
nav_order: 1
description: Hex IP to Dec
---


# Hex IP to Dec

## 

```sh
$ echo "AABB4433" | fold -s -w2 | xargs -I % sh -c 'printf "$((16#%)) "' | xargs echo | tr " " "."
```