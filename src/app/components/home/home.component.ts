import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../services/product.service";
import {ProductModelServer, serverResponse} from "../../models/product.model";
import { tap, map, filter, retry, catchError } from 'rxjs/operators';
import {CartService} from "../../services/cart.service";

import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  //products;
  products: ProductModelServer[]=[];
  showError=false;
  constructor(private productService: ProductService,
              private router: Router,
              private cartService: CartService) { }

  ngOnInit() {
    
    this.productService.getAllProducts().subscribe((prods: serverResponse ) => {
      this.products = prods.products;
      console.log(this.products);
    },err=>{
      console.log(err.message);
    });
    /*----*/
    /*this.productService.getAllProducts().pipe(
      tap((prods: serverResponse) =>{ this.products = prods.products;}),
    )
    .subscribe(products => console.log(products))*/
   
  }

  AddProduct(id: Number) {
    this.cartService.AddProductToCart(id);
  }

  selectProduct(id: Number){
    this.router.navigate(['/product',id]).then();
  }

}
