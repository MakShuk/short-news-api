import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { BootstrapPageService } from './bootstrap-page/bootstrap-page.service';
import { BootstrapCardService } from './bootstrap-card/bootstrap-card.service';
import { CreateNewsDto } from './news/dto/create-news.dto';

@Injectable()
export class AppService {
	constructor(
		private readonly bootstrapPageService: BootstrapPageService,
		private readonly bootstrapCardService: BootstrapCardService,
	) {}
	async getHello(): Promise<any> {
		const data = await this.readDbFile();
		let dataBody = '';
		data.forEach(item => {
			const row = this.createRow(item);
			dataBody += row;
		});

		return `<table>
    <caption>Table</caption>
		${dataBody}</table>`;
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

	createRow(item: any) {
		return `
        <tr>
          <th>${item.title}</th>
          <td>${item.content}</td>
          <td><img src="${item.imageUrl}" alt="Изображение" width="100"></td>
          <td>${new Date(item.date).toLocaleDateString()}</td>
        </tr>
      `;
	}

	async getPage() {
		const cards = [];
		const db: CreateNewsDto[] = await this.readDbFile();
		const sort_date_db = db.sort((a, b) => b.date - a.date);
		sort_date_db.forEach(news => {
			if (news.content.length <= 1) {
				return null;
			}
			const card = this.bootstrapCardService.createCard(
				news.id,
				news.imageUrl,
				news.title,
				news.content.join(' '),
				news.url,
				news.ratio,
			);
			cards.push(card);
		});
		return this.bootstrapPageService.getHTMLPage(cards.join('</div>'));
	}

	async getLikeNews() {
		const cards = [];
		const db: CreateNewsDto[] = await this.readDbFile();
		const like_db = db.filter(obj => obj.ratio !== 0);
		const sort_date_like_db = like_db.sort((a, b) => b.date - a.date);
		sort_date_like_db.forEach(news => {
			if (news.content.length <= 1) {
				return null;
			}
			const card = this.bootstrapCardService.createCard(
				news.id,
				news.imageUrl,
				news.title,
				news.content.join(' '),
				news.url,
				news.ratio,
			);
			cards.push(card);
		});
		return this.bootstrapPageService.getHTMLPage(cards.join('</div>'));
	}
}
