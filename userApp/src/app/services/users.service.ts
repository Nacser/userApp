import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IUser, IApi } from '../interfaces/iuser.interface';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private baseUrl: string = 'https://peticiones.online/api/users/';
  private http = inject(HttpClient);

  async getAll(page: number = 1, perPage: number = 10): Promise<IApi> {
      try {
        const params = new HttpParams()
          .set('page', page)
          .set('per_page', perPage);
        const response = await firstValueFrom(this.http.get<IApi>(this.baseUrl, { params }));
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
          const response = await firstValueFrom(this.http.get<IApi>(this.baseUrl, { params: new HttpParams().set('page', page).set('per_page', 100) }));
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
