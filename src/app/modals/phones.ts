import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})

export class GeneralPhones{
  phones:Phones[];
  phone:Phones;
}
export class Phones{
  id: number;
  brandId: number;
  title: string;
  thumbnail: string;
  releaseDate: string;
  dimension: string;
  os: string;
  storage: string;
  url: string;
  displaySize: string;
  resolution: string;
  ram: string;
  chipset: string;
  batterySize: string;
  batteryType:string;
  photosUrl: string;
  brand: string;
  phonePhotoes: PhonePhotoes[];
  phoneSpecs: any[];
  lowestPrice: string;
  price:string;
  variants: Variants[];

}
export class PhonePhotoes{
  id: number;
  isActive: boolean;
  phoneId: number;
  photo: string;
}
export class Variants{
 id: number;
 phoneId: number;
 size:any;
 color:string;
 allProducts: AllProducts [];

}

export class AllProducts{
    id: number;
    title: string;
    link : string;
    website: string;
    price: string;
    lastUpdatedDate: string;
    websiteId:  number;
    variantId: number;
    websiteNavigation: any;
}


