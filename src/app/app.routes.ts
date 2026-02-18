import { Routes } from '@angular/router';
import {MainPageComponent} from './features/main-page/main-page.component';
import {RegisterUserComponent} from './features/user-management/register-user/register-user.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'main-page',
    pathMatch: 'full'
  },
  {
    path: 'main-page',
    // loadComponent: () =>
    //   import('./features/main-page/main-page.component')
    //     .then(m => m.MainPageComponent)
    component: MainPageComponent
  },
  {
    path: 'register-user',
    loadComponent: () =>
      import('./features/user-management/register-user/register-user.component')
        .then(m => m.RegisterUserComponent)
  },
  {
    path: 'products',
    loadComponent: () =>
      import('./features/products/product-list/product-list.component')
        .then(m => m.ProductListComponent)
    // loadChildren: () =>
    //   import('./features/products/products.routes')
    //     .then(m => m.PRODUCTS_ROUTES)
  },
  {
    path: 'products/:id',
    loadComponent: () =>
      import('./features/products/product-details/product-details.component')
        .then(m => m.ProductDetailsComponent)
  }
];
