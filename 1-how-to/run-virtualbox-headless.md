---
parent: How To
title: Use VirtualBox headless
nav_order: 1
---


# How to use VirtualBox headless


## Start virtual machine
Get list of virtual machines
```sh
 $ VBoxManage list vms
```

Run machine with comand where `<guest-os-name>` is machine name from list
```sh
 $ VBoxManage startvm <guest-os-name> --type headless
```

## Stop virtual machine
Get list of active virtual machines
```sh
 $ VBoxManage list runningvms
```

Kill virtual machine with command where `<guest-os-name>` is machine name from list
```sh
 $ VBoxManage controlvm <guest-os-name> poweroff
```