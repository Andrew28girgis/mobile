import { GeneralClients } from './../../modals/clients';
import { MobileServices } from './../../services/mobile-services.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  General: GeneralClients = new GeneralClients();

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
    this.MobileServices.getwebsites().subscribe(data => {
      this.General.clients = data;
      console.log(this.General.clients);
    });

  }

}
