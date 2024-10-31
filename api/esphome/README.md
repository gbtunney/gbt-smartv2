# ESPHome

## Helpful Links

-   [Getting Started with the ESPHome Command Line — ESPHome](https://esphome.io/guides/getting_started_command_line.html)
-   [Ready-Made Projects — ESPHome](https://esphome.io/projects/)
-   [BLE iTag Button | devices.esphome.io](https://devices.esphome.io/devices/ble_itag)
-   [DIY Examples — ESPHome](https://esphome.io/guides/diy)

```json
{ "NAME": "Gosund WP3 v2", "GPIO": [320, 0, 321, 0, 0, 0, 0, 0, 0, 32, 0, 224, 0, 0], "FLAG": 0, "BASE": 18 }
```

```json
{ "NAME": "Gosund WP3", "GPIO": [0, 0, 0, 0, 32, 0, 0, 0, 321, 320, 224, 0, 0, 0], "FLAG": 0, "BASE": 18 }
```

## Hallway Light

-   [ct-Open-Source/tuya-convert: A collection of scripts to flash Tuya IoT devices to alternative firmwares](https://github.com/ct-Open-Source/tuya-convert)

-   [Gosund WP3 Plug Configuration for Tasmota](https://templates.blakadder.com/gosund_wp3.html)

```json
{
    "result": [
        {
            "active_time": 1713578102,
            "bind_space_id": "187894467",
            "category": "cz",
            "create_time": 1589745613,
            "custom_name": "Hallway String Lights",
            "icon": "smart/icon/ay1519551146071pEnBd/bda0bee476aeec8996d2e1499587a66b.png",
            "id": "60785480d8f15be61483",
            "ip": "74.77.118.11",
            "is_online": true,
            "lat": "42.95",
            "local_key": "#_Er_'T0VjI7s$r]",
            "lon": "-78.89",
            "model": "WP3-B美规10A（不带计量）/gosund",
            "name": "Mini Smart Plug 3",
            "product_id": "AiHXxAyyn7eAkLQY",
            "product_name": "WP3-B",
            "sub": false,
            "time_zone": "-05:00",
            "update_time": 1730276140,
            "uuid": "60785480d8f15be61483"
        }
    ],
    "success": true,
    "t": 1730324943206,
    "tid": "c74e507b970811ef8e04eec88ca26c45"
}
```

```sh
pnpm --filter=@gbt/esphome esphome dashboard --username gbtunney --password meddle11 --open-ui --address http://192.168.64.2/ --port 6052 testy.yaml ghghghgh

#compile
pnpm --filter=@gbt/esphome esphome compile testy.yaml
```
