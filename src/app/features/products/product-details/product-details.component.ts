import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import {catchError, delay, map, startWith, switchMap, tap, timeout} from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product.model';
import {ProductItemModel} from '../models/product-item.model';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})

export class ProductDetailsComponent {

  // // product = signal<Product | null>(null);
  // product!: Signal<Product | null>; // ... this.product = toSignal(...)
  //
  // constructor(private route: ActivatedRoute,
  //             private productService: ProductService) {
  //   const id = Number(this.route.snapshot.paramMap.get('id'));
  //
  //   // this.productService.getProductById(id).subscribe(data => {
  //   //   // const p: Product = {
  //   //   //   id: 1,
  //   //   //   name: 'Laptop',
  //   //   //   description: 'Gaming laptop',
  //   //   //   price: 450000,
  //   //   //   categoryName: 'Electronics'
  //   //   // };
  //   //   this.product.set(data);
  //   // });
  //
  //   this.product = toSignal(
  //     this.productService.getProductById(id),
  //     { initialValue: null }
  //   );
  // }

  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);

  //loading = signal(true);

  //product = toSignal(
  state = toSignal(
    this.route.paramMap.pipe(
      map(params => Number(params.get('id'))),
      //switchMap(id => of(createEmptyProduct()))
      //switchMap(id => createTheEmptyProduct(id))
      //switchMap(id => this.productService.getProductById(id))
      switchMap(id => this.productService.getProductItemById(id)
        .pipe(
          delay(1000),
          timeout(3000),
          //tap(() => this.loading.set(false)),
          map(product => ({ status: 'success', data: product }) as ProductState),
          startWith({ status: 'loading' } as ProductState),
          //catchError(() => of({ status: 'error' } as ProductState))
          // catchError(() => {
          //   this.loading.set(false);
          //   return of(null);
          // })
          catchError(err => {
            if (err.name === 'TimeoutError') {
              return of({ status: 'timeout' } as ProductState);
            }
            return of({ status: 'error' } as ProductState);
          })
        )
      )
    ),
    //{ initialValue: null }
    { initialValue: { status: 'loading' } }
  );
}

export type ProductState =
  | { status: 'loading' }
  | { status: 'success'; data: ProductItemModel }
  | { status: 'error' }
  | { status: 'timeout' };

export function createEmptyProduct(): Product {
  return {
    id: 0,
    name: '',
    description: '',
    price: 0,
    categoryName: ''
  };
}

export function createTheEmptyProduct(id : number): Observable<Product> {
  const p: Product = {
    id: id,
    name: '-',
    description: '-',
    price: 0,
    categoryName: '-'
  };

  //const product$: Observable<Product> = of(p);
  //return product$;

  return of(p);
}











