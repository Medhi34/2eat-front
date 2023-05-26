import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL } from '../models/url_api';
import { Login, User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  /*======================= GET METHOD =======================*/

  getAllMeals():Observable<any>{
    return this.http.get(`${BASE_URL}/meals/`);
  }
  
  getMealById(id:string){
    return this.http.get(`${BASE_URL}/meals/${id}`);
  }

  getAllRestaurants(lat:number, lon:number):Observable<any>{
    return this.http.get(`${BASE_URL}/restaurants/`, {
      params: {
        lat: lat,
        lon: lon
      }
    });
  }

  getRestaurantById(id:string, lat:number, lon:number){
    return this.http.get(`${BASE_URL}/restaurants/${id}`,{
      params: {
        lat: lat,
        lon: lon
      }
    });
  }

  getRestaurantAppreciations(id:string){
    return this.http.get(`${BASE_URL}/restaurants/${id}/appreciations`);
  }

  getRestaurantsByCategoy(category:string, lat:number, lon:number):Observable<any>{
    return this.http.get(`${BASE_URL}/restaurants/category/${category}`,{
      params: {
        lat: lat,
        lon: lon
      }
    });
  }

  getRestaurantsByCity(city:string, lat:number, lon:number):Observable<any>{
    return this.http.get(`${BASE_URL}/restaurants/city/${city}`, {
      params: {
        lat: lat,
        lon: lon
      }
    });
  }

  getMealsOfRestaurant(id:String){
    return this.http.get(`${BASE_URL}/restaurants/${id}/meals`);
  }

  getUserById(id:string){
    return this.http.get(`${BASE_URL}/users/${id}`);
  }



  /*======================= POST METHOD =======================*/

  login(loginForm:Login){
    return this.http.post(`${BASE_URL}/users/login`, loginForm);
  }

  signUpUser(user:User){
    return this.http.post(`${BASE_URL}/users/signup`, user);
  }

  signUp(formData:FormData){
    return this.http.post(`${BASE_URL}/users/signup`, formData);
  }

  /*======================= PUT METHOD =======================*/

  /*======================= DELETE METHOD =======================*/
}
