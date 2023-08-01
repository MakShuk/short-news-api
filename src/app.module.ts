import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NewsModule } from './news/news.module';
import { BootstrapPageService } from './bootstrap-page/bootstrap-page.service';
import { BootstrapCardService } from './bootstrap-card/bootstrap-card.service';

@Module({
	imports: [NewsModule],
	controllers: [AppController],
	providers: [AppService, BootstrapPageService, BootstrapCardService],
})
export class AppModule {}
