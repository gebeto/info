---
parent: How To
title: Manipulation with monorepo and multirepo
nav_order: 1
---


## Monorepo

http://choly.ca/post/git-merge-to-monorepo/

https://alligator.io/workflow/corralling-monorepos-with-yarn-workspaces/

## Multirepo

 [splitting-a-subfolder-out-into-a-new-repository](https://help.github.com/en/articles/splitting-a-subfolder-out-into-a-new-repository)

How to extract folder history to branch
```sh
 $ git filter-branch --prune-empty --subdirectory-filter <FOLDER_PATH> <BRANCH_NAME>
```


How to remove extracted folder from git history
```sh
 $ git filter-branch --prune-empty -f --tree-filter 'rm -rf <FOLDER>' <BRANCH NAME>
```