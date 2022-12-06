import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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
  file!: ImageFile;
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
    private toast: ToastrService,
    private crf:ChangeDetectorRef
  ) {}
  ngOnInit(): void {
    this.loadSex();
  }

  onFileSelected(file: any) {
    console.log(file.files[0]);
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
    this.submitted = true;
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.loading = true;
    console.log(JSON.stringify(this.form.value, null, 2));
    this.verifyFile();
  }

  verifyFile() {
    let ct = this;
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
      .then((res: any) => {
        this.loading = false;
        this.toast.success('Staff created successfully', 'Success');
        this.submitted = false;
        // this.form.reset();
      })
      .catch((err: any) => {
        this.toast.error('Error unexpected, creating staff', 'Error');
        this.loading = false;
      });
  }

  changeSex(e: any): void {}

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  patchInput(): void {
    this.form.reset();
    this.form.clearAsyncValidators();
    this.form.markAsUntouched();
  }

  loadSex() {
    this.catalogService
      .getSexs()
      .then((res: SexsI) => {
        this.sexs = res?.data;
        this.status = res?.status;
        this.message = res?.message;
        this.comment = res?.comment;
        console.log(this.sexs, this.status, this.message, this.comment);
      })
      .catch((err) => {
        console.log(err);
        this.toast.error('Error unexpected, loading sex', 'Error');
      });
  }
}
