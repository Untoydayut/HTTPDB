import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';


@Injectable()
export class DatabaseService {

  constructor(private http: Http) { }

  saveData(data: object) {
      return this.http.post('https://firstproject-2358b.firebaseio.com/info.json', data);
  }

  getData() {
      return this.http.get('https://firstproject-2358b.firebaseio.com/info.json')
      .map(
        (response: Response) => {
            const data = response.json();
            return data;
        }
      )
      .catch(
        (error: Response) => {
            return Observable.throw('There was something wrong in the retrieval of the data...');
        }
      );
  }

}
