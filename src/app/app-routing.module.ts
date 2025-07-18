import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ContractComponent } from './contract/contract.component';
import { PartsComponent } from './parts/parts.component';
import { ServicecentreComponent } from './servicecentre/servicecentre.component';
import { PartnerComponent } from './partner/partner.component';
import { StaffComponent } from './staff/staff.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'contract', component: ContractComponent },
  { path: 'parts', component: PartsComponent },
  { path: 'servicecentre', component: ServicecentreComponent },
  { path: 'partner', component: PartnerComponent },
  { path: 'staff', component: StaffComponent },
  { path: 'login', component: LoginComponent },

  // ✅ Default redirect to dashboard
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

  // ✅ Wildcard route to catch unknown paths
  { path: '**', redirectTo: 'dashboard' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
