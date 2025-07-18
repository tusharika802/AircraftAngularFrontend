import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  userName = '';
  profileImage = '';
  
  title = 'aircraftproject';
  drawerOpened = true;
  selectedMenu = 'Dashboard';
  isLoggedIn = false;
  showLoginPopup = false;
  showRegisterPopup = false;


  menuItems = [
    { text: 'Dashboard', path: '/dashboard' },
    { text: 'Contracts', path: '/contract' },
    { text: 'Parts', path: '/parts' },
    { text: 'Service Centres', path: '/servicecentre' },
    { text: 'Partners', path: '/partner' },
    { text: 'Staff', path: '/staff' },
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (!token) {
      this.showLoginPopup = true;
    } else {
      this.isLoggedIn = true;
      this.userName = localStorage.getItem('username') || '';
      this.profileImage = localStorage.getItem('profileImage') || '';
      this.router.navigate(['/dashboard']);
    }
  }

  onLoginSuccess(): void {
    this.isLoggedIn = true;
    this.showLoginPopup = false;
    this.userName = localStorage.getItem('username') || '';
    this.profileImage = localStorage.getItem('profileImage') || '';
    this.router.navigate(['/dashboard']);
  }
onRegistrationCompleted(): void {
  this.showRegisterPopup = false;
  this.showLoginPopup = true; // ✅ Show login modal after registration
}

  openRegisterFromLogin(): void {
    this.showLoginPopup = false;
    this.showRegisterPopup = true;
  }

  closeRegister(): void {
  this.showRegisterPopup = false;
  this.showLoginPopup = true; // 👈 Show login popup after closing register
}


  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('profileImage');
    this.isLoggedIn = false;
    this.router.navigate(['/']);
    window.location.reload();
  }

  onMenuClick(e: any): void {
    this.selectedMenu = e.itemData.text;
    if (e.itemData.path) {
      this.router.navigateByUrl(e.itemData.path);
    }
  }
}
