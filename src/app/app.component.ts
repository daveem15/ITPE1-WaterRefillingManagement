import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Users } from './models/users';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'angular-WaterRefillingManagement';

  constructor(private router: Router) {}

  ngOnInit(): void {
    let user: Users | null = JSON.parse(localStorage.getItem('user') || 'null');

    if (user !== null) {
      // User is logged in, navigate to main
      this.router.navigate(['/admin']); // Replace '/main' with your actual main route
    } else {
      // User is not logged in, navigate to login
      this.router.navigate(['/login']); // Replace '/login' with your actual login route
    }
  }
}
