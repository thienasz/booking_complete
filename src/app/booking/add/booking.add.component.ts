import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {BookingService} from "../../shared/services/booking/booking.service";
import {UserService} from "../../shared/services/user/user.service";
import {Booking} from "../../shared/services/booking/Booking";

@Component({
  selector: 'app-add-booking',
  templateUrl: './booking.add.component.html',
  styleUrls: ['./booking.add.component.css'],
  providers: [BookingService, UserService]
})
export class BookingAddComponent implements OnInit {

  booking: Booking;
  prices = [20, 25, 30, 35];
  oldUsers = [];

  constructor(private bookingService: BookingService, private router: Router, private userService: UserService) {
    this.booking = {
      "userid" : 0,
      "name" : "",
      "price" : 30
    };
    this.userService.getUsers().subscribe(
        rs => {
            this.oldUsers = rs;
            console.log(this.oldUsers);
        },
        err => {
            // Log errors if any
            console.log(err);
        });
  }

  ngOnInit() {

  }

  onSubmit() {
    console.log(this.booking);
    this.bookingService.addBooking(this.booking).subscribe(
        rs => {
          // Emit list event
          this.router.navigateByUrl('dashboard');
          console.log(rs);
        },
        err => {
          // Log errors if any
          console.log(err);
        });
  }
}
