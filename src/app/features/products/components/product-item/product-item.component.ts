import {Component, computed, effect, inject, Input, Pipe} from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductItemModel } from '../../models/product-item.model';
import {OrderService} from '../../../order/services/order.service';

@Pipe({name: 'doublePrice', standalone: true, pure: true})
export class DoublePricePipe {
  transform(product: ProductItemModel) {
    return product.price * 2;//item.quantity;
  }
}

@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [RouterLink, DoublePricePipe],
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

    // const total = computed(() => {
    //   console.log('computed');
    //   //return this.items().length;
    //   return this.product.price * 2;
    // });
    //
    // //ERROR RuntimeError: NG0203: effect() can only be used within an injection context such as a constructor, a factory function, a field initializer, or a function used with `runInInjectionContext`. Find more at https://v21.angular.dev/errors/NG0203
    // effect(() => {
    //   console.log('effect', total());
    // });
  }

  // @Input() items!: ProductItemModel[];
  //
  // readonly computedItems = computed(() =>
  //   this.items.map(item => ({
  //     ...item,
  //     computedPrice: item.price * 2//item.quantity
  //   }))
  // );
}


