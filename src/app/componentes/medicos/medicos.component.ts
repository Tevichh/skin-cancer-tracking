import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Medico } from '../../interfaces/medico.interface';
import { NgForm } from '@angular/forms';
import { MedicoService } from '../../servicios/medico.service';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styleUrl: './medicos.component.css'
})
export class MedicosComponent implements OnInit {
  @ViewChild("medicoForm") medicoForm !: NgForm;
  @ViewChild("botonCerrar") botonCerrar !: ElementRef;
  medicos: Medico[] = [];
  medico: Medico = {
    id: null,
    tipo_id: "",
    num_medico_id: "",
    nombre_1: "",
    nombre_2: "",
    apellido_1: "",
    apellido_2: "",
    num_telefono: "",
    email: ""
  }

  isEditing: boolean = false;

  constructor(private medicosServicio: MedicoService) { }

  ngOnInit(): void {
    this.cargarMedicos();
  }

  cargarMedicos() {
    this.medicosServicio.getMedicos().subscribe(
      medicos => {
        this.medicos = medicos;
      },
      error => {
        console.error('Error al obtener médicos', error);
      }
    )
  }

  abrirModal(identificador?: string) {
    if (identificador) {
      this.medicosServicio.getMedicoByIdNum(identificador).subscribe(
        medico => {
          this.medico = { ...medico };
          this.isEditing = true;
        }
      )
    } else {
      this.medico = {} as Medico;
      this.isEditing = false;
    }
  }

  agregarMedico({ value, valid }: { value: Medico, valid: boolean }) {
    if (!valid) {
      console.log("ERROR");
    } else {
      if (!this.isEditing) { //AGREGAR MEDICO
        this.medicosServicio.addMedico(value).subscribe(
          response => {
            this.cargarMedicos();
            this.medicoForm.resetForm();
            this.botonCerrar.nativeElement.click();
          }
        )
      } else { //EDITAR MEDICO
        this.medicosServicio.updateMedico(value).subscribe(
          response => {
            this.cargarMedicos();
            this.medicoForm.resetForm();
            this.botonCerrar.nativeElement.click();
          }
        )
      }
    }
  }

  eliminarMedico(identificador: string) {
    this.medicosServicio.deleteMedico(identificador).subscribe(
      response => {
        this.cargarMedicos();
      }
    )
  }


  cancelar() {
    this.medicoForm.resetForm();
    this.isEditing = false;
  }
}
