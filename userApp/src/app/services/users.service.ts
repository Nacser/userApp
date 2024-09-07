import { HttpClient, HttpErrorResponse } from '@angular/common/http';
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

  async getById(id: string): Promise<IUser> {
    try {
      const response = await firstValueFrom(this.http.get<{ results: IUser }>(`${this.baseUrl}${id}`));
      return response.results;
    } catch (error) {
      return {} as IUser;
    }
  }

  async getPage(page: number = 1): Promise<IApi> {
    try {
      return await firstValueFrom(this.http.get<IApi>(`${this.baseUrl}?page=${page}`));
    } catch (error) {
      console.error('Error fetching page', error);
      return { results: [], page: 0, total_pages: 0 };
    }
  }

}
