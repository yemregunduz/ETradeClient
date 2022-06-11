import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddProduct } from 'src/app/contracts/addProduct';
import { ListProduct } from 'src/app/contracts/listProduct';
import { PageRequest } from 'src/app/contracts/pageRequest';
import { PaginationResponseModel } from 'src/app/contracts/responseModels/paginationResponseModel';
import { SingleResponseModel } from 'src/app/contracts/responseModels/singleResponseModel';
import { HttpClientService } from '../http-client.service';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClientService:HttpClientService) { }

  add(product: AddProduct, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void) {
    this.httpClientService.post({
      controllerName: "products",
      action:"add"
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
  async getProductsWithPagination(pageRequest:PageRequest,successCallBack?:()=>void,errorCallBack?:(errorMessage:string) => void) : Promise<SingleResponseModel<PaginationResponseModel<ListProduct>>> {
    const promiseData:Promise<SingleResponseModel<PaginationResponseModel<ListProduct>>>= this.httpClientService.get<SingleResponseModel<PaginationResponseModel<ListProduct>>>({
      controllerName:"products",
      queryString:`RequestParameter.page=${pageRequest.page}&RequestParameter.pageSize=${pageRequest.pageSize}`,
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
