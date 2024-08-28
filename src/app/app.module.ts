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
import { HttpClientModule } from '@angular/common/http';
import { PacienteService } from './servicios/paciente.service';
import { FormsModule } from '@angular/forms';
import { VerExamenComponent } from './componentes/ver-examen/ver-examen.component';

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
    VerExamenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    provideClientHydration(),
    PacienteService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
