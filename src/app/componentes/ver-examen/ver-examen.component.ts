import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Consulta } from '../../interfaces/consulta.interface';
import { ConsultaService } from '../../servicios/consulta.service';


@Component({
  selector: 'app-ver-examen',
  templateUrl: './ver-examen.component.html',
  styleUrl: './ver-examen.component.css'
})
export class VerExamenComponent implements OnInit {

  @ViewChild("identificationNumber") identificationNumber !: ElementRef;

  consultas: Consulta[] = [];
  consultasFiltradas: Consulta[] = []

  constructor(private consultaServicio: ConsultaService) { }
  ngOnInit(): void {
    this.consultaServicio.getConsultas().subscribe(
      consultas => {
        this.consultas = consultas;
      }
    )
  }


  filtrarConsultas(identificador: string) {
    this.consultasFiltradas = this.consultas.filter(consulta => consulta.identificacion == identificador)
  }


  verConsulta(datosConsulta: Consulta) {
    this.consultaServicio.generarPdf(datosConsulta);
  }


}
