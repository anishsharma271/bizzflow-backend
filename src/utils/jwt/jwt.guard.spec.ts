import { JwtAuthGuard } from './jwt.guard';
import { JwtService } from '@nestjs/jwt';

describe('JwtGuard', () => {
  let jwtService: JwtService;

  beforeEach(() => {
    jwtService = new JwtService({ secret: 'test' }); 
  });

  it('should be defined', () => {
    const guard = new JwtAuthGuard(jwtService);
    expect(guard).toBeDefined();
  });
});
