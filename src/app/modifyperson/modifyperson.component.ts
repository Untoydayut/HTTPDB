import { Component, OnInit } from '@angular/core';
import { DbService } from '../services/db.service';
import { NgForm } from '@angular/forms';
import { IPerson } from '../interfaces/iperson';

@Component({
  selector: 'app-modifyperson',
  templateUrl: './modifyperson.component.html',
  styleUrls: ['./modifyperson.component.css']
})
export class ModifypersonComponent implements OnInit {
  baseURL = 'https://firstproject-2358b.firebaseio.com/';
  rootNode = 'info';
  refID: any;

  fname: string;
  lname: string;

  person: object;

  display: false;

  constructor(private dbService: DbService) { }

  ngOnInit() {
  }

  editData(id){
     console.log(id);
     this.refID = id;
     this.dbService.getID(`${this.baseURL}/${this.rootNode}/${this.refID}.json`)
     .subscribe(
       (response) => {
           this.fname = response.firstName;
           this.lname = response.lastName;
       },
       (error) => console.log(error)
     );
  }

  updateData(formData: NgForm) {
       this.person = {
         firstName: formData.value.fname,
         lastName: formData.value.lname
       }

       this.dbService.editData(`${this.baseURL}/${this.rootNode}/${this.refID}.json`,this.person)
       .subscribe(
         (response) => console.log(response),
         (error) => console.log(error)
       );
  }

}
