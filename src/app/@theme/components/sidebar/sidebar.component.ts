import { DOCUMENT } from '@angular/common';
import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { AuthService } from 'src/app/@core/services/auth.service';
import { MenuItem, MENU_ITEMS, MENU_ITEMS_SETTINGS } from './pages-menu';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menu: MenuItem[] = [];
  public menuFooter: MenuItem[] = [];

  public identity: any = {};
  public isAdmin: boolean = false;
  public isExist: boolean = false;
  
  public getScreenWidth: any;
  public getScreenHeight: any;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private authSvc: AuthService
  ) { 
    this.loadData();
  }

  async ngOnInit() {
    // if (this.isAdmin) {
    //   this.menu = MENU_ITEMS;
    //   this.menuFooter = MENU_ITEMS_SETTINGS;
    // } else {
    //   // this.menu = MENU_ITEMS_COACH;
    // }

    // this.getScreenWidth = window.innerWidth;
    // this.getScreenHeight = window.innerHeight;
      this.menu = MENU_ITEMS;
      this.menuFooter = MENU_ITEMS_SETTINGS;
      this.isAdmin = true;
      this.isExist = true;

  }
  
  loadData() {
    let data = localStorage.getItem('identity');
    if (data) {
      this.identity = JSON.parse(data);
      let roles: any[] = this.identity.roles;
  
      if ( roles != undefined && roles.length > 0) {
        
        this.isExist = roles.find( role => role.nombre == 'ADMIN');
        if ( this.isExist != undefined ) {
          this.isAdmin = true;
        }
      }
    }
  }

  onSelectOption(item: any) {
    if ( item === '/pages/logout') {
      this.logout();
      return;
    }
    if ( item != undefined)
      this.triggerMenu();
  }

  async logout() {
    await this.authSvc.logout(this.identity.email);
  }
  
  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.getScreenWidth = window.innerWidth;
    this.getScreenHeight = window.innerHeight;
  }

  triggerMenu() {
    if ( this.getScreenWidth < 980 ) {
      this.document.body.classList.toggle('sidenav-toggled');
    }
  }

}
