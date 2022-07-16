import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralPhones } from 'src/app/modals/phones';
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
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.mobileId = params['id'];
    })

    this.getphone(this.mobileId);
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
  getphone(phoneid: number) {
    this.MobileServices.getphone(phoneid).subscribe((data: any) => {
      this.GeneralPhones.phone = data;
      this.GeneralPhones.phone.phonePhotoes[0].isActive = true;
    })
  }

}


