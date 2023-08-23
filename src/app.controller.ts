import {
	BadRequestException,
	Controller,
	Get,
	Ip,
	Param,
	Query,
	Redirect,
	Res,
	Req,
	Post,
	HttpCode,
	HttpStatus,
	Patch,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './decorators/custom.decorator';
import { Response, Request } from 'express';

@Controller({ host: 'web.localhost', path: 'news' })
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get()
	async getHello(@Query() queryParams: any, @Ip() ipAddress: string): Promise<any> {
		console.log(`address: ${ipAddress}`);
		if (queryParams.limit) {
			return await this.appService.getPage(+queryParams.limit);
		}
		return await this.appService.getPage();
	}

	@Get('like')
	getLikePost(@Query() queryParams: any) {
		if (queryParams.limit) {
			return this.appService.getLikeNews(+queryParams.limit);
		}
		return this.appService.getLikeNews();
	}

	@Public()
	@Get('login')
	getLogenPage(@Query() queryParams: any) {
		return this.appService.getLoginPage();
	}

	@Public()
	@Post('test')
	@HttpCode(HttpStatus.OK)
	getReq(@Res() response: Response) {
		response.cookie(
			'Authorization',
			`Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInVzZXJuYW1lIjoiam9obiIsImlhdCI6MTY5MTkzNTM4NiwiZXhwIjoxNjkyNTQwMTg2fQ._X7Ab5hamOrAg4HZ6dSWcwkwQdvJaUAH8kBz7lSyNP0`,
			{ httpOnly: false },
		);
		return response.send({
			message: 'Успешная аутентификация',
		});
	}

	@Public()
	@Get('test')
	setReq(@Req() req: Request) {
		console.log(req.headers.cookie);
		return 'OK';
		/* 	return response.send({
			message: 'Успешная аутентификация',
		}); */
	}

	@Public()
	@Patch(':id')
	update(@Param('id') id: string, @Query() queryParams: any, @Req() request: Request): void {
		console.log('Patch:', request.headers);
	}

	@Get('*')
	@Redirect('/')
	get404() {
		new BadRequestException('Страницы не существует');
	}
}
