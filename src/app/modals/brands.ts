import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})

export class GeneralBrands{
  brands:Brands[];
}

export class Brands{
  id: number;
  name: string;
  brandPhones:any [];
  phones: any[];
}
