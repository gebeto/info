---
parent: How To
title: Setup NGINX for connect two servers
nav_order: 1
---


# Setup server for connect two servers

```nginx
server {
  listen       192.168.200.173; # public IP address of your server
  server_name     example.net

  location / {

    proxy_pass           http://example.net;

    proxy_connect_timeout       900;
    proxy_send_timeout          900;
    proxy_read_timeout          900;
    send_timeout                900;

    proxy_redirect       off;
    proxy_set_header     Host $http_host;
    proxy_set_header     X-Real-IP $remote_addr;
    proxy_set_header     X-Forwarded-For $proxy_add_x_forwarded_for;
  }
}

server {
  listen       192.168.200.173; # public IP address of your server
  server_name     example-crm.net

  location / {

    proxy_pass           http://example-crm.net;


    proxy_connect_timeout       900;
    proxy_send_timeout          900;
    proxy_read_timeout          900;
    send_timeout                900;

    proxy_redirect       off;
    proxy_set_header     Host $http_host;
    proxy_set_header     X-Real-IP $remote_addr;
    proxy_set_header     X-Forwarded-For $proxy_add_x_forwarded_for;
  }
}
```
