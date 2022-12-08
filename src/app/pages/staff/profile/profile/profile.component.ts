import { Component, OnInit, Input } from '@angular/core';
import { ImageFile } from 'src/app/@core/Interfaces/Image-file';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { StaffService } from 'src/app/@core/services/staff.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileEditComponent implements OnInit {
  @Input() itemStaff: any;
  fileValid: boolean = true;
  loading: boolean = false;
  file!: ImageFile;
  form: FormGroup = new FormGroup({
    first_name: new FormControl('', [Validators.required]),
    last_name: new FormControl('', [Validators.required]),
    phone_number: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    image: new FormControl(''),
  });
  constructor(
    private service: StaffService,
    private toast: ToastrService
  ) { }

  ngOnInit(): void {
    this.setPatchValueToForm();
  }

  setPatchValueToForm() {
    this.f['first_name'].patchValue(this.itemStaff.firstName);
    this.f['last_name'].patchValue(this.itemStaff.lastName);
    this.f['phone_number'].patchValue(this.itemStaff.phone);
    this.f['email'].patchValue(this.itemStaff.email);
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.loading = true;
    this.verifyFile();
  }

  verifyFile() {
    if (this.file?.size) {
      this.service.uploadImage(this.file).then((res: any) => {
        this.updateStaff(res);
      });
    } else {
      this.updateStaff();
    }
  }


  updateStaff(url?: string) {
    this.service
      .updateStaff({
        id: this.itemStaff.id,
        firstName: this.f['first_name'].value,
        lastName: this.f['last_name'].value,
        phone: this.f['phone_number'].value,
        email: this.f['email'].value,
        image: url ? url : '',
      })
      .then(() => {
        this.loading = false;
        this.toast.success('Staff updated successfully', 'Success');
      })
      .catch(() => {
        this.toast.error('Error unexpected, update staff', 'Error');
        this.loading = false;
      });
  }

  onFileSelected(file: any) {
    if (
      file.files[0].type == 'image/jpeg' ||
      file.files[0].type == 'image/png' ||
      file.files[0].type == 'image/jpeg'
    ) {
      this.fileValid = true;
      this.file = file?.files[0];
    } else {
      this.fileValid = false;
      this.f['image'].patchValue('');
    }
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
}
