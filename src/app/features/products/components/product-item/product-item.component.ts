import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductItemModel } from '../../models/product-item.model';

@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.css'
})
export class ProductItemComponent {
  @Input({ required: true }) product!: ProductItemModel;
}
