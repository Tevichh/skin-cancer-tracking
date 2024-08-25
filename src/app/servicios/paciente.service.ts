import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { appSettings } from '../../settings/appSettings';
import { Observable } from 'rxjs';
import { Paciente } from '../interfaces/paciente.interface';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {
  private apiUrl: string = appSettings.apiUrl;
  constructor(private http: HttpClient) { }

  getPacientes(): Observable<Paciente[]> {
    return this.http.get<Paciente[]>(`${this.apiUrl}/pacientes`);
  }

  getPacientByIdNum(identificador: string): Observable<Paciente> {
    return this.http.get<Paciente>(`${this.apiUrl}/pacientes/${identificador}`)
  }

  addPaciente(paciente: Paciente): Observable<Paciente> {
    return this.http.post<Paciente>(`${this.apiUrl}/pacientes`, paciente);
  }

  updatePaciente(paciente: Paciente): Observable<Paciente> {
    return this.http.put<Paciente>(`${this.apiUrl}/pacientes/${paciente.num_paciente_id}`, paciente);
  }
  deletePaciente(identificador: string): Observable<Object> {
    return this.http.delete<Object>(`${this.apiUrl}/pacientes/${identificador}`)
  }


}
