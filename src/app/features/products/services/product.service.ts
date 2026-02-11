import {Injectable, Signal, signal, WritableSignal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Product} from '../models/product.model';
import {catchError, map, tap} from 'rxjs/operators';
import {ProductItemModel} from '../models/product-item.model';
import {EMPTY, finalize, Observable, of} from 'rxjs';
import {ProductState} from '../product-details/product-details.component';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private readonly apiUrl = 'http://localhost:8080/api/products';

  private products = signal<ProductItemModel[]>([]);
  readonly productList = this.products.asReadonly();

  private loading = signal(false);
  private error = signal<any | null>(null);

  constructor(private http: HttpClient) {
  }

  getProductList() {
    return this.http.get<Product[]>(this.apiUrl);
  }

  _getProductItemList(): Observable<ProductItemModel[]> {
    console.log("getProductItemList");
    return this.http.get<Product[]>(this.apiUrl).pipe(
      map(products =>
        products.map(ProductItemModel.fromDto)
      ),
      catchError(err => {
        console.log("Cannot load products: " + err);
        return EMPTY;
      })
    );
  }

  getProductItemList(productsSignal: WritableSignal<ProductItemModel[]>) {
    // return this.http.get<Product[]>(this.apiUrl).subscribe({
    //   next: products => productsSignal.set(products.map(ProductItemModel.fromDto)),
    //   complete: () => console.log("Products loaded")
    // });

    return this.http.get<Product[]>(this.apiUrl).pipe(
      map(products => products.map(ProductItemModel.fromDto))
    ).subscribe({
      next: mapped => productsSignal.set(mapped),
      complete: () => console.log("Products loaded")
    });
  }

  //loadProducts() {
  // return this.http.get<Product[]>(this.apiUrl).pipe(
  //   map(products => products.map(ProductItemModel.fromDto))
  // ).subscribe({
  //   next: mapped => this.products.set(mapped),
  //   complete: () => console.log("Products loaded")
  // });

  // this.loading.set(true);
  // this.http.get<Product[]>(this.apiUrl).pipe(
  //   map(products => products.map(ProductItemModel.fromDto)),
  //   //tap(mapped => this.products.set(mapped))
  //   tap({
  //     next: mapped => this.products.set(mapped),
  //     error: err => this.error.set(err),
  //     finalize: () => this.loading.set(false)
  //   })
  // ).subscribe({
  //   complete: () => console.log("Products loaded")
  // });
  //}

  loadProducts() {
    this.loading.set(true);
    console.log("Loading products...");

    this.http.get<Product[]>(this.apiUrl).pipe(
      map(products => products.map(ProductItemModel.fromDto)),
      finalize(() => this.loading.set(false))
    ).subscribe({
      next: mapped => this.products.set(mapped),
      error: err => {
        console.log("Cannot load products: " + err);
        this.error.set(err)
      },
      complete: () => console.log("Products loaded"),
    });

    //return this.products.asReadonly()
    //return this.productList;
  }

  getProductById(id: number) {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  getProductItemById(id: number) {
    // return this.http.get<Product>(`${this.apiUrl}/${id}`).pipe(
    //   map(p => new ExtendedProductModel(
    //     p.id,
    //     p.name,
    //     p.description,
    //     p.price,
    //     p.categoryName
    //   ))
    // );

    return this.http.get<Product>(`${this.apiUrl}/${id}`).pipe(map(ProductItemModel.fromDto));
  }
}

