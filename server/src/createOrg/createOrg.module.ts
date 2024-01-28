import { Module } from "@nestjs/common";
import { createOrgService } from "./createOrg.service";
import { createOrgController } from "./createOrg.controller";
import { OrganizationsService } from "../organizations/organizations.service";

@Module({
    providers: [createOrgService, OrganizationsService],
    controllers: [createOrgController],
  })
  export class CreateOrgModule {}