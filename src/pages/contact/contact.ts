import { Component , OnInit } from '@angular/core';
import { NavController , NavParams, AlertController } from 'ionic-angular';
import {DB} from '../../app/untitled folder/database';
import {DataModel} from '../../app/untitled folder/data.modal';
import { ToastController } from 'ionic-angular';
@Component({
  templateUrl: 'navigation-details.html',
  selector: 'page-navigate'
})
export class NavigationDetailsPage implements OnInit{
  private item:DataModel;
  private title:string;
  private desc:string;
  private id:number;
  
  constructor(params: NavParams,private alertCtrl: AlertController, private db:DB, private navCtrl:NavController,private toastCtrl: ToastController) {
    this.item = params.data.item;
    
  }
  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'User was edited successfully',
      duration: 3000
    });
    toast.present();
  };

  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Cannot Change!',
      subTitle: 'Id once set cannot be change!',
      buttons: ['OK']
    });
    alert.present();
  }
  isReadonly() {return true;}
  editData(){
    this.item = new DataModel(this.id,this.title,this.desc);
    this.db.DataArray = this.db.DataArray.filter((x)=>{
        if(x.id == this.item.id){
            x.name = this.item.name;
            x.desc = this.item.desc;
        }
        return x;
    });
    this.presentToast();
    this.navCtrl.pop();
  }
  ngOnInit() {
    this.id = this.item.id;
    this.title = this.item.name;
    this.desc = this.item.desc;
    
  }
};
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',

})
export class ContactPage implements OnInit{
  private items:DataModel[]=[] ;
  constructor(public navCtrl: NavController, private db:DB) {

  }
    getData(){
      this.items = this.db.DataArray;
    }

    ngOnInit() {
      this.getData();
      
    }

    callMe(item){
      this.navCtrl.push(NavigationDetailsPage, { item: item });
    }

    delete(item){
      this.items = this.items.filter((x)=>{
        if(x.id!=item.id){
          return x;
        }
      });
      this.db.DataArray = this.items;
    }

    getItems(event: any){
      this.getData();
      let data:string = event.target.value;
      if(data && data.trim() != ''){
        this.items = this.items.filter((x) => {
        return (x.name.toLowerCase().indexOf(data.toLowerCase()) > -1);
        });
      }
    }
}



