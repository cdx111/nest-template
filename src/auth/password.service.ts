import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { hash, compare } from 'bcrypt';

@Injectable()
export class PasswordService {
  constructor(private configService: ConfigService) {}
  get bcryptSaltRounds(): number {
    return Number(this.configService.get<number>('BCRYPT_SALT_ROUNDS'));
  }
  hashPassword(password: string): Promise<string> {
    return hash(password, this.bcryptSaltRounds);
  }
  comparePassword(passward: string, hash: string): Promise<boolean> {
    return compare(passward, hash);
  }
}
