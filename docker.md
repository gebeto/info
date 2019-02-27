# How to use docker without `sudo`

Add the docker group if it doesn't already exist:
```sh
$ sudo groupadd docker
```
Add the connected user "$USER" to the docker group. Change the user name to match your preferred user if you do not want to use your current user:
```sh
sudo gpasswd -a $USER docker
```
Either do a `newgrp docker` or **log out/in** to activate the changes to groups.

You can use:
```sh
$ docker ps
```
to check if you can run docker without sudo.