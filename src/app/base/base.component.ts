import { NgxSpinnerService } from "ngx-spinner";
import { SpinnerType } from "../enums/spinner/spinnerType";

export class BaseComponent {

  constructor(private spinner:NgxSpinnerService) {}
  showSpinner(spinnerType:SpinnerType){
    this.spinner.show(spinnerType)
    setTimeout(()=>this.hideSpinner(spinnerType),1000)
  }
  hideSpinner(spinnerType:SpinnerType){
    this.spinner.hide(spinnerType)
  }
}
