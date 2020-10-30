import * as apiKeys from '../apiKeys.json'
import SteamAPI = require('steamapi');

export class Steam {
    steam: SteamAPI;
    constructor() {
        this.steam = new SteamAPI(apiKeys.steam);
    }

    async getId64(userLink: string): Promise<string> {
        const id: string = await this.steam.resolve(userLink)
        return id
    }

    async getInfos(id64: string): Promise<any> {
        const summary = await this.steam.getUserSummary(id64)
        summary.bans = await this.getBans(id64)
        return summary
    }

    async getBans(id64: string): Promise<any> {
        const ban = await this.steam.getUserBans(id64)
        return ban
    }

}