import { Component, OnInit, ViewChild } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { Partner } from '../partner';
import { Contract } from '../contract';
import { DxDataGridComponent } from 'devextreme-angular';
import { DxDataGridTypes } from 'devextreme-angular/ui/data-grid';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.scss']
})
export class ContractComponent implements OnInit {
    @ViewChild(DxDataGridComponent, { static: false })
  dataGrid!: DxDataGridComponent;
  partners: Partner[] = [];
  contracts: any[] = [];
  selectedItemKeys: string[] = [];
  startEditAction = 'click';
  selectTextOnEditStart = true;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.loadPartners();
    this.loadContracts();
  }

  // Load all partners for the dropdown
  loadPartners(): void {
    this.dashboardService.getAllPartners().subscribe((data: Partner[]) => {
      this.partners = data;
    });
  }

  onSelectionChanged({ selectedRowKeys }: DxDataGridTypes.SelectionChangedEvent) {
    this.selectedItemKeys = selectedRowKeys;
  }

// loadContracts(): void {
//   this.dashboardService.getAllContracts().subscribe((data: any[]) => {
//     this.contracts = data.map(c => ({
//       ...c,
//       partnerIds: c.partnerIds ? +c.partnerIds : null
//     }));
//   });
// }

loadContracts(): void {
  this.dashboardService.contracts$.subscribe((data: any[]) => {
    this.contracts = data.map(c => ({
      ...c,
      partnerIds: c.partnerIds ? +c.partnerIds : null
    }));
  });
}

 getPartnerNames = (rowData: any): string => {
  const id = +rowData.partnerIds;
  return this.partners.find(p => p.id === id)?.name || '';
};


  onAdd(e: any): void {
  const selectedPartnerId: number = e.data.partnerIds;
  const newContract: any = {
    title: e.data.title,
    isActive: e.data.isActive ?? false,
    partnerIds: selectedPartnerId?.toString() || ''
  };

  this.dashboardService.addContract(newContract).subscribe({
    next: () => {
      this.loadContracts();
      e.component.cancelEditData();
    },
    error: (err) => {
      console.error('Error adding contract:', err);
      alert('Failed to add contract: ' + (err?.error?.message || err.message || 'Unknown error'));
    }
  });
}

// onEdit(e: any): void {
//   const selectedPartnerId = e.newData.partnerIds ?? e.oldData.partnerIds;
//   const updatedContract: any = {
//     title: e.newData.title ?? e.oldData.title,
//     isActive: e.newData.isActive ?? e.oldData.isActive ?? false,
//     partnerIds: selectedPartnerId?.toString() || ''
//   };

//   const id = e.key;

//   this.dashboardService.editContract(id, updatedContract).subscribe({
//     next: () => {
//       this.loadContracts();
//       e.component.cancelEditData();
//     },
//     error: (err) => {
//       console.error('Error editing contract:', err);
//       alert('Failed to update contract: ' + (err?.error?.message || err.message || 'Unknown error'));
//     }
//   });
// }



onEdit(e: any): void {
  const selectedPartnerId = e.newData.partnerIds ?? e.oldData.partnerIds;
  const updatedContract: any = {
    title: e.newData.title ?? e.oldData.title,
    isActive: e.newData.isActive ?? e.oldData.isActive ?? false,
    partnerIds: selectedPartnerId?.toString() || ''
  };

  const id = e.key;
this.dashboardService.editContract(id, updatedContract).subscribe({
  next: () => {
    const current = this.dashboardService.getContractsSnapshot();
    const updated = current.map(c => c.id === id ? { ...c, ...updatedContract } : c);
    this.dashboardService.setContracts(updated); // ✅ Push updated list
     e.component.cancelEditData();
    },
    error: (err) => {
      console.error('Error editing contract:', err);
      alert('Failed to update contract: ' + (err?.error?.message || err.message || 'Unknown error'));
  }
});
}

 
  


onDelete(e: any): void {
  const id = e.data.id;
  console.log('Delete called:', e);
  debugger;

  this.dashboardService.deleteContract(id)
    .pipe(
      finalize(() => {
        this.loadContracts(); 
      })
    )
    .subscribe({
      next: () => {
      },
      error: (err) => {
        console.error('Error deleting contract:', err);
        alert('Failed to delete contract: ' + (err?.error?.message || err.message || 'Unknown error'));
      }
    });
}
}