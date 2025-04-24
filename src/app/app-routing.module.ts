import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Компоненты
import { LoginComponent } from './login/login.component';
import { ProductListComponent } from './product-list/product-list.component';
import { OrderFormComponent } from './order-form/order-form.component';
import { ProductCreateComponent } from './product-create/product-create.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'products', component: ProductListComponent },
  { path: 'products/create', component: ProductCreateComponent},
  { path: 'orders/create', component: OrderFormComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
