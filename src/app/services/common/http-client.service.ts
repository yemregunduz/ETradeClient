import { Inject, Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(private httpClient: HttpClient, @Inject("baseUrl") private baseUrl:string) { }

  private createUrl(requestParameter:Partial<RequestParameter>){
    return `${requestParameter.baseUrl ? requestParameter.baseUrl : 
      this.baseUrl}/${requestParameter.controllerName}${requestParameter.action ? `/${requestParameter.action}` : ""}`;
  }
  get<T>(requestParameter:Partial<RequestParameter>,id?:string) :Observable<T>{
    let url = "";
    if(requestParameter.fullEndPoint)
      url = requestParameter.fullEndPoint
    else
      url = `${this.createUrl(requestParameter)}${id ? `/${id}` : ""}${requestParameter.queryString ? `?${requestParameter.queryString}`:""} `;
    
    return this.httpClient.get<T>(url, {headers:requestParameter.headers})
  }

  post<T>(requestParameter:Partial<RequestParameter>,body:Partial<T>) : Observable<T>{
    let url = "";
    if(requestParameter.fullEndPoint)
      url = requestParameter.fullEndPoint
    else
      url = `${this.createUrl(requestParameter)}
      ${requestParameter.queryString ? `?${requestParameter.queryString}`:""}`
    return this.httpClient.post<T>(url,body,{headers:requestParameter.headers})
  }

  put<T>(requestParameter:Partial<RequestParameter>,body:Partial<T>) : Observable<T>{
    let url = "";
    if(requestParameter.fullEndPoint)
      url = requestParameter.fullEndPoint
    else
      url = `${this.createUrl(requestParameter)}
      ${requestParameter.queryString ? `?${requestParameter.queryString}`:""}`
    return this.httpClient.put<T>(url,body,{headers:requestParameter.headers})
  }

  delete<T>(requestParameter:Partial<RequestParameter>,id:string):Observable<T>{
    let url = "";
    if(requestParameter.fullEndPoint)
      url = requestParameter.fullEndPoint
    else
      url = `${this.createUrl(requestParameter)}/${id}
      ${requestParameter.queryString ? `?${requestParameter.queryString}`:""} `
    
    return this.httpClient.delete<T>(url,{headers:requestParameter.headers})
  }
}

export class RequestParameter{
  controllerName:string;
  action?:string;
  headers?:HttpHeaders;
  baseUrl?:string;
  fullEndPoint?:string;
  queryString?:string
}