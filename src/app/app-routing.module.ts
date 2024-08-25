import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableroComponent } from './componentes/tablero/tablero.component';
import { LoginComponent } from './componentes/login/login.component';
import { ConfiguracionComponent } from './componentes/configuracion/configuracion.component';
import { NoEncontradoComponent } from './componentes/no-encontrado/no-encontrado.component';

const routes: Routes = [
  {path: "", component: TableroComponent},
  {path: "login", component:LoginComponent },
  {path: "configuracion", component: ConfiguracionComponent},
  {path: "paciente/editar/:id", component: TableroComponent},
  {path: "**", component: NoEncontradoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
