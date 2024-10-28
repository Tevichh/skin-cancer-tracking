import { Injectable } from '@angular/core';
import { appSettings } from '../../settings/appSettings';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Medico } from '../interfaces/medico.interface';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  private apiUrl = appSettings.apiUrl;
  constructor(private http: HttpClient) { }

  getMedicos(): Observable<Medico[]> {
    return this.http.get<Medico[]>(`${this.apiUrl}/medicos`);
  }

  getMedicoByIdNum(identificador: string): Observable<Medico> {
    return this.http.get<Medico>(`${this.apiUrl}/medicos/${identificador}`);
  }

  getMedicoByUser(user: string): Observable<Medico> {
    return this.http.post<Medico>(`${this.apiUrl}/medicos/user`, { user });
  }


  addMedico(medico: Medico): Observable<Medico> {
    return this.http.post<Medico>(`${this.apiUrl}/medicos`, medico);
  }

  updateMedico(medico: Medico): Observable<Medico> {
    return this.http.put<Medico>(`${this.apiUrl}/medicos/${medico.num_medico_id}`, medico);
  }

  deleteMedico(identificador: string): Observable<Object> {
    return this.http.delete<Object>(`${this.apiUrl}/medicos/${identificador}`);
  }
}
