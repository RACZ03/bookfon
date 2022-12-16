import { DOCUMENT } from '@angular/common';
import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { AuthService } from 'src/app/@core/services/auth.service';
import { MenuItem, MENU_ITEMS, MENU_ITEMS_STAFF, MENU_ITEMS_SETTINGS, MENU_ITEMS_SETTINGS_STAFF } from './pages-menu';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menu: MenuItem[] = [];
  public menuFooter: MenuItem[] = [];

  public identity: any = {};
  public businessSelected: any = {};
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
    // console.log('OnInit SidebarComponent')
    if (this.isAdmin) {
      this.menu = MENU_ITEMS;
      this.menuFooter = MENU_ITEMS_SETTINGS;
    } else {
      this.menu = MENU_ITEMS_STAFF;
      this.menuFooter = MENU_ITEMS_SETTINGS_STAFF;
    }

    this.getScreenWidth = window.innerWidth;
    this.getScreenHeight = window.innerHeight;
    // this.menu = MENU_ITEMS;
    // this.menuFooter = MENU_ITEMS_SETTINGS;
    // this.isAdmin = true;
    this.isExist = true;

  }
  
  loadData() {
    let data = localStorage.getItem('identity');
    this.businessSelected = JSON.parse(localStorage.getItem('businessSelected') || '{}');
    if (data) {
      this.identity = JSON.parse(data);
      let roles: any[] = this.identity?.roleList;
  
      if ( roles != undefined ) {
        if ( roles.length > 0) {
          this.isExist = roles.find( item => item.role == 'ROLE_ADMIN');
          if ( this.isExist != undefined ) {
            this.isAdmin = true;
            // console.log('isAdmin')
          }
        }
      }
    }
  }

  onSelectOption(item: any, position: any, isFooter: boolean = false) {
    // console.log('click')
    // chenge icon
    for (let i = 0; i < this.menu.length; i++) {
      let idImg = 'icon-nav-';
      let icon: any = document.getElementById(idImg + i) as HTMLElement;
      if ( i == position ) {
        // verify img -white.svg
        if ( icon?.src.indexOf('-white.svg') > 0) {
          icon.src = icon.src.replace('-white.svg', '.svg');
        } else {
          icon.src = icon.src.replace('.svg', '-white.svg');
        }
      } else {
        icon.src = icon.src.replace('-white.svg', '.svg');
        // icon.src = icon.src.replace('.svg', '.svg');
      }
    }  
    for (let i = 0; i < this.menuFooter.length; i++) {
      let idImg = 'icon-nav-footer-';
      let icon: any = document.getElementById(idImg + i) as HTMLElement;
      if ( i == position ) {
        // verify img -white.svg
        if ( icon?.src.indexOf('-white.svg') > 0) {
          icon.src = icon.src.replace('-white.svg', '.svg');
        } else {
          icon.src = icon.src.replace('.svg', '-white.svg');
        }
      } else {
        icon.src = icon.src.replace('-white.svg', '.svg');
        // icon.src = icon.src.replace('.svg', '.svg');
      }
    }  
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
