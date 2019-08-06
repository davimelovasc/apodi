import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'about', loadChildren: './pages/about/about.module#AboutPageModule' },
  { path: 'device-details/:id/:title', loadChildren: './pages/device-details/device-details.module#DeviceDetailsPageModule', canActivate: [AuthGuardService] },
  { path: 'dashboard/Mapa', loadChildren: './pages/dashboard/dashboard.module#DashboardPageModule', canActivate: [AuthGuardService] }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
