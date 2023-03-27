import { ApiProperty } from '@nestjs/swagger';

export class AccessDto {
  @ApiProperty()
  access_token: string;
}
