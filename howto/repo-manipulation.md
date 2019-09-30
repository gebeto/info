---
parent: How To
title: Manipulation with monorepo and multirepo
nav_order: 1
---


## Monorepo

http://choly.ca/post/git-merge-to-monorepo/

https://alligator.io/workflow/corralling-monorepos-with-yarn-workspaces/

## Multirepo

How to extract folder history to branch
```sh
 $ git filter-branch --prune-empty --subdirectory-filter <FOLDER_PATH>
```


How to remove extracted folder from git history
```sh
 $ git filter-branch --prune-empty -f --tree-filter 'rm -rf <FOLDER>' HEAD
```