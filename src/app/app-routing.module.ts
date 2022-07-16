import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './components/main-page/main-page.component';
import { MobileDetailsComponent } from './components/mobile-details/mobile-details.component';
import { MobilesComponent } from './components/mobiles/mobiles.component';

const routes: Routes = [
  {path:'',component:MainPageComponent},
  {path:'home',component:MainPageComponent},
  {path:'mobiles/:id',component:MobilesComponent},
  {path:'mobile/details/:id',component:MobileDetailsComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
