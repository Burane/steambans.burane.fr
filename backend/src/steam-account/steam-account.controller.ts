import { Controller, Get, Res, HttpStatus, Post, Body, Query, NotFoundException, Delete, Param } from '@nestjs/common';
import { SteamAccountService } from './steam-account.service';
import { CreateUserLinkDTO } from './dto/create-user-link.dto';
import { Cron, CronExpression } from '@nestjs/schedule';


@Controller('steamAccount')
export class SteamAccountController {
    constructor(private steamAccountService: SteamAccountService) {
        this.updateAllSteamAccounts();
    }

    // add a steamAccount
    @Post('/add')
    async addSteamAccount(@Res() res, @Body() createUserLinkDTO: CreateUserLinkDTO) {
        const steamAccount = await this.steamAccountService.addSteamAccount(createUserLinkDTO);
        return res.status(HttpStatus.OK).json({
            message: "SteamAccount has been created successfully",
            steamAccount
        })
    }

    // Retrieve steamAccounts list
    @Get('/all')
    async getAllSteamAccount(@Res() res) {
        const steamAccounts = await this.steamAccountService.getAllSteamAccount();
        return res.status(HttpStatus.OK).json(steamAccounts);
    }

    // Retrieve steamAccounts banned list
    @Get('/banned')
    async getAllSteamAccountBanned(@Res() res) {
        const steamAccounts = await this.steamAccountService.getAllSteamAccountBanned();
        return res.status(HttpStatus.OK).json(steamAccounts);
    }

    // Fetch a particular steamAccount using ID
    @Get(':steamAccountID')
    async getSteamAccount(@Res() res, @Param('steamAccountID') steamAccountID) {
        const steamAccount = await this.steamAccountService.getSteamAccount(steamAccountID);
        if (!steamAccount) throw new NotFoundException('SteamAccount does not exist!');
        return res.status(HttpStatus.OK).json(steamAccount);
    }

    @Delete('/delete')
    async deleteSteamAccount(@Res() res, @Query('steamAccountID') steamAccountID) {
        const steamAccount = await this.steamAccountService.deleteSteamAccount(steamAccountID);
        if (!steamAccount) throw new NotFoundException('SteamAccount does not exist');
        return res.status(HttpStatus.OK).json({
            message: 'SteamAccount has been deleted',
            steamAccount
        })
    }

    @Get('/updateAll')
    async updateAllSteamAccountsManualy(@Res() res) {
        console.log("update manualy")
        this.steamAccountService.updateAllSteamAccount();
        return res.status(HttpStatus.OK).json({
            message: 'SteamAccounts updating',
        })
    }

    @Cron(CronExpression.EVERY_HOUR)
    async updateAllSteamAccounts() {
        this.steamAccountService.updateAllSteamAccount();
    }
}