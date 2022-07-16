import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})

export class GeneralClients{
  clients:Clients[];
}

export class Clients {
  id: number;
  site: string;
  type: string;
  status: string;
  diff: string;
  mapping: string;
  phone: string;
  branches: string;
  andriod: string;
  iphone: string;
  onlineChat: string;
  onlinePayment: string;
  cashOnDelivery: string;
  bankInstallments: string;
  valu: string;
  facebook: string;
  instagram: string;
  title: string;
  allProducts: any[];
}
