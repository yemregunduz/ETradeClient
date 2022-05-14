import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddProduct } from 'src/app/contracts/addProduct';
import { ListProduct } from 'src/app/contracts/listProduct';
import { ListResponseModel } from 'src/app/contracts/listResponseModel';
import { PageRequest } from 'src/app/contracts/pageRequest';
import { HttpClientService } from '../http-client.service';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClientService:HttpClientService) { }

  add(product: AddProduct, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void) {
    this.httpClientService.post({
      controllerName: "products"
    }, product)
      .subscribe(result => {
        successCallBack();
      }, (errorResponse: HttpErrorResponse) => {
        const _error: Array<{ key: string, value: Array<string> }> = errorResponse.error;
        let message = "";
        _error.forEach((v, _index) => {
          v.value.forEach((_v, _index) => {
            message += `${_v}<br>`;
          });
        });
        errorCallBack(message);
      });
    }
  async getProductsWithPagination(pageRequest:PageRequest,successCallBack?:()=>void,errorCallBack?:(errorMessage:string) => void) : Promise<ListResponseModel<ListProduct>> {
    const promiseData:Promise<ListResponseModel<ListProduct>> = this.httpClientService.get<ListResponseModel<ListProduct>>({
      controllerName:"products",
      queryString:`page=${pageRequest.page}&pageSize=${pageRequest.pageSize}`
    },).toPromise();
    promiseData.then(d=>successCallBack())
      .catch((errorResponse:HttpErrorResponse)=> errorCallBack(errorResponse.message))
 
    return await promiseData;
  }
  async delete(id:string){
    const promiseData = this.httpClientService.delete<any>({
      controllerName:"products"
    },id).toPromise()
    await promiseData;
  }
}
