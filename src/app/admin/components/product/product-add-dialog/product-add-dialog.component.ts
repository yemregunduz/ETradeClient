import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent } from 'src/app/base/base.component';
import { AlertifyMessageType } from 'src/app/enums/alertify/alertifyMessageType';
import { AlertifyPosition } from 'src/app/enums/alertify/alertifyPosition';
import { SpinnerType } from 'src/app/enums/spinner/spinnerType';
import { AlertifyService } from 'src/app/services/admin/alertify.service';
import { ProductService } from 'src/app/services/common/models/product.service';

@Component({
  selector: 'app-product-add-dialog',
  templateUrl: './product-add-dialog.component.html',
  styleUrls: ['./product-add-dialog.component.css']
})
export class ProductAddDialogComponent extends BaseComponent implements OnInit {
  @Output() onAdded = new EventEmitter()
  constructor(spinnerService:NgxSpinnerService,private formBuilder:FormBuilder,private productService:ProductService,private alertifyService:AlertifyService) {
    super(spinnerService)
   }
  productAddForm:FormGroup
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
    if(this.productAddForm.valid){
      this.showSpinner(SpinnerType.ClimbingDot)
      var productModel = Object.assign({},this.productAddForm.value)
      this.productService.add(productModel).subscribe(response=>{
        this.hideSpinner(SpinnerType.ClimbingDot);
        this.alertifyService.message("Ürün eklendi.",{
          dismissOthers:true,
          messageType:AlertifyMessageType.Success,
          alertifyPosition:AlertifyPosition.TopRight
        });
        this.onAdded.emit();
      })
        
    }
    
  }
}
