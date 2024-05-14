import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './core/guard/login.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./views/auth/auth.module').then(
        (m) => m.AuthModule
      ),
    canActivate: [LoginGuard],
  },
  {
    path: 'people',
    loadChildren: () =>
      import('./views/people/people.module').then(
        (m) => m.PeopleModule
      ),
    canActivate: [],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: true,
  }),

  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
