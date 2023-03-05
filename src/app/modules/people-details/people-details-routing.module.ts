import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PeopleDetailsComponent } from './people-details.component';

const routes: Routes = [
	{
		path: '',
		component: PeopleDetailsComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class PeopleDetailsRoutingModule {}
