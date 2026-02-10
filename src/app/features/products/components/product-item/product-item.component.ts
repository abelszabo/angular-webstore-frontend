import {Component, inject, Input} from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductItemModel } from '../../models/product-item.model';
import {OrderService} from '../../../order/services/order.service';

@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.css'
})
export class ProductItemComponent {
  @Input({ required: true }) product!: ProductItemModel;

  private orderService = inject(OrderService);

  //addItem (item: ProductItemModel) {
  addItem () {
    //this.orderService.addToCart(item);
    this.orderService.addToCart(this.product);
  }
}
