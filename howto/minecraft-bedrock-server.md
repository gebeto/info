---
parent: How To
title: Minecraft bedrock server with Docker
nav_order: 1
---


# How to run Minecraft bedrock server with Docker

Use `lomot/minecraft-bedrock:1.11.1.2-r1` image:
```sh
 $ docker pull lomot/minecraft-bedrock:1.11.1.2-r1
```

Run container with:
```sh
 $ docker run -d -it --name mcpe -v $PWD/mcpe-data:/data -p 19132:19132/udp lomot/minecraft-bedrock:1.11.1.2-r1
```

Kill container with command:
```sh
 $ docker container kill mcpe
```

Remove container with command:
```sh
 $ docker container rm mcpe
```