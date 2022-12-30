import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEventAndWorkshopComponent } from './event-workshop/add-event-and-workshop/add-event-and-workshop.component';
import { ServiceProductComponent } from './service-product.component';
import { ServiceAddComponent } from './services/service-add/service-add.component';

const routes: Routes = [
  {
    path: '',
    component: ServiceProductComponent,
  },
  {
     path: 'addService', component : ServiceAddComponent 
  },
  { 
    path: 'updateServices/:id', component : ServiceAddComponent 
  },
  {
    path: 'add-event-workshop', component : AddEventAndWorkshopComponent
  },
  {
    path: 'edit-event-workshop/:id', component : AddEventAndWorkshopComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServiceProductRoutingModule { }
