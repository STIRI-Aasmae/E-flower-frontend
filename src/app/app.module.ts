import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { ProductComponent } from './components/product/product.component';
import { ThankyouComponent } from './components/thankyou/thankyou.component';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { ProductService } from "./services/product.service";
import { HttpConfigInterceptor } from './interceptor/httpconfig.interceptor';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';
import { Category1Component } from './components/category1/category1.component';
import { Category2Component } from './components/category2/category2.component';
import { Category3Component } from './components/category3/category3.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CartComponent,
    CheckoutComponent,
    FooterComponent,
    HomeComponent,
    ProductComponent,
    ThankyouComponent,
    Category1Component,
    Category2Component,
    Category3Component
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    NgxSpinnerModule,
    ToastrModule.forRoot()
  ],
  providers: [ProductService,  { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
