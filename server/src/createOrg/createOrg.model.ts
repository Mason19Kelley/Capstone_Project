import { ApiProperty } from '@nestjs/swagger';
// login type validation
export class createOrgDto {
    @ApiProperty({ example: 'username', description: 'Admin username' })
    username: string;

    @ApiProperty({ example: 'password', description: 'Admin password' })
    password: string;

    @ApiProperty({ example: 'example@email.com', description: 'Admin email' })
    email: string;

    @ApiProperty({ example: 'organization', description: 'Organization name' })
    organization: string;

}