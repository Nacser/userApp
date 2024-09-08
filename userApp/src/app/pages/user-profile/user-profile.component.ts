import { Component, inject } from '@angular/core';
import { IUser } from '../../interfaces/iuser.interface';
import { UsersService } from '../../services/users.service';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { NgIf } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [RouterLink, NgIf],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css',
})
export class UserProfileComponent {
  user: IUser | null = null;
  activatedRoute = inject(ActivatedRoute);
  usersService = inject(UsersService);

  constructor(private router: Router) {}
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
    const confirmDelete = confirm(
      `¿Estás seguro de que quieres eliminar el usuario con ID: ${id}?`
    );
    if (confirmDelete) {
      try {
        const success = await this.usersService.delete(id);
        if (success) {
          Swal.fire({
            title: '¡Éxito!',
            text: 'Usuario eliminado',
            icon: 'success',
            confirmButtonText: 'Continuar',
          });
          this.router.navigate(['/home']);
        } else {
          Swal.fire({
            title: '¡Error!',
            text: 'No se pudo eliminar el usuario',
            icon: 'error',
            confirmButtonText: 'Continuar',
          });
        }
      } catch (error) {
        console.error('Error al intentar eliminar el usuario:', error);
        Swal.fire({
          title: '¡Ups!',
          text: 'Parece que hubo un problema, intenta nuevamente',
          icon: 'warning',
          confirmButtonText: 'Continuar',
        });
      }
    }
  }
}
