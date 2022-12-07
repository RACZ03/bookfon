import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { ServicesService } from 'src/app/@core/services/services.service';
import { AlertService } from 'src/app/@core/utils/alert.service';
declare var window: any;

@Component({
  selector: 'app-service-add',
  templateUrl: './service-add.component.html',
  styleUrls: ['./service-add.component.scss'],
})
export class ServiceAddComponent implements OnInit {
  public module: any = false;
  Serviceadd!: FormGroup;
  public data: any[] = [];
  public categoryData: any[] = [];
  public categoryDataUpdate: any[] = [];
  public subcategoryData: any[] = [];
  public subcategoryUpdate: any[] = [];
  public formModalCategorie: any;
  public formModal: any;
  public imagesList: any[] = [{ url: '' }];
  // hasta aqui

  public title = 'New Service';
  public idSelected: number = 0;

  constructor(
    private readonly fb: FormBuilder,
    private serviceSvr: ServicesService,
    private alertSvc: AlertService,
    private router: Router,
    private actroute: ActivatedRoute
  ) {}

  async ngOnInit(): Promise<void> {
    this.formModalCategorie = new window.bootstrap.Modal(
      document.getElementById('modalNewCategories')
    );
    this.formModal = new window.bootstrap.Modal(
      document.getElementById('modalNewSubCategories')
    );
    this.Serviceadd = this.initForms();
    this.loadData();
    this.loadDataCategories();
    this.loadDataSubCategory();

    //recuperar datos de la ruta
    this.actroute.params.subscribe((param) => {
      this.idSelected = param['id'];
      this.loadData();
    });
  }

  async loadDataSubCategory() {
    this.subcategoryData = [];
    let resp = await this.serviceSvr.getDataSubCategories();
    if (resp != undefined || resp != null) {
      if (resp.status === 404) {
        this.alertSvc.showAlert(4, resp.statusText, 'Error');
      } else {
        let { data } = resp;
        if (data !== undefined) {
          this.subcategoryData = data || [];
        }
      }
    } else {
      this.alertSvc.showAlert(3, 'No results found', '');
    }
  }

  async loadDataCategories() {
    this.categoryData = [];
    let resp = await this.serviceSvr.getDataCategory();

    if (resp != undefined || resp != null) {
      if (resp.status === 404) {
        this.alertSvc.showAlert(4, resp.statusText, 'Error');
      } else {
        let { data } = resp;
        if (data !== undefined) {
          this.categoryData = data || [];
        }
      }
    } else {
      this.alertSvc.showAlert(3, 'No results found', '');
    }
  }

  initForms(): FormGroup {
    return this.fb.group({
      id: [''],
      name: ['', [Validators.required]],
      description: [''],
      categories: [],
      subcategories: [],
      duration: ['', [Validators.required]],
      price: ['', [Validators.required]],
    });
  }

  clickedFile() {
    // click input file
    let file = document.getElementById('file') as HTMLInputElement;
    file.click();
  }

  async SelectedFile(event: any) {
    // set image and upload
    let file = event.target.files[0];
    let reader = new FileReader();
    // Upload image to firebase
    let resp = await this.serviceSvr.uploadImage(file);
    if (resp != undefined || resp != null) {
      this.imagesList.push({ url: resp});
    }
  }

  async loadData() {
    this.data = [];
    let resp = await this.serviceSvr.getByIdServiceBusinness(this.idSelected);
    if (resp != undefined || resp != null) {
      this.loadDataForm(resp);
    }
  }

