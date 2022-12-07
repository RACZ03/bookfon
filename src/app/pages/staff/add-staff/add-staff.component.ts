import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CatalogsService } from 'src/app/@core/utils/catalogs.service';
import { SexsI, SexsItem } from 'src/app/@core/Interfaces/Sexs';
import { StaffService } from 'src/app/@core/services/staff.service';
import { ImageFile } from 'src/app/@core/Interfaces/Image-file';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-staff',
  templateUrl: './add-staff.component.html',
  styleUrls: ['./add-staff.component.scss'],
})
export class AddStaffComponent implements OnInit {
  file: ImageFile | undefined;
  sexs: SexsItem[] = [];
  status: number = 0;
  message: string = '';
  comment: string = '';
  fileValid: boolean = true;
  loading: boolean = false;

  form: FormGroup = new FormGroup({
    first_name: new FormControl('', [Validators.required]),
    last_name: new FormControl('', [Validators.required]),
    phone_number: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    profile: new FormControl('', [Validators.required]),
    sex: new FormControl('', [Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(12),
    ]),
    confirmPassword: new FormControl('', [Validators.required]),
    image: new FormControl(''),
  });
  submitted = false;
  constructor(
    private catalogService: CatalogsService,
    private service: StaffService,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadSex();
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

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    if (this.f['password'].value != this.f['confirmPassword'].value) {
      this.toast.error('Passwords do not match', 'Error');
      this.f['confirmPassword'].setErrors({ incorrect: true });
      return;
    }
    this.loading = true;
    this.verifyFile();
  }

  verifyFile() {
    if (this.file?.size) {
      this.service.uploadImage(this.file).then((res: any) => {
        this.createNewStaff(res);
      });
    } else {
      this.createNewStaff();
    }
  }

  createNewStaff(url?: string) {
    this.service
      .createStaff({
        firstName: this.f['first_name'].value,
        lastName: this.f['last_name'].value,
        phone: this.f['phone_number'].value,
        email: this.f['email'].value,
        profile: this.f['profile'].value,
        password: this.f['password'].value,
        image: url ? url : '',
        idSex: this.f['sex'].value,
      })
      .then(() => {
        this.loading = false;
        this.toast.success('Staff created successfully', 'Success');
        this.form.reset();
      })
      .catch(() => {
        this.toast.error('Error unexpected, creating staff', 'Error');
        this.loading = false;
      });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  loadSex() {
    this.catalogService
      .getSexs()
      .then((res: SexsI) => {
        this.sexs = res?.data;
        this.status = res?.status;
        this.message = res?.message;
        this.comment = res?.comment;
      })
      .catch((err) => {
        console.log(err);
        this.toast.error('Error unexpected, loading sex', 'Error');
      });
  }

  resetForm() {
    this.form.reset();
  }
}
