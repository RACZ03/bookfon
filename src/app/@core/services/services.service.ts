import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { environment } from 'src/environments/environment';
import { CategoryI } from '../Interfaces/Category';
import { ConnectionService } from '../utils/connection.service';

const URL = environment.APIUrl;

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  public token: any = null;
   
  
  constructor(
    private connectionSvc: ConnectionService
  ) { 
  }
//------------------------cupons---------------------------------
///v1/coupon/business/{businessCode}
getCuponsByBusiness(): Promise<any> {

  let identity = JSON.parse(localStorage.getItem('businessSelected') || '{}');
  return this.connectionSvc.send('get', `v1/coupon/business/${identity.code}`);
}

///////////////-------------------services---------------------------------///////////////
postService(service: any, categoriesnew : any, subcategoriesnew : any, recurrentPayment : any): Promise<any> {
  let identity = JSON.parse(localStorage.getItem('businessSelected') || '{}');
  let img : any [] = [];
 img = [{url: "https://firebasestorage.googleapis.com/v0/b/bpb-training.appspot.com/o/coach%2FIMG_1623.jpeg-1663303744736?alt=media&token=1df2dcf7-9eb6-41c0-99f2-e388e2993239",
  type: 2}]

     let obj: any = { 
       name:service.name,
       cost: service.price,
       duration: service.duration,
       recurrentPayment: recurrentPayment,
       categories: categoriesnew,
       subCategories: subcategoriesnew,
       idCurrency : 8,
       idBusiness: identity.id,
       imagePrincipal:"https://firebasestorage.googleapis.com/v0/b/bpb-training.appspot.com/o/coach%2FIMG_0840.jpeg-1663302151339?alt=media&token=b56ac71d-f512-4b27-8f35-9da720183382",
       images:img
     }
     const params = JSON.stringify(obj);
     console.log(params);
     if(service.id !== 0 && service.id !== null && service.id !== undefined && service.id !== ''){
       //catalogs/update/{{id}}
       //console.log("entro al update");
       return this.connectionSvc.send('put', `services/update/${service.id}`, params);

     }else{
       return this.connectionSvc.send('post', `services/save`, params);
     }

}

getServicesByBusinesset(): Promise<any> {
  let identity = JSON.parse(localStorage.getItem('businessSelected') || '{}');
  return this.connectionSvc.send('get', `public/v1/${identity.code}/allServicesByBusiness`);
  
}

getByIdServiceBusinness(id: number): Promise<any> {

  return this.connectionSvc.send('get', `getServicesById/${id}`);
}


///////-------------------CATEGORIES---------------------------------///////
  getDataCategory(): Promise<any> {
    let identity = JSON.parse(localStorage.getItem('businessSelected') || '{}');
    return this.connectionSvc.send('get', `catalogs/byRefAndBusiness/${identity.code}?ref=CATEGORY`);
  }

  findById(id: number): Promise<any> {
    return this.connectionSvc.send('get', `users/${ id }`);
  }

  postCategory(Category: any): Promise<any> {
    let identity = JSON.parse(localStorage.getItem('businessSelected') || '{}');
    let obj: any = { 
      name:Category.name,
      description: Category.description,
      catalogTypeRef: 'CATEGORY',
    }
    const params = JSON.stringify(obj);
    if(Category.id !== 0 && Category.id !== null && Category.id !== undefined && Category.id !== ''){
      //catalogs/update/{{id}}
      return this.connectionSvc.send('put', `catalogs/update/${Category.id}`, params);

    }else{
      return this.connectionSvc.send('post', `catalogs/saveCatalogToBusiness/${identity.code}`, params);
    }

  }

  put(params: any): Promise<any> {
    let id = params.id;
    delete params.id;
    return this.connectionSvc.send('put', `users/update/${ id }`, params);
  }

  delete(id: number): Promise<any> {
    return this.connectionSvc.send('delete', `users/${ id }`);
  }
/////////////-------------------------Subcategories-------------------------////////////////////////

getDataSubCategories(): Promise<any> {
  let identity = JSON.parse(localStorage.getItem('businessSelected') || '{}');
  return this.connectionSvc.send('get', `catalogs/byRefAndBusiness/${identity.code}?ref=SUB_CATEGORY`);
}


postSubCategory(Category: any): Promise<any> {
  let identity = JSON.parse(localStorage.getItem('businessSelected') || '{}');

  let obj: any = { 
    name:Category.name,
    description: Category.description,
    catalogTypeRef: 'SUB_CATEGORY',
  }
  const params = JSON.stringify(obj);
  if(Category.id !== 0 && Category.id !== null && Category.id !== undefined && Category.id !== ''){
    //catalogs/update/{{id}}
    return this.connectionSvc.send('put', `catalogs/update/${Category.id}`, params);

  }else{
    return this.connectionSvc.send('post', `catalogs/saveCatalogToBusiness/${identity.code}`, params);
  }

}

/////////------------------------Classifications-----------------------------------////////////////////////

getdataClasifications(): Promise<any> {
  let identity = JSON.parse(localStorage.getItem('businessSelected') || '{}');
  return this.connectionSvc.send('get', `catalogs/byRefAndBusiness/${identity.code}?ref=CLASIFICATION`);
}


postClasifications(Category: any): Promise<any> {
  let identity = JSON.parse(localStorage.getItem('businessSelected') || '{}');

  let obj: any = { 
    name:Category.name,
    description: Category.description,
    catalogTypeRef: 'CLASIFICATION',
  }
  const params = JSON.stringify(obj);

  if(Category.id !== 0 && Category.id !== null && Category.id !== undefined && Category.id !== ''){
    //catalogs/update/{{id}}
    return this.connectionSvc.send('put', `catalogs/update/${Category.id}`, params);

  }else{
    return this.connectionSvc.send('post', `catalogs/saveCatalogToBusiness/${identity.code}`, params);
  }
}

/////////////Coupon////////////////////////

}
