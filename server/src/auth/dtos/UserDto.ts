import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({ description: 'User id' })
  sub: number;

  @ApiProperty({ description: 'Username' })
  username: string;

  @ApiPropertyOptional({ description: 'iat' })
  iat?: number;

  @ApiPropertyOptional({ description: 'iat' })
  exp?: number;
}
