import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
	use(req: Request, res: Response, next: NextFunction) {
		const { url, method } = req;
		const now = Date.now();
		console.log(`???: ${url} metod: ${method} ${Date.now() - now}ms`);
		next();
	}
}
