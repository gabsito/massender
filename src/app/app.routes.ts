import { Routes } from '@angular/router';
import { EmpresasComponent } from './dashboard/empresas/empresas.component';
import { DestinatariosComponent } from './dashboard/destinatarios/destinatarios.component';
import { PagosComponent } from './dashboard/pagos/pagos.component';
import { LoginComponent } from './login/login.component';
import { DashComponent } from './dash/dash.component';
import { CargadestinatariosComponent } from './dashboard/cargadestinatarios/cargadestinatarios.component';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {
    path: 'dashboard', component: DashComponent, children: [ //all users
      { path: 'empresas', component: EmpresasComponent }, //superadmin
      { path: 'destinatarios', component: DestinatariosComponent }, //all users
      { path: 'destinatarios/:id/importar', component: CargadestinatariosComponent}, //superadmin + admin
      { path: 'pagos', component: PagosComponent },
    ]
  },
  { path: 'login', component: LoginComponent }, //all users
];
