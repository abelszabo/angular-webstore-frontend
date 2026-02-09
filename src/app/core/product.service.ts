import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Product} from './product.model';
import { map } from 'rxjs/operators';
import {ExtendedProductModel} from './product-extended.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private readonly apiUrl = 'http://localhost:8080/api/products';

  constructor(private http: HttpClient) {}

  getProductList() {
    return this.http.get<Product[]>(this.apiUrl);
  }

  getProductById(id: number) {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  getExtendedProductById(id: number) {
    // return this.http.get<Product>(`${this.apiUrl}/${id}`).pipe(
    //   map(p => new ExtendedProductModel(
    //     p.id,
    //     p.name,
    //     p.description,
    //     p.price,
    //     p.categoryName
    //   ))
    // );

    return this.http.get<Product>(`${this.apiUrl}/${id}`).pipe(map(ExtendedProductModel.fromDto));
  }
}

