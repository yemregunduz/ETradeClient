import { AlertifyMessageType } from "src/app/enums/alertify/alertifyMessageType";
import { AlertifyPosition } from "src/app/enums/alertify/alertifyPosition";

export class AlertifyOption{
  messageType:AlertifyMessageType = AlertifyMessageType.Message;
  alertifyPosition:AlertifyPosition = AlertifyPosition.TopRight;
  delay:number = 2.5
  dismissOthers:boolean = false
}
