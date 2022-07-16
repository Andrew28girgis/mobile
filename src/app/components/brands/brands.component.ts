import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralBrands } from 'src/app/modals/brands';
import { MobileServices } from 'src/app/services/mobile-services.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { GeneralPhones } from 'src/app/modals/phones';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent implements OnInit {
  GeneralBrands: GeneralBrands = new GeneralBrands();

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
        items: 7
      }
    },
    nav: false
  }
  constructor(public activatedRoute: ActivatedRoute, public router: Router, private MobileServices: MobileServices,
    private scroll: ViewportScroller) { }

  ngOnInit(): void {
    this.getbrands();
  }
  getbrands() {
    this.MobileServices.getworkingbrands().subscribe(data => {
      this.GeneralBrands.brands = data;
    })
  }


}
