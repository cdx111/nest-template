import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { PasswordService } from './password.service';

describe('PasswordService', () => {
  let service: PasswordService;
  let hash: string;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot({ isGlobal: true })],
      providers: [PasswordService],
    }).compile();

    service = module.get<PasswordService>(PasswordService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('bcryptSaltRounds should be number', () => {
    expect(typeof service.bcryptSaltRounds).toBe('number');
  });
  it('hashPassword should be string', async () => {
    hash = await service.hashPassword('123');
    expect(typeof hash).toBe('string');
  });
  it('comparePassword should be boolean', async () => {
    expect(await service.comparePassword('123', hash)).toBe(true);
  });
});
