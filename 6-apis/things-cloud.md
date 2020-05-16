---
parent: APIs
title: Things 3 Cloud
nav_order: 1
---

# Things 3 Cloud

## Auth

 - URL      https://cloud.culturedcode.com/version/1/account/EMAIL/own-history-key
 - HEADERS  authorization: "Password PASSWORD"

 - RESPONSE
```json
{
	"history-key": "asd9fds9-fdl3-6521-gg03-dsa000gd03kd",
	"latest-server-index": 100,
	"is-empty": false,
	"latest-schema-version": 301
}
```



## Get items
 - METHOD GET
 - URL    https://cloud.culturedcode.com/version/1/history/<HISTORY-KEY>/items


## Add items
 - METHOD POST
 - URL    https://cloud.culturedcode.com/version/1/history/<HISTORY-KEY>/items

