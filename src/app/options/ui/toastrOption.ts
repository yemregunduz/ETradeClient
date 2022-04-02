import { ToastrMessageType } from "src/app/enums/customToastr/toastrMessageType";
import { ToastrPosition } from "src/app/enums/customToastr/toastrPosition";

export class ToastrOption{
    toastrMessageType:ToastrMessageType = ToastrMessageType.Info
    toastrPosition:ToastrPosition = ToastrPosition.TopRight
}