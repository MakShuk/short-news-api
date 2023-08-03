import { PartialType } from '@nestjs/mapped-types';
import { CreateNewsDto } from './create-news.dto';
import { IsString, IsInt, IsNumber, IsNotEmpty, IsArray, Min, Max } from 'class-validator';

export class UpdateNewsDto extends PartialType(CreateNewsDto) {
	@IsString()
	id: string;

	@IsString()
	title: string;

	@IsArray()
	content: string[];

	@IsString()
	url: string;

	@IsNumber()
	@IsInt()
	@Min(0)
	@Max(5)
	ratio: number;

	@IsString()
	imageUrl: string;

	@IsNumber()
	@IsInt()
	@Min(1688202747000)
	date: number;
}
