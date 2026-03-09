import { HttpInterceptorFn } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {

  //console.log("INTERCEPTOR HIT");
  console.log("HTTP: ", req.url);

  return next(req).pipe(
    catchError((error) => {

      console.error("HTTP error: ", error);
      //console.log(JSON.stringify(error, null, 2));

      let message = 'Unexpected error';

      if (error?.status === 0) {
        message = "Backend unreachable";
      }

      if (error?.error?.message) {
        message = error.error.message;
      }

      if (error?.error?.errorMessage) {
        message = error.error.errorMessage;
      }

      if (error?.error?.errorCode){
        message = error.error.errorCode + " - " + message;
      }

      if (error?.status) {
        message = `[STATUS: ${error.status}] ${message}`;
      }

//       if (error?.error?.status) {
//         message = "[" + error.error.status + "] " + message;
//       }

      message = "ERROR! " + message;

      return throwError(() => new Error(message));
    })
  );

};
