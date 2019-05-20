import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user = {
    registry: "",
    password: ""
  }

  constructor() { }

  ngOnInit() {
  }

  forgotPass() {
    console.log("Teste");
  }

  login() {
    console.log("Matrícula: " + this.user.registry);
    console.log("Password: " + this.user.password);
  }

}
