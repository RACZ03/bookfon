import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { environment } from 'src/environments/environment';
import { StaffI } from '../Interfaces/Staff';
import { ConnectionService } from '../utils/connection.service';
import { finalize } from 'rxjs';
import * as moment from 'moment';
const URL = environment.APIUrl;

@Injectable({
  providedIn: 'root',
})
export class StaffService {
  private token: any = null;
  private dataIdentity: any = null;

  constructor(
    private connectionSvc: ConnectionService,
    private storage: AngularFireStorage
  ) {
    this.token = JSON.parse(localStorage.getItem('businessSelected') || '{}');
    this.dataIdentity = JSON.parse(localStorage.getItem('identity') || '{}');
  }

  getAllStaff(): Promise<StaffI> {
    return this.connectionSvc.send(
      'get',
      'users/getByBusiness/' +
        this.dataIdentity?.businessList[0].code +
        '/role/ROLE_STAFF'
    );
  }

  getCode(): string {
    let business = localStorage.getItem('businessSelected') || '';
    return JSON.parse(business).code;
  }

  getStaffOrder(): Promise<StaffI> {
    let code = this.getCode();
    return this.connectionSvc.send('get', `public/v1/${code}/allStaffByBusiness`);
  }

  getStaffByBusiness(): Promise<StaffI> {
    let code = this.getCode();
    return this.connectionSvc.send('get', `users/getStaffByBusiness/${code}`);
  }

  enableDisableStaff(id_staff:number):Promise<any>{
    return this.connectionSvc.send(
      'post',
      'users/disableByBusiness/'+this.dataIdentity?.businessList[0].code+'?idUser='+id_staff
    );
  }

  deleteStaff(id: number): Promise<any> {
    return this.connectionSvc.send('delete', `users/${ id }`);
  }

  uploadImage(file: any): Promise<any> {
    let current = new Date().getTime();
    let filePath = '';

    filePath = `coach/${file.name}-${current}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

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

  async getScheduleStaff(id: number): Promise<any> {
    let code = this.getCode();
    const data = await this.connectionSvc.send(
      'get',
      // 'v1/purchasedService/business/' + this.dataIdentity?.businessList[0].code,
      `v1/purchasedService/${ code }/staff/${ id }`,
    );
    const scheduled = this.processDataSchedule(data?.data);
    return scheduled;
  }

  processDataSchedule(data: any) {
    if(data?.length<=0 || data ==undefined || data==null){return[]}
    // console.log(data)
    let events = [];

    let { services: dataService, workshops: dataWorkshop } = data;

    if (dataService !== undefined && dataService !== null && dataService.length > 0 ) {
      for (let i = 0; i < dataService.length; i++) {
        let { purchaseServiceDetails } = dataService[i];
        events.push({
          id: purchaseServiceDetails?.id,
          title: purchaseServiceDetails?.service?.name,
          start: purchaseServiceDetails?.date,
          end: purchaseServiceDetails?.date,
          time: {
            startTime: purchaseServiceDetails?.startTime,
            endTime: purchaseServiceDetails?.endTime,
          },
          service: purchaseServiceDetails?.service,
          service_name: purchaseServiceDetails?.service?.name,
          service_description: purchaseServiceDetails?.service?.description,
          allDay: false,
          idStaff:purchaseServiceDetails?.staff?.id,
          staff: purchaseServiceDetails?.staff,
          // url: data[index]['staff'].image? data[index]['staff'].image : '',
          customer: purchaseServiceDetails?.customer,
          backgroundColor: '#FF946F',
          borderColor: '#FF946F',
          textColor: '#000',
          description: purchaseServiceDetails?.service?.description,
          isService: true,
        });

        
      }
    }
    if ( dataWorkshop !== undefined && dataWorkshop !== null && dataWorkshop.length > 0 ) {
      for (let j = 0; j < dataWorkshop.length; j++) {
        let { purchaseWorkshopDetails } = dataWorkshop[j];
        events.push({
          id: purchaseWorkshopDetails?.id,
          title: purchaseWorkshopDetails?.workshop?.name,
          start: (purchaseWorkshopDetails?.workshopSession !== null ) ? purchaseWorkshopDetails?.workshopSession?.date : purchaseWorkshopDetails?.workshop?.endDate,
          end: (purchaseWorkshopDetails?.workshopSession !== null ) ? purchaseWorkshopDetails?.workshopSession?.date : purchaseWorkshopDetails?.workshop?.endDate,
          time: {
            startTime: (purchaseWorkshopDetails?.workshopSession !== null ) ? 
                        purchaseWorkshopDetails?.workshopSession?.startTime : 
                        purchaseWorkshopDetails?.workshop?.schedule[0].startTime,
            endTime: (purchaseWorkshopDetails?.workshopSession !== null ) ?
                      purchaseWorkshopDetails?.workshopSession?.endTime :
                      purchaseWorkshopDetails?.workshop?.schedule[0].endTime,
          },
          workshop: purchaseWorkshopDetails?.workshop,
          workshop_name: purchaseWorkshopDetails?.workshop?.name,
          workshop_description: purchaseWorkshopDetails?.workshop?.description,
          allDay: false,
          idStaff:purchaseWorkshopDetails?.staff?.id,
          staff: purchaseWorkshopDetails?.staff,
          // url: data[index]['staff'].image? data[index]['staff'].image : '',
          customer: purchaseWorkshopDetails?.customer,
          backgroundColor: '#FF946F',
          borderColor: '#FF946F',
          textColor: '#000',
          description: purchaseWorkshopDetails?.workshop?.description,
          isService: false,
        });
      }
    }
    return events;
  }

  convertDate(date: any) {
    return moment(date).format('YYYY-MM-DD');
  }

  createStaff(params: object): Promise<any> {
    return this.connectionSvc.send(
      'post',
      'v1/business/' +
        this.dataIdentity?.businessList[0].code +
        '/users/saveStaff?roleName=ROLE_STAFF',
      params
    );
  }

  updateStaff(params: any){
    return this.connectionSvc.send('put', `users/update/${ params.id }`, params);
  }  

//guardar servicio a staff
  saveServiceToStaff(staffService: any, band: boolean = false): Promise<any> {
    const params = JSON.stringify(staffService);
    if ( !band ) {
      return this.connectionSvc.send('post','staffServices/save' , params);
    } else {
      return this.connectionSvc.send('put','staffServices/update' , params);
    }
  }

  // listar servicios del staff /staffServices/{{business}}/byStaff/7
  getServicesByStaff(id: number): Promise<any> {
    // console.log(id);
    let identity = JSON.parse(localStorage.getItem('businessSelected') || '{}');
    return this.connectionSvc.send('get','staffServices/' + identity.code +'/byStaffDashboard/' + id
    );
  }

  // api/user/changeOrderStaff

  changeOrderStaff(params: any[]=[]): Promise<any> {
    return this.connectionSvc.send('put','users/changeOrderStaff', params);
  }
}
