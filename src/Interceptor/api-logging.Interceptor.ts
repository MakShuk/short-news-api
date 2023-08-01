import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class ApiLoggingInterceptor implements NestInterceptor {
	intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
		const httpContext = context.switchToHttp();
		const request = httpContext.getRequest();
		const { url, method } = request;
		const now = Date.now();
		return next
			.handle()
			.pipe(tap(() => console.log(`api: ${url} metod: ${method} ${Date.now() - now}ms`)));
	}
}
