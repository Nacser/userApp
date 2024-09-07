import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NewUserComponent } from './pages/new-user/new-user.component';
import { UpdateUserComponent } from './pages/update-user/update-user.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';

export const routes: Routes = [
    {path: "", pathMatch: 'full', redirectTo: 'home'},
    {path: "home", component: HomeComponent},
    {path: "user", redirectTo: 'home'},
    {path: "user/1", component: UserProfileComponent},
    {path: "newuser", component: NewUserComponent},
    {path: "updateuser", redirectTo: 'home'},
    {path: "updateuser/1", component: UpdateUserComponent},
    {path: "**", redirectTo: 'home'}
];
