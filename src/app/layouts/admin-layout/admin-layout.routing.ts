import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { IconsComponent } from '../../icons/icons.component';
import { SettingsComponent } from '../../settings/settings.component';
import {ResultsComponent} from '../../components/results/results.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'settings',        component: SettingsComponent },
    { path: 'results',          component: ResultsComponent}
];
