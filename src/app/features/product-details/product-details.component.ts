import {Component, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../core/product.service';
import { Product } from '../../core/product.model';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})

export class ProductDetailsComponent {

  product = signal<Product | null>(null);

  constructor(private route: ActivatedRoute,
              private productService: ProductService) {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.productService.getProductById(id).subscribe(data => {
      // const p: Product = {
      //   id: 1,
      //   name: 'Laptop',
      //   description: 'Gaming laptop',
      //   price: 450000,
      //   categoryName: 'Electronics'
      // };
      this.product.set(data);
    });
  }
}





