import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AllProducts, GeneralPhones, Variants } from 'src/app/modals/phones';
import { MobileServices } from 'src/app/services/mobile-services.service';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-mobiles',
  templateUrl: './mobiles.component.html',
  styleUrls: ['./mobiles.component.css']
})
export class MobilesComponent implements OnInit {

  constructor(public activatedRoute: ActivatedRoute, public router: Router, private MobileServices: MobileServices) { }

  brandId:number;
  generalPhones : GeneralPhones = new GeneralPhones();

  x:number=16;
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.brandId = params['id'];
    })
    this.getworkingphones(this.brandId);
  }

  prices:any[]=[];
  getworkingphones(brandId: number) {
    this.MobileServices.getworkingphones(brandId).subscribe((data:any) => {
      var response = this.RR(data.result);
      this.generalPhones.phones = response;

    })
  }
  RR(r:any){

		var x = new TextEncoder();
		var y:any = x.encode(r);
		r = String.fromCharCode.apply(null,y);
		var k =  y.slice(0, this.x*2);
		var sk = String.fromCharCode.apply(null,k);
		var i =  y.slice(this.x*2, this.x*3);
		var si = String.fromCharCode.apply(null,i);
		r = y.slice(this.x*3);
		r = String.fromCharCode.apply(null,r);
  	//------------------------------------------------------------------------------------------
		k = CryptoJS.enc.Utf8.parse(sk);
		i  = CryptoJS.enc.Utf8.parse(si);
		var d =  CryptoJS.AES.decrypt(r, k, { iv: i});
		return JSON.parse(d.toString(CryptoJS.enc.Utf8));
	}
}
