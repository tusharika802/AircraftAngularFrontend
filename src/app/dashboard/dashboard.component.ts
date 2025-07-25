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
  
  contracts: Contract[] = [];
  parts: Part[] = [];
  serviceCentres: ServiceCentre[] = [];
  partners: Partner[] = [];
  staffList: Staff[] = [];

  contractCount: number = 0;
  partInProgressCount: number = 0;
  serviceCentreCount: number = 0;
  partnerCount: number = 0;
  staffCount: number = 0;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.loadDashboardCounts();
    this.loadContracts();
    this.loadParts();
    this.loadServiceCentres();
    this.loadPartners();
    this.loadStaff();
  }

  loadDashboardCounts(): void {
    this.dashboardService.getActiveContractsCount().subscribe(count => this.contractCount = count);
    this.dashboardService.getInProgressPartsCount().subscribe(count => this.partInProgressCount = count);
    this.dashboardService.getServiceCentreCount().subscribe(count => this.serviceCentreCount = count);
    this.dashboardService.getPartnerCount().subscribe(count => this.partnerCount = count);
    this.dashboardService.getActiveStaffCount().subscribe(count => this.staffCount = count);
  }


  loadContracts(): void {
  this.dashboardService.contracts$.subscribe({
    next: (data) => {
      this.contracts = data;
      console.log('Received contracts in dashboard:', data);
    },
    error: (err) => {
      console.error('Subscription error:', err);
    }
  });

  this.dashboardService.getAllContracts(); 
}


  loadParts(): void {
    this.dashboardService.getAllParts().subscribe(data => this.parts = data);
  }

  loadServiceCentres(): void {
    this.dashboardService.getAllServiceCentres().subscribe(data => this.serviceCentres = data);
  }

  loadPartners(): void {
    this.dashboardService.getAllPartners().subscribe(data => this.partners = data);
  }

  loadStaff(): void {
    this.dashboardService.getAllStaff().subscribe(data => this.staffList = data);
  }

 getPartnerNames = (rowData: any): string => {
  const id = +rowData.partnerIds;
  return this.partners.find(p => p.id === id)?.name || '';
};

onContractEdit(e: any): void {
  const updatedData = { ...e.oldData, ...e.newData };
  const id = updatedData.id;

  this.dashboardService.editContract(id, updatedData).subscribe({
    next: () => {
      console.log('Contract updated successfully');

      const currentContracts = this.dashboardService.getContractsSnapshot();
      const updatedList = currentContracts.map(c =>
        c.id === id ? { ...c, ...updatedData } : c
      );
      this.dashboardService.setContracts(updatedList);
    },
    error: (err) => {
      console.error('Error updating contract:', err);
    }
  });
}
}

//   onContractDelete(e: any): void {
//     const id = e.data.id;

//     this.dashboardService.deleteContract(id).subscribe({
//       next: () => {
//         console.log('Contract deleted successfully');
//         this.loadContracts(); // Refresh data
//       },
//       error: (err) => {
//         console.error('Error deleting contract:', err);
//       }
//     });
//   }
// }
