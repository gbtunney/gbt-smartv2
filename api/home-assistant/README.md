# Home Assistant

## Helpful Links

- [homeassistant: manage local media](https://www.home-assistant.io/more-info/local-media/setup-media/)

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

```sh
scp -P 2222 /absolute_path/source-folder/some-file root@homeassistant.local:/absolute_path/destination-folder
```

```angular2html
{
  "result": [
    {
      "active_time": 1732849343,
      "bind_space_id": "187894467",
      "category": "cz",
      "create_time": 1589745613,
      "custom_name": "Hallway String Lights",
      "icon": "smart/icon/ay1519551146071pEnBd/6a8e9ecf2c758b44aed415218b38c499.png",
      "id": "60785480d8f15be61483",
      "ip": "74.77.113.179",
      "is_online": true,
      "lat": "42.9532",
}
]
}74.77.118.11

74.77.118.11

```
