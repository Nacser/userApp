import { Component, inject } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { IUser } from '../../interfaces/iuser.interface';
import { UsersService } from '../../services/users.service';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [RouterLink, NgIf],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {
 user: IUser | null = null;
 activatedRoute = inject(ActivatedRoute);
 usersService = inject(UsersService);

  ngOnInit() {
    this.activatedRoute.params.subscribe(async (params: any) => {
      let id = params.id;
      console.log('ID recibido:', id);
      this.user = await this.usersService.getById(id);
    });
  }

  async delete(id: string | undefined) {
    if (!id) {
      return;
    }
    const confirmDelete = confirm(`¿Estás seguro de que quieres eliminar el usuario con ID: ${id}?`);
    if (confirmDelete) {
      try {
        const success = await this.usersService.delete(id);
        if (success) {
          alert('Usuario eliminado con éxito');
        } else {
          alert('Error eliminando el usuario. Por favor, inténtalo de nuevo.');
        }
      } catch (error) {
        console.error('Error al intentar eliminar el usuario:', error);
        alert('Ocurrió un error eliminando el usuario. Revisa la consola para más detalles.');
      }
    }
  }

}

