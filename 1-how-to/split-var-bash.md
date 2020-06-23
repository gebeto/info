---
parent: How To
title: trim var in Bash
nav_order: 1
---


# How to trim var in Bash

### To trim start
```sh
$ var="hello world"

$ echo "${var##* }"
> 'world'

$ echo "${var##*o}"
> 'rld'

$ echo "${var#*o}"
> ' world'

$ echo "${var#*l}"
> 'lo world'

$ echo "${var##*l}"
> 'd'
```

### To trim start
```sh
$ var="hello world"

$ echo "${var%% *}"
> 'hello'

$ echo "${var%%o*}"
> 'hell'

$ echo "${var%o*}"
> 'hello w'

$ echo "${var%l*}"
> 'hello wor'

$ echo "${var%%l*}"
> 'he'
```


### To trim two sides
```sh
$ var="Hello 'BARBIE' lol kek"

$ echo "${${var#*'}%%'*}"
> BARBIE
```
