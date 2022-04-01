import { Injectable } from '@angular/core';
import { AlertifyPosition } from 'src/app/enums/alertifyPosition';
import { MessageType } from 'src/app/enums/messageType';
declare var alertify:any
@Injectable({
  providedIn: 'root'
})

export class AlertifyService {

  constructor() { }

  message(message:string ,alertifyOptions:Partial<AlertifyOptions>){
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
export class AlertifyOptions{
  messageType:MessageType = MessageType.Message;
  alertifyPosition:AlertifyPosition = AlertifyPosition.TopRight;
  delay:number = 2.5
  dismissOthers:boolean = false
}




