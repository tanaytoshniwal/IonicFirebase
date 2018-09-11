import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs/Observable';

export interface List{
  _ref: string,
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
    let new_obj = {_ref: '', data: this.data};
    this.list_collection.add(new_obj).then(res => {
      this.list_collection.doc(res.id).update({_ref: res.id});
      this.list.push(new_obj);
    });
  }

}
