import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    private logger = new Logger('HTTP');

    use(req: Request, res: Response, next: NextFunction): void {
        const { method, originalUrl } = req;
        const start = Date.now();

        res.on('finish', () => {
            const { statusCode } = res;
            const duration = Date.now() - start;

            // Format current IST time
            const nowIST = new Date().toLocaleString('en-IN', {
                timeZone: 'Asia/Kolkata',
                hour12: true,
                weekday: 'short',
                year: 'numeric',
                month: 'short',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
            });

            this.logger.log(
                `[${nowIST}] ${method} ${originalUrl} ${statusCode} - ${duration}ms`,
            );
        });

        next();
    }
}
