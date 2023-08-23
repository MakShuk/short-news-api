import { Injectable } from '@nestjs/common';

@Injectable()
export class BootstrapPage {
	getHTMLPage(constent: string) {
		return `<!doctype html>
      <html lang="en" data-bs-theme="dark">
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <title>Bootstrap demo</title>
          <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9" crossorigin="anonymous">
        </head>
        <body class="" style="margin:auto; max-width: 1280px; height: 100vh" >
          <div class="row" style="margin:auto; height: 100vh">
            ${constent}
            <script src="https://unpkg.com/axios@1.1.2/dist/axios.min.js"></script>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-HwwvtgBNo3bZJJLYd8oVXjrBZt8cqVSpeBNS5n7C8IVInixGAoxmnlMuBnhbgrkm" crossorigin="anonymous"></script>
          </div>
           <script defer>
            const cards = document.querySelectorAll('.card');
                cards.forEach((card) => {
                    const button = card.querySelector('.delete');
                    button.addEventListener('click', () => {
                        const card = button.closest('.box');
                        console.log(button.closest('.box').getAttribute('news-id'));
                        const url = 'http://web.localhost:3000/proxy/news/' + card.getAttribute('news-id');
                        card.style.display = 'none';
                        axios.delete(url);
                    });
                });
            cards.forEach((card) => {
                const like = card.querySelector('.like');
                like.addEventListener('click', () => {
                    like.classList.toggle('text-danger');
                    like.classList.toggle('fw-bolder');

                    const card = like.closest('.box');
                    const url = 'http://web.localhost:3000/proxy/news/' + card.getAttribute('news-id') + '?like=1';
                    axios.patch(url);
                });
            });
        </script>
          </body>
      </html>
    `;
	}
}
