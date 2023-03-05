import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{ path: 'home', redirectTo: '', pathMatch: 'full' },
	{ path: '', loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule), title: 'Home' },
	{
		path: 'search',
		loadChildren: () => import('./modules/search/search.module').then(m => m.SearchModule),
		title: 'Search',
	},
	{
		path: 'details/:tt',
		loadChildren: () => import('./modules/details/details.module').then(m => m.DetailsModule),
		title: 'Details',
	},
	{
		path: 'people/:nm',
		loadChildren: () => import('./modules/people-details/people-details.module').then(m => m.PeopleDetailsModule),
		title: 'People Details',
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes, { useHash: true })],
	exports: [RouterModule],
})
export class AppRoutingModule {}
