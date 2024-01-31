import { Injectable } from "@nestjs/common";
import * as postmark from 'postmark';
import { ConfigService } from '@nestjs/config';
import { Mail } from "./mail.model";

@Injectable()
export class PostmarkService {
private client: postmark.ServerClient;

constructor(private configService: ConfigService) {
this.client = new postmark.ServerClient(configService.get<string>('POSTMARK_API_TOKEN'));
}

    async sendEmail(mail:Mail) {
        this.client.sendEmail(mail)
        .catch(error => console.log(error));
    }
}