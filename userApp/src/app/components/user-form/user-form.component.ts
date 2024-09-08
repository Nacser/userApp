import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { IUser } from '../../interfaces/iuser.interface';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent {
 usersService = inject(UsersService);
 activatedRoute = inject(ActivatedRoute);
 userForm:FormGroup;
 tipo: string = 'Añadir';

  constructor() {
    this.userForm = new FormGroup({
      first_name: new FormControl(null, [
        Validators.required,
      ]),
      last_name: new FormControl(null, [
        Validators.required,
      ]),
      username: new FormControl(null, [
        Validators.required,
      ]),
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[\w-.]+@([\w-]+\.)+[\w-]{2,6}$/),
      ]),
      image: new FormControl(null, [
        Validators.pattern(/(https?:\/\/.*\.(?:png|jpg|webp|jpeg|avif|svg))/i),
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
      ])
    }, []);
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(async (params: any) => {
      if (params.id) {
        this.tipo = 'Actualizar';
        const user: IUser | null = await this.usersService.getById(params.id);
        if (user) {
        this.userForm = new FormGroup({
          _id: new FormControl(user._id, [Validators.required,]),
          first_name: new FormControl(user.first_name, [Validators.required,]),
          last_name: new FormControl(user.last_name, [Validators.required,]),
          username: new FormControl(user.username, [Validators.required,
          ]),
          email: new FormControl(user.email, [Validators.required,
            Validators.pattern(/^[\w-.]+@([\w-]+\.)+[\w-]{2,6}$/),
          ]),
          image: new FormControl(user.image, [Validators.pattern(/(https?:\/\/.*\.(?:png|jpg|webp|jpeg|avif|svg))/i),]),
          password: new FormControl(user.password, [Validators.required,
            Validators.minLength(8),])
        }, []);
      }else {
        console.error('No se encontró el usuario');
      }
      }
    })
  }


    getDataForm() {
    console.log(this.userForm.value);
  }
    /* 
    if (this.userForm.valid._id) {
    try {
      const response: IUser = await this.usersService.update(this.userForm.value);
      if(response._id) {
        alert('Usuario actualizado con éxito');
        this.router.navigate(['/home']);
      }
  } catch({error}: any) {
   this.errorForm = error;
   console.log(this.errorForm);
  }

  } else {
    try {
      const response: IUser = this.usersService.insert(this.userForm.value);
    console.log(response);
    if (response._id) {
      alert('Usuario añadido con éxito');
      this.router.navigate(['/home']);
    }
    }catch(error) {
      console.log(error);
    } 
    }  */
    

    checkControl(formControlName: string, validador: string){
  return this.userForm.get(formControlName)?.hasError(validador) && this.userForm.get(formControlName)?.touched;
  }


}
