import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiHeaderComponent } from './ui-header/ui-header.component';
import { UiFooterComponent } from './ui-footer/ui-footer.component';
import { UiNavbarComponent } from './ui-navbar/ui-navbar.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    UiHeaderComponent,
    UiFooterComponent,
    UiNavbarComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports:[
    UiHeaderComponent,
    UiFooterComponent,
    UiNavbarComponent
  ]
})
export class ComponentsModule { }
