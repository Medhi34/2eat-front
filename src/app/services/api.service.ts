import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL } from '../models/url_api';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  getAllMeals():Observable<any>{
    return this.http.get(`${BASE_URL}/meals/`);
  }
  
  getMealById(id:string){
    return this.http.get(`${BASE_URL}/meals/${id}`);
  }

  getAllRestaurants():Observable<any>{
    return this.http.get(`${BASE_URL}/restaurants/`);
  }

  getRestaurantById(id:string){
    return this.http.get(`${BASE_URL}/restaurants/${id}`);
  }

  getRestaurantAppreciations(id:string){
    return this.http.get(`${BASE_URL}/restaurants/${id}/appreciations`);
  }

  getRestaurantsByCategoy(category:string):Observable<any>{
    return this.http.get(`${BASE_URL}/restaurants/category/${category}`);
  }

  getRestaurantsByCity(city:string):Observable<any>{
    return this.http.get(`${BASE_URL}/restaurants/city/${city}`);
  }
}
