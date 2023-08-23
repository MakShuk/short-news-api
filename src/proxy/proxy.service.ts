import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class ProxyService {
	async proxy(options) {
		options.url = `http://api.localhost:3000/${options.url}`;
		const { host, 'content-length': _, ...newHeaders } = options.headers;
		console.log(options.url);

		const response = await axios({
			url: options.url,
			method: options.metod,
			headers: newHeaders,
			data: options.body,
		});
		console.log('res.data: ', response.data);
		return response.data;
	}
}
