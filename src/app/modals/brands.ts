import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})

export class GeneralBrands{
  brands:Brands[];
  brand:Brands;
}


export class Brands{
  Id: number;
  Name: string;
  brandPhones:any [];
  phones: any[];
}
