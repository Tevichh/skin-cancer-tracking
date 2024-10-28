import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PacienteService } from '../../servicios/paciente.service';
import { Paciente } from '../../interfaces/paciente.interface';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrl: './pacientes.component.css'
})
export class PacientesComponent implements OnInit {
  @ViewChild("pacienteForm") pacienteForm !: NgForm;
  @ViewChild("botonCerrar") botonCerrar !: ElementRef;

  pacientes: Paciente[] = [];
  paciente: Paciente = {
    id: null,
    tipo_id: "",
    num_paciente_id: "",
    nombre_1: "",
    nombre_2: "",
    apellido_1: "",
    apellido_2: "",
    pais: "",
    ciudad: "",
    direccion: "",
    fecha_nacimiento: null,
    num_telefono: "",
    email: ""
  }

  rol = localStorage.getItem("rol");

  isEditing: boolean = false;

  constructor(private pacienteServicio: PacienteService) {
  }

  ngOnInit(): void {
    this.cargarPacientes();
  }


  cargarPacientes() {
    this.pacienteServicio.getPacientes().subscribe(
      pacientes => {
        this.pacientes = pacientes;
      },
      error => {
        console.error('Error al obtener pacientes', error);
      }
    );
  }

  abrirModal(identificador?: string) {
    if (identificador) {
      this.pacienteServicio.getPacientByIdNum(identificador).subscribe(
        paciente => {
          this.paciente = { ...paciente };// Clonar para evitar modificar el original
          this.isEditing = true;
        }
      )
    } else {
      this.paciente = {} as Paciente;
      this.isEditing = false;
    }
  }


  agregarPaciente({ value, valid }: { value: Paciente, valid: boolean }) {
    if (!valid) {
      console.log("ERROR")
    } else { //AGREGAR PACIENTE
      if (!this.isEditing) {
        this.pacienteServicio.addPaciente(value).subscribe(
          response => {
            this.cargarPacientes();
            this.pacienteForm.resetForm();
            this.botonCerrar.nativeElement.click();
          }
        );
      } else {//EDITAR PACIENTE
        this.pacienteServicio.updatePaciente(value).subscribe(
          response => {
            this.cargarPacientes();
            this.pacienteForm.resetForm();
            this.botonCerrar.nativeElement.click();
          }
        );

      }

    }
  }

  eliminarPaciente(identificador: string) {
    this.pacienteServicio.deletePaciente(identificador).subscribe(
      response => {
        this.cargarPacientes();
      }
    )
  }
}
