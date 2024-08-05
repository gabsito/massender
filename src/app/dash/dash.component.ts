import { Component } from '@angular/core';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';

@Component({
    selector: 'app-dash',
    standalone: true,
    templateUrl: './dash.component.html',
    styleUrls: ['./dash.component.css'],
    imports: [
      SidebarComponent,
      MatSidenavModule,
      RouterOutlet
    ]
})
export class DashComponent {

}
