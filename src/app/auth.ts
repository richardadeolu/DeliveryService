// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   private readonly adminUser = {
//     username: 'admin',
//     password: '1234'
//   };

//   login(username: string, password: string): boolean {
//     if (username === this.adminUser.username && password === this.adminUser.password) {
//       localStorage.setItem('isLoggedIn', 'true');
//       return true;
//     }
//     return false;
//   }

//   logout() {
//     localStorage.removeItem('isLoggedIn');
//   }

//   isLoggedIn(): boolean {
//     return localStorage.getItem('isLoggedIn') === 'true';
//   }
// }

import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly adminUser = {
    username: 'admin',
    password: '1234'
  };

  private timeoutId: any;
  private warningId: any;
  private readonly idleLimit = 2 * 60 * 1000; // 2 minutes
  private readonly warningTime = 30 * 1000;   // 30 seconds before logout

  constructor(private router: Router, private ngZone: NgZone) {}

  login(username: string, password: string): boolean {
    if (username === this.adminUser.username && password === this.adminUser.password) {
      localStorage.setItem('isLoggedIn', 'true');
      this.startIdleTimer();
      this.setupActivityListeners();
      return true;
    }
    return false;
  }

  logout() {
    localStorage.removeItem('isLoggedIn');
    this.clearTimers();
    this.removeActivityListeners();
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }

  // --- Idle Timer ---
  private startIdleTimer() {
    this.clearTimers();
    this.ngZone.runOutsideAngular(() => {
      // schedule warning
      this.warningId = setTimeout(() => {
        alert('⚠️ You will be logged out in 30 seconds due to inactivity.');
      }, this.idleLimit - this.warningTime);

      // schedule logout
      this.timeoutId = setTimeout(() => {
        this.ngZone.run(() => this.logout());
      }, this.idleLimit);
    });
  }

  private clearTimers() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
    if (this.warningId) {
      clearTimeout(this.warningId);
      this.warningId = null;
    }
  }

  // --- Track user activity ---
  private activityHandler = () => this.resetIdleTimer();

  private setupActivityListeners() {
    window.addEventListener('mousemove', this.activityHandler);
    window.addEventListener('keydown', this.activityHandler);
    window.addEventListener('click', this.activityHandler);
  }

  private removeActivityListeners() {
    window.removeEventListener('mousemove', this.activityHandler);
    window.removeEventListener('keydown', this.activityHandler);
    window.removeEventListener('click', this.activityHandler);
  }

  private resetIdleTimer() {
    if (this.isLoggedIn()) {
      this.startIdleTimer();
    }
  }
}

