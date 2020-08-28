import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable, pipe} from "rxjs";
import {ProductModelServer, serverResponse} from "../models/product.model";



@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private url = environment.serverURL;
  constructor(private http: HttpClient) { }

  
  getAllProducts(limitOfResults=10): Observable<serverResponse> {
    return this.http.get<serverResponse>(this.url + 'products', {
      params: {
        limit: limitOfResults.toString()
      }
    });
  }
  
  getSingleProduct(id: Number): Observable<ProductModelServer> {
    return this.http.get<ProductModelServer>(this.url + 'products/' + id);
  }
// products/category/   products/' + id
  getProductsFromCategory(catName: String): Observable<ProductModelServer[]> {
    return this.http.get<ProductModelServer[]>(this.url + 'products/category/' + catName);
  }
}
