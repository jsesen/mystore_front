import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { Product } from '../products';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private url = 'http://localhost:3000/api/get_products';
  private urlpost = 'http://localhost:3000/api/add_product';
  private urldelete = 'http://localhost:3000/api/delete_product';
  private urlmodify = 'http://localhost:3000/api/modify_product';
  constructor(private httpClient:HttpClient) { }

  getProducts():Observable<Product[]>{
    return this.httpClient.get<Product[]>(this.url).pipe(catchError(this.handleError<any>('getProducts')));
  }

  addNewProduct(name:string,price:number,description:string):Observable<object>{

    const data = {name:name,price:price,description:description};

    return this.httpClient.post(this.urlpost,{info:data},{observe:'body'}).pipe(catchError(this.handleError<any>('addNewProduct')));
  }

  deleteProduct(id:string):Observable<object>{

    return this.httpClient.delete(this.urldelete+'/'+id,{observe:'body'}).pipe(catchError(this.handleError<any>('deleteProduct')))
  }

  modifyProduct(id:string, name:string,price:number,description:string):Observable<object>{

    const data = {name:name,price:price,description:description};

    return this.httpClient.put(this.urlmodify+'/'+id,{info:data},{observe:'response'}).pipe(catchError(this.handleError<any>('modifyProduct')));
  }

  private handleError<T>(operation = 'opearation',result?:T){ 
    return (error:any):Observable<T>=>{
      // TODO: send the error to remote logging infrastructure
      console.error(error);// log to console instead
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    }
  }
}
