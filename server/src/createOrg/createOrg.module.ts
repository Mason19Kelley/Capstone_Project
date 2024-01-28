import { Module } from "@nestjs/common";
import { createOrgService } from "./createOrg.service";
import { createOrgController } from "./createOrg.controller";
import { OrganizationsModule } from "../organizations/organizations.module";
import { UsersModule } from "../users/users.module";


@Module({
    imports: [OrganizationsModule, UsersModule],
    providers: [createOrgService],
    controllers: [createOrgController],
  })
  export class CreateOrgModule {}