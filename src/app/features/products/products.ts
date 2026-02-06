import {Component, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import { ProductService } from '../../core/product.service';
import { Product } from '../../core/product.model';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.html',
  styleUrl: './products.css',
})

export class Products {
  // products = signal([
  //   { id: 1, name: 'Laptop', price: 399000 },
  //   { id: 2, name: 'Headphones', price: 59000 },
  //   { id: 3, name: 'Mouse', price: 14900 },
  // ]);

  products = signal<Product[]>([]);

  constructor(private productService: ProductService) {
    this.productService.getAll().subscribe(data => {
      this.products.set(data);
    });
  }
}





