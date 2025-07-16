import { Request } from 'express';

export interface AuthenticatedRequest extends Request {
  user?: any; // You can define a proper payload interface later
}
