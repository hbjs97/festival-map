import { Injectable, NestMiddleware } from '@nestjs/common';
import type { Request, Response } from 'express';
import { nanoid } from 'nanoid';

import { Logger } from '../providers';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private passUrl: string[] = ['/health', '/api'];

  constructor(private readonly logger: Logger) {}

  public use(req: Request, res: Response, next: () => void): void {
    if (this.passUrl.includes(req.originalUrl)) {
      return next();
    }

    req.id = req.header('X-Request-Id') || nanoid();
    res.setHeader('X-Request-Id', req.id);

    const user = req.user?.userId || '';
    this.logger.log(
      `${req.method} ${req.originalUrl} - ${req.ip.replace(
        '::ffff:',
        '',
      )} ${user}`,
    );

    return next();
  }
}
