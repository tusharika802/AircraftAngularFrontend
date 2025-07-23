import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Contract } from '../contract';
import { Part } from '../part';
import { ServiceCentre } from '../servicecentre';
import { Partner } from '../partner';
import { Staff } from '../staff';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    isLoggedIn = false;
constructor(private service: DashboardService,private router: Router ) {}

  // Count cards
  contractCount = 0;
  partInProgressCount = 0;
  serviceCentreCount = 0;
  partnerCount = 0;
  staffCount = 0;

  // Grid data
  contracts: Contract[] = [];
  parts: Part[] = [];
  serviceCentres: ServiceCentre[] = [];
  partners: Partner[] = [];
  staffList: Staff[] = [];

  

  ngOnInit(): void {
    this.isLoggedIn = !!localStorage.getItem('token');  // Check if token exists

    if (this.isLoggedIn) {
      this.loadDashboardData();                         //  Load data only when logged in
    }
  }

private loadDashboardData(): void {

    // Count cards
    this.service.getActiveContractsCount().subscribe(res => this.contractCount = res);
    this.service.getInProgressPartsCount().subscribe(res => this.partInProgressCount = res);
    this.service.getServiceCentreCount().subscribe(res => this.serviceCentreCount = res);
    this.service.getPartnerCount().subscribe(res => this.partnerCount = res);
    this.service.getActiveStaffCount().subscribe(res => this.staffCount = res);
      //Grid data
    this.service.getAllContracts().subscribe(res => this.contracts = res);
    this.service.getAllParts().subscribe(res => this.parts = res);
    this.service.getAllServiceCentres().subscribe(res => this.serviceCentres = res);
    this.service.getAllPartners().subscribe(res => this.partners = res);
    this.service.getAllStaff().subscribe(res => this.staffList = res);
  }
 
}
