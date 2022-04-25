import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent } from 'src/app/base/base.component';
import { SpinnerType } from 'src/app/enums/spinner/spinnerType';
import { ProductAddDialogComponent } from './product-add-dialog/product-add-dialog.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent extends BaseComponent implements OnInit {

  constructor(spinner:NgxSpinnerService,private dialog:MatDialog) {
    super(spinner)
   }

  ngOnInit(): void {
    this.showSpinner(SpinnerType.JellyBox)
  }
  openProductAddDialog(){
    const productAddDialogRef = this.dialog.open(ProductAddDialogComponent,{
    });
  }
}
