import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {DB} from '../../app/untitled folder/database';
import {DataModel} from '../../app/untitled folder/data.modal';
import { ToastController } from 'ionic-angular';
@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {        
  private title:string;
  private desc:string;
  private obj:DataModel;
  constructor(public navCtrl: NavController, private db:DB,private toastCtrl: ToastController) {
      
  }
  
   presentToast(str:string) {
    let toast = this.toastCtrl.create({
      message: str,
      duration: 3000
    });
    toast.present();
  };

  addData(){
    if(this.title == undefined){
    this.presentToast('Please enter the valid information');
  }
  else if(this.title.length>0){
    this.obj = new DataModel(this.db.generateId(),this.title,this.desc);
    this.db.DataArray.push(this.obj);
    console.log(this.db.DataArray);
    this.title ="";
    this.desc = "";
    this.presentToast('User was added successfully');
    
  }
  }

}
