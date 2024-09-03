import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableroComponent } from './componentes/tablero/tablero.component';
import { LoginComponent } from './componentes/login/login.component';
import { ConfiguracionComponent } from './componentes/configuracion/configuracion.component';
import { NoEncontradoComponent } from './componentes/no-encontrado/no-encontrado.component';
import { VerExamenComponent } from './componentes/ver-examen/ver-examen.component';
import { authGuard } from './custom/auth.guard';

const routes: Routes = [
  { path: "", component: TableroComponent, canActivate: [authGuard] },
  { path: "login", component: LoginComponent},
  { path: "configuracion", component: ConfiguracionComponent, canActivate: [authGuard] },
  { path: "paciente/editar/:id", component: TableroComponent, canActivate: [authGuard] },
  { path: "verExamen", component: VerExamenComponent, canActivate: [authGuard] },
  { path: "**", component: NoEncontradoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
