---
parent: How To
title: Simple setup vim for better text editing
nav_order: 1
---


# How to simple setup VIM for better text editing


Open `~/.vimrc` with `vim` or `nano` and add few configs:

```vim
syntax on
set number
set expandtab
set tabstop=4
set hlsearch
set incsearch
highlight LineNr ctermfg=darkgrey
```