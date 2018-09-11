import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs/Observable';

export interface List{
  data: string
};

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  data = '';
  list: List[] = [];
  list_collection: AngularFirestoreCollection;

  constructor(public navCtrl: NavController, private afs: AngularFirestore) {
    this.list_collection = afs.collection<any>('todo_list');
  }

  add(){
    console.log('va');
    let new_obj = {data: this.data};
    this.list_collection.add(new_obj).then(res => {
      console.log(res);
      this.list.push(new_obj);
    });
  }

}
