import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable, timeout } from 'rxjs';
export class TimeOutIntepcertor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(timeout(60000));
  }
}
