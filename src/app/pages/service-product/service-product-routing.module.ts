import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServiceProductComponent } from './service-product.component';

const routes: Routes = [
  {
    path: '',
    component: ServiceProductComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServiceProductRoutingModule { }
