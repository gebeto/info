---
parent: How To
title: How to Edit PKG
nav_order: 1
---


# How to Edit PKG

## Unpack .pkg
```sh
mkdir Foo
cd Foo
xar -xf ../Foo.pkg
```

## Pack .pkg
```sh
$ xar -cf ../Foo-new.pkg *
```

## Edit the installable files
```sh
$ mkdir Foo
$ cd Foo
$ xar -xf ../Foo.pkg
$ cd foo.pkg
$ cat Payload | gunzip -dc |cpio -i
```

`edit Foo.app/*`

```sh
$ rm Payload
$ find ./Foo.app | cpio -o | gzip -c > Payload
$ mkbom Foo.app Bom # or edit Bom
```

`edit PackageInfo`

```sh
$ rm -rf Foo.app
$ cd ..
$ xar -cf ../Foo-new.pkg
```