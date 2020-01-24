---
parent: How To
title: Docker usefull commands
nav_order: 1
---


# Docker usefull commands

### Get list of images by name template
```sh
docker images --filter=reference="server_*"
```

Result:
```sh
➜  gebeto $ docker images
REPOSITORY            TAG                 IMAGE ID            CREATED             SIZE
nodetest              latest              b139f422f2eb        13 days ago         88MB
dpage/pgadmin4        latest              a9b93747c62f        2 weeks ago         267MB
node                  10-alpine           d32bf7fc7d5f        4 weeks ago         80.5MB
nginx                 alpine              a624d888d69f        2 months ago        21.5MB
node                  12.13.1-alpine3.9   b85e90279cb2        2 months ago        80.2MB
pgbouncer/pgbouncer   latest              bb15aa658023        2 months ago        17MB
alpine                3.9                 055936d39205        8 months ago        5.53MB

➜  gebeto $ docker images --filter=reference="node*"
REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
nodetest            latest              b139f422f2eb        13 days ago         88MB
node                10-alpine           d32bf7fc7d5f        4 weeks ago         80.5MB
node                12.13.1-alpine3.9   b85e90279cb2        2 months ago        80.2MB
```


### Format list of images result
```sh
docker images --format="{{.ID}} - {{.Repository}}"
```

Result:
```sh
➜  gebeto $ docker images --format="{{.ID}} - {{.Repository}}"
b139f422f2eb - nodetest
a9b93747c62f - dpage/pgadmin4
d32bf7fc7d5f - node
f14bab5eea8e - postgres
b85e90279cb2 - node
a624d888d69f - nginx
bb15aa658023 - pgbouncer/pgbouncer
32a1b98d0495 - python
055936d39205 - alpine
```


### Remove list of images by name template(using commands above)
```sh
# bulk remove all images
docker rmi $(docker images)

# filter images by name template
docker images --filter=reference="node*"

# print only image ids
docker images --format="{{.ID}}"
# or `-q` instead of --format, it prints only image id
docker images -q
```

Result command is:
```sh
docker rmi $(docker images --filter=reference="node*" --format="{{.ID}}")
# or `-q` instead of --format, it prints only image id
docker rmi $(docker images --filter=reference="node*" -q")
```