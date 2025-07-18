import { Component, OnInit } from '@angular/core';
import { Staff } from '../staff';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrl: './staff.component.scss'
})
export class StaffComponent implements OnInit{
     staffList: Staff[] = [];

  constructor(private service: DashboardService) {}

  ngOnInit(): void {
    this.loadStaff();
  }

  loadStaff() {
    this.service.getAllStaff().subscribe(res => this.staffList = res);
  }

  onAdd(e: any) {
    const newStaff: Staff = e.data;
    this.service.addStaff(newStaff).subscribe(() => this.loadStaff());
  }

  onEdit(e: any) {
    const updated: Staff = { ...e.oldData, ...e.newData };
    this.service.editStaff(updated.id, updated).subscribe(() => this.loadStaff());
  }

  onDelete(e: any) {
    const id = e.data.id;
    this.service.deleteStaff(id).subscribe(() => this.loadStaff());
  }
}
