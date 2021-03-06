import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../services/product.service";
import {ProductModelServer, serverResponse} from "../../models/product.model";
import {CartService} from "../../services/cart.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-category3',
  templateUrl: './category3.component.html',
  styleUrls: ['./category3.component.scss']
})
export class Category3Component implements OnInit {
  products: ProductModelServer[]=[];

  constructor(private productService: ProductService,
              private router: Router,
              private cartService: CartService) { }

  ngOnInit() {
    this.productService.getProductsFromCategory("accessories").subscribe((prods: serverResponse ) => {
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
