import { PartialType } from '@nestjs/mapped-types';
import { CreateNewsDto } from './create-news.dto';

export class UpdateNewsDto extends PartialType(CreateNewsDto) {
	id: string;
	title: string;
	content: string[];
	url: string;
	ratio: number;
	imageUrl: string;
	date: number;
}
