import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public identity: any;
  constructor() {
    this.identity = JSON.parse(localStorage.getItem('identity') || '{}');
    console.log(this.identity)
  }

  ngOnInit(): void {
  }

}
