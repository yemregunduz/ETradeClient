import { HttpErrorResponse } from '@angular/common/http';
import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2 } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { DeleteDialogComponent } from 'src/app/dialogs/delete-dialog/delete-dialog.component';
import { AlertifyMessageType } from 'src/app/enums/alertify/alertifyMessageType';
import { AlertifyPosition } from 'src/app/enums/alertify/alertifyPosition';
import { DeleteState } from 'src/app/enums/dialog/deleteState';
import { SpinnerType } from 'src/app/enums/spinner/spinnerType';
import { AlertifyService } from 'src/app/services/admin/alertify.service';
import { HttpClientService } from 'src/app/services/common/http-client.service';
import { ProductService } from 'src/app/services/common/models/product.service';

declare var $:any
@Directive({
  selector: '[appDelete]'
})
export class DeleteDirective {

  constructor(private element:ElementRef, private _renderer:Renderer2,private httpClientService:HttpClientService,
    private ngxSpinnerService:NgxSpinnerService,public dialog:MatDialog,private alertifyService:AlertifyService ) { 

    const button = this.createButton();
    const icon = this.createIcon();
    const wrapperSpan = this.createWrapperSpan(); 
    const rippleSpan = this.createRippleSpan();
    const focusSpan = this.createFocusSpan();
    _renderer.appendChild(wrapperSpan,icon)
    _renderer.appendChild(button,wrapperSpan)
    _renderer.appendChild(button,rippleSpan)
    _renderer.appendChild(button,focusSpan)
    _renderer.appendChild(element.nativeElement,button)
  }


  createButton(){
    const button= this._renderer.createElement("button");
    button.classList.add('mat-focus-indicator','mat-mini-fab','mat-button-base','mat-warn')
    return button;
  }
  createWrapperSpan(){
    const wrapperSpan = this._renderer.createElement("span")
    this._renderer.addClass(wrapperSpan,"mat-button-wrapper");
    return wrapperSpan;
  }
  createIcon(){
    const icon:HTMLElement = this._renderer.createElement("mat-icon")
    icon.classList.add('mat-icon','notranslate','material-icons','mat-icon-no-color')
    this.setAttributes(icon,{"data-mat-icon-type":"font","aria-hidden":"true","role":"img"})
    icon.innerHTML="delete"
    return icon;
  }
  createRippleSpan(){
    const rippleSpan = this._renderer.createElement("span");
    rippleSpan.classList.add('mat-ripple','mat-button-ripple','mat-button-ripple-round')
    this.setAttributes(rippleSpan,{"ng-reflect-trigger":"[object HTMLButtonElement]","ng-reflect-disabled":"false","ng-reflect-centered":"false"})
    return rippleSpan;
  }
  createFocusSpan(){
    const focusSpan = this._renderer.createElement("span")
    this._renderer.addClass(focusSpan,"mat-button-focus-overlay")
    return focusSpan;
  }
  setAttributes(el, attrs) {
    for(var key in attrs) {
      el.setAttribute(key, attrs[key]);
    }
  }
  @Input() id :string;
  @Input() controllerName:string
  @Output() callBack:EventEmitter<any> = new EventEmitter(); 
  @HostListener("click") async onClick(){
    this.openDeleteDialog(async ()=>{
      this.ngxSpinnerService.show(SpinnerType.ClimbingDot)
      const td:HTMLTableCellElement = this.element.nativeElement;
      this.httpClientService.delete({
        controllerName:this.controllerName
      },this.id).subscribe(data=>{
        $(td.parentElement).animate({
          opacity:0,
          left:"+=50",
          height:"toogle"
        },700,()=>{
          this.callBack.emit();
          this.alertifyService.message("Kayıt başarıyla silindi.",{
            dismissOthers:true,
            messageType:AlertifyMessageType.Success,
            alertifyPosition:AlertifyPosition.TopRight
          })
        })
      },(errorResponse:HttpErrorResponse)=>{
        this.ngxSpinnerService.hide(SpinnerType.ClimbingDot)
        this.alertifyService.message("Kayıt silinirken beklenmeyen bir hata oluştu.",{
          dismissOthers:true,
          messageType:AlertifyMessageType.Error,
          alertifyPosition:AlertifyPosition.TopRight
        })
      });
    })
    
  }
  openDeleteDialog(afterClosed:any){
    const dialogRef = this.dialog.open(DeleteDialogComponent,{
      width:'25%',
      data:DeleteState.Yes,
    })
    dialogRef.afterClosed().subscribe(result=>{
      if(result == DeleteState.Yes)
        afterClosed();
    })
  }

}
