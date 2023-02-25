import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchComponent } from './search.component';

const routes: Routes = [
	{ path: ':type', component: SearchComponent, title: 'Search' },
	{ path: '', component: SearchComponent, title: 'Search' },
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class SearchRoutingModule {}
