import mongoose from 'mongoose';

export const SteamAccountSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Types.ObjectId,
        auto: true
    },
    id_64: {
        type: String,
        unique: true,
        requied: [true, 'Need a id64']
    },
    date_start_monitoring: {
        type: Date,
        default: Date.now
    },
    username_when_added: {
        type: String,
        default: null
    },
    current_username: {
        type: String,
        default: null
    },
    avatar: {
        small: {
            type: String,
            default: null
        },
        medium: {
            type: String,
            default: null
        },
        large: {
            type: String,
            default: null
        }
    },
    url: {
        type: String,
        default: null
    },
    date_account_creation: {
        type: Date,
        default: null
    },
    date_last_log_off: {
        type: Date,
        default: null
    },
    real_name: {
        type: String,
        default: null
    },
    primary_group_id: {
        type: String,
        default: null
    },
    user_state: {
        type: Number,
        default: null
    },
    user_state_flag: {
        type: Number,
        default: null
    },
    comment_permission: {
        type: Number,
        default: null
    },
    visibililty_state: {
        type: Number,
        default: null
    },
    country_code: {
        type: String,
        default: null
    },
    state_code: {
        type: String,
        default: null
    },
    city_id: {
        type: String,
        default: null
    },
    game_server_ip: {
        type: String,
        default: null
    },
    game_server_steam_id: {
        type: String,
        default: null
    },
    game_extra_info: {
        type: String,
        default: null
    },
    game_id: {
        type: String,
        default: null
    },
    bans: {
        community_banned: {
            type: Boolean,
            default: null
        },
        vac_banned: {
            type: Boolean,
            default: null
        },
        days_since_last_ban: {
            type: Number,
            default: null
        },
        economy_ban: {
            type: String,
            default: null
        },
        number_vac_bans: {
            type: Number,
            default: null
        },
        number_game_bans: {
            type: Number,
            default: null
        },
        banned_date: {
            type: Date,
            default: null          
        }
    }
})
