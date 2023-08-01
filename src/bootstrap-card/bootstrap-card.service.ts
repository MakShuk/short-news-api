import { Injectable } from '@nestjs/common';

@Injectable()
export class BootstrapCardService {
	createCard(id: string, scr: string, title: string, content: string, href: string, ratio: number) {
		return `<div news-id="${id}" class="box col-lg-6 col-xs-12 col-xl-4 p-1">
        <div class="card">
            <img src="${scr}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${title}</h5>
                <p class="card-text">${content}</p>
                <div class="row text-center">
                    <div class="col">
                                  <div href="${href}" class="btn like ${this.togleLike(ratio)}">
        Like</div>
                    </div>
                    <div class="col">
                               <div class="btn delete">Delete</div>
                    </div>
                    <div class="col">
                               <a href="${href}" class="btn ">Go </a>
                    </div>
                </div>
                  </div>
            </div>`;
	}

	private togleLike(ratio: number) {
		return ratio === 1 ? 'fw-bolder text-danger' : null;
	}
}
