import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginModel } from 'src/app/contracts/auth/loginModel';
import { SingleResponseModel } from 'src/app/contracts/responseModels/singleResponseModel';
import { Token } from 'src/app/contracts/token';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient:HttpClientService) { }

  async login (loginModel:LoginModel, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void){

    this.httpClient.post<SingleResponseModel<Token>>({
      controllerName:"auths",
      action:"login",
    },loginModel).subscribe(result => {
      console.log(result)

      successCallBack();
      console.log(result.data.accessToken);
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
  async register(){

  }
  async passwordChange(){

  }
}
