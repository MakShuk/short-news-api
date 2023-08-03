import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NewsModule } from './news/news.module';
import { BootstrapPageService } from './bootstrap-page/bootstrap-page.service';
import { BootstrapCardService } from './bootstrap-card/bootstrap-card.service';
import { LoggerMiddleware } from './middleware/logger.middleware';

@Module({
	imports: [NewsModule],
	controllers: [AppController],
	providers: [AppService, BootstrapPageService, BootstrapCardService],
})
export class AppModule implements NestModule {
	async configure(consumer: MiddlewareConsumer) {
		consumer.apply(LoggerMiddleware).forRoutes('news');
	}
}
