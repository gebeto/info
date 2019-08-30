---
parent: How To
title: Basic Debian 9 Configuration
nav_order: 1
---


# How to configure Debian 9


## Install SUDO

```sh
 $ apt-get install sudo -y
```

## Create your user

 > DO NOT USE root AS YOUR PRIMARY USER

To add user you need to run:
```sh
 $ adduser <username>
```

Give `sudo` access for your created user `<username>`:
```sh
 $ usermod -aG sudo <username>
```

**Done!**