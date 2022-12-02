import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileEditComponent implements OnInit {
file_name: string="";
  constructor() { }

  ngOnInit(): void {
  }

  onFileSelected(file: any) {
    console.log(file?.files[0].name);
    this.file_name = file?.files[0].name;
  }
}
