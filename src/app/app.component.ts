import { Component } from '@angular/core';
import {UserService} from "./shared/services/user/user.service";
import {Router} from "@angular/router";
import {AuthenticatedGuard} from "./authenticated.guard";

@Component({
  selector: 'main-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  constructor(private auth: AuthenticatedGuard, private userService: UserService, private router: Router){};

  logout() {
    console.log(123);
    /**
     * Total hack until new router is used (for authentication and activation logic)
     */
    this.userService.logout().subscribe(
        data => {
          if(!data.authenticated){
            console.log(1222);
            this.router.navigate(['/login']);
          }
        });
  }
}