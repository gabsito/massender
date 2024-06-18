import { Component } from '@angular/core';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-dash',
    standalone: true,
    templateUrl: './dash.component.html',
    styleUrl: './dash.component.css',
    imports: [
      SidebarComponent,
      RouterOutlet
    ]
})
export class DashComponent {

}
