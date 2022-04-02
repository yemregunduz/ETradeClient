import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ToastrOption } from 'src/app/options/ui/toastrOption';


@Injectable({
  providedIn: 'root'
})
export class CustomToastrService {

  constructor(private toastrService:ToastrService) { }
  message(message:string,title:string,toastrOptions: Partial<ToastrOption>){
    this.toastrService[toastrOptions.toastrMessageType](message,title,{
      positionClass: toastrOptions.toastrPosition,
    });
  }
}


