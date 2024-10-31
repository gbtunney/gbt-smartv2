#ESPHome

##Helpful Links

-   [homeassistant: manage local media](https://www.home-assistant.io/more-info/local-media/setup-media/)

```sh
#ssh then ssh into container
ssh -t root@homeassistant.local -p 22222 "docker exec -it homeassistant /bin/bash"
```

```sh
docker run -d --name="home-assistant" \
    -v /PATH_TO_YOUR_CONFIG:/config \
    -v /PATH_TO_YOUR_MEDIA:/media \
    -v /etc/localtime:/etc/localtime:ro \
    --net=host \
    ghcr.io/home-assistant/home-assistant:stable
```

```shell
pnpm --filter=@gbt/esphome esphome dashboard --username gbtunney --password meddle11 --open-ui --address http://192.168.64.2/ --port 6052 testy.yaml

#compile
pnpm --filter=@gbt/esphome esphome compile testy.yaml
```
