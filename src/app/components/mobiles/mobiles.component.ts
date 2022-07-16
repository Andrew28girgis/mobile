import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AllProducts, GeneralPhones, Variants } from 'src/app/modals/phones';
import { MobileServices } from 'src/app/services/mobile-services.service';

@Component({
  selector: 'app-mobiles',
  templateUrl: './mobiles.component.html',
  styleUrls: ['./mobiles.component.css']
})
export class MobilesComponent implements OnInit {

  constructor(public activatedRoute: ActivatedRoute, public router: Router, private MobileServices: MobileServices) { }

  brandId:number;
  generalPhones : GeneralPhones = new GeneralPhones();

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.brandId = params['id'];
    })
    this.getworkingphones(this.brandId);
  }

  prices:any[]=[];
  getworkingphones(brandId: number) {
    this.MobileServices.getworkingphones(brandId).subscribe(data => {
      this.generalPhones.phones = data;
      // this.generalPhones.phones.forEach(phone => {
      //   this.prices=[];
      //  phone.variants.forEach(variant => {
      //   if(variant.allProducts.length>0){
      //     let lowprod = variant.allProducts.reduce((r , e) =>  r.price < e.price? r : e );
      //     this.prices.push(lowprod);
      //   }
      //   })
      //   phone.lowestPrice = this.prices.reduce((r,e)=> r.price<e.price?  r:e).price;
      // })
    })
  }

}
