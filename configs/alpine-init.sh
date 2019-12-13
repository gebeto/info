
apk add git curl gcc g++ make zsh
apk add openssh openrc

sh -c "$(wget -O- https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"`

# rc-update add sshd
# /etc/init.d/sshd start


