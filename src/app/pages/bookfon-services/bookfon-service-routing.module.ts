import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { BookfonServicesComponent } from './bookfon-services.component';

// import { AdminGuard } from '../shared/guards/admin.guard';

const routes: Routes = [
  {
    path: '',
    component: BookfonServicesComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookfonServiceRoutingModule {
}
