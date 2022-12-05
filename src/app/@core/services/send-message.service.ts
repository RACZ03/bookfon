import { Injectable } from '@angular/core';
import { ConnectionService } from '../utils/connection.service';

@Injectable({
  providedIn: 'root'
})
export class SendMessageService {

  constructor(
    private connectionSvc: ConnectionService,
  ) { }

  sms(phone: string, message: string): Promise<any> {
    return this.connectionSvc.send('pos','users/sendPersonalizedSMS', { phone, message });
  }
}
