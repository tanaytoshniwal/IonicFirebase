import { Component } from '@angular/core';
import { NavController, AlertController, App } from 'ionic-angular';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs/Observable';
import { LoginPage } from '../login/login';
import { AuthProvider } from '../../providers/auth/auth';

export interface List{
  _id: string,
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

  constructor(public navCtrl: NavController, private afs: AngularFirestore, public alertCtrl: AlertController, private auth: AuthProvider, private app: App) {
    this.list_collection = afs.collection<any>('todo_list', ref=>ref.where('_id', '==', auth.check_user().uid));

    this.list_collection.valueChanges().subscribe(data => {
      this.list = data.map(res => res as List);
    });
  }

  add(){
    if(this.data != ''){
      let new_obj = {_id: this.auth.check_user().uid, _ref: '', data: this.data};
      this.list_collection.add(new_obj).then(res => {
        this.list_collection.doc(res.id).update({_ref: res.id});
        this.list.push(new_obj);
      });
    }
  }

  delete(item, j){
    this.list_collection.doc(item._ref).delete().then(()=>{
      for(let i = 0; i< this.list.length; i++){
        if(this.list[i]._ref == item._ref){
          this.list.splice(i, 1);
        }
      }
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

  logout(){
    this.auth.signOut().then(item => {
      this.app.getRootNav().setRoot(LoginPage);
    });
  }

}
