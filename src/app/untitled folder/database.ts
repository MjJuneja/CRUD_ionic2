import {Injectable} from '@angular/core';
import {DataModel} from './data.modal';
@Injectable()
export class DB{
    DataArray:DataModel[]=[];
    prepareProduct():DataModel[]{
      
      for(let i=0;i<3;i++){
        let data:DataModel = new DataModel(i,"xyz"+i,"abcd zyxa"+(i*2));
        this.DataArray.push(data);
        
      }
      return this.DataArray;
    }
    callData():Promise<DataModel[]>{
     return Promise.resolve(this.prepareProduct());
 };

 private id:number = 1000;

    generateId():number{
        this.id++;
        return this.id;
    };

   public checkUser:string;

}