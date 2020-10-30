import { Document } from 'mongoose';

export interface SteamAccount extends Document {
    readonly id_64: string;
    readonly username_when_added: string;
    readonly current_username: string;
    readonly avatar: {
        readonly small: string;
        readonly medium: string;
        readonly large: string;
    };
    readonly url: string;
    readonly date_account_creation: Date;
    readonly date_last_log_off: Date;
    readonly real_name: string;
    readonly primary_group_id: string;
    readonly user_state: number;
    readonly user_state_flag: number;
    readonly comment_permission: number;
    readonly visibililty_state: number;
    readonly country_code: string;
    readonly state_code: string;
    readonly city_id: string;
    readonly game_server_ip: string;
    readonly game_server_steam_id: string;
    readonly game_extra_info: string;
    readonly game_id: string;
    readonly bans: {
        readonly community_banned: boolean;
        readonly vac_banned: boolean;
        readonly days_since_last_ban: number;
        readonly economy_ban: string;
        readonly number_vac_bans: number;
        readonly number_game_bans: number;
        readonly banned_date: Date;
    };
}