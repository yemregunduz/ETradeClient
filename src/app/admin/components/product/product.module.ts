import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product.component';
import { RouterModule } from '@angular/router';
import { ProductAddDialogComponent } from './product-add-dialog/product-add-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon'
import {MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { DeleteDirective } from 'src/app/directives/admin/delete.directive';
import { DeleteDialogComponent } from '../../../dialogs/delete-dialog/delete-dialog.component';
@NgModule({
  declarations: [
    ProductComponent,
    ProductAddDialogComponent,
    DeleteDirective,
    DeleteDialogComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatGridListModule, MatIconModule, MatSelectModule,MatTableModule,
    MatDialogModule,MatInputModule,MatButtonModule,MatFormFieldModule,MatPaginatorModule,
    RouterModule.forChild([
      {path:"",component:ProductComponent}
    ]),
    
  ]
})
export class ProductModule { }
