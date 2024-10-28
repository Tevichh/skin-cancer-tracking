import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Consulta } from '../../interfaces/consulta.interface';
import { ConsultaService } from '../../servicios/consulta.service';
import { ActivatedRoute } from '@angular/router';
import { PacienteService } from '../../servicios/paciente.service';
import { Imagen } from '../../interfaces/imagen.interface';
import { appSettings } from '../../../settings/appSettings';
import { MedicoService } from '../../servicios/medico.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-consultas',
  templateUrl: './consultas.component.html',
  styleUrl: './consultas.component.css'
})
export class ConsultasComponent implements OnInit {

  @ViewChild("muestra") muestraInput!: ElementRef;
  @ViewChild("botonCerrar") botonCerrar !: ElementRef;
  @ViewChild('cameraStream') cameraStream!: ElementRef<HTMLVideoElement>;
  @ViewChild('canvas') canvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild("consultaForm") consultaForm!: NgForm;

  photoUrl: string | null = null;
  photoData: string | null = null;
  private mediaStream: MediaStream | null = null;

  consultas: Consulta[] = [];
  consulta: Consulta = {
    id: null,
    identificacion: "",
    nombreCompleto: "",
    fecha: "",
    muestraUrl: "",
    resultado: "",
    observaciones: "",
    medico: ""
  }

  imagenForm: Imagen = {
    muestra: null,
    observaciones: ""
  }

  id: string = "";
  camaraActiva: boolean = false;


  constructor(private consultasServicio: ConsultaService, private route: ActivatedRoute, private pacienteServicio: PacienteService, private medicoServicio: MedicoService) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe(
      params => (
        this.id = params.get("id")!,
        this.pacienteServicio.getPacientByIdNum(this.id).subscribe(
          paciente => {
            const today = new Date();
            const year = today.getFullYear().toString().slice(-2);
            const month = (today.getMonth() + 1).toString().padStart(2, '0');
            const day = today.getDate().toString().padStart(2, '0');

            this.consulta.identificacion = paciente.num_paciente_id;
            this.consulta.nombreCompleto = `${paciente.nombre_1 ?? ''} ${paciente.nombre_2 ?? ''} ${paciente.apellido_1 ?? ''} ${paciente.apellido_2 ?? ''}`;
            this.consulta.fecha = `${year}/${month}/${day}`;

            let fechaUrl = `${year}-${month}-${day}`;
            this.consulta.muestraUrl = `${this.consulta.identificacion}_${fechaUrl}.jpg`

            const userName = localStorage.getItem("user") || "";
            if (userName !== "Admin") {
              this.medicoServicio.getMedicoByUser(userName).subscribe(
                userName => {
                  this.consulta.medico = `${userName.nombre_1 ?? ''} ${userName.nombre_2 ?? ''} ${userName.apellido_1 ?? ''} ${userName.apellido_2 ?? ''}`
                }
              )
            } else {
              this.consulta.medico = userName;
            }



          }
        ),
        this.cargarConsultas(this.id)
      )
    )

  }

  cargarConsultas(identificador: string) {
    this.consultasServicio.getConsultasPaciente(identificador).subscribe(
      consultas => (
        this.consultas = consultas
      )
    )
  }

  crearConsulta({ value, valid }: { value: any; valid: boolean }) {
    if (valid) {
      let nuevoArchivo;
      if (this.camaraActiva) {
        if (!this.photoData) {
          console.error("No se ha capturado una foto de la cámara.");
          return;
        }

        const byteString = atob(this.photoData.split(',')[1]);
        const mimeString = this.photoData.split(',')[0].split(':')[1].split(';')[0];
        const arrayBuffer = new ArrayBuffer(byteString.length);
        const intArray = new Uint8Array(arrayBuffer);

        for (let i = 0; i < byteString.length; i++) {
          intArray[i] = byteString.charCodeAt(i);
        }

        nuevoArchivo = new File([arrayBuffer], this.consulta.muestraUrl, { type: mimeString });
      } else {
        let inputFile = this.muestraInput.nativeElement.files[0];
        nuevoArchivo = new File([inputFile], this.consulta.muestraUrl, { type: 'image/jpeg' });
      }

      const formData = new FormData();
      formData.append('muestra', nuevoArchivo);
      const apiUrl: string = appSettings.apiUrl;

      fetch(`${apiUrl}/consultas/muestra`, {
        method: 'POST',
        body: formData,
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Error en la subida de la imagen');
          }
          return response.text();
        })
        .then(data => {
          console.log(data);
          this.imagenForm.muestra = null;
          if (!this.camaraActiva) {
            this.muestraInput.nativeElement.value = "";
          }
          this.botonCerrar.nativeElement.click();
          this.consulta.observaciones = value.observaciones

          this.consultasServicio.addConsulta(this.consulta).subscribe(
            res => {
              this.cargarConsultas(this.id)
            }
          )
          console.log(this.consulta)


        })
        .catch(err => {
          console.error(err);
          this.imagenForm.muestra = null;
          if (!this.camaraActiva) { this.muestraInput.nativeElement.value = ""; }

          this.botonCerrar.nativeElement.click();
        });
    }
  }

  verConsulta(datosConsulta: Consulta) {
    this.consultasServicio.generarPdf(datosConsulta);
  }

  activarCamara(event: Event) {
    this.camaraActiva = (event.target as HTMLInputElement).checked;
    if (this.camaraActiva) {
      this.previewUrl = null;
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
          this.mediaStream = stream;
          this.cameraStream.nativeElement.srcObject = stream;
        })
        .catch(error => {
          console.error("Error al acceder a la cámara: ", error);
        });
    } else {
      this.stopCamera()
    }
  }

  capturePhoto() {
    const canvasEl = this.canvas.nativeElement;
    const videoEl = this.cameraStream.nativeElement;
    const context = canvasEl.getContext('2d');
    if (context) {
      canvasEl.width = videoEl.videoWidth;
      canvasEl.height = videoEl.videoHeight;
      context.drawImage(videoEl, 0, 0, canvasEl.width, canvasEl.height);
      this.photoData = canvasEl.toDataURL('image/jpeg');
      this.photoUrl = this.photoData;
    }
  }

  cancelarConsulta() {
    if (this.mediaStream) {
      this.stopCamera()
    }
    this.consultaForm.resetForm();
  }

  stopCamera() {
    const stream = this.cameraStream.nativeElement.srcObject as MediaStream;
    stream?.getTracks().forEach(track => track.stop());
    this.cameraStream.nativeElement.srcObject = null;
    this.photoData = null;
    this.photoUrl = null;
    this.camaraActiva = false;
    (document.getElementById("activarCamara") as HTMLInputElement).checked = false;
    this.previewUrl = null;


  }

  previewUrl: string | ArrayBuffer | null = null;

  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        this.previewUrl = reader.result;
      };

      reader.readAsDataURL(file); // Lee el archivo como una URL de datos
    }
  }
}
