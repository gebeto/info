---
parent: How To
title: Minecraft bedrock server with Docker
nav_order: 1
---


# How to run Minecraft bedrock server with Docker

Use [`lomot/minecraft-bedrock`](https://hub.docker.com/r/lomot/minecraft-bedrock) image:
```sh
 $ docker pull lomot/minecraft-bedrock
```

Run container with:
```sh
 $ docker run -d -it --name mcpe -v $PWD/mcpe-data:/data -p 19132:19132/udp lomot/minecraft-bedrock
```

Kill container with command:
```sh
 $ docker container kill mcpe
```

Remove container with command:
```sh
 $ docker container rm mcpe
```


More info [HERE](https://hub.docker.com/r/lomot/minecraft-bedrock)

