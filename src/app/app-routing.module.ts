import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestViewsComponent } from './test-views/test-views.component';

const routes: Routes = [
  { path: 'test', component: TestViewsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
