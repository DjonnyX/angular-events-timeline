import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent) },
    { path: 'timeline', loadComponent: () => import('./pages/timeline/timeline.component').then(m => m.TimelineComponent) },
];
