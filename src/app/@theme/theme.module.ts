import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  HeaderComponent,
  FooterComponent,
  SidebarComponent,
} from './components';

import { LayoutComponent } from './layouts/layout/layout.component'
import { RouterModule } from '@angular/router';

const COMPONENTS = [
  LayoutComponent,
  HeaderComponent,
  FooterComponent,
  SidebarComponent
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    ...COMPONENTS,
    LayoutComponent
  ],
  exports: [
    ...COMPONENTS,
    LayoutComponent
  ]
})
export class ThemeModule { }
