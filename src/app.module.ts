import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NewsModule } from './news/news.module';
import { BootstrapPage } from './pages/bootstrap-main-page/bootstrap-main-page';
import { BootstrapCard } from './pages/bootstrap-card/bootstrap-card';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AuthGuard } from './auth/auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { BootstrapLoginForm } from './pages/bootstrap-login-page/bootstrap-login.page';
import { ProxyModule } from './proxy/proxy.module';

@Module({
	imports: [NewsModule, AuthModule, UsersModule, ProxyModule],
	controllers: [AppController],
	providers: [
		AppService,
		BootstrapPage,
		BootstrapCard,
		BootstrapLoginForm,
		{
			provide: APP_GUARD,
			useClass: AuthGuard,
		},
	],
})
export class AppModule implements NestModule {
	async configure(consumer: MiddlewareConsumer) {
		consumer.apply(LoggerMiddleware).forRoutes('news');
	}
}
