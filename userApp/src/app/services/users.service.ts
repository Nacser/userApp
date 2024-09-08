import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IUser, IApi } from '../interfaces/iuser.interface';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private baseUrl: string = 'https://peticiones.online/api/users/';
  private http = inject(HttpClient);

  async getAll(page: number = 1, perPage: number = 10): Promise<IApi> {
    try {
      const params = new HttpParams()
        .set('page', page)
        .set('per_page', perPage);
      const response = await firstValueFrom(
        this.http.get<IApi>(this.baseUrl, { params })
      );
      return response;
    } catch (error) {
      return { page: 0, per_page: 0, total: 0, total_pages: 0, results: [] };
    }
  }

  async getById(id: string): Promise<IUser | null> {
    try {
      let allUsers: IUser[] = [];
      let page = 1;
      let totalPages: number;
      do {
        const response = await firstValueFrom(
          this.http.get<IApi>(this.baseUrl, {
            params: new HttpParams().set('page', page).set('per_page', 100),
          })
        );
        allUsers = [...allUsers, ...response.results];
        totalPages = response.total_pages;
        page++;
      } while (page <= totalPages);
      const user = allUsers.find((u: IUser) => u._id === id);
      return user || null;
    } catch (error) {
      return null;
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      const response = await firstValueFrom(
        this.http.delete<any>(`${this.baseUrl}${id}`, { observe: 'body' })
      );
      if (response && response.hasOwnProperty('error')) {
        return false;
      } else if (response && response.hasOwnProperty('_id')) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }

  async create(user: IUser): Promise<IUser | null> {
    try {
      const response = await firstValueFrom(
        this.http.post<IUser>(this.baseUrl, user)
      );
      return response;
    } catch (error) {
      console.error('Error creando usuario:', error);
      return null;
    }
  }

  async update(id: string, user: IUser): Promise<IUser | null> {
    try {
      const response = await firstValueFrom(
        this.http.put<IUser>(`${this.baseUrl}${id}`, user)
      );
      return response;
    } catch (error) {
      console.error('Error actualizando usuario:', error);
      return null;
    }
  }
}
