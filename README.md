# UptimeSocket

Notifies you instantly when your server dies

## Configuration

Example `docker-compose.yml`

```yaml
version: "3"

services:
    uptimesocket:
        image: netfloex/uptimesocket
        container_name: uptimesocket
        restart: unless-stopped
        volumes:
            - ./config:/app/config
```

Example `config/config.yaml`

```yaml
wss://uptime.remoteserver.tld:
    name: Remote Server
    ntfy: http://localntfy/topic

wss://uptime.otherserver.tld:
	name: Other Server
    # Can be an array too:
    ntfy:
        - http://secondnotify/topic
        - http://secondnotify/other

```
