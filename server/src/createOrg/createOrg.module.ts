import { Module } from "@nestjs/common";
import { createOrgService } from "./createOrg.service";
import { createOrgController } from "./createOrg.controller";

@Module({
    providers: [createOrgService],
    controllers: [createOrgController],
  })
  export class CreateOrgModule {}