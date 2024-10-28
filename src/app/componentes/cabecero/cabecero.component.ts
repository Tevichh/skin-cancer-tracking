import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../servicios/login.service';


@Component({
  selector: 'app-cabecero',
  templateUrl: './cabecero.component.html',
  styleUrl: './cabecero.component.css'
})
export class CabeceroComponent implements OnInit {
  userName: String = "";

  constructor(private loginServicio: LoginService) { }

  ngOnInit(): void { }

  autenticado() {
    if (this.loginServicio.autenticacion()) {
      this.userName = localStorage.getItem("user") || "";
      return true;
    }
    return false;
  }

  cerrarSesion(){
    this.loginServicio.cerrarSesion();
  }
}
