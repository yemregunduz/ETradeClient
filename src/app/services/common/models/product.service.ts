import { Injectable } from '@angular/core';
import { AddProduct } from 'src/app/contracts/addProduct';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClientService:HttpClientService) { }

  add(product:AddProduct){
    this.httpClientService.post({
      controllerName:"products"
    },product)
      .subscribe(result=>{
        alert("başarılı!")
      })
  }
}
