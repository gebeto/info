---
parent: How To
title: Get linux system hardware info from bash
nav_order: 10
---


# Get linux system hardware info from bash


## RAM info

```sh
free -h
```


## ROM info

```sh
df -h /
```


## CPU Info

```sh
cat /proc/cpuinfo | grep "model name"
```


