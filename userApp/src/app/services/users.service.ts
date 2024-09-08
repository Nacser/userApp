import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IUser, IApi } from '../interfaces/iuser.interface';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private baseUrl: string = 'https://peticiones.online/api/users/';
  private http = inject(HttpClient);
  
  async getAll(): Promise<IUser[]> {
    try {
      const response = await firstValueFrom(this.http.get<IApi>(this.baseUrl));
      return response.results;
    } catch (error) {
      return [];
    }
  }

  async getById(id: string): Promise<IUser | null> {
    try {
      const response = await firstValueFrom(this.http.get<IApi>(this.baseUrl));
      const user = response.results.find((u: IUser) => u._id === id);
      return user || null;
    } catch (error) {
      return null;
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      const response = await firstValueFrom(this.http.delete<any>(`${this.baseUrl}${id}`, { observe: 'response' }));
      console.log(response);
      if (response.status === 200) {
        return true;
      } else {
        console.error('Error eliminando usuario:', response.statusText);
        return false;
      }
    } catch (error) {
      console.error('Error eliminando usuario:', error);
      return false;
    }
  }

}
