import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestViewsComponent } from './test-views/test-views.component';
import { DashboardEmpresaComponent } from './usuarios/dashboard-empresa/dashboard-empresa.component';
import { DashboardDestinatariosComponent } from './usuarios/dashboard-destinatarios/dashboard-destinatarios.component';
import { DashboardPagosComponent } from './usuarios/dashboard-pagos/dashboard-pagos.component';

const routes: Routes = [
  { path: 'test', component: TestViewsComponent },
  { path: 'dashboard-empresa', component: DashboardEmpresaComponent},
  { path: 'dashboard-destinatarios', component: DashboardDestinatariosComponent},
  { path: 'dashboard-pagos', component: DashboardPagosComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
