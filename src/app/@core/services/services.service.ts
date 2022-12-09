import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import * as moment from 'moment';
import { finalize } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CategoryI } from '../Interfaces/Category';
import { ConnectionService } from '../utils/connection.service';

const URL = environment.APIUrl;

@Injectable({
  providedIn: 'root',
})
export class ServicesService {
  public token: any = null;
  public filePath!: string;

  constructor(
    private connectionSvc: ConnectionService,
    private storage: AngularFireStorage
  ) { 
    // console.log('SERVICES')
  }

  async getScheduleBussines():Promise<any>{
    let identity = JSON.parse(localStorage.getItem('businessSelected') || '{}');
    
    const data = await this.connectionSvc.send(
      'get',
      `v1/purchasedService/business/${identity.code}`
    );
    const scheduled = this.processDataSchedule(data?.data);
    return scheduled;
  }

  processDataSchedule(data:any) {
    if(data?.length<=0 || data ==undefined || data==null){return[]}

    let events = [];
    for (let index = 0; index < data.length; index++) {
      events.push({
        id: data[index].id,
        title: data[index]['service'].name,
        start: this.convertDate(data[index].date),
        end: this.convertDate(data[index].date),
        time: {
          startTime: data[index].startTime,
          endTime: data[index].endTime,
        },
        service: data[index]['service'],
        service_name: data[index]['service'].name,
        service_description: data[index]['service'].description,
        allDay: false,
        idStaff:data[index].idStaff,
        staff: data[index]['staff'],
        url: data[index]['staff'].image? data[index]['staff'].image : '',
        backgroundColor: '#FF946F',
        borderColor: '#FF946F',
        textColor: '#000',
        description: data[index]['service'].description,
      });
    }
    return events;
  }

  convertDate(date: any) {
    return moment(date).format('YYYY-MM-DD');
  }

  //------------------------cupons---------------------------------
  ///v1/coupon/business/{businessCode}
  getCuponsByBusiness(): Promise<any> {
    let identity = JSON.parse(localStorage.getItem('businessSelected') || '{}');
    return this.connectionSvc.send(
      'get',
      `v1/coupon/business/${identity.code}`
    );
  }

  ///////////////-------------------services---------------------------------///////////////
  postService(
    service: any,
    categoriesnew: any,
    subcategoriesnew: any,
    recurrentPayment: any,
    imagesList: any[]
  ): Promise<any> {
    let identity = JSON.parse(localStorage.getItem('businessSelected') || '{}');
    let img: any = [];
    let imagePrincipal: string = '';

    for (let i = 0; i < imagesList.length; i++) {
      if ( i === 0 ) {
        imagePrincipal = imagesList[i]?.url;
      } else {
        img.push({
          url: imagesList[i]?.url,
          type: 2
        });
      }
    }

    let obj: any = {
      name: service.name,
      description: service.description,
      cost: service.price,
      duration: service.duration,
      recurrentPayment: recurrentPayment,
      categories: categoriesnew,
      subCategories: subcategoriesnew,
      idCurrency: service.idCurrency,
      idBusiness: identity.id,
      imagePrincipal: imagePrincipal,
      images: img,
    };
    const params = JSON.stringify(obj);
    // console.log(params);
    if (
      service.id !== 0 &&
      service.id !== null &&
      service.id !== undefined &&
      service.id !== ''
    ) {
      //catalogs/update/{{id}}
      //console.log("entro al update");
      return this.connectionSvc.send(
        'put',
        `services/update/${service.id}`,
        params
      );
    } else {
      return this.connectionSvc.send('post', `services/save`, params);
    }
  }

  getServicesByBusinesset(): Promise<any> {
    // console.log("este es::::");
    let identity = JSON.parse(localStorage.getItem('businessSelected') || '{}');
    return this.connectionSvc.send(
      'get', `public/v1/${identity.code}/allServicesByBusiness`
    );
  }

  getByIdServiceBusinness(id: number): Promise<any> {
    return this.connectionSvc.send('get', `getServicesById/${id}`);
  }

  deleteService(id: number): Promise<any> {
    return this.connectionSvc.send('delete', `services/delete/${id}`);
  }

