import { Controller, UseGuards, Post, Request, Get, Body, Res } from '@nestjs/common';
import { ApiBasicAuth, ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';
import { createOrgService } from './createOrg.service';
import { ServerResponse } from 'http';
import { createOrgDto } from './createOrg.model';

// controller for handling authentications
@Controller('createOrg')
@ApiTags('createOrg')
@ApiBearerAuth()
export class createOrgController {
    constructor(private createOrgService: createOrgService) {}

    
    @ApiBody({ type: createOrgDto })
    @Post('createOrg')
    async insert(@Res({ passthrough: true }) response: Response, @Body() data: createOrgDto){
        var temp = await this.createOrgService.insert();
        return temp;
    }
    
}
