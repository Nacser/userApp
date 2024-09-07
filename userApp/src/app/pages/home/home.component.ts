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


  async ngOnInit() {
    try {
    const response = await this.usersService.getAll();
    this.arrUsers = response;
  }catch(error) {
    console.log(error);
  }
  }
  
}
