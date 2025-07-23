import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contract } from './contract';
import { Part } from './part';
import { ServiceCentre } from './servicecentre';
import { Partner } from './partner';
import { Staff } from './staff';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private baseUrl = 'https://localhost:7227/api'; 

  constructor(private http: HttpClient) {}

  // Contracts
  getAllContracts(): Observable<Contract[]> {
    return this.http.get<Contract[]>(`${this.baseUrl}/contracts`);
  }
  getActiveContractsCount(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/Contracts/count`);
  }
  addContract(contract: Contract): Observable<any> {
    return this.http.post(`${this.baseUrl}/Contracts/add`, contract);
  }

  editContract(id: number, contract: Contract): Observable<any> {
return this.http.put(`${this.baseUrl}/Contracts/edit/${id}`, contract);
  }

  deleteContract(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/Contracts/delete?id=${id}`);
  }

  // Parts
  getAllParts(): Observable<Part[]> {
    return this.http.get<Part[]>(`${this.baseUrl}/parts`);
  }
  getInProgressPartsCount(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/parts/in-progress-count`);
  }
addPart(part: Part): Observable<any> {
    return this.http.post(`${this.baseUrl}/Parts/add`, part);
}

editPart(id: number, part: Part): Observable<any> {
    return this.http.put(`${this.baseUrl}/Parts/edit?id=${id}`, part);
}

deletePart(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/Parts/delete?id=${id}`);
}
  // Service Centres
  getAllServiceCentres(): Observable<ServiceCentre[]> {
    return this.http.get<ServiceCentre[]>(`${this.baseUrl}/servicecentre`);
  }
  getServiceCentreCount(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/servicecentre/count`);
    
  }
addServiceCentre(centre: ServiceCentre): Observable<any> {
  return this.http.post(`${this.baseUrl}/servicecentre/add`, centre);
}

editServiceCentre(id: number, centre: ServiceCentre): Observable<any> {
  return this.http.put(`${this.baseUrl}/servicecentre/edit?id=${id}`, centre);
}

deleteServiceCentre(id: number): Observable<any> {
  return this.http.delete(`${this.baseUrl}/servicecentre/delete?id=${id}`);
}

  // Partners
  getAllPartners(): Observable<Partner[]> {
    return this.http.get<Partner[]>(`${this.baseUrl}/partner`);
  }
  getPartnerCount(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/partner/count`);
  }
  addPartner(partner: Partner): Observable<any> {
  return this.http.post(`${this.baseUrl}/partner/add`, partner);
  }

  editPartner(id: number, partner: Partner): Observable<any> {
  return this.http.put(`${this.baseUrl}/partner/edit?id=${id}`, partner);
}

  deletePartner(id: number): Observable<any> {
  return this.http.delete(`${this.baseUrl}/partner/delete?id=${id}`);
}

  // Staff
  getAllStaff(): Observable<Staff[]> {
    return this.http.get<Staff[]>(`${this.baseUrl}/staff`);
  }
  getActiveStaffCount(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/staff/active-count`);

  }
  addStaff(staff: Staff): Observable<any> {
  return this.http.post(`${this.baseUrl}/staff/add`, staff);
}

  editStaff(id: number, staff: Staff): Observable<any> {
  return this.http.put(`${this.baseUrl}/staff/edit?id=${id}`, staff);
}

deleteStaff(id: number): Observable<any> {
  return this.http.delete(`${this.baseUrl}/staff/delete?id=${id}`);
}

}