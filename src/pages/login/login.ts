import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { HomePage } from '../home/home';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private auth: AuthProvider, private app: App) {
  }

  google(){
    this.auth.google_sign_in().then(()=>{
      if(this.auth.check_user()){
        this.app.getRootNav().setRoot(HomePage);
      }
    }).catch(err=>{
      console.log(err);
    });
  }

}
