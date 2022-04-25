import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from './components/components.module';
import { UiLayoutModule } from './ui-layout/ui-layout.module';




@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ComponentsModule,
    UiLayoutModule
  ],
  exports:[
    UiLayoutModule
  ]
})
export class UiModule { }
