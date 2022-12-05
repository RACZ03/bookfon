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
    if(Category.id !== 0 && Category.id !== null){
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
  
  return this.connectionSvc.send('post', `catalogs/saveCatalogToBusiness/${identity.code}`, params);
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
  
  return this.connectionSvc.send('post', `catalogs/saveCatalogToBusiness/${identity.code}`, params);
}

/////////////Coupon////////////////////////

}
