import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from 'src/decorators/custom.decorator';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(private jwtService: JwtService, private reflector: Reflector) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
			context.getHandler(),
			context.getClass(),
		]);
		console.log('isPublic key: ', isPublic);
		if (isPublic) {
			// 💡 See this condition
			return true;
		}

		const request = context.switchToHttp().getRequest();
		const token = this.extractTokenFromHeader(request);
		if (!token) {
			throw new UnauthorizedException();
		}
		try {
			const payload = await this.jwtService.verifyAsync(token, {
				secret: jwtConstants.secret,
			});
			// 💡 We're assigning the payload to the request object here
			// so that we can access it in our route handlers
			request['user'] = payload;
		} catch {
			throw new UnauthorizedException();
		}
		return true;
	}

	private extractTokenFromHeader(request: Request): string | undefined {
		if (!request.headers.cookie) {
			return undefined;
		}

		const cookies = request.headers.cookie.split('; ').reduce((obj, cookie) => {
			const [key, value] = cookie.split('=');
			return { ...obj, [key]: value };
		}, {});

		if (!cookies) {
			return undefined;
		}

		/* test */
		//console.log(cookies);
		const [type, token] = cookies['Authorization'].split('%20') ?? [];
		console.log('type ', type);
		console.log('token ', token);

		return type.trim() === 'Bearer' ? token.trim() : undefined;
	}
}
