import { Injectable } from '@nestjs/common';
import { NodeDto, NodesDto } from './dtos/NodesDto';

@Injectable()
export class AppService {
  private nodes: NodeDto[] = [
    { id: 1, description: "Let's go! You are doing well." },
    { id: 2, description: 'Its a corn!', parentId: 1 },
    { id: 3, parentId: 2 },
    { id: 4, parentId: 2, color: '#af1d1d' },
    { id: 5, parentId: 2 },
    { id: 6, parentId: 1 },
    { id: 7, parentId: 6, color: '#1e2adb' },
  ];

  getNodes(): NodesDto {
    return { nodes: this.nodes };
  }

  saveNodes(nodes: any): NodesDto {
    this.nodes = nodes;
    return { nodes: this.nodes };
  }
}
