import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralBrands } from 'src/app/modals/brands';
import { GeneralClients } from 'src/app/modals/clients';
import { AllProducts, GeneralPhones, Variants } from 'src/app/modals/phones';
import { MobileServices } from 'src/app/services/mobile-services.service';

@Component({
  selector: 'app-mobile-details',
  templateUrl: './mobile-details.component.html',
  styleUrls: ['./mobile-details.component.css']
})
export class MobileDetailsComponent implements OnInit {

  constructor(public activatedRoute: ActivatedRoute, public router: Router, private MobileServices: MobileServices) { }
  mobileId: number;
  GeneralPhones: GeneralPhones = new GeneralPhones();
  General: GeneralClients = new GeneralClients();

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.mobileId = params['id'];
    })

    this.getphone(this.mobileId);

    this.stringToColour("red");

  }
  setActive(photoId: number) {
    this.GeneralPhones.phone.phonePhotoes.forEach(photo => {
      photo.isActive = false;
      if (photo.id == photoId) {
        photo.isActive = true;
      }
    }
    )
  }

  HomeProduct: any[] = [];
  HomeVariants: any[] = [];
  PhoneSizes: any[] = [];
  ColorsSize: any[] = [];
  SelectedSize: string = "";
  AllPhones: any[] = [];
  lowestWebisite: string = "";
  winnerVariant: Variants;
  lowestPhone: AllProducts;

  getphone(phoneid: number) {
    this.MobileServices.getphone(phoneid).subscribe((data: any) => {
      this.GeneralPhones.phone = data;
      this.GeneralPhones.phone.variants.forEach(variant => {
        if (variant.allProducts.length > 0) {
          variant.allProducts.forEach(p => {
            this.AllPhones.push(p);
          })
        }
      })

      this.lowestPhone = this.AllPhones.reduce((r, e) => r.price < e.price ? r : e);;



      this.GeneralPhones.phone.phonePhotoes[0].isActive = true;
      this.GeneralPhones.phone.variants.forEach(variant => {
        if (this.HomeProduct[0] == variant.id) {
          this.winnerVariant = variant;
        }
      })



      this.getAllClients();
      this.getUniqueSizes();
      this.getPhonesByColorAndSize("");
    })
  }

  getUniqueSizes() {
    this.GeneralPhones.phone.variants.forEach(variant => {
      if (!this.PhoneSizes.includes(variant.size)) {
        this.PhoneSizes.push(variant.size);
      }
    });
  }

  getColorsBySize(Size: string) {
    this.ColorsSize = [];
    this.SelectedSize = Size;
    this.GeneralPhones.phone.variants.forEach(variant => {
      if (variant.size == this.SelectedSize) {
        if (!this.ColorsSize.includes(variant.color)) {
          this.ColorsSize.push(variant.color);
        }
      }
    });
    this.ColorsSize.sort((a, b) => a.color > b.color ? 1 : -1);
    this.getPhonesByColorAndSize("");
  }

  getPhonesByColorAndSize(Color: string) {
    this.HomeProduct = [];
    this.GeneralPhones.phone.variants.forEach(variant => {

      if (this.SelectedSize == "" || variant.size == this.SelectedSize) {
        if (Color == "" || variant.color == Color) {

          variant.allProducts.forEach(p => {
            if (!this.HomeProduct.includes(p)) {
              this.HomeProduct.push(p);
            }
          })



        }
      }
      this.HomeProduct.sort((a, b) => a.price > b.price ? 1 : -1);
    });
    // console.log(`this.HomeProduct`);
    // console.log(this.HomeProduct[0]);
    this.GeneralPhones.phone.variants.forEach(variant => {
      if (this.HomeProduct[0].variantId == variant.id) {
        this.winnerVariant = variant;

      }
    })
    this.General.clients?.forEach((client) => {

      if (client.id == this.HomeProduct[0].websiteId) {
        this.General.client = client;

      }
    })



  }
  getAllClients() {
    this.MobileServices.getwebsites().subscribe(data => {
      this.General.clients = data;
      this.General.clients.forEach((client) => {

        if (client.id == this.lowestPhone.websiteId) {
          this.General.client = client;

        }
      })
    });
  }
  routeTo(e: any) {
    window.open(e.target.value, "_blank");
  }

  stringToColour(str: any) {
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    var colour = '#';
    for (var i = 0; i < 3; i++) {
      var value = (hash >> (i * 8)) & 0xFF;
      colour += ('00' + value.toString(16)).substr(-2);
    }
    console.log(colour);

    return colour;

  }
}


