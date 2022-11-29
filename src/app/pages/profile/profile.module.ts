import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneralComponent } from './general/general.component';
import { SecurtyComponent } from './securty/securty.component';
import { ProfileRoutingModule } from './profile-routing.module';



@NgModule({
  declarations: [
    GeneralComponent,
    SecurtyComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule
  ]
})
export class ProfileModule { }
