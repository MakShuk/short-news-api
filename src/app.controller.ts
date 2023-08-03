import {
	BadRequestException,
	Controller,
	Get,
	HostParam,
	Ip,
	Param,
	Query,
	Redirect,
	Res,
} from '@nestjs/common';
import { AppService } from './app.service';

@Controller({ host: 'web.localhost' })
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

	@Get('*')
	@Redirect('/')
	get404() {
		new BadRequestException('Страницы не существует');
	}
}
