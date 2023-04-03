import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagePortofolioComponent } from './manage-portofolio.component';

const routes: Routes = [{ path: '', component: ManagePortofolioComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagePortofolioRoutingModule { }
