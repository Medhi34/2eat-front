import { Injectable } from '@angular/core';
import { UserPhoto } from '../models/Photo';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  
  constructor() { }

  async initFavourite(){
    const fav = await Preferences.get({key: "favourites"});
    if(fav.value == null){
      await Preferences.set({key: "favourites", value: JSON.stringify([])});
    }
  }

  async getFavourite(){
    const fav = await Preferences.get({key: "favourites"});
    return JSON.parse(fav.value || "null");
  }

  async isFavourite(mealId:string){
    let bool = false;
    await this.getFavourite().then(tabs => {
      if(tabs.indexOf(mealId) > -1){
        bool = true;
      }
    })
    return bool;
  }

  async addFavourite(mealId:string){
    await this.getFavourite().then(tabs => {
      tabs.unshift(mealId);
      Preferences.set({key: "favourites", value: JSON.stringify(tabs)});
    });
  }

  async removeFavourite(mealId:string){
    await this.getFavourite().then(tabs => {
      const map = new Map();
      for(let item of tabs){
        map.set(item, item);
      }
      map.delete(mealId);
      tabs = Array.from(map.values());
      Preferences.set({key: "favourites", value: JSON.stringify(tabs)});
    });
  }

  async createFile(photo:UserPhoto){
    let response = await fetch(photo.webviewPath || '');
    return await response.blob();
  }
}
