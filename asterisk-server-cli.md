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

disconect () {
	if [ $# == 2 ];
	then
		echo $2 | sudo tee /sys/bus/usb/drivers/usb/unbind;
	else
		echo '1-1' | sudo tee /sys/bus/usb/drivers/usb/unbind;
	fi
}

conect () {
	if [ $# == 2 ];
	then
		echo $2 | sudo tee /sys/bus/usb/drivers/usb/bind;
	else
		echo '1-1' | sudo tee /sys/bus/usb/drivers/usb/bind;
	fi
}


if [ "$#" -gt "0" ];
then
	$1 $@;
else
	-h;
fi
```