import { Routes } from '@angular/router';
import { EmpresasComponent } from './dashboard/empresas/empresas.component';
import { DestinatariosComponent } from './dashboard/destinatarios/destinatarios.component';
import { PagosComponent } from './dashboard/pagos/pagos.component';
import { LoginComponent } from './login/login.component';
import { DashComponent } from './dash/dash.component';
import { CargadestinatariosComponent } from './dashboard/cargadestinatarios/cargadestinatarios.component';
import { authGuard } from './guards/auth.guard';
import { CampaniasComponent } from './dashboard/campanias/campanias.component'; // Importa el componente de campanias
import { CreacionDeCampaniaComponent } from './dashboard/creaciondecampania/creaciondecampania.component';
import { FiltrosComponent } from './dashboard/filtros/filtros.component'; // Importa el componente de filtros

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {
    path: 'dashboard', canActivate: [authGuard] , component: DashComponent, children: [ //all users
      { path: 'empresas', component: EmpresasComponent }, //superadmin
      { path: 'destinatarios', component: DestinatariosComponent }, //all users
      { path: 'dashboard/destinatarios/filtros', component: FiltrosComponent}, //all users but superadmin
      { path: 'destinatarios/:id/importar', component: CargadestinatariosComponent}, //superadmin + admin
      { path: 'pagos', component: PagosComponent },
      { path: 'campanias', component: CampaniasComponent },
      { path: 'creaciondecampania', component: CreacionDeCampaniaComponent},
    ]
  },
  { path: 'login', component: LoginComponent }, //all users
];
