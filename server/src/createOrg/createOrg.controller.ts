import { Controller, UseGuards, Post, Request, Get, Body, Res } from '@nestjs/common';
import { ApiBasicAuth, ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { createOrgService } from './createOrg.service';
import { createOrgDto } from './createOrg.model';

// controller for handling authentications
@Controller('createOrg')
@ApiTags('createOrg')
@ApiBearerAuth()
export class createOrgController {
    constructor(private createOrgService: createOrgService) {}

    
    @ApiBody({ type: createOrgDto })
    @Post('insertOrg')
    async insertOrg(@Res({ passthrough: true }) response: Response, @Body() data: createOrgDto){        
        var temp = await this.createOrgService.insert(data);
        return temp;
    }
    
}