import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardDestinatariosComponent } from './usuarios/dashboard-destinatarios/dashboard-destinatarios.component';
import { DashboardEmpresaComponent } from './usuarios/dashboard-empresa/dashboard-empresa.component';
import { DashboardPagosComponent } from './usuarios/dashboard-pagos/dashboard-pagos.component';
import { DashboardFiltrosComponent } from './usuarios/dashboard-filtros/dashboard-filtros.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LoginViewComponent } from './login-view/login-view.component';
import { TestViewsComponent } from './test-views/test-views.component';
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({ 
  declarations: [
    AppComponent,
    DashboardDestinatariosComponent,
    DashboardEmpresaComponent,
    DashboardPagosComponent,
    DashboardFiltrosComponent,
    SidebarComponent,
    LoginViewComponent,
    TestViewsComponent,
    HeaderComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
