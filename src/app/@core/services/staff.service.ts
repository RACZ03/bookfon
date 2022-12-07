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
              console.log(urlImage);
              resolve(urlImage);
            });
          })
        )
        .subscribe();
    });
  }

  async getScheduleStaff(): Promise<any> {
    const data = await this.connectionSvc.send(
      'get',
      'v1/purchasedService/business/' + this.dataIdentity?.businessList[0].code
    );
    const scheduled = this.processDataSchedule(data.data);
    return scheduled;
  }

  processDataSchedule(data: any) {
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
        allDay: true,
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

  createStaff(params: object): Promise<any> {
    return this.connectionSvc.send(
      'post',
      'v1/business/' +
        this.dataIdentity?.businessList[0].code +
        '/users/saveStaff?roleName=ROLE_STAFF',
      params
    );
  }
}