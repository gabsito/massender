import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
import { PopupComponent } from './usuarios/popup/popup.component';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { FormsModule } from '@angular/forms';
import {MatLegacyButtonModule as MatButtonModule} from '@angular/material/legacy-button';
import {MatLegacyCardModule as MatCardModule} from '@angular/material/legacy-card';


@NgModule({ 
  declarations: [
    AppComponent,
    DashboardDestinatariosComponent,
    DashboardFiltrosComponent,
    SidebarComponent,
    LoginViewComponent,
    TestViewsComponent,
    HeaderComponent,
    DashboardComponent,
    PopupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatDialogModule,
    BrowserAnimationsModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    DashboardPagosComponent,
    DashboardEmpresaComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
  
}
