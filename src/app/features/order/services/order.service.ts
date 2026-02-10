import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Product} from '../../products/models/product.model';
import {Order} from '../models/order.model';
import {SessionService} from '../../../core/services/session.service';
import {EMPTY, exhaustMap, finalize, Observable, of, Subject, throwError} from 'rxjs';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {catchError, delay, switchMap, tap} from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private readonly ORDER_NUMBER_KEY = "ORDER_NUMBER";
  private readonly apiUrl = 'http://localhost:8080/api/order';

  private sessionService = inject(SessionService);

  private createOrder$ = new Subject<void>();
  private createOrderProcessingSignal = signal(false);
  readonly isCreateOrderProcessing = this.createOrderProcessingSignal.asReadonly();

  constructor(private http: HttpClient) {
    this.createOrder$.pipe(
      //switchMap(() => this.newOrderObservable()),
      exhaustMap(() => {
        this.createOrderProcessingSignal.set(true);
        return this.newOrderObservable().pipe(
          delay(1000),
          finalize(() => this.createOrderProcessingSignal.set(false)))
      }),
      //delay(1000),
      tap(result => {
        console.log('Order created:', result);
        this.sessionService.set(this.ORDER_NUMBER_KEY, result.orderNumber);
      }),
      catchError(err => {
        console.error(err);
        this.sessionService.remove(this.ORDER_NUMBER_KEY);
        return EMPTY;
      }),
      takeUntilDestroyed()
    ).subscribe();
  }

  // isCreateOrderProcessing() {
  //   return this.createOrderProcessingSignal;
  // }

  newOrderObservable(): Observable<Order> {
    return this.http.post<Order>(`${this.apiUrl}/new-order`, {});
  }

  newOrder() {
    console.log("Creating new (empty) order"); // FIXME should be created automatically on backend

    // this.newOrderObservable().pipe(
    //   // takeUntilDestroyed(), // takeUntilDestroyed() can only be used within an injection context such as a constructor, a factory function, a field initializer, or a function used with `runInInjectionContext`. Find more at https://v21.angular.dev/errors/NG0203
    //   catchError(err => {
    //     console.error(err);
    //     return of([]);
    //   })
    // ).subscribe(result => {
    //   console.log('Order created:', result);
    //   if ('orderNumber' in result) {
    //     this.sessionService.set(this.ORDER_NUMBER_KEY, result.orderNumber);
    //   }
    // });

    // this.newOrderObservable().pipe(
    //   tap(result => {
    //     console.log('Order created:', result);
    //     this.sessionService.set(this.ORDER_NUMBER_KEY, result.orderNumber);
    //   }),
    //   catchError(err => {
    //     console.error(err);
    //     //this.sessionService.set(this.ORDER_NUMBER_KEY, null);
    //     this.sessionService.remove(this.ORDER_NUMBER_KEY);
    //     return EMPTY;
    //     //return throwError(() => err);
    //   })
    // ).subscribe();

    this.createOrder$.next();
  }

  getOrderNumber() {
    const orderNumber = this.sessionService.get<String>(this.ORDER_NUMBER_KEY);
    console.log('Order number:', orderNumber);
  }
}
