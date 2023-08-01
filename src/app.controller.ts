import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get()
	async getHello(): Promise<any> {
		const html = await this.appService.getPage();
		return html;
	}

	@Get('like')
	getLikePost() {
		return this.appService.getLikeNews();
	}
}
