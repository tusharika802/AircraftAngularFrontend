import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { Partner } from '../partner';

@Component({
  selector: 'app-partner',
  templateUrl: './partner.component.html',
  styleUrl: './partner.component.scss'
})
export class PartnerComponent implements OnInit 
{
  partners: Partner[] = [];

  constructor(private service: DashboardService) {}

  ngOnInit(): void {
    this.loadPartners();
  }

  loadPartners() {
    this.service.getAllPartners().subscribe(res => this.partners = res);
  }

  onAdd(e: any) {
    const newPartner: Partner = e.data;
    this.service.addPartner(newPartner).subscribe(() => this.loadPartners());
  }

  onEdit(e: any) {
    const updated: Partner = { ...e.oldData, ...e.newData };
    this.service.editPartner(updated.id, updated).subscribe(() => this.loadPartners());
  }

  onDelete(e: any) {
    const id = e.data.id;
    this.service.deletePartner(id).subscribe(() => this.loadPartners());
  }
}
