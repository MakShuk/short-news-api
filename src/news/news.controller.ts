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
	Req,
	BadRequestException,
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
	@UsePipes(new ValidationPipe({ whitelist: true }))
	update(
		@Param('id') id: string,
		@Query() queryParams: any,
		@Body() updateNewsDto: UpdateNewsDto,
		@Req() request: Request,
	): Promise<void> | string {
		console.log('Patch/like Headers:', request.headers);
		if (queryParams.like) {
			return this.newsService.likeNews(id);
		}

		if (Object.keys(updateNewsDto).length === 0) {
			throw new BadRequestException('Отсутствуют поля для обновления');
		}
		const { title, content, url, date, imageUrl, ratio } = updateNewsDto;
		return this.newsService.updateNews(id, updateNewsDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.newsService.remove(id);
	}
}
