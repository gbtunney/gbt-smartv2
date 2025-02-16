import z from 'zod'
import { zodToJsonSchema, JsonSchema7Type } from 'zod-to-json-schema'
import { JSONSchema7 } from 'json-schema'

const NOTIFICATION_CHANNELS = [
    'iPhone',
    'iPad',
    'macBook',
    'persistant',
    'sms',
    'email',
    'alexa',
] as const
const ALEXA_SOUND_EFFECT = [
    'amzn_sfx_doorbell_chime_01',
    'bell_02',
    'buzzers_pistols_01',
    'amzn_sfx_church_bell_1x_02',
    'amzn_sfx_doorbell_01',
    'amzn_sfx_doorbell_chime_01',
    'amzn_sfx_doorbell_chime_02',
    'christmas_05',
    'horror_10',
    'air_horn_03',
    'boing_01',
    'boing_03',
    'camera_01',
    'squeaky_12',
    'clock_01',
    'amzn_sfx_trumpet_bugle_04',
    'amzn_sfx_cat_meow_1x_01',
    'amzn_sfx_dog_med_bark_1x_02',
    'amzn_sfx_lion_roar_02',
    'amzn_sfx_rooster_crow_01',
    'amzn_sfx_wolf_howl_02',
    'futuristic_10',
    'amzn_sfx_scifi_engines_on_02',
    'amzn_sfx_scifi_alarm_04',
    'amzn_sfx_scifi_sheilds_up_01',
    'amzn_sfx_scifi_alarm_01',
    'zap_01',
    'amzn_sfx_crowd_applause_01',
    'amzn_sfx_large_crowd_cheer_01',
] as const
export const notification_dispatcher_schema = z.object({
    message: z.string().default('no message set'),
    notification_channel: z
        .array(z.enum(NOTIFICATION_CHANNELS))
        .default(['iPhone', 'iPad', 'macBook', 'persistant']),

    title: z.string().optional(),

    bool_critical: z.boolean().default(false),
    //few missing
    alexa_volume: z.enum(['Maximum Volume', 'Normal Volume', 'Current']),
    alexa_sound: z.enum(ALEXA_SOUND_EFFECT),
    mobile_callback: z.string().optional(),
})

export const getJsonSchema = (zod: z.Schema, id: string): JSONSchema7 => {
    const _result: JSONSchema7 = zodToJsonSchema(
        notification_dispatcher_schema,
        'notification_dispatcher_schema',
    ) as JSONSchema7
    return _result
}
const _scriptjson = {
    fields: {
        message: {
            selector: {
                text: null,
            },
            name: 'Message',
            required: true,
            description: 'Required!',
            default: 'no message set',
        },
        notification_channel: {
            selector: {
                select: {
                    options: [
                        'iPhone',
                        'iPad',
                        'macBook',
                        'persistant',
                        'sms',
                        'email',
                        'alexa',
                    ],
                    multiple: true,
                },
            },
            name: 'Notification Channel',
            required: true,
            default: ['iPhone', 'iPad', 'macBook', 'persistant'],
        },
        title: {
            selector: {
                text: null,
            },
            name: 'Title',
            required: false,
        },
        bool_critical: {
            selector: {
                select: {
                    options: ['ON', 'OFF'],
                },
            },
            name: 'Critical',
            required: false,
        },
        sound: {
            selector: {
                text: null,
            },
            name: 'Sound',
            description:
                'To get sound: go to settings > companion app > notification > system and click copy.',
            required: false,
            default: 'default',
        },
        sms_targets: {
            selector: {
                text: {
                    multiple: true,
                },
            },
            name: 'SMS Targets',
            default: ['7188138156@mms.att.net'],
            description:
                'This is only used if sms notification target is selected!',
            required: false,
        },
        email_targets: {
            selector: {
                text: {
                    multiple: true,
                },
            },
            name: 'Email Targets',
            description:
                'This is only used if email notification target is selected!',
            default: ['gbtunney@mac.com'],
            required: false,
        },
        alexa_volume: {
            selector: {
                select: {
                    options: ['Maximum Volume', 'Normal Volume', 'Current'],
                },
            },
            description:
                'If it is quiet hours, vol will only be set to .5 max, and .2 for same',
            name: 'Override Alexa Volume',
        },
        alexa_sound: {
            selector: {
                select: {
                    options: [
                        'amzn_sfx_doorbell_chime_01',
                        'bell_02',
                        'buzzers_pistols_01',
                        'amzn_sfx_church_bell_1x_02',
                        'amzn_sfx_doorbell_01',
                        'amzn_sfx_doorbell_chime_01',
                        'amzn_sfx_doorbell_chime_02',
                        'christmas_05',
                        'horror_10',
                        'air_horn_03',
                        'boing_01',
                        'boing_03',
                        'camera_01',
                        'squeaky_12',
                        'clock_01',
                        'amzn_sfx_trumpet_bugle_04',
                        'amzn_sfx_cat_meow_1x_01',
                        'amzn_sfx_dog_med_bark_1x_02',
                        'amzn_sfx_lion_roar_02',
                        'amzn_sfx_rooster_crow_01',
                        'amzn_sfx_wolf_howl_02',
                        'futuristic_10',
                        'amzn_sfx_scifi_engines_on_02',
                        'amzn_sfx_scifi_alarm_04',
                        'amzn_sfx_scifi_sheilds_up_01',
                        'amzn_sfx_scifi_alarm_01',
                        'zap_01',
                        'amzn_sfx_crowd_applause_01',
                        'amzn_sfx_large_crowd_cheer_01',
                    ],
                },
            },
            name: 'Alexa Sound',
            description: 'Be annoying!! TODO: fix this in script doesnt work',
        },
        mobile_callback: {
            selector: {
                text: null,
            },
            name: 'Mobile Callback',
            description:
                'Callback id for mobile buttons, also being used for persistant notification id',
        },
    },
}
