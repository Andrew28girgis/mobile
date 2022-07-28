import { GeneralClients } from './../../modals/clients';
import { MobileServices } from './../../services/mobile-services.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { OwlOptions } from 'ngx-owl-carousel-o';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  General: GeneralClients = new GeneralClients();
  x:number=16;

  constructor(public activatedRoute: ActivatedRoute, public router: Router, private MobileServices: MobileServices,
    private scroll: ViewportScroller) { }

    customOptions: OwlOptions = {
      loop: true,
      mouseDrag: true,
      touchDrag: true,
      pullDrag: true,
      dots: true,
      navSpeed: 700,
      navText: ['', ''],
      responsive: {
        0: {
          items: 1
        },
        400: {
          items: 2
        },
        740: {
          items: 3
        },
        940: {
          items: 4
        }
      },
      nav: false
    }
  ngOnInit(): void {
    this.MobileServices.getwebsites().subscribe((data:any) => {
      var response = this.RR(data.result);
      this.General.clients = response;

    });

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
		var d = CryptoJS.AES.decrypt(r, k, { iv: i});
		return JSON.parse(d.toString(CryptoJS.enc.Utf8));
	}



}
