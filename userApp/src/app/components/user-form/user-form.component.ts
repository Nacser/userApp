import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { IUser } from '../../interfaces/iuser.interface';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css',
})
export class UserFormComponent {
  usersService = inject(UsersService);
  activatedRoute = inject(ActivatedRoute);
  userForm: FormGroup;
  tipo: string = 'Añadir';

  constructor(private router: Router) {
    this.userForm = new FormGroup(
      {
        first_name: new FormControl(null, [Validators.required]),
        last_name: new FormControl(null, [Validators.required]),
        username: new FormControl(null, [Validators.required]),
        email: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[\w-.]+@([\w-]+\.)+[\w-]{2,6}$/),
        ]),
        image: new FormControl(null, [
          Validators.pattern(
            /(https?:\/\/.*\.(?:png|jpg|webp|jpeg|avif|svg))/i
          ),
        ]),
        password: new FormControl(null, [
          Validators.required,
          Validators.minLength(8),
        ]),
      },
      []
    );
  }

  checkControl(formControlName: string, validador: string) {
    return (
      this.userForm.get(formControlName)?.hasError(validador) &&
      this.userForm.get(formControlName)?.touched
    );
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(async (params: any) => {
      if (params.id) {
        this.tipo = 'Actualizar';
        const user: IUser | null = await this.usersService.getById(params.id);
        if (user) {
          this.userForm = new FormGroup(
            {
              _id: new FormControl(user._id, [Validators.required]),
              first_name: new FormControl(user.first_name, [
                Validators.required,
              ]),
              last_name: new FormControl(user.last_name, [Validators.required]),
              username: new FormControl(user.username, [Validators.required]),
              email: new FormControl(user.email, [
                Validators.required,
                Validators.pattern(/^[\w-.]+@([\w-]+\.)+[\w-]{2,6}$/),
              ]),
              image: new FormControl(user.image, [
                Validators.pattern(
                  /(https?:\/\/.*\.(?:png|jpg|webp|jpeg|avif|svg))/i
                ),
              ]),
              password: new FormControl(user.password, [
                Validators.required,
                Validators.minLength(8),
              ]),
            },
            []
          );
        } else {
          console.error('No se encontró el usuario');
        }
      }
    });
  }

  async onSubmit() {
    const formData = this.userForm.value;
    if (this.tipo === 'Actualizar') {
      try {
        const updatedUser = await this.usersService.update(
          formData._id,
          formData
        );
        if (updatedUser) {
          alert('Usuario actualizado con éxito');
          this.router.navigate(['/user', formData._id]);
        } else {
          alert('Error actualizando usuario');
        }
      } catch (error) {
        alert('Ocurrió un error. Por favor, intenta nuevamente.');
      }
    } else {
      try {
        const createdUser = await this.usersService.create(formData);
        if (createdUser) {
          alert('Usuario creado con éxito');
          this.router.navigate(['/home']);
        } else {
          alert('Error creando usuario');
        }
      } catch (error) {
        alert('Ocurrió un error. Por favor, intenta nuevamente.');
      }
    }
  }
}
