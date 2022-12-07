import { Component, OnInit,Input } from '@angular/core';
import { ImageFile } from 'src/app/@core/Interfaces/Image-file';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileEditComponent implements OnInit {
  @Input() itemStaff: any;
  file:ImageFile | undefined
  constructor() { }

  ngOnInit(): void {
  }

  onFileSelected(file: any) {
    this.file = file?.files[0];
  }
}