  async loadDataForm(resp: any = null) {
    if (this.Serviceadd == undefined) return;

    this.title =
      resp == null || resp == undefined ? 'New Service' : 'Update Service';
   
    let { data } = resp;
   
    this.categoryDataUpdate = data?.categoriesList;
    let arraycategory: any[] = [];
    if (this.categoryDataUpdate !== undefined) {
      for (let i = 0; i < this.categoryDataUpdate?.length; i++) {
        arraycategory.push(this.categoryDataUpdate[i].id);
      }
    }
    this.subcategoryUpdate = data?.subCategoriesList;
    let arraysubcategory: any[] = [];
    if (this.subcategoryUpdate !== undefined) {
      for (let i = 0; i < this.subcategoryUpdate?.length; i++) {
        arraysubcategory.push(this.subcategoryUpdate[i].id);
      }
    }
    if (data?.data?.recurrentPayment === true) {
      document.getElementById('btnradio2')?.setAttribute('checked', '');
    } else {
      document.getElementById('btnradio1')?.setAttribute('checked', '');
    }

    this.Serviceadd.reset({
      id: (data == null || data == undefined) ? 0 : data?.id,
      name: (data == null || data == undefined) ? '' : data?.name,
      description: (data == null || data == undefined) ? '' : data?.description,
      duration: (data == null || data == undefined) ? '' : data?.duration,
      price: (data == null || data == undefined) ? '' : data?.cost,
      categories: arraycategory == null ? [] : arraycategory,
      subcategories: arraysubcategory == null ? [] : arraysubcategory,
    });

    if ( data !== undefined ) {
      if ( data?.imagePrincipal !== '' && data?.imagePrincipal !== null ) {

        if ( data?.imagePrincipal !== undefined)
          this.imagesList.push({ url: data?.imagePrincipal });

        if ( data !== undefined && data !== null) {
          let { imagesList } = data;
          for (let i = 0; i < imagesList.length; i++) {
            if ( imagesList[i]?.url !== undefined)
              this.imagesList.push({ url: imagesList[i]?.url });
          }
          console.log(this.imagesList)
        }
      }
    }
  }

  validInput(name: string) {
    return (
      this.Serviceadd.get(name)?.touched &&
      this.Serviceadd.get(name)?.errors?.['required']
    );
  }

  async onSubmit() {
    if (this.Serviceadd.invalid) return;

    let data = this.Serviceadd.value;
    // console.log(data.categories);
    let categoriesnew: any[] = [];
    let subcategoriesnew: any[] = [];
    for (let i = 0; i < data.categories.length; i++) {
      categoriesnew.push({ id: data.categories[i] });
    }
    for (let i = 0; i < data.subcategories.length; i++) {
      subcategoriesnew.push({ id: data.subcategories[i] });
    }
    let recurrentPayment = false;
    let recurrent = <HTMLInputElement>document.getElementById('btnradio2');
    if (recurrent.checked) {
      recurrentPayment = true;
    }

    // remove first element array
    this.imagesList.shift();

    let resp = await this.serviceSvr.postService(
      this.Serviceadd.value,
      categoriesnew,
      subcategoriesnew,
      recurrentPayment,
      this.imagesList
    );
    //console.log(resp);
    if (resp != null || resp != undefined) {
      let { status } = resp;

      if (status == 201) {
        this.alertSvc.showAlert(1, resp?.comment, 'Success');
        this.loadDataForm();
        //this.onClose.emit(true);
      } else {
        this.alertSvc.showAlert(4, resp?.comment, 'Error');
      }
    } else {
      this.alertSvc.showAlert(4, 'Error al guardar', 'Error');
    }
    this.router.navigate(['/pages/services']);
  }

  ///------------------CERRAR MODAL CATEGORIES------------------///

  closeModalCategories(band: boolean) {
    if (band) this.formModalCategorie.hide();
    this.loadDataCategories();
  }

  showModalCategoriesAdd(e: boolean) {
    if (!e) {
      return;
    }
    this.formModalCategorie.show();
    this.loadDataCategories();
  }

  //------------------CERRAR MODAL   SUB_CATEGORY------------------///
  closeModalSubCategories(band: boolean) {
    if (band) this.formModal.hide();
    this.loadData();
    this.loadDataSubCategory();
  }

  showModalSubCategoriesAdd(e: boolean) {
    if (!e) {
      return;
    }
    this.formModal.show();
    this.loadDataSubCategory();
  }
}
