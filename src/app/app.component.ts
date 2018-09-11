import { Component } from '@angular/core';
import { Platform, LoadingController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthProvider } from '../providers/auth/auth';
import * as firebase from 'firebase/app';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, fireAuth: AngularFireAuth, loadingCtrl: LoadingController, auth: AuthProvider) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      let load = loadingCtrl.create({
        content: 'Please wait...'
      });
      load.present();
      firebase.auth().onAuthStateChanged(user => {
        if(user){
          auth.set_user(user);
          this.rootPage = HomePage;
          load.dismiss();
        }
        else{
          auth.set_user(null);
          this.rootPage = LoginPage;
          load.dismiss();
        }
      });
    });
  }
}

