import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { ManageTriggersComponent } from './manage-triggers/manage-triggers.component';
import { ManageUserViewComponent } from './manage-user-view/manage-user-view.component';
import { ManageViewComponent } from './manage-view/manage-view.component';
import { ManageVipModuleComponent } from './manage-vip-module/manage-vip-module.component';
import { ManageClipsModuleComponent } from './manage-clips-module/manage-clips-module.component';
import { ManageRedemptionsModuleComponent } from './manage-redemptions-module/manage-redemptions-module.component';
import { ManageFollowModuleComponent } from './manage-follow-module/manage-follow-module.component';

export const routes: Routes = [
    { path: '', component: HomeComponent, title: 'DomDimaBot' },
    { path: 'dashboard', component: DashboardComponent, title: 'Dashboard' },
    {
        path: 'manage', component: ManageUserViewComponent, children: [
            { path: '', component: ManageViewComponent, title: 'Manage' },
            { path: 'triggers', component: ManageTriggersComponent, title: 'Manage Triggers' },
            { path: 'vip', component: ManageVipModuleComponent, title: 'VIP' },
            { path: 'clips', component: ManageClipsModuleComponent, title: 'Clips' },
            { path: 'redemptions', component: ManageRedemptionsModuleComponent, title: 'Redemptions' },
            { path: 'follows', component: ManageFollowModuleComponent, title: 'Follows' }
        ]
    },
    { path: 'login', component: LoginComponent, title: 'Login' },
    { path: 'logout', component: LogoutComponent, title: 'Logout' },
    { path: '**', component: PageNotFoundComponent, title: 'Page Not Found' }
];
