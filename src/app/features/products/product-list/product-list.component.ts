import {Component, inject, Signal, signal} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductService } from '../services/product.service';
// import { Product } from '../../../core/product.model';
import {toSignal} from '@angular/core/rxjs-interop';
import {ProductItemComponent} from '../components/product-item/product-item.component';
import {OrderService} from '../../order/services/order.service';
import {ProductItemModel} from '../models/product-item.model';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterLink, ProductItemComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})

export class ProductListComponent {
  // products = signal([
  //   { id: 1, name: 'Laptop', price: 399000 },
  //   { id: 2, name: 'Headphones', price: 59000 },
  //   { id: 3, name: 'Mouse', price: 14900 },
  // ]);

  // products = signal<Product[]>([]);
  //
  // constructor(private productService: ProductService) {
  //   this.productService.getProductList().subscribe(data => {
  //     this.products.set(data);
  //   });
  // }

  private productService = inject(ProductService);
  private orderService = inject(OrderService);

  //readonly productList = this.productService.loadProducts();
  //readonly productList = this.load();
  //productList = this.productService.getProductsSignal();
  readonly productList = this.productService.productList;

  /*_products = toSignal(
    this.productService._getProductItemList(),
    //{ initialValue: null }
    { initialValue: [] }
  );*/

  ngOnInit() {
    this.loadProducts();

    // ERROR RuntimeError: NG0203: toSignal() can only be used within an injection context such as a constructor,
    // a factory function, a field initializer, or a function used with `runInInjectionContext`.
    // Find more at https://v21.angular.dev/errors/NG0203
    // this.productList = this.productService.getProductsSignal();
  }

  loadProducts() {
    //this.productService.getProductItemList(this.products);
    //return this.productService.loadProducts();
    this.productService.loadProducts();
    //this.productList = this.productService.productList;
  }

  getOrderNumber() {
    this.orderService.getOrderNumber();
  }
}





