import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CabeceroComponent } from './componentes/cabecero/cabecero.component';
import { TableroComponent } from './componentes/tablero/tablero.component';
import { PacientesComponent } from './componentes/pacientes/pacientes.component';
import { LoginComponent } from './componentes/login/login.component';
import { ConfiguracionComponent } from './componentes/configuracion/configuracion.component';
import { NoEncontradoComponent } from './componentes/no-encontrado/no-encontrado.component';
import { PiePaginaComponent } from './componentes/pie-pagina/pie-pagina.component';
import { HttpClientModule, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { PacienteService } from './servicios/paciente.service';
import { FormsModule } from '@angular/forms';
import { VerExamenComponent } from './componentes/ver-examen/ver-examen.component';
import { LoginService } from './servicios/login.service';
import { authInterceptor } from './custom/auth.interceptor';
import { MedicosComponent } from './componentes/medicos/medicos.component';
import { DashboardComponent } from './componentes/dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    CabeceroComponent,
    TableroComponent,
    PacientesComponent,
    LoginComponent,
    ConfiguracionComponent,
    NoEncontradoComponent,
    PiePaginaComponent,
    VerExamenComponent,
    MedicosComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    provideClientHydration(),
    PacienteService,
    LoginService,
    provideHttpClient(withInterceptors([authInterceptor])),
    provideHttpClient(withFetch())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
