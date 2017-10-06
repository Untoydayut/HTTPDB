import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DbService } from '../services/db.service';
import { NgForm } from '@angular/forms';
import { IPerson } from '../interfaces/iperson';

@Component({
  selector: 'app-removeperson',
  templateUrl: './removeperson.component.html',
  styleUrls: ['./removeperson.component.css']
})
export class RemovepersonComponent implements OnInit {

baseURL = 'https://firstproject-2358b.firebaseio.com/';
rootNode = 'info';
refID: any;

  fname: string;
  lname: string;

  person: object;

  peopleCollection: Array<IPerson> = []

  constructor(private dbService: DbService) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() { 
     this.dbService.getAllData(`${this.baseURL}/${this.rootNode}.json`)
     .subscribe(
       (response) => {
         this.peopleCollection = response;
        } ,
       (error) => console.log(error)
     );
  }
  removeData(info: NgForm){
    this.person = {
      firstname: info.value.fname,
      lastname: info.value.lname
    }
    this.dbService.deleteData(`${this.baseURL}/${this.rootNode}/${this.refID}.json`).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    )
  }
}
