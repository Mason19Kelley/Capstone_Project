import { ApiProperty } from '@nestjs/swagger';

export class OrgRenameDto {
    @ApiProperty({ example: 1, description: 'current org id' })
    id: number;

    @ApiProperty({ example: 'Amazon', description: 'New Org Name' })
    newName: string;
}