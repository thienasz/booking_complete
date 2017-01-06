import {Injectable, Inject} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class BookingService {
  constructor(private http:Http, @Inject('apiBase') private _apiBase: string) {
  }

  getPosts() {
    console.log('1111');
    return this.http.get(this._apiBase + '/api/bookings/today')
        .map(res => res.json());
  }

  getOldUsers() {
    console.log('2222');
    return this.http.get(this._apiBase + '/api/bookings/user')
        .map(res => res.json());
  }

  addBooking(data) {
    console.log(JSON.stringify(data));
    let headers = new Headers();
    let url = this._apiBase + '/api/bookings';
    headers.append('Content-Type', 'application/json');
    console.log(headers);

    return this.http.post(url, data, {headers: headers})
        .map(res => res.json());
  }


  deleteBooking(id) {
    let headers = new Headers();
    let url = this._apiBase + '/bookings/' + id;
    headers.append('Content-Type', 'application/json');
    console.log(headers);

    return this.http.delete(url, {headers: headers})
        .map(res => res.json());
  }
}
