import { Component, OnInit } from '@angular/core';
import { ServiceCentre } from '../servicecentre';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-servicecentre',
  templateUrl: './servicecentre.component.html',
  styleUrl: './servicecentre.component.scss'
})
   export class ServicecentreComponent implements OnInit {
  serviceCentres: ServiceCentre[] = [];

  constructor(private service: DashboardService) {}

  ngOnInit(): void {
    this.loadServiceCentres();
  }

  loadServiceCentres() {
    this.service.getAllServiceCentres().subscribe(res => this.serviceCentres = res);
  }

  onAdd(e: any) {
    const newCentre: ServiceCentre = e.data;
    this.service.addServiceCentre(newCentre).subscribe(() => this.loadServiceCentres());
  }

  onEdit(e: any) {
    const updated: ServiceCentre = { ...e.oldData, ...e.newData };
    this.service.editServiceCentre(updated.id, updated).subscribe(() => this.loadServiceCentres());
  }

  onDelete(e: any) {
    const id = e.data.id;
    this.service.deleteServiceCentre(id).subscribe(() => this.loadServiceCentres());
  }
}