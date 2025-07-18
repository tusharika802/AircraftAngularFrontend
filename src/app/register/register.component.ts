import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  @Output() close = new EventEmitter<void>();
  @Output() registrationCompleted = new EventEmitter<void>();

  registerForm: FormGroup;
  selectedFile: File | null = null;

  constructor(private fb: FormBuilder, private http: HttpClient,
    private router:Router
  ) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['', Validators.required]
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  register() {
    if (this.registerForm.invalid) return;

    const formData = new FormData();
    formData.append('username', this.registerForm.get('username')?.value);
    formData.append('email', this.registerForm.get('email')?.value);
    formData.append('password', this.registerForm.get('password')?.value);
    formData.append('role', this.registerForm.get('role')?.value);
    if (this.selectedFile) {
      formData.append('profileImage', this.selectedFile);
    }

    this.http.post('https://localhost:7227/api/Account/register', formData).subscribe({
      next: (res) => {
  this.registrationCompleted.emit(); // Notify parent to switch to login modal

      },
      error: (err) => {
        alert('Registration failed');
        console.error(err);
      }
    });
  }

  closeModal() {
    this.close.emit();
  }
}
