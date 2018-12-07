import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { 
    AuthGuardService as AuthGuard 
  } from '../guards/auth-guard.service';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'home' },
            { path: '', loadChildren: './home/home.module#HomeModule' },
            { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
            { path: 'user-profile', loadChildren: './user-profile/user-profile.module#UserProfileModule', canActivate: [AuthGuard]  },
            { path: 'user-profile/:id', loadChildren: './user-profile/user-profile.module#UserProfileModule', canActivate: [AuthGuard]  },
            { path: 'edit-user-profile', loadChildren: './edit-user-profile/edit-user-profile.module#EditUserProfileModule', canActivate: [AuthGuard]  },
            { path: 'competitions', loadChildren: './all-competitions/all-competitions.module#AllCompetitionsModule' },
            { path: 'competitions/selected_category/:id', loadChildren: './all-competitions/all-competitions.module#AllCompetitionsModule' },
            { path: 'competitions/selected_category/:id/competition-details/:id', loadChildren: './competition-details/competition-details.module#CompetitionDetailsModule' },
            { path: 'competitions/competition-details/:id', loadChildren: './competition-details/competition-details.module#CompetitionDetailsModule' },
            { path: 'participant', loadChildren: './participant-form/participant-form.module#ParticipantFormModule', canActivate: [AuthGuard] },
            { path: 'login', loadChildren: './login/login.module#LoginModule' },
            { path: 'signup', loadChildren: './signup/signup.module#SignupModule' },
            { path: 'review-analytics', loadChildren: './review-analytics/review-analytics.module#ReviewAnalyticsModule' },
            { path: 'charts', loadChildren: './charts/charts.module#ChartsModule' },
            { path: 'tables', loadChildren: './tables/tables.module#TablesModule' },
            { path: 'forms', loadChildren: './form/form.module#FormModule' },
            { path: 'bs-element', loadChildren: './bs-element/bs-element.module#BsElementModule' },
            { path: 'grid', loadChildren: './grid/grid.module#GridModule' },
            { path: 'components', loadChildren: './bs-component/bs-component.module#BsComponentModule' },
            { path: 'blank-page', loadChildren: './blank-page/blank-page.module#BlankPageModule' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}
