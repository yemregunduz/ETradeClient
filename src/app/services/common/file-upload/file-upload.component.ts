import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FileSystemDirectoryEntry, FileSystemFileEntry, NgxFileDropEntry } from 'ngx-file-drop';
import { AlertifyMessageType } from 'src/app/enums/alertify/alertifyMessageType';
import { AlertifyPosition } from 'src/app/enums/alertify/alertifyPosition';
import { ToastrMessageType } from 'src/app/enums/customToastr/toastrMessageType';
import { ToastrPosition } from 'src/app/enums/customToastr/toastrPosition';
import { AlertifyService } from '../../admin/alertify.service';
import { CustomToastrService } from '../../ui/custom-toastr.service';
import { HttpClientService } from '../http-client.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent  {

  constructor(private httpClientService:HttpClientService,private alertifyService:AlertifyService,private customToastrService:CustomToastrService) { }

  public files: NgxFileDropEntry[]
  @Input() options:Partial<FileUploadOptions>
  public selectedFiles(files: NgxFileDropEntry[]) {
    this.files = files;
    const fileData:FormData = new FormData();
    for (const selectedFiles of files) {
      if(selectedFiles.fileEntry.isFile){
        (selectedFiles.fileEntry as FileSystemFileEntry).file((_file:File)=>{
          fileData.append(_file.name,_file,_file.name)
        });
      }
    }
    
    this.httpClientService.post({
      controllerName:this.options.controllerName,
      action:this.options.action,
      queryString:this.options.queryString,
      headers: new HttpHeaders({"responseType":"blob"})
    },fileData).subscribe(data=>{
      const successMessage:string = "Dosyalar başarıyla yüklendi."
      if(this.options.isAdminPage){
        this.alertifyService.message(successMessage,{
          dismissOthers:true,
          messageType:AlertifyMessageType.Success,
          alertifyPosition:AlertifyPosition.TopRight
        })
      }
      else{
        this.customToastrService.message(successMessage,"Başarılı!",{
          toastrMessageType:ToastrMessageType.Success,
          toastrPosition:ToastrPosition.TopRight
        })
      }

    },(errorResponse:HttpErrorResponse)=>{
      const errorMessage:string = "Dosyalar yüklenirken beklemeyen bir hata oluştu."
      if(this.options.isAdminPage){
        this.alertifyService.message(errorMessage,{
          dismissOthers:true,
          messageType:AlertifyMessageType.Error,
          alertifyPosition:AlertifyPosition.TopRight
        })
      }
      else{
        this.customToastrService.message(errorMessage,"Hata!",{
          toastrMessageType:ToastrMessageType.Error,
          toastrPosition:ToastrPosition.TopRight
        })
      }
    })
  }
}

export class FileUploadOptions{
  controllerName?:string;
  action?:string;
  queryString?:string;
  explanation?:string;
  accept?:string;
  isAdminPage:boolean=false
}
