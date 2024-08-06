import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { BasicComponent } from '../../basic/basic.component';
import { PremiumComponent } from '../../premium/premium.component';
import { VipComponent } from '../../vip/vip.component';

@Component({
  selector: 'app-pagos',
  standalone: true,
  imports: [MatCardModule, BasicComponent, PremiumComponent, VipComponent],
  templateUrl: './pagos.component.html',
  styleUrls: ['./pagos.component.css']
})
export class PagosComponent {

}
