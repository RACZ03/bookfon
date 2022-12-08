import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  HeaderComponent,
  FooterComponent,
  SidebarComponent,
} from './components';

import { LayoutComponent } from './layouts/layout/layout.component'
import { RouterModule } from '@angular/router';
import { BrokenImagenDirective } from './directives/broken-imagen.directive';
import { BtnNextDirective } from './directives/btn-next.directive';
import { BtnPrevDirective } from './directives/btn-prev.directive';
import { DayPipe } from './pipes/day.pipe';

const COMPONENTS = [
  LayoutComponent,
  HeaderComponent,
  FooterComponent,
  SidebarComponent
];

const DIRECTIVES = [
  BrokenImagenDirective,
  BtnNextDirective,
  BtnPrevDirective 
];

const PIPES = [
  DayPipe,
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    ...COMPONENTS,
    ...DIRECTIVES,
    ...PIPES,
    LayoutComponent
  ],
  exports: [
    ...COMPONENTS,
    ...DIRECTIVES,
    ...PIPES,
    LayoutComponent
  ]
})
export class ThemeModule { }
