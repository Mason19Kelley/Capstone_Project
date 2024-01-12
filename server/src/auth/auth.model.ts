import { ApiProperty } from '@nestjs/swagger';
// login type validation
export class LoginDto {
    @ApiProperty({ example: 'username', description: 'User username' })
    username: string;

    @ApiProperty({ example: 'password', description: 'User password' })
    password: string;
}