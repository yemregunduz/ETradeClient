import { Injectable } from '@angular/core';
import { AlertifyOption } from 'src/app/options/admin/alertifyOption';
declare var alertify:any
@Injectable({
  providedIn: 'root'
})

export class AlertifyService {

  constructor() { }

  message(message:string ,alertifyOptions:Partial<AlertifyOption>){
    alertify.set('notifier','position',alertifyOptions.alertifyPosition)
    alertify.set('notifier','delay',alertifyOptions.delay)
    const msg = alertify[alertifyOptions.messageType](message);
    if(alertifyOptions.dismissOthers)
      msg.dismissOthers()
  }
  dismissAll(){
    alertify.dismissAll();
  }

}




