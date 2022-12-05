import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  public identity: any;
  constructor() { }

  ngOnInit(): void {
    let data = localStorage.getItem('identity') || '{}';
    this.identity = JSON.parse(data);
    console.log(this.identity);
  }

}
