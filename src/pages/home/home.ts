import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, private afs: AngularFirestore, public alertCtrl: AlertController) {
    this.list_collection = afs.collection<any>('todo_list');

    this.list_collection.valueChanges().subscribe(data => {
      this.list = data.map(res => res as List);
    });
  }

  add(){
    if(this.data != ''){
      let new_obj = {_ref: '', data: this.data};
      this.list_collection.add(new_obj).then(res => {
        this.list_collection.doc(res.id).update({_ref: res.id});
        this.list.push(new_obj);
      });
    }
  }

  delete(item, i){
    this.list_collection.doc(item._ref).delete().then(()=>{
      this.list.splice(i, 1);
    });
  }

  edit(item){
    const prompt = this.alertCtrl.create({
      title: 'Edit '+item.data,
      message: "Enter the new data",
      inputs: [
        {
          name: 'data',
          placeholder: 'data'
        },
      ],
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Save',
          handler: new_data => {
            this.list_collection.doc(item._ref).update({data: new_data.data}).then(()=>{
              item.data = new_data.data;
            });
          }
        }
      ]
    });
    prompt.present();
  }

}
