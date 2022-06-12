import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ProductModule } from './product/product.module';
import { ShoppingCartModule } from './shopping-cart/shopping-cart.module';
import { HomeModule } from './home/home.module';
import { RegisterModule } from './register/register.module';



@NgModule({
  declarations: [
    ShoppingCartComponent
  ],
  imports: [
    CommonModule,
    ProductModule,
    ShoppingCartModule,
    HomeModule,
    RegisterModule
  ]
})
export class ComponentsModule { }
