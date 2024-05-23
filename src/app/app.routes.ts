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
import { ManageStreamOnlineModuleComponent } from './manage-stream-online-module/manage-stream-online-module.component';
import { ManageStreamOfflineModuleComponent } from './manage-stream-offline-module/manage-stream-offline-module.component';
import { ManageChannelRaidModuleComponent } from './manage-channel-raid-module/manage-channel-raid-module.component';
import { ManageAdBreakModuleComponent } from './manage-ad-break-module/manage-ad-break-module.component';
import { ShowReservedCommandsComponent } from './show-reserved-commands/show-reserved-commands.component';
import { SongRequestModuleComponent } from './song-request-module/song-request-module.component';

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
            { path: 'follows', component: ManageFollowModuleComponent, title: 'Follows' },
            { path: 'stream-online', component: ManageStreamOnlineModuleComponent, title: 'Stream Online'},
            { path: 'stream-offline', component: ManageStreamOfflineModuleComponent, title: 'Stream Offline' },
            { path: 'raids', component: ManageChannelRaidModuleComponent, title: 'Raids' },
            { path: 'ad-break', component: ManageAdBreakModuleComponent, title: 'Ad Break'},
            { path: 'song-request', component: SongRequestModuleComponent, title: 'Song Request'}
        ]
    },
    {
        path: 'commands', title: 'Commands', children: [
            {
                path: 'show', title: 'Show', children: [
                    { path: 'reserved', component: ShowReservedCommandsComponent, title: 'Reserved' },
                ]
            }
        ]
    },
    { path: 'login', component: LoginComponent, title: 'Login' },
    { path: 'logout', component: LogoutComponent, title: 'Logout' },
    { path: '**', component: PageNotFoundComponent, title: 'Page Not Found' }
];
