---
parent: Scripts
title: Asterisk server CLI
nav_order: 1
---


# Asterisk server CLI

## Script for simplify interface in asterisk server

```bash
#!/bin/bash

red="\033[31m";
green="\033[32m";
purple="\033[35m";
white="\033[0m";
cyan="\033[36m";

-h () {
echo -e "${cyan}
▄██▙  ▟██▄  ▄▟██▙▄  ▟████▙▄ ▟█████▙ ▄██▙  ▟██▄ ▄▟████▄    ▄▄██▙▄ ▟▙      ▟██████▙ 
██▀▜▙▟▛▀██ ▄█▛  ▜█▄ ██  ▀██ ██▀     ██▀▜▙▟▛▀██ ██▀  ▜▛   ▟█▛  ▜█ ██        ▀██▀   
██  ██  ██ ██    ██ ██   ██ ██▄▄▄▄▄ ██  ██  ██ ▀█▙▄▄     █▛      ██         ██    
██  ██  ██ ██    ██ ██   ██ ██▀▀▀▀▀ ██  ██  ██   ▀▜█▙▄   █▙      ██         ██    
██  ██  ██ ▀█▙  ▟█▀ ██  ▄██ ██▄     ██  ██  ██ ▟▙   ██   ▜█▙  ▟█ ██▙▄▄▄▄   ▄██▄   
▜▛  ▜▛  ▜▛  ▀▜██▛▀  ▜█████▀ ▜█████▛ ▜▛  ▜▛  ▜▛ ▀████▜▀    ▀▜██▛▀ ▜█████▛ ▜██████▛ 
${white}

Usage: modems <command> [options]

Commands:

    ${green}show${white}                       Show all modems
    ${green}show${purple} <matcher>${white}             Show all modems that contains <matcher>
    ${green}show${purple} -<matcher>${white}            Show all modems that does not contains <matcher>
    ${green}reset${white}                      Auto Disconnect and Connect USB device (default '1-1')
    ${green}reset${purple} <device>${white}             Auto Disconnect and Connect USB device with id <device>
    ${green}disconnect${white}                 Disconnect USB device (default '1-1')
    ${green}disconnect${purple} <device>${white}        Disconnect USB device with id '1-1'
    ${green}connect${white}                    Connect USB device (default '1-1')
    ${green}connect${purple} <device>${white}           Connect USB device with id '1-1'


Examples:

    $ modems ${green}show${purple} Free${white}              # Return all modems that includes 'Free'
    $ modems ${green}show${purple} -Free${white}             # Return all modems that does not includes 'Free'
    $ modems ${green}disconnect${purple} '1-1'${white}       # Disconnect usb device that connected to port '1-1'
    $ modems ${green}connect${purple} '1-1'${white}          # Connect usb device that connected to port '1-1'
    $ modems ${green}usb${white}                    # Show all connected ports
";
}

show () {
	if [ $# == 2 ];
	then
		str=$2;
		if [[ ${str::1} == '-' ]];
		then
			sudo asterisk -x 'dongle show devices' | grep -v ${str#"-"};
		else
			sudo asterisk -x 'dongle show devices' | grep $2;
		fi
	else
		sudo asterisk -x 'dongle show devices';
	fi
}

usb () {
	ls /sys/bus/usb/drivers/usb;
}

disconnect () {
	# loader 'UNBINDING' 0;
	echo 'Please enter sudo password for unbinding USB:';
	if [ $# == 2 ];
	then
		echo $2 | sudo tee /sys/bus/usb/drivers/usb/unbind > /dev/null;
	else
		echo '1-1' | sudo tee /sys/bus/usb/drivers/usb/unbind > /dev/null;
	fi
	loader 'UNBDING' 100 '\n'
}

connect () {
	loader 'BINDING' 0
	if [ $# == 2 ];
	then
		echo $2 | sudo tee /sys/bus/usb/drivers/usb/bind > /dev/null;
	else
		echo '1-1' | sudo tee /sys/bus/usb/drivers/usb/bind > /dev/null;
	fi
	loader 'BINDING' 100 '\n'
}

reset () {

	echo 'Resetting' $1 $2;
	echo;

	disconnect $1 $2;

	loader 'WAITING' 0;
	loader 'WAITING' 12;
	loader 'WAITING' 25;
	loader 'WAITING' 38;
	loader 'WAITING' 54;
	loader 'WAITING' 68;
	loader 'WAITING' 86;
	loader 'WAITING' 99;
	loader 'WAITING' 100 '\n';

	connect $1 $2;
	
	echo -ne '\nDONE!\n';
}


loader () {
	if [[ $2 -lt 1 ]]; then
		echo -ne " > $1   [                          ] $2%\r";
	elif [[ $2 -gt 99 ]]; then
		echo -ne " > $1   [##########################] $2%\r";
	else
		message=$1
		val=$(expr $2 / 4);
		spaces=$(expr $val - 25 - 1)
		s=$(printf "%-${val}s" "#")
		ss=$(printf "%-${spaces}s" " ")
		echo -ne " > $1   [${s// /#}${ss// / }] $2%\r";
	fi
	echo -ne $3;
	sleep 1;
}


if [ "$#" -gt "0" ];
then
	$1 $@;
else
	-h;
fi
```