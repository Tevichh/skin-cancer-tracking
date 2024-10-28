import { Injectable } from '@angular/core';
import { appSettings } from '../../settings/appSettings';
import { Observable } from 'rxjs';
import { Consulta } from '../interfaces/consulta.interface';
import { HttpClient } from '@angular/common/http';
import { jsPDF } from 'jspdf';
import { Imagen } from '../interfaces/imagen.interface';

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {

  private apiUrl: string = appSettings.apiUrl;

  constructor(private http: HttpClient) { }

  getConsultas(): Observable<Consulta[]> {
    return this.http.get<Consulta[]>(`${this.apiUrl}/consultas`)
  }

  getConsultasPaciente(identificador: String): Observable<Consulta[]> {
    return this.http.get<Consulta[]>(`${this.apiUrl}/consultas/${identificador}`)
  }

  addConsulta(consulta: Consulta): Observable<Consulta> {
    return this.http.post<Consulta>(`${this.apiUrl}/consultas`, consulta)
  }


  generarPdf(datosConsulta: Consulta) {

    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text('Informe de Consulta', 20, 20);

    const headers = ["", "Detalles"];
    const data = [
      ["Nombre Completo", datosConsulta.nombreCompleto],
      ["ID de Consulta", datosConsulta.id!.toString()],
      ["Identificación", datosConsulta.identificacion],
      ["Médico", datosConsulta.medico],
      ["Fecha", datosConsulta.fecha || 'N/A'],
      ["Resultado", datosConsulta.resultado]
    ];

    let startY = 30;
    const rowHeight = 10;

    doc.setFontSize(12);
    headers.forEach((header, index) => {
      doc.text(header, 20 + index * 80, startY);
    });

    doc.line(20, startY + 2, 200, startY + 2); // Línea horizontal

    data.forEach((row, rowIndex) => {
      startY += rowHeight;
      row.forEach((cell, cellIndex) => {
        doc.text(cell, 20 + cellIndex * 80, startY);
      });
      doc.line(20, startY + 2, 200, startY + 2); // Línea horizontal después de cada fila
    });

    startY += rowHeight + 10; // espacio adicional antes de las observaciones
    doc.setFontSize(12);
    doc.text('Observaciones:', 20, startY);
    doc.setFontSize(10);
    startY += rowHeight; // posición para las observaciones
    doc.text(datosConsulta.observaciones || 'No hay', 20, startY);

    startY += rowHeight + 20; // espacio adicional para la imagen
    doc.text('Imagen de la Prueba:', 20, startY);
    if (datosConsulta.muestraUrl) {
      /* const img = new Image();
      img.src = datosConsulta.muestraUrl; // URL de la imagen
      img.onload = () => {
        doc.addImage(img, 'JPEG', 20, startY + 10, 100, 100); // Ajusta las dimensiones según sea necesario
        doc.save(`Consulta_${datosConsulta.identificacion}.pdf`);
      }; */

      doc.save(`Consulta_${datosConsulta.identificacion}.pdf`);

    } else {
      // Si no hay imagen, guarda directamente el PDF
      doc.save(`Consulta_${datosConsulta.identificacion}.pdf`);
    }
  }
}
