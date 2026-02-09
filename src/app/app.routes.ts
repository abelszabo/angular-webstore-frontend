import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'main-page',
    pathMatch: 'full'
  },
  {
    path: 'main-page',
    loadComponent: () =>
      import('./features/main-page/main-page.component')
        .then(m => m.MainPageComponent)
  },
  {
    path: 'products',
    loadComponent: () =>
      import('./features/product-list/product-list.component')
        .then(m => m.ProductListComponent)
  },
  {
    path: 'products/:id',
    loadComponent: () =>
      import('./features/product-details/product-details.component')
        .then(m => m.ProductDetailsComponent)
  }
];
