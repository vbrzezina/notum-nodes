import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'notum' })
  username: string;

  @ApiProperty({ example: 'toMoon' })
  password: string;
}
