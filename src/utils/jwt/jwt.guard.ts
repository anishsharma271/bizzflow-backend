import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { AuthenticatedRequest } from "../types/express-request.interface"

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) { }

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException('No token provided');
    }

    // Accept both 'Bearer <token>' and '<token>'
    let token = authHeader;
    if (authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
    }

    try {
      const decoded = this.jwtService.verify(token);
      request.user = decoded;
      return true;
    } catch (err) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
