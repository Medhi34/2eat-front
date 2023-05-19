import { Injectable } from '@angular/core';
import { Directory, Encoding, Filesystem } from '@capacitor/filesystem';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  PATH:string = 'data/favourite.json';
  
  constructor() { }

  async getFavourite(){
    const favourite = await Filesystem.readFile({
      path: this.PATH,
      directory: Directory.Data,
      encoding: Encoding.UTF8
    });
    return favourite.data;
  }

  async inFavourite(mealId:string){
    const favourites = await Filesystem.readFile({
      path: this.PATH,
      directory: Directory.Data,
      encoding: Encoding.UTF8
    });

    let array = new Set(JSON.parse(favourites.data));
    return array.has(mealId);
  }

  async makeFavourite(mealId:string){
    const favourites = await Filesystem.readFile({
      path: this.PATH,
      directory: Directory.Data,
      encoding: Encoding.UTF8
    });

    let array = JSON.parse(favourites.data);
    array.push(mealId);

    await Filesystem.writeFile({
      path: this.PATH,
      data: JSON.stringify(array),
      directory: Directory.Data,
      encoding: Encoding.UTF8,
    }).then(() => console.log("Ajouter favoris"));
  }

  async removeFavourite(mealId:string){
    const favourites = await Filesystem.readFile({
      path: this.PATH,
      directory: Directory.Data,
      encoding: Encoding.UTF8
    });

    let array= new Set(JSON.parse(favourites.data));
    array.delete(mealId)

    await Filesystem.writeFile({
      path: this.PATH,
      data: JSON.stringify(Array.from(array)),
      directory: Directory.Data,
      encoding: Encoding.UTF8,
    }).then(() => console.log("Retirer favoris"));
    
  }
}
