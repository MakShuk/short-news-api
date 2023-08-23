import { Controller, Delete, Get, Param, Patch, Post, Query, Req, Res } from '@nestjs/common';
import { ProxyService } from './proxy.service';
import { Public } from 'src/decorators/custom.decorator';

//@Controller({ host: 'web.localhost' })
@Controller('proxy')
export class ProxyController {
	httpService: any;
	constructor(private proxyService: ProxyService) {}

	@Public()
	@Post('auth/login')
	async proxyLogin(@Req() req, @Res() res) {
		const url = req.url.replace('/proxy/', '');
		const metod = req.method;
		const body = req.body;
		const headers = req.headers;
		//	console.log({ url, metod, body, headers });
		const resApi = await this.proxyService.proxy({ url, metod, body, headers });
		res.cookie('Authorization', `Bearer ${resApi.token}`, { httpOnly: true });
		return res.send(resApi.message);
	}

	@Public()
	@Get('/*')
	async proxyGet(@Req() req) {
		const url = req.params['0'];
		const metod = req.method;
		const body = req.body;
		const headers = req.headers;
		const res = await this.proxyService.proxy({ url, metod, body, headers });
		return res;
	}

	@Public()
	@Patch('/*')
	async proxyPatch(@Req() req, @Query() queryParams: any) {
		const queryParamsKeys = Object.keys(queryParams);
		const url = queryParamsKeys[0]
			? `${req.params['0']}?${queryParamsKeys[0]}=${queryParams[queryParamsKeys[0]]}`
			: `${req.params['0']}`;
		console.log(url);
		const metod = req.method;
		const body = req.body;
		const headers = req.headers;
		const res = await this.proxyService.proxy({ url, metod, body, headers });
		return res;
	}

	@Public()
	@Delete('/*')
	async proxyDelete(@Req() req, @Query() queryParams: any) {
		const queryParamsKeys = Object.keys(queryParams);
		const url = queryParamsKeys[0]
			? `${req.params['0']}?${queryParamsKeys[0]}=${queryParams[queryParamsKeys[0]]}`
			: `${req.params['0']}`;
		console.log(url);
		const metod = req.method;
		const body = req.body;
		const headers = req.headers;
		const res = await this.proxyService.proxy({ url, metod, body, headers });
		return res;
	}
}
