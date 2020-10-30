import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { SteamAccount } from './interfaces/steam-account.interface';
import { CreateSteamAccountDTO } from './dto/create-steam-account.dto';
import { Steam } from '../steam-api/steam';
import { UserLink } from './interfaces/user-link.interface';

@Injectable()
export class SteamAccountService {
    constructor(@InjectModel('SteamAccount') private readonly steamAccountModel: Model<SteamAccount>) { }

    // fetch all steamAccounts
    async getAllSteamAccount(): Promise<SteamAccount[]> {
        const steamAccounts = await this.steamAccountModel.find().sort({ 'date_start_monitoring': 'desc' }).exec();
        return steamAccounts;
    }

    // Get a single steamAccount
    async getSteamAccount(steamAccountID: String): Promise<SteamAccount> {
        this.steamAccountModel.find()
        const steamAccount = await this.steamAccountModel.find({ 'id_64': steamAccountID }).exec();
        return steamAccount;
    }

    // fetch all steamAccounts banned 
    async getAllSteamAccountBanned(): Promise<SteamAccount[]> {
        const steamAccounts = await this.steamAccountModel.find({ 'bans.banned_date': { $ne: null } }).sort({ 'date_start_monitoring': 'desc' }).exec();
        return steamAccounts;
    }

    // post a single steamAccount
    async addSteamAccount(userLink: UserLink): Promise<SteamAccount> {

        const steam = new Steam();
        const id64: string = await steam.getId64(userLink.userLink);
        const infos = await steam.getInfos(id64);
        console.log(infos)


        const createSteamAccountDTO = this.transformToDTO(infos, id64)

        console.log("===================")
        console.log(createSteamAccountDTO)

        const newSteamAccount = await this.steamAccountModel(createSteamAccountDTO);
        return newSteamAccount.save();
    }

    transformToDTO(infos: any, id64: string): CreateSteamAccountDTO {
        const date: Date = new Date()
        let bannedDate: Date;

        if ((infos.bans.vacBans + infos.bans.gameBans) > 0) {
            bannedDate = new Date(date.setDate(date.getDate() - (infos.bans.daysSinceLastBan ?? 0)));
        } else {
            bannedDate = null;
        }

        const createSteamAccountDTO: CreateSteamAccountDTO = {
            id_64: id64,
            username_when_added: infos.nickname,
            current_username: infos.nickname,
            avatar: {
                small: infos.avatar.small,
                medium: infos.avatar.medium,
                large: infos.avatar.large,
            },
            url: infos.url,
            date_account_creation: new Date(infos.created * 1000), // * 1000 = conversion of unix timestamps
            date_last_log_off: infos.lastLogOff ? new Date(infos.lastLogOff * 1000) : undefined,
            real_name: infos.realName,
            primary_group_id: infos.primaryGroupID,
            user_state: infos.personaState,
            user_state_flag: infos.personaStateFlags,
            comment_permission: infos.commentPermission,
            visibililty_state: infos.visibililtyState,
            country_code: infos.countryCode,
            state_code: infos.stateCode,
            city_id: infos.cityID,
            game_server_ip: infos.gameServerIP,
            game_server_steam_id: infos.gameServerSteamID,
            game_extra_info: infos.gameExtraInfo,
            game_id: infos.gameID,
            bans: {
                community_banned: infos.bans.communityBanned,
                vac_banned: infos.bans.vacBanned,
                days_since_last_ban: infos.bans.daysSinceLastBan,
                economy_ban: infos.bans.economyBan,
                number_vac_bans: infos.bans.vacBans,
                number_game_bans: infos.bans.gameBans,
                banned_date: bannedDate
            }
        }

        return createSteamAccountDTO;
    }

    // Delete a steamAccount
    async deleteSteamAccount(steamAccountID: string): Promise<any> {
        const deletedSteamAccount = await this.steamAccountModel.findOneAndRemove({ id_64: steamAccountID });
        return deletedSteamAccount;
    }

    async updateAllSteamAccount() {
        
        console.log("Updating steam accounts");
        const steamAccounts = await this.steamAccountModel.find({ id_64: "76561199025127652"});
        steamAccounts.forEach(steamAccount => {
            this.updateSteamAccount(steamAccount);
        });

    }

    async updateSteamAccount(steamAccount: any) {
        const steam = new Steam();
        const infos = await steam.getInfos(steamAccount.id_64);
        console.log(infos)
        const date: Date = new Date()
        let bannedDate: Date;

        if ((infos.bans.vacBans + infos.bans.gameBans) > 0) {
            bannedDate = new Date(date.setDate(date.getDate() - (infos.bans.daysSinceLastBan ?? 0)));
        } else {
            bannedDate = null;
        }

        steamAccount.current_username = infos.nickname;
        steamAccount.avatar.small = infos.avatar.small
        steamAccount.avatar.medium = infos.avatar.medium
        steamAccount.avatar.large = infos.avatar.large
        steamAccount.url = infos.url;
        steamAccount.date_last_log_off = infos.lastLogOff ? new Date(infos.lastLogOff * 1000) : undefined;
        steamAccount.real_name = infos.realName;
        steamAccount.primary_group_id = infos.primaryGroupID;
        steamAccount.user_state = infos.personaState;
        steamAccount.user_state_flag = infos.personaStateFlags;
        steamAccount.comment_permission = infos.commentPermission;
        steamAccount.visibililty_state = infos.visibililtyState;
        steamAccount.country_code = infos.countryCode;
        steamAccount.state_code = infos.stateCode;
        steamAccount.city_id = infos.cityID;
        steamAccount.game_server_ip = infos.gameServerIP;
        steamAccount.game_server_steam_id = infos.gameServerSteamID;
        steamAccount.game_id = infos.gameExtraInfo;

        steamAccount.bans.community_banned = infos.bans.communityBanned;
        steamAccount.bans.vac_banned = infos.bans.vacBanned;
        steamAccount.bans.days_since_last_ban = infos.bans.daysSinceLastBan;
        steamAccount.bans.economy_ban = infos.bans.economyBan;
        steamAccount.bans.number_vac_bans = infos.bans.vacBans;
        steamAccount.bans.number_game_bans = infos.bans.gameBans;
        steamAccount.bans.banned_date = bannedDate;

        await steamAccount.save();
    }
}