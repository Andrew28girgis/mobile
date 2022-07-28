import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})

export class GeneralClients{
  clients:Clients[];
  client:Clients;
}

export class Clients {
  Id: number;
  Site: string;
  Type: string;
  Status: string;
  Diff: string;
  Mapping: string;
  Phone: string;
  Branches: string;
  Andriod: string;
  Iphone: string;
  OnlineChat: string;
  OnlinePayment: string;
  CashOnDelivery: string;
  BankInstallments: string;
  Valu: string;
  Facebook: string;
  Instagram: string;
  Title: string;
  AllProducts: any[];
}
