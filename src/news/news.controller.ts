import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	ValidationPipe,
	UsePipes,
	Query,
} from '@nestjs/common';
import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';

@Controller({ host: 'api.localhost', path: 'news' })
export class NewsController {
	constructor(private readonly newsService: NewsService) {}

	@Post()
	create(@Body() createNewsDto: CreateNewsDto) {
		return this.newsService.create(createNewsDto);
	}

	@Get()
	findAll() {
		return this.newsService.readDbFile();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.newsService.findOne(+id);
	}

	@Patch(':id')
	@UsePipes(ValidationPipe)
	update(
		@Param('id') id: string,
		@Query() queryParams: any,
		@Body() updateNewsDto: UpdateNewsDto,
	): Promise<void> | string {
		if (queryParams.like) {
			return this.newsService.likeNews(id);
		}
		return this.newsService.updateNews(id, updateNewsDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.newsService.remove(id);
	}
}
