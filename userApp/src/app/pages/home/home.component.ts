import { Component} from '@angular/core';
import { UserCardComponent } from "../../components/user-card/user-card.component";
import { IUser } from "../../interfaces/iuser.interface";
import { UsersService } from "../../services/users.service";
import { inject } from "@angular/core";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [UserCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  usersService = inject(UsersService);
  arrUsers: IUser[] = [];
  currentPage: number = 1;
  totalPages: number = 1;
  perPage: number = 10;

  async ngOnInit() {
    await this.loadUsers();
  }

  async loadUsers(page: number = 1) {
    try {
      const response = await this.usersService.getAll(page, this.perPage);
      this.arrUsers = response.results;
      this.currentPage = response.page;
      this.totalPages = response.total_pages;
    } catch (error) {
      console.log(error);
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.loadUsers(this.currentPage + 1);
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.loadUsers(this.currentPage - 1);
    }
  }
  
}
