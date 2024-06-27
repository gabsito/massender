import { Routes } from '@angular/router';
import { EmpresasComponent } from './dashboard/empresas/empresas.component';
import { DestinatariosComponent } from './dashboard/destinatarios/destinatarios.component';
import { PagosComponent } from './dashboard/pagos/pagos.component';
import { CargadestinatariosComponent } from './dashboard/cargadestinatarios/cargadestinatarios.component';
import { FiltrosComponent } from './dashboard/filtros/filtros.component';

export const routes: Routes = [
  { path: 'empresas', component: EmpresasComponent },
  { path: 'destinatarios', component: DestinatariosComponent },
  { path: 'pagos', component: PagosComponent },
  { path: 'destinatarios/:id/importar', component: CargadestinatariosComponent},
  { path: 'destinatarios/filtros', component: FiltrosComponent}
];
