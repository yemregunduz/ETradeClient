import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent } from 'src/app/base/base.component';
import { ListProduct } from 'src/app/contracts/listProduct';
import { ListResponseModel } from 'src/app/contracts/listResponseModel';
import { PageRequest } from 'src/app/contracts/pageRequest';
import { AlertifyMessageType } from 'src/app/enums/alertify/alertifyMessageType';
import { AlertifyPosition } from 'src/app/enums/alertify/alertifyPosition';
import { SpinnerType } from 'src/app/enums/spinner/spinnerType';
import { AlertifyService } from 'src/app/services/admin/alertify.service';
import { ProductService } from 'src/app/services/common/models/product.service';
import { ProductAddDialogComponent } from './product-add-dialog/product-add-dialog.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent extends BaseComponent implements OnInit {

  constructor(spinner:NgxSpinnerService,private dialog:MatDialog,private productService:ProductService,private alertifyService:AlertifyService) {
    super(spinner)
   }
   displayedColumns: string[] = ['name', 'stock', 'unitPrice', 'createdDate','updatedDate','delete'];
   dataSource :MatTableDataSource<ListProduct>= null
   @ViewChild(MatPaginator) matPaginator:MatPaginator
  async ngOnInit() {
    this.showSpinner(SpinnerType.JellyBox)
    await this.getProducts();
  }
  openProductAddDialog(){
    const productAddDialogRef = this.dialog.open(ProductAddDialogComponent);
    productAddDialogRef.componentInstance.onAdded.subscribe(response=>{
      productAddDialogRef.close();
      this.pageChange();
    })
  }
  async getProducts(){
    this.showSpinner(SpinnerType.ClimbingDot)
    let pageRequest:PageRequest = new PageRequest();
    pageRequest.page = this.matPaginator? this.matPaginator.pageIndex : 0;
    pageRequest.pageSize = this.matPaginator? this.matPaginator.pageSize : 10;
    const products = await this.productService.getProductsWithPagination(pageRequest,()=>this.hideSpinner(SpinnerType.ClimbingDot),errorMessage=> this.alertifyService.message(errorMessage,{
      dismissOthers:true,
      messageType:AlertifyMessageType.Error,
      alertifyPosition:AlertifyPosition.TopRight
    }))
    this.dataSource  = new MatTableDataSource<ListProduct>(products.items)
    this.matPaginator.length = products.count
  }
  async pageChange(){
    await this.getProducts()
  }
  async getProductsAfterDelete(){
    console.log(this.matPaginator.length,this.matPaginator.pageSize)
    if(this.matPaginator.length%this.matPaginator.pageSize==1){
      this.matPaginator.pageIndex-=1
    }
    await this.getProducts()
  }
}
