import { IsString, IsInt, IsNumber, IsNotEmpty, IsArray, Min, Max } from 'class-validator';

export class CreateNewsDto {
	@IsString()
	@IsNotEmpty()
	id: string;

	@IsString()
	@IsNotEmpty()
	title: string;

	@IsArray()
	@IsNotEmpty()
	content: string[];

	@IsString()
	@IsNotEmpty()
	url: string;

	@IsNumber()
	@IsInt()
	@Min(0)
	@Max(5)
	ratio: number;

	@IsString()
	@IsNotEmpty()
	imageUrl: string;

	@IsNumber()
	@IsInt()
	@Min(1688202747000)
	date: number;
}
