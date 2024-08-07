import { Routes } from '@angular/router';
import { EmpresasComponent } from './dashboard/empresas/empresas.component';
import { DestinatariosComponent } from './dashboard/destinatarios/destinatarios.component';
import { PagosComponent } from './dashboard/pagos/pagos.component';
import { LoginComponent } from './login/login.component';
import { DashComponent } from './dash/dash.component';
import { CargadestinatariosComponent } from './dashboard/cargadestinatarios/cargadestinatarios.component';
import { authGuard, EmpleadoGuard, AdminGuard, SuperAdminGuard } from './guards/auth.guard';
import { CampaniasComponent } from './dashboard/campanias/campanias.component'; // Importa el componente de campanias
import { CreacionDeCampaniaComponent } from './dashboard/creaciondecampania/creaciondecampania.component';
import { FiltrosComponent } from './dashboard/filtros/filtros.component'; // Importa el componente de filtros
import { ReportesComponent } from './dashboard/reportes/reportes.component'; // Importa el nuevo componente Reportes
import { ResetpasswordComponent } from './dashboard/resetpassword/resetpassword.component';
import { RegistroComponent } from './registro/registro.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { RecuperarclaveComponent } from './recuperarclave/recuperarclave.component';

export const routes: Routes = [
  { path: '', component: LandingPageComponent, pathMatch: 'full'},
  { path: 'dashboard', redirectTo: 'dashboard/reportes', pathMatch: 'full'},
  { path: 'dashboard', canActivate: [authGuard] , component: DashComponent, children: [ //all users
      //componentes SuperAdmin
      { path: 'empresas', canActivate: [SuperAdminGuard], component: EmpresasComponent }, //superadmin
      //componentes Admin
      { path: 'pagos', canActivate: [AdminGuard], component: PagosComponent },
      //componentes Empleados

      { path: 'destinatarios', component: DestinatariosComponent }, //all users
      { path: 'destinatarios/filtros', component: FiltrosComponent}, //all users but superadmin
      { path: 'destinatarios/:id/importar', component: CargadestinatariosComponent}, //superadmin + admin
      { path: 'campanias', component: CampaniasComponent },
      { path: 'campanias/creacion', component: CreacionDeCampaniaComponent},
      { path: 'reportes', component: ReportesComponent }, // nueva ruta para ReportesComponent
      { path: 'reset-password', component: ResetpasswordComponent } //admin only
    ]
  },
  { path: 'login', component: LoginComponent }, //all users
  { path: 'registro', component: RegistroComponent }, //all users
  { path: 'landing-page', component: LandingPageComponent},
  { path: 'recuperar', component: RecuperarclaveComponent}
  
];

//TODO: Agrupar componentes por rol