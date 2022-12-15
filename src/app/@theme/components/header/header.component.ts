import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/@core/services/auth.service';

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
    private authSvc: AuthService,
    private _router: Router,
  ) {
    this.loadUser();
  }

  ngOnInit(): void {
    const sidebarToggle = document.body.querySelector('#sidebarToggle');

    if (sidebarToggle) {
      sidebarToggle.addEventListener('click', event => {
        // console.log('click');
        document.body.classList.toggle('sidenav-toggled');
        event.preventDefault();
          localStorage.setItem('sb|sidebar-toggle',new Boolean( document.body.classList.contains('sidenav-toggled')).toString());
      });
    }
    const sidebarToggleTop = document.body.querySelector('#layout-main');
    if (sidebarToggleTop) {
      sidebarToggleTop.addEventListener('click', event => {
          event.preventDefault();
          document.body.classList.remove('sidenav-toggled');
          localStorage.setItem('sb|sidebar-toggle',new Boolean( document.body.classList.contains('sidenav-toggled')).toString());
      });
    }
  }

  ngDoCheck(){
    let data = localStorage.getItem('identity') || '{}';
    this.identity = JSON.parse(data);
  }

  showProfile() {
    console.log('hey');
    this._router.navigate(['/pages/profile']);
  }

  async loadUser() {
    let data = await this.authSvc.getIdentity();
    this.identity = JSON.parse(data);
    let exists = this.identity?.roleList.find( (item: any) => item.role == 'ROLE_ADMIN');
    if ( exists != undefined ) {
      this.bandAdmin = true;
    }
  }

  async logout() {
    await this.authSvc.logout(this.identity.email);
  }

}
