import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductService } from '../services/product.service';
// import { Product } from '../../../core/product.model';
import {toSignal} from '@angular/core/rxjs-interop';
import {ProductItemComponent} from '../components/product-item/product-item.component';
import {OrderService} from '../../order/services/order.service';

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

  products = toSignal(
    this.productService.getProductItemList(),
    { initialValue: null }
  );

  getOrderNumber() {
    this.orderService.getOrderNumber();
  }
}





