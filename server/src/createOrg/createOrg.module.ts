import { Module } from "@nestjs/common";
import { createOrgService } from "./createOrg.service";
import { createOrgController } from "./createOrg.controller";
//import { OrganizationsService } from "../organizations/organizations.service";
//import { UsersService } from "../users/users.service";
import { OrganizationsModule } from "../organizations/organizations.module";
import { UsersModule } from "../users/users.module";
import { TypeOrmModule } from "@nestjs/typeorm";


@Module({
    imports: [OrganizationsModule, UsersModule],
    providers: [createOrgService],
    controllers: [createOrgController],
  })
  export class CreateOrgModule {}