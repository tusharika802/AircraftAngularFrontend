import { Component, OnInit } from '@angular/core';
import { Part } from '../part';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-parts',
  templateUrl: './parts.component.html',
  styleUrl: './parts.component.scss'
})
export class PartsComponent implements OnInit{
    parts: Part[] = [];
    statusOptions = [
  { value: 'In Progress', label: 'In Progress' },
  { value: 'Completed', label: 'Completed' }
];

    constructor(private service: DashboardService) {}
  ngOnInit(): void {
    this.loadParts();
  }

  loadParts() {
    this.service.getAllParts().subscribe(res => this.parts = res);
  }

  onAdd(e: any) {
    const newPart: Part = e.data;
    this.service.addPart(newPart).subscribe(() => {
      this.loadParts();
    });
  }

  onEdit(e: any) {
    const updated: Part = { ...e.oldData, ...e.newData };
    this.service.editPart(updated.id, updated).subscribe(() => {
      this.loadParts();
    });
  }

  onDelete(e: any) {
    const id = e.data.id;
    this.service.deletePart(id).subscribe(() => {
      this.loadParts();
    });
  }
}
