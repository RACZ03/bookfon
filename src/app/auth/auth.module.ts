import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { Step10Component } from './steps/step10/step10.component';
import { CreateAccountComponent } from './create-account/create-account.component';

import { NgxMaskModule, IConfig } from 'ngx-mask';
export const options: Partial<null|IConfig> | (() => Partial<IConfig>) = null;

import { CreateBusinessComponent } from './create-business/create-business.component'


const COMPONENTS = [
  LoginComponent,
  Step10Component,
  CreateAccountComponent,
  CreateBusinessComponent,
];

@NgModule({
  declarations: [
    ...COMPONENTS,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
  ],
  exports: [
    ...COMPONENTS,
  ]
})
export class AuthModule { }
