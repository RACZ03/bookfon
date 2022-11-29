import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public identity: any;
  public isAdmin: any[] = [];
  public bandAdmin: boolean = false;
  constructor(
    // private userSvc: UserService,
    private _router: Router,
  ) { 
    this.loadUser();
  }

  ngOnInit(): void {
    const sidebarToggle = document.body.querySelector('#sidebarToggle');

    if (sidebarToggle) {
      sidebarToggle.addEventListener('click', event => {
        console.log('CLICK')
          event.preventDefault();
          document.body.classList.toggle('sidenav-toggled');
          localStorage.setItem('sb|sidebar-toggle',new Boolean( document.body.classList.contains('sidenav-toggled')).toString());
      });
    }
    const sidebarToggleTop = document.body.querySelector('#layoutSidenav_content');
    if (sidebarToggleTop) {
      sidebarToggleTop.addEventListener('click', event => {
          // event.preventDefault();
          document.body.classList.remove('sidenav-toggled');
          localStorage.setItem('sb|sidebar-toggle',new Boolean( document.body.classList.contains('sidenav-toggled')).toString());
      });
    } 
  }

  ngDoCheck(){
    let data = localStorage.getItem('identity') || '{}';
    this.identity = JSON.parse(data);
  }

  async loadUser() {
    // let data = await this.userSvc.getIdentity();
    // this.identity = JSON.parse(data);
    // let exists = this.identity?.roles.find( role => role.nombre == 'ADMIN');
    // if ( exists != undefined ) {
    //   this.bandAdmin = true;
    // }
  }

  logout() {
    // this.userSvc.logout();
  }

}
