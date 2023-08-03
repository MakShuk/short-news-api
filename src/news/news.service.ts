import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import * as fs from 'fs';

@Injectable()
export class NewsService {
	async create(createNewsDto: CreateNewsDto) {
		const dbData: CreateNewsDto[] = await this.readDbFile();
		const newNews = [...dbData, createNewsDto];
		this.writeDbFile(newNews);
	}

	async findAll() {
		return await this.readDbFile();
	}

	async findOne(id: number) {
		return (await this.readDbFile())[id];
	}

	async likeNews(id: string) {
		const dbData: CreateNewsDto[] = await this.readDbFile();
		const newsToUpdate = dbData.filter(item => item.id === id)[0];
		const newArray = dbData.filter(obj => obj.id !== id);
		if (!newsToUpdate) {
			throw new Error(`Новость с ID ${id} не найдена.`);
		}
		newsToUpdate.ratio === 1 ? (newsToUpdate.ratio = 0) : (newsToUpdate.ratio = 1);
		this.writeDbFile([newsToUpdate, ...newArray]);
	}

	async remove(id: string) {
		const dbData: CreateNewsDto[] = await this.readDbFile();
		const newArray = dbData.filter(obj => obj.id !== id);
		await this.writeDbFile(newArray);
	}

	async updateNews(id: string, updateNewsDto: UpdateNewsDto) {
		const db: CreateNewsDto[] = await this.readDbFile();
		const newsToUpdate = db.filter(item => item.id === id)[0];

		if (!newsToUpdate) {
			throw new BadRequestException('Новости с таким ID не существует');
		}

		if (updateNewsDto.id) {
			throw new NotFoundException('Изменять ID нельзя');
		}

		const updatedNews = Object.assign({}, newsToUpdate, updateNewsDto);
		const newArray = db.filter(obj => obj.id !== id);
		this.writeDbFile([updatedNews, ...newArray]);
	}

	async readDbFile(): Promise<any> {
		try {
			const data = await fs.promises.readFile('db.json', 'utf-8');
			const parsedData = JSON.parse(data);
			return parsedData;
		} catch (error) {
			console.error('Ошибка при чтении файла db.json:', error);
			throw error;
		}
	}

	private async writeDbFile(createNewsDto: CreateNewsDto[]): Promise<any> {
		try {
			await fs.promises.writeFile('db.json', JSON.stringify(createNewsDto));
		} catch (error) {
			console.error('Ошибка при чтении файла db.json:', error);
			throw error;
		}
	}
}
