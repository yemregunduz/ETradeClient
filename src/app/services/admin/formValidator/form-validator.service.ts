import { Injectable } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { AlertifyMessageType } from 'src/app/enums/alertify/alertifyMessageType';
import { AlertifyPosition } from 'src/app/enums/alertify/alertifyPosition';
import { AlertifyService } from '../alertify.service';

@Injectable({
  providedIn: 'root'
})
export class FormValidatorService {

  constructor(private alertifyService:AlertifyService) { }
  formValidator(formGroup:UntypedFormGroup):boolean{
    if(formGroup.valid){
      return true;
    }
    else{
      formGroup.markAllAsTouched()
      this.alertifyService.message("Lütfen gerekli bilgileri eksiksiz giriniz!",{
        dismissOthers:true,
        messageType:AlertifyMessageType.Error,
        alertifyPosition:AlertifyPosition.TopRight
      })
      return false;
    }
  }
}
