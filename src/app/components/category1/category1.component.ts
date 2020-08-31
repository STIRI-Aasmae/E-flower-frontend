import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../services/product.service";
import {ProductModelServer, serverResponse} from "../../models/product.model";
import {CartService} from "../../services/cart.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-category1',
  templateUrl: './category1.component.html',
  styleUrls: ['./category1.component.scss']
})
export class Category1Component implements OnInit {
  products: ProductModelServer[]=[];

  constructor(private productService: ProductService,
              private router: Router,
              private cartService: CartService) { }

  ngOnInit() {
    this.productService.getProductsFromCategory("bouquet").subscribe((prods: serverResponse ) => {
      this.products = prods.products;
      console.log(this.products);
    },err=>{
      console.log(err.message);
    });
  }

  AddProduct(id: Number) {
    this.cartService.AddProductToCart(id);
  }

  selectProduct(id: Number){
    this.router.navigate(['/product',id]).then();
  }

}
