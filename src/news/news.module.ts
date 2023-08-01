import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ApiLoggingInterceptor } from 'src/Interceptor/api-logging.Interceptor';

@Module({
	controllers: [NewsController],
	providers: [
		NewsService,
		{
			provide: APP_INTERCEPTOR,
			useClass: ApiLoggingInterceptor,
		},
	],
})
export class NewsModule {}
