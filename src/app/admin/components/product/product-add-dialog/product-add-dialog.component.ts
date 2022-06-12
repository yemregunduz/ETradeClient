import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { delay } from 'rxjs/operators';
import { BaseComponent } from 'src/app/base/base.component';
import { AlertifyMessageType } from 'src/app/enums/alertify/alertifyMessageType';
import { AlertifyPosition } from 'src/app/enums/alertify/alertifyPosition';
import { SpinnerType } from 'src/app/enums/spinner/spinnerType';
import { FileUploadOption } from 'src/app/options/common/fileUploadOption';
import { AlertifyService } from 'src/app/services/admin/alertify.service';
import { FormValidatorService } from 'src/app/services/admin/formValidator/form-validator.service';
import { ProductService } from 'src/app/services/common/models/product.service';

@Component({
  selector: 'app-product-add-dialog',
  templateUrl: './product-add-dialog.component.html',
  styleUrls: ['./product-add-dialog.component.css']
})
export class ProductAddDialogComponent extends BaseComponent implements OnInit {
  @Output() onAdded = new EventEmitter();
  @Output() fileUploadOption:Partial<FileUploadOption>={
    action:"upload",
    controllerName:"products",
    explanation:"Resimleri sürükleyin veya seçin...",
    isAdminPage :true,
    accept:".png, .jpg, .jpeg"
  }
  constructor(spinnerService:NgxSpinnerService,private formBuilder:UntypedFormBuilder,private productService:ProductService,private alertifyService:AlertifyService,
    private formValidatorService:FormValidatorService) {
    super(spinnerService)
   }
  productAddForm:UntypedFormGroup
  ngOnInit(): void {
    this.createProductForm()
  }

  createProductForm(){
    this.productAddForm = this.formBuilder.group({
      name:["",[Validators.required,Validators.minLength(2),Validators.maxLength(150)]],
      stock:["",[Validators.required,Validators.min(0)]],
      unitPrice:["",[Validators.required,Validators.min(0)]]
    })
  }
  addProduct(){
    if(this.formValidatorService.formValidator(this.productAddForm)){
      this.showSpinner(SpinnerType.ClimbingDot)
      var productModel = Object.assign({},this.productAddForm.value)
      this.productService.add(productModel,()=>{
        this.hideSpinner(SpinnerType.ClimbingDot);
        this.alertifyService.message("Ürün eklendi.",{
          dismissOthers:true,
          messageType:AlertifyMessageType.Success,
          alertifyPosition:AlertifyPosition.TopRight
        });
        this.onAdded.emit();
      }, errorMessage => {
        this.alertifyService.message(errorMessage,
          {
            dismissOthers: true,
            messageType: AlertifyMessageType.Error,
            alertifyPosition: AlertifyPosition.TopRight
          });
      });  
    }
  }
}
