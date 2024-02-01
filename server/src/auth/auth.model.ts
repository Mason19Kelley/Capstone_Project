import { ApiProperty } from '@nestjs/swagger';
// login type validation
export class LoginDto {
    @ApiProperty({ example: 'abc@gmail.com', description: 'User email' })
    email: string;

    @ApiProperty({ example: 'password', description: 'User password' })
    password: string;
}


export class ResetPasswordRequestDto{
    token: string;
    userId: string;
    password: string;
}