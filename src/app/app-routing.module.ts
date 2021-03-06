import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './admin/components/dashboard/dashboard.component';
import { LayoutComponent } from './admin/layout/layout.component';
import { HomeComponent } from './ui/components/home/home.component';
import { UiLayoutComponent } from './ui/ui-layout/ui-layout.component';

const routes: Routes = [
  {path:"admin",component:LayoutComponent,children:[
    {path:"",component:DashboardComponent},
    {path:"customers",loadChildren: () => import("./admin/components/customer/customer.module")
    .then(module=>module.CustomerModule)},
    {path:"orders",loadChildren:()=> import("./admin/components/order/order.module")
    .then(module=>module.OrderModule)},
    {path:"products",loadChildren:()=> import("./admin/components/product/product.module")
    .then(module=>module.ProductModule)},
    
  ]},
  {path:"",component:UiLayoutComponent,children:[
    {path:"", loadChildren: () => import("./ui/components/home/home.module")
    .then(module=>module.HomeModule)},
    {path:"shopping-cart", loadChildren: ()=> import("./ui/components/shopping-cart/shopping-cart.module")
    .then(module=>module.ShoppingCartModule)},
    {path:"products", loadChildren: ()=> import("./ui/components/product/product.module")
    .then(module=>module.ProductModule)},
    {path:"register",loadChildren:()=>import("./ui/components/register/register.module")
    .then(module=>module.RegisterModule)}
  ]},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
