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

	async getPage(limit = 30) {
		const cards = [];
		const db: CreateNewsDto[] = await this.readDbFile();
		const limit_db = db.slice(0, limit);
		const sort_date_limit_db = limit_db.sort((a, b) => b.date - a.date);
		sort_date_limit_db.forEach(news => {
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

	async getLikeNews(limit = 30) {
		const cards = [];
		const db: CreateNewsDto[] = await this.readDbFile();
		const like_db = db.filter(obj => obj.ratio !== 0);
		const limit_like_db = like_db.slice(0, limit);
		const sort_date_limit_like_db = limit_like_db.sort((a, b) => b.date - a.date);
		sort_date_limit_like_db.forEach(news => {
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
