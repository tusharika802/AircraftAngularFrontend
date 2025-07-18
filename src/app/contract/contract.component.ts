import { Component, OnInit, ViewChild } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { Partner } from '../partner';
import { Contract } from '../contract';
import { DxDataGridComponent } from 'devextreme-angular';
import { DxDataGridTypes } from 'devextreme-angular/ui/data-grid';

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
  // Load all contracts and convert partnerIds string to number[]
  // loadContracts(): void {
  //   this.dashboardService.getAllContracts().subscribe((data: any[]) => {
  //     this.contracts = data.map(c => ({
  //       ...c,
  //       partnerIds: c.partnerIds
  //         ? c.partnerIds.split(',').map((id: string) => +id)
  //         : []
  //     }));
  //   });
  // }
  loadContracts(): void {
    this.dashboardService.getAllContracts().subscribe((data: any[]) => {
      this.contracts = data.map(c => ({
        ...c,
        partnerIds: c.partnerIds
          ? c.partnerIds.split(',').map((id: string) => +id)
          : []
      }));
    });
  }

  // Get partner names from IDs (for display in grid)
  getPartnerNames = (rowData: any): string => {
    const ids: number[] = rowData.partnerIds || [];
    return this.partners
      .filter(p => ids.includes(p.id))
      .map(p => p.name)
      .join(', ');
  };

  // Add new contract
  onAdd(e: any): void {
    const selectedPartnerIds: number[] = e.data.partnerIds || [];
    const newContract: any = {
      title: e.data.title,
      isActive: e.data.isActive ?? false,
      partnerIds:
        selectedPartnerIds.length > 0
          ? selectedPartnerIds.join(',')
          : ''
    };

    this.dashboardService.addContract(newContract).subscribe({
      next: () => {
        this.loadContracts();
        e.component.cancelEditData(); // close popup
      },
      error: (err) => {
        console.error('Error adding contract:', err);
        alert('Failed to add contract: ' + (err?.error?.message || err.message || 'Unknown error'));
      }
    });
  }

  // Edit existing contract
  onEdit(e: any): void {
    const selectedPartnerIds =
      e.newData.partnerIds ?? e.oldData.partnerIds ?? [];

    const updatedContract: any = {
      title: e.newData.title ?? e.oldData.title,
      isActive: e.newData.isActive ?? e.oldData.isActive ?? false,
      partnerIds:
        selectedPartnerIds.length > 0
          ? selectedPartnerIds.join(',')
          : ''
    };

    const id = e.key;

    this.dashboardService.editContract(id, updatedContract).subscribe({
      next: () => {
        this.loadContracts();
        e.component.cancelEditData(); // close popup
      },
      error: (err) => {
        console.error('Error editing contract:', err);
        alert('Failed to update contract: ' + (err?.error?.message || err.message || 'Unknown error'));
      }
    });
  }

  // Delete contract
  onDelete(e: any): void {
    const id = e.data.id;

    this.dashboardService.deleteContract(id).subscribe({
      next: () => {
        this.loadContracts();
      },
      error: (err) => {
        console.error('Error deleting contract:', err);
        alert('Failed to delete contract: ' + (err?.error?.message || err.message || 'Unknown error'));
      }
    });
  }
}
