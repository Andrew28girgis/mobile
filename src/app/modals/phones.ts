import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})

export class GeneralPhones {
  phones: Phones[];
  phone: Phones;
}
export class Phones {
  Id: number;
  BrandId: number;
  Title: string;
  Thumbnail: string;
  ReleaseDate: string;
  Dimension: string;
  Os: string;
  Storage: string;
  Url: string;
  DisplaySize: string;
  Resolution: string;
  Ram: string;
  Chipset: string;
  BatterySize: string;
  BatteryType: string;
  PhotosUrl: string;
  Brand: string;
  PhonePhotoes: PhonePhotoes[];
  PhoneSpecs: any[];
  LowestPrice: string;
  Price: string;
  Variants: Variants[];

}
export class PhonePhotoes {
  Id: number;
  IsActive: boolean;
  PhoneId: number;
  Photo: string;
}
export class Variants {
  Id: number;
  PhoneId: number;
  Size: any;
  Color: string;
  AllProducts: AllProducts[];

}

export class AllProducts {
  Id: number;
  Title: string;
  Link: string;
  Website: string;
  Price: string;
  LastUpdatedDate: string;
  WebsiteId: number;
  VariantId: number;
  WebsiteNavigation: any;
}


