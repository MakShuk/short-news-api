import { Body, Controller, Post, HttpCode, HttpStatus, Get, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from 'src/decorators/custom.decorator';
import { Response, Request } from 'express';

@Controller({ host: 'api.localhost', path: 'auth' })
export class AuthController {
	constructor(private authService: AuthService) {}

	@Public()
	@HttpCode(HttpStatus.OK)
	@Post('login')
	async signIn(@Body() signInDto: Record<string, any>, @Res() response) {
		const auth = await this.authService.signIn(signInDto.username, signInDto.password);
		response.cookie('Authorization', `Bearer ${auth.access_token}`, {
			httpOnly: false,
			domain: '.localhost',
			SameSite: 'None',
		});
		return response.send({
			token: auth.access_token,
			message: 'Успешная аутентификация',
		});
	}

	@Get('profile')
	getProfile(@Req() req) {
		return req.user;
	}

	@Post('test')
	@HttpCode(HttpStatus.OK)
	getReq(@Res() response: Response) {
		console.log('Post test');
		response.cookie(
			'Authorization',
			`Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInVzZXJuYW1lIjoiam9obiIsImlhdCI6MTY5MTUxMjU1MiwiZXhwIjoxNjkxNTEzMTUyfQ.q-lS1zLRLeEeONdGV4s4Mb2sZL2DkSgFUDpwHJDDe7I`,
			{ httpOnly: false },
		);
		return response.send({
			message: 'Успешная аутентификация',
		});
	}
}
