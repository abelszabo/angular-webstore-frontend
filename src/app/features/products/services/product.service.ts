import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Product} from '../models/product.model';
import { map } from 'rxjs/operators';
import {ProductItemModel} from '../models/product-item.model';
import {Observable} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private readonly apiUrl = 'http://localhost:8080/api/products';

  constructor(private http: HttpClient) {}

  getProductList() {
    return this.http.get<Product[]>(this.apiUrl);
  }

  getProductItemList(): Observable<ProductItemModel[]> {
    return this.http.get<Product[]>(this.apiUrl).pipe(
      map(products=>
        products.map(ProductItemModel.fromDto)
      )
    );
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

