import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private isLoggedInSubject = new BehaviorSubject<boolean>(this.hasToken());
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(private router: Router) {}

  login(email: string, password: string) {
    // Mock Login
    if (email === 'test@finedge.com' && password === '123456') {
      localStorage.setItem('token', 'sampleToken123');
      this.isLoggedInSubject.next(true);
      this.router.navigate(['/dashboard']);
      return true;
    }
    return false;
  }

  logout() {
    localStorage.removeItem('token');
    this.isLoggedInSubject.next(false);
    this.router.navigate(['/']);
  }

  hasToken() {
    return !!localStorage.getItem('token');
  }
}
