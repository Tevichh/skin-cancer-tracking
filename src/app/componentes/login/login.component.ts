import { Component, OnInit, ViewChild } from '@angular/core';
import { Login } from '../../interfaces/login.interface';
import { LoginService } from '../../servicios/login.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  @ViewChild("loginForm") loginForm !: NgForm;
  login: Login = {
    username: "",
    password: ""
  }

  invalidForm: boolean = false;

  constructor(private loginService: LoginService, private router: Router) { }
  ngOnInit() { 
    this.verificarToken()
  }

  verificarLogin({ value, valid }: { value: Login, valid: boolean }) {
    if (!valid) {
      return
    } else {
      this.loginService.Login(value).subscribe(
        response => {
          if (response.isTrue) {
            localStorage.setItem("token", response.token);
            localStorage.setItem("rol", response.rol);
            this.router.navigate(['']);
            this.invalidForm = false;
          } else {
            this.invalidForm = true;
          }
        },
        error => {
          console.log(error);
        }
      )
    }
  }

  verificarToken(): void {
    this.loginService.verificarToken().pipe(
      map(response => {
        if (response.isTrue) {
          this.router.navigate(['']);
        }
      })
    ).subscribe();
  }
}
