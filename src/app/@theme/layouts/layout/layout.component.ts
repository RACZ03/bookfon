import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  template:  `
    <!-- <app-spinner></app-spinner> -->
    <div id="layoutSidenav">
      <!--  SideBar -->
      <div id="layoutSidenav_nav">
          <nav class="sidenav shadow-right sidenav-light">
              <app-sidebar></app-sidebar>
          </nav>
      </div>

      <!-- Content -->
      <div id="layoutSidenav_content">
        <main>
          <app-header></app-header>
          <!-- <div  id="layout-main"> -->
            <ng-content select="router-outlet"></ng-content>
          <!-- </div> -->
          <!-- <app-footer></app-footer> -->
        </main>
      </div>
    </div>
  `,
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
