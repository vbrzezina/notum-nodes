import { Injectable } from '@nestjs/common';
import { dontLook } from 'src/auth/_top_seckret';

export type User = any;

@Injectable()
export class UsersService {
  private readonly users: User[] = [];

  constructor() {
    this.users = [{ userId: 1, username: 'notum', password: 'toMoon' }];
    this.addMoreUsers();
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }

  addMoreUsers() {
    const users = [...dontLook].sort(() => 0.5 - Math.random());
    const l = users.length;
    const m = Math.floor(l / 2);
    for (let i = 0; i < m; i++) {
      const username = users[i];
      const password = users[l - i - 1];
      this.users.push({ userId: i + 2, username, password });
    }
  }
}