  ///////-------------------CATEGORIES---------------------------------///////
  getDataCategory(): Promise<any> {
    let identity = JSON.parse(localStorage.getItem('businessSelected') || '{}');
    return this.connectionSvc.send(
      'get',
      `catalogs/byRefAndBusiness/${identity.code}?ref=CATEGORY`
    );
  }

  findById(id: number): Promise<any> {
    return this.connectionSvc.send('get', `users/${id}`);
  }

  postCategory(Category: any): Promise<any> {
    let identity = JSON.parse(localStorage.getItem('businessSelected') || '{}');
    let obj: any = {
      name: Category.name,
      description: Category.description,
      catalogTypeRef: 'CATEGORY',
    };
    const params = JSON.stringify(obj);
    if (
      Category.id !== 0 &&
      Category.id !== null &&
      Category.id !== undefined &&
      Category.id !== ''
    ) {
      //catalogs/update/{{id}}
      return this.connectionSvc.send(
        'put',
        `catalogs/update/${Category.id}`,
        params
      );
    } else {
      return this.connectionSvc.send(
        'post',
        `catalogs/saveCatalogToBusiness/${identity.code}`,
        params
      );
    }
  }

  put(params: any): Promise<any> {
    let id = params.id;
    delete params.id;
    return this.connectionSvc.send('put', `users/update/${id}`, params);
  }

  deleteCatalogs(id: number): Promise<any> {
    return this.connectionSvc.send('delete', `catalogs/delete/${id}`);
  }

  delete(id: number): Promise<any> {
    return this.connectionSvc.send('delete', `users/${id}`);
  }
  /////////////-------------------------Subcategories-------------------------////////////////////////

  getDataSubCategories(): Promise<any> {
    let identity = JSON.parse(localStorage.getItem('businessSelected') || '{}');
    return this.connectionSvc.send(
      'get',
      `catalogs/byRefAndBusiness/${identity.code}?ref=SUB_CATEGORY`
    );
  }

  postSubCategory(Category: any): Promise<any> {
    let identity = JSON.parse(localStorage.getItem('businessSelected') || '{}');

    let obj: any = {
      name: Category.name,
      description: Category.description,
      catalogTypeRef: 'SUB_CATEGORY',
    };
    const params = JSON.stringify(obj);
    if (
      Category.id !== 0 &&
      Category.id !== null &&
      Category.id !== undefined &&
      Category.id !== ''
    ) {
      //catalogs/update/{{id}}
      return this.connectionSvc.send(
        'put',
        `catalogs/update/${Category.id}`,
        params
      );
    } else {
      return this.connectionSvc.send(
        'post',
        `catalogs/saveCatalogToBusiness/${identity.code}`,
        params
      );
    }
  }

  /////////------------------------Classifications-----------------------------------////////////////////////

  getdataClasifications(): Promise<any> {
    let identity = JSON.parse(localStorage.getItem('businessSelected') || '{}');
    return this.connectionSvc.send(
      'get',
      `catalogs/byRefAndBusiness/${identity.code}?ref=CLASIFICATION`
    );
  }

  postClasifications(Category: any): Promise<any> {
    let identity = JSON.parse(localStorage.getItem('businessSelected') || '{}');

    let obj: any = {
      name: Category.name,
      description: Category.description,
      catalogTypeRef: 'CLASIFICATION',
    };
    const params = JSON.stringify(obj);

    if (
      Category.id !== 0 &&
      Category.id !== null &&
      Category.id !== undefined &&
      Category.id !== ''
    ) {
      //catalogs/update/{{id}}
      return this.connectionSvc.send(
        'put',
        `catalogs/update/${Category.id}`,
        params
      );
    } else {
      return this.connectionSvc.send(
        'post',
        `catalogs/saveCatalogToBusiness/${identity.code}`,
        params
      );
    }
  }

  /////////////Coupon////////////////////////

  uploadImage(file: any): Promise<any> {
    // method update image profile
    let current = new Date().getTime();
    this.filePath = `services/${file.name}-${current}`;
    const fileRef = this.storage.ref(this.filePath);
    const task = this.storage.upload(this.filePath, file);
    return new Promise((resolve, reject) => {
      task
        .snapshotChanges()
        .pipe(
          finalize(async () => {
            fileRef.getDownloadURL().subscribe(async (urlImage) => {
             
              resolve(urlImage);
            });
          })
        )
        .subscribe();
    });
  }
}
