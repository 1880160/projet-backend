
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { UseInterceptors } from '@nestjs/common';


interface ClassConstructor{ // force interface
  new (...args : any[]) : {};
}

export function Serialize(dto : ClassConstructor){ // create a Decorator
  return UseInterceptors(new LoggingInterceptor(dto)) 
}



@Injectable()
export class LoggingInterceptor implements NestInterceptor {

  constructor(private readonly dto : any){}
  
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Before...', context.getArgs());
    const now = Date.now();
    return next.handle()
      .pipe(
        tap(() => console.log(`After... ${Date.now() - now}ms`)),
        map(data => 
          {
            console.log("after...",data);
            return plainToClass(this.dto, data, { // transform data to dto format
              excludeExtraneousValues : true
            })
          }
      
      ) // Before the response is send out
        
      )
  }
}
