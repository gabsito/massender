import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BasicComponent } from '../basic/basic.component';
import { PremiumComponent } from '../premium/premium.component';
import { VipComponent } from '../vip/vip.component';
import { ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [BasicComponent, PremiumComponent, VipComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent {

  @ViewChild('pricingSection') pricingSection!: ElementRef;
  @ViewChild('Howto') Howto!: ElementRef;

  scrollToPricing() {
    this.pricingSection.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }

  scrollToHowto(){
    this.Howto.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }

  constructor(private router: Router) { }

  navigateToRegister() {
    this.router.navigate(['/registro']);
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }



}
