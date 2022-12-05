import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
// import { AdminGuard } from '../shared/guards/admin.guard';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
        // , canLoad: [AdminGuard]
      },
      {
        path: 'profile', loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule)
        // , canLoad: [AdminGuard]
      },
      {
        path: 'staff', loadChildren: () => import('./staff/staff.module').then(m => m.StaffModule)
      },
      {
        path: 'customers', loadChildren: () => import('./customers/customers.module').then(m => m.CustomersModule)
        // , canLoad: [AdminGuard]
      },
      // {
      //   path: 'services', loadChildren: () => import('./service-product/service-product-routing.module').then(m => m.ServiceProductRoutingModule)
      //   // , canLoad: [AdminGuard]
      // },
      {
        path: 'settings', loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule)
        // , canLoad: [AdminGuard]
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      // {
      //   path: '**',
      //   component: NotFoundComponent,
      // },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
