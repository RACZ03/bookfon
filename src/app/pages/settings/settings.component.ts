import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/@core/services/users.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  public identity: any;
  public token: string = '';
  public users: any[] = [];
  constructor(
    private userService: UsersService
  ) { }

  ngOnInit(): void {
    let data = localStorage.getItem('identity') || '{}';
    this.identity = JSON.parse(data);
    let token = localStorage.getItem('token') || '';
    this.token = token;
    if (this.token){
      this.getUsers();
    }
  }

  async getUsers(){
    let resp = await this.userService.getAllStaffByBusiness(this.identity.businessList[0].code);
    if (resp.status === '200' && resp.data){
      this.users = resp.data;
    }
  }

}
