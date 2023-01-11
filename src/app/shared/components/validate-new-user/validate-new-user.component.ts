import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CatalogService } from 'src/app/@core/services/catalogs.service';
import { UsersService } from 'src/app/@core/services/users.service';
import { AlertService } from 'src/app/@core/utils/alert.service';

@Component({
  selector: 'app-validate-new-user',
  templateUrl: './validate-new-user.component.html',
  styleUrls: ['./validate-new-user.component.scss']
})
export class ValidateNewUserComponent implements OnInit {

  public modalValidate!: FormGroup
  public emailRegex: string ='^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';

  @Input() title: string = '';
  @Input() showSettings: boolean = false;
  @Input() showFromStaff: boolean = false;
  @Input() showFromCustomer: boolean = false;
  @Output() onCloseModalAndOpenOld = new EventEmitter<boolean>();

  public roles: any[] = [];

  public messageResponse: string = '';
  public questions: string = '';

  public step1: boolean = true;
  public step2: boolean = false;
  public hasRole: boolean = false;
  public userNotFound: boolean = false;

  public widthEmail: boolean = false;

  constructor(
    private fb: FormBuilder,
    private alertSvc: AlertService,
    private userSvc: UsersService,
    private catalogSvc: CatalogService
  ) { }

  ngOnInit(): void {
    this.modalValidate = this.initForm();
    this.getRoles();
  }

  async getRoles() {
    let resp = await this.catalogSvc.getRoles();
    if ( resp !== undefined ) {
      let { status } = resp;
      if ( status == 200 ) {
        let { data } = resp;
        this.roles = data;
        // console.log(this.roles)
      }
    }
  }

  validInput(input: string): boolean {
    return this.modalValidate.get(input)?.invalid && this.modalValidate.get(input)?.touched ? true : false;
  }

  validInputMin(name: string) {
    return this.modalValidate.get(name)?.touched && this.modalValidate.get(name)?.errors?.['minlength'];
  }

  validEmail(name: string) {
    return this.modalValidate.get(name)?.touched && this.modalValidate.get(name)?.errors?.['pattern'];
  }

  initForm(): FormGroup {
    return this.fb.group({
      email: ['', [Validators.required, Validators.pattern(this.emailRegex)]],
      phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      role: [''],
    })
  }

  async onSubmit() {

    let role = this.modalValidate.get('role')?.value;
    

    if ( this.showFromStaff ) {
      // set rol staff
      role = 'ROLE_STAFF';
    } else  if ( this.showFromCustomer ) {
      // set rol customer
      role = 'ROLE_CUSTOMER';
    } else if ( this.showSettings ) {
      // is true, validate idRole
      if ( role === '' ) {
        this.alertSvc.showAlert(3, '', 'Please select a role');
        return;
      }
    } 

    let email = this.modalValidate.get('email')?.value;
    let phone = this.modalValidate.get('phone')?.value;

    let resp = await this.userSvc.verifyUser(email, phone, role);
    if ( resp !== undefined ) {
      let { status } = resp;
      if ( status == 200 ) { 
        let { data } = resp;
        // console.log(data);
        if ( data !== undefined ) {
          this.messageResponse = data.message; 
          let { hasRole, fullName, withEmail, withPhone } = data;

          if ( hasRole ) {
            this.hasRole = true;
            this.messageResponse = 'The user ' + fullName + ', already has the selected role assigned';
          } else {
            
            if ( withEmail ) {
              this.widthEmail = true;
              this.messageResponse = data?.message;
              this.questions = 'Do you want to assign the role ' + role + ' to the user ' + fullName + '?';
            } else {
              this.messageResponse = data?.message;
              this.questions = 'Do you want to assign the role ' + role + ' to the user  ' + fullName + '?';
            }
          }
        }
        this.step1 = false;
        this.step2 = true;
      } else if ( status == 404 ) {
        this.messageResponse = 'The user does not exist';
        this.questions = 'Do you want to create the user?';
        this.userNotFound = true;
        this.step1 = false;
        this.step2 = true;
      }
    }
  }

 async onSave() {
   // add new role
   let emailBackup = this.modalValidate.get('email')?.value;
   let email = this.widthEmail ? this.modalValidate.get('email')?.value : null;
   let phone = this.widthEmail ? null : this.modalValidate.get('phone')?.value;
   let role = this.modalValidate.get('role')?.value;

    if ( this.userNotFound ) {
      localStorage.setItem('new-user', JSON.stringify({ email: emailBackup, phone, role }));
      this.step1 = true;
      this.step2 = false;
      // reset form
      this.modalValidate.reset();
      this.userNotFound = false;
      this.onCloseModalAndOpenOld.emit(true);
      // hide modal
      this.close();
    } else {
      // add new role

      let resp = await this.userSvc.addNewRole(email, phone, role);
      if ( resp !== undefined ) {
        let { status } = resp;
        if ( status == 200 ) {
          this.step1 = true;
          this.step2 = false;
          this.alertSvc.showAlert(1, '', 'The role was assigned successfully');
          // reset form
          this.modalValidate.reset();
          // hide modal
          this.onCloseModalAndOpenOld.emit(false);
        }
      }
    }
  }

  cancelAndOpenOldModal(band: boolean = false) {
    // add email and phone number in localstorage
    let email = this.modalValidate.get('email')?.value;
    let phone = this.modalValidate.get('phone')?.value;
    let role = this.modalValidate.get('role')?.value;
    localStorage.setItem('new-user', JSON.stringify({ email, phone, role }));
    // console.log('Close')
    this.hasRole = false;
    if ( band ) {
      this.modalValidate.reset();
      
      this.step1 = true;
      this.step2 = false;
      if ( this.showSettings ) {
        this.onCloseModalAndOpenOld.emit(false);
      } else {
        this.onCloseModalAndOpenOld.emit(true);
      }
      return
    }

    // reset form
    this.modalValidate.reset();

    if ( this.userNotFound )
      this.onCloseModalAndOpenOld.emit(false);
    else
    this.onCloseModalAndOpenOld.emit(true);
    

    this.step1 = true;
    this.step2 = false;
  }
 
  close() {
    this.onCloseModalAndOpenOld.emit(false);
  }
}
