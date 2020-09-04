import { Component, OnInit, AfterViewChecked } from '@angular/core';
import {CartService} from "../../services/cart.service";
import {CartModelServer} from "../../models/cart.model";
import {Router} from "@angular/router";
import {OrderService} from "../../services/order.service";
import {NgxSpinnerService} from "ngx-spinner";
import {FormBuilder, NgForm, Validators} from "@angular/forms";

declare let paypal: any;

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit, AfterViewChecked {
   
  cartData: CartModelServer;
  cartTotal: Number;
  showSpinner: Boolean;
  checkoutForm: any;
  constructor(private cartService: CartService,
              private orderService: OrderService,
              private router: Router,
              private  spinner: NgxSpinnerService
              ) {}

  ngOnInit() {
    this.cartService.cartData$.subscribe(data => this.cartData = data);
    this.cartService.cartTotal$.subscribe(total => this.cartTotal = total);
  }

  onCheckout() {
    this.spinner.show().then(p => {
       this.cartService.CheckoutFromCart(2);
     });
   //console.log(this.checkoutForm.value);
   }
  /*
  

  */
  /*---------------paypall--------------*/ 
  addScript : boolean = false;
  paypalLoad: boolean= true;
  finalAmount : number = 1;
  paypalConfig = {
    env:'sandbox',
    client:{
      sandbox:'AYu_zjwkpH6CMXXu1wjy7xieFc0nWioGxgnt-Wso2x-cLmMfVGVSVvRznkgWtx2i7uQ4-5ArcyKey9qH'
    },
    commit : true,
    payment:(data, actions)=>{
      return actions.payment.create({
        payment:{
          transactions:[
            {amount:{total: this.cartTotal, currency:'USD'}}
            //{amount:{total: this.finalAmount, currency:'USD'}}
          ]
        }
      });
    },
    onAuthorize: (data, actions)=>{
      return actions.payment.execute().then((payment)=>{
        console.log(payment);
      })
    }
  };

  ngAfterViewChecked(): void {
    if(!this.addScript){
      this.addPaypalScript().then(()=>{
        paypal.Button.render(this.paypalConfig, '#paypal-checkout-btn');
        this.paypalLoad = false;
      })
    }

  }

  addPaypalScript(){
    this.addScript = true;
    return new Promise((resolve, reject)=>{
      let scripttagElement = document.createElement('script');
      scripttagElement.src = 'https://www.paypalobjects.com/api/checkout.js';
      scripttagElement.onload = resolve;
      document.body.appendChild(scripttagElement);
    })
  }

}
