---
parent: How To
title: Configure SSH connectin identifiers
nav_order: 1
---


# Configure SSH connectin identifiers

Create `~/.ssh/config` file and fill it with data below:

```
Host server_name
  User ubuntu
  HostName 127.0.0.1
  IdentityFile ~/.ssh/id_rsa_server
```

 - `Host` - Name of connection that will be used in `ssh <server_name>` command to connect to server
 - `User` - Connection user name (that used in connection like `ssh root@127.0.0.1` where `root` is User)
 - `HostName` - IP or Domain of your ssh server
 - `IdentityFile` - RSA private seerver identification key path
