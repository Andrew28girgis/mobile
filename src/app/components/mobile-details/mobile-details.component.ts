import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralBrands } from 'src/app/modals/brands';
import { GeneralClients } from 'src/app/modals/clients';
import { AllProducts, GeneralPhones, Variants } from 'src/app/modals/phones';
import { MobileServices } from 'src/app/services/mobile-services.service';
import * as CryptoJS from 'crypto-js';

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
  x: number = 16;
  mobile:boolean=false;
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.mobileId = params['id'];
    })

    this.getphone(this.mobileId);
//  if (window.screen.width === 360) { // 768px portrait
//     this.mobile = true;
//   }
if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
  // true for mobile device
  // document.write("mobile device");
  console.log("mobile device");
this.mobile= true;
}
  }
  setActive(photoId: number) {
    this.GeneralPhones.phone.PhonePhotoes.forEach(photo => {
      photo.IsActive = false;
      if (photo.Id == photoId) {
        photo.IsActive = true;
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
      var response = this.RR(data.result);
      this.GeneralPhones.phone = response;

      this.GeneralPhones.phone.Variants.forEach(variant => {
        if (variant.AllProducts.length > 0) {
          variant.AllProducts.forEach(p => {
            this.AllPhones.push(p);
          })
        }
      })

      this.lowestPhone = this.AllPhones.reduce((r, e) => r.Price < e.Price ? r : e);;

      this.GeneralPhones.phone.PhonePhotoes[0].IsActive = true;

      this.GeneralPhones.phone.Variants.forEach(variant => {
        if (this.HomeProduct[0] == variant.Id) {
          this.winnerVariant = variant;
        }
      })

      this.getAllClients();
      this.getUniqueSizes();
      this.getPhonesByColorAndSize("");
    })
  }



  getUniqueSizes() {
    this.GeneralPhones.phone.Variants.forEach(variant => {
      if (!this.PhoneSizes.includes(variant.Size)) {
        this.PhoneSizes.push(variant.Size);
      }
    });
  }

  getColorsBySize(Size: string) {
    this.ColorsSize = [];
    this.SelectedSize = Size;
    this.GeneralPhones.phone.Variants.forEach(variant => {
      if (variant.Size == this.SelectedSize) {
        if (!this.ColorsSize.includes(variant.Color)) {
          this.ColorsSize.push(variant.Color);
        }
      }
    });
    this.ColorsSize.sort((a, b) => a.color > b.color ? 1 : -1);
    this.getPhonesByColorAndSize("");
  }

  getPhonesByColorAndSize(Color: string) {
    this.HomeProduct = [];
    // console.log(this.GeneralPhones.phone.Variants);

    this.GeneralPhones.phone.Variants.forEach(variant => {
      if (this.SelectedSize == "" || variant.Size == this.SelectedSize) {
        if (Color == "" || variant.Color == Color) {

          variant.AllProducts.forEach(p => {
            if (!this.HomeProduct.includes(p)) {
              this.HomeProduct.push(p);
            }
          })
        }
      }
      this.HomeProduct.sort((a, b) => a.Price > b.Price ? 1 : -1);
    });

    this.GeneralPhones.phone.Variants.forEach(variant => {
      if (this.HomeProduct[0]?.VariantId == variant.Id) {
        this.winnerVariant = variant;
      }
    })


    this.General.clients?.forEach((client) => {
      if (client.Id == this.HomeProduct[0].WebsiteId) {
        this.General.client = client;

      }
    })



  }
  getAllClients() {
    this.MobileServices.getwebsites().subscribe((data: any) => {
      var response = this.RR(data.result);
      this.General.clients = response;

      this.General.clients.forEach((client) => {
        if (client.Id == this.lowestPhone.WebsiteId) {
          this.General.client = client;
        }
      })
    });
  }

  routeTo(e: any) {
    window.open(e.target.value, "_blank");
  }



  active: any;
  activeColor: any;

  RR(r: any) {
    var x = new TextEncoder();
    var y: any = x.encode(r);
    r = String.fromCharCode.apply(null, y);
    var k = y.slice(0, this.x * 2);
    var sk = String.fromCharCode.apply(null, k);
    var i = y.slice(this.x * 2, this.x * 3);
    var si = String.fromCharCode.apply(null, i);
    r = y.slice(this.x * 3);
    r = String.fromCharCode.apply(null, r);
    //------------------------------------------------------------------------------------------
    k = CryptoJS.enc.Utf8.parse(sk);
    i = CryptoJS.enc.Utf8.parse(si);
    var d = CryptoJS.AES.decrypt(r, k, { iv: i });
    return JSON.parse(d.toString(CryptoJS.enc.Utf8));
  }

}


