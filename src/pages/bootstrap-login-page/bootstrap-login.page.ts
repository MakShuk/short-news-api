import { Injectable } from '@nestjs/common';

@Injectable()
export class BootstrapLoginForm {
	create() {
		return `<div style="
                        display: grid;
                        align-content: space-around;
                        justify-content: center;
                        ">
                          <form>
                            <div class="mb-3">
                              <label for="exampleInputName1" class="form-label">User name</label>
                              <input type="name" class="form-control" id="exampleInputName1" aria-describedby="nameHelp">
                              <div id="nameHelp" class="form-text">Enter user name</div>
                            </div>
                            <div class="mb-3">
                              <label for="exampleInputPassword1" class="form-label">Password</label>
                              <input type="password" class="form-control" id="exampleInputPassword1">
                            </div>
                            <button type="submit" class="btn btn-primary">Submit</button>
                          </form>
            </div>
            <script>
               const form = document.querySelector('form')
               form.addEventListener('submit', e => {
                const username = e.target[0].value
                const password = e.target[1].value
                           console.log(username, password)
                                      e.preventDefault();
                                    axios.post('http://web.localhost:3000/proxy/auth/login', {
                                                          username: username,
                                                          password: password
                                                        })
                                                        .then(function (response) {
                                                          console.log(response);
                                                          console.log('cookie: ', document.cookie);
                                                        
                                                        })
                                                        .catch(function (error) {
                                                          console.log(error);
                                                        });
                                                        });
            </script>`;
	}
}
