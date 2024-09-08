import { Component, Input, inject } from '@angular/core';
import { IUser } from '../../interfaces/iuser.interface';
import { RouterLink } from '@angular/router';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.css'
})
export class UserCardComponent {
  @Input() myUser!: IUser;
  user!: IUser;

  usersService = inject(UsersService);
    
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
