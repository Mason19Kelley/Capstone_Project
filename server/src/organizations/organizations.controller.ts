import { Controller, UseGuards, Get, Body, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { OrganizationsService } from './organizations.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { OrgRenameDto } from './orgRename.model';

@ApiTags('organizations')
@ApiBearerAuth()
@Controller('organizations')
export class OrganizationsController {

    constructor(private orgService: OrganizationsService) {}

    @UseGuards(JwtAuthGuard)
    @Post('renameOrg')
    async renameOrg(@Body() orgRename: OrgRenameDto) {
        return this.orgService.renameOrg(orgRename)
    }

}
