import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServiceProductComponent } from './service-product.component';
import { ServiceAddComponent } from './services/service-add/service-add.component';

const routes: Routes = [
  {
    path: '',
    component: ServiceProductComponent,
  },
   { path: 'addService', component : ServiceAddComponent },
    { path: 'updateServices/:id', component : ServiceAddComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServiceProductRoutingModule { }
