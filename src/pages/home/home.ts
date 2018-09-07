import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  data = '';
  list = [];

  constructor(public navCtrl: NavController) {

  }

  add(){
    if(this.data != ''){
      this.list.push(this.data);
      this.data = '';
    }
  }

}
