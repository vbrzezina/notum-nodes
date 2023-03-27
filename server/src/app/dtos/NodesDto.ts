import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class NodeDto {
  @ApiProperty({ description: 'Node id' })
  id: number;

  @ApiPropertyOptional({ description: "Optional node's description" })
  description?: string;

  @ApiPropertyOptional({
    description: "Parent ID (root node doesn't have parent)",
  })
  parentId?: number;

  @ApiPropertyOptional({ description: 'Optional branch color' })
  color?: string;
}

export class NodesDto {
  @ApiProperty({ type: NodeDto, isArray: true })
  nodes: NodeDto[];
}
