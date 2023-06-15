import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL } from '../models/url_api';
import { Login, User } from '../models/User';
import { Appreciation } from '../models/Appreciation';
import { Order } from '../models/Order';
import { Restaurant } from '../models/Restaurant';

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

  getOrders(id:string){
    return this.http.get(`${BASE_URL}/users/${id}/orders`);
  }

  getUserContributions(id:string){
    return this.http.get(`${BASE_URL}/users/${id}/restaurants`);
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

  createRestaurant(formData:FormData){
    const userToken = JSON.parse(localStorage.getItem("userToken") || "null");
    return this.http.post(`${BASE_URL}/restaurants/`, formData, {
      headers: {
        "Authorization": `Bearer ${userToken.token}`
      }
    });
  }

  createMeal(formData:FormData, idRes:string){
    const userToken = JSON.parse(localStorage.getItem("userToken") || "null");
    return this.http.post(`${BASE_URL}/meals/${idRes}/`, formData, {
      headers: {
        "Authorization": `Bearer ${userToken.token}`
      }
    });
  }

  saveOrder(order:Order, mealId:string){
    const userToken = JSON.parse(localStorage.getItem("userToken") || "null");
    return this.http.post(`${BASE_URL}/orders/${mealId}/`, order, {
      headers: {
        "Authorization": `Bearer ${userToken.token}`
      }
    });
  }

  saveComment(appreciation:Appreciation){
    const userToken = JSON.parse(localStorage.getItem("userToken") || "null");
    return this.http.post(`${BASE_URL}/appreciations/`, appreciation, {
      headers: {
        "Authorization": `Bearer ${userToken.token}`
      }
    });
  }

  /*======================= PUT METHOD =======================*/

  updateComment(appreciation:Appreciation){
    const userToken = JSON.parse(localStorage.getItem("userToken") || "null");
    return this.http.put(`${BASE_URL}/appreciations/${appreciation._id}`, appreciation, {
      headers: {
        "Authorization": `Bearer ${userToken.token}`
      }
    });
  }

  updateRestaurant(restaurant:Restaurant){
    const userToken = JSON.parse(localStorage.getItem("userToken") || "null");
    return this.http.put(`${BASE_URL}/restaurants/${restaurant._id}`, restaurant, {
      headers: {
        "Authorization": `Bearer ${userToken.token}`
      }
    });
  }

  updateRestaurantWithFormData(formData:FormData, id:string){
    const userToken = JSON.parse(localStorage.getItem("userToken") || "null");
    return this.http.put(`${BASE_URL}/restaurants/${id}/images`, formData, {
      headers: {
        "Authorization": `Bearer ${userToken.token}`
      }
    });
  }

  updateUserWithFormData(formData:FormData, id:string){
    const userToken = JSON.parse(localStorage.getItem("userToken") || "null");
    return this.http.put(`${BASE_URL}/users/${id}/image`, formData, {
      headers: {
        "Authorization": `Bearer ${userToken.token}`
      }
    });
  }

  updateUser(user:User){
    const userToken = JSON.parse(localStorage.getItem("userToken") || "null");
    return this.http.put(`${BASE_URL}/users/${user._id}`, user, {
      headers: {
        "Authorization": `Bearer ${userToken.token}`
      }
    });
  }

  /*======================= DELETE METHOD =======================*/

  deleteComment(id:string){
    const userToken = JSON.parse(localStorage.getItem("userToken") || "null");
    return this.http.delete(`${BASE_URL}/appreciations/${id}`, {
      headers: {
        "Authorization": `Bearer ${userToken.token}`
      }
    });
  }

  deleteOrder(id:string){
    const userToken = JSON.parse(localStorage.getItem("userToken") || "null");
    return this.http.delete(`${BASE_URL}/orders/${id}`, {
      headers: {
        "Authorization": `Bearer ${userToken.token}`
      }
    });
  }

  deleteMeal(idRes:string, id:string){
    const userToken = JSON.parse(localStorage.getItem("userToken") || "null");
    return this.http.delete(`${BASE_URL}/meals/${idRes}/${id}`, {
      headers: {
        "Authorization": `Bearer ${userToken.token}`
      }
    });
  }

  deleteUser(id:string){
    const userToken = JSON.parse(localStorage.getItem("userToken") || "null");
    return this.http.delete(`${BASE_URL}/users/${id}`);
  }
}
