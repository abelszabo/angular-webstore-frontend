import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OrderService} from '../order/services/order.service';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css',
})

export class MainPageComponent {

  // FIXME just for testing...

  private orderService = inject(OrderService);

  readonly isCreateOrderProcessing = this.orderService.isCreateOrderProcessing;

  // isCreateOrderProcessing() {
  //   //return this.orderService.isCreateOrderProcessing();
  //   //return this.orderService.isCreateOrderProcessing; // SIGNAL
  //   return this.orderService.isCreateOrderProcessing(); // BOOLEAN
  // }

  newOrder() {
    this.orderService.newOrder();
  }

  getOrderNumber() {
    this.orderService.getOrderNumber();
  }
}





