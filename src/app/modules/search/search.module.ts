import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchRoutingModule } from './search-routing.module';
import { SearchComponent } from './search.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { ListPosterModule } from '../../shared/components/list-poster/list-poster.module';
import { PipesModule } from '../../shared/pipes/pipes.module';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@NgModule({
	declarations: [SearchComponent],
	imports: [
		CommonModule,
		SearchRoutingModule,
		MatChipsModule,
		MatFormFieldModule,
		MatInputModule,
		MatIconModule,
		ReactiveFormsModule,
		MatButtonModule,
		ListPosterModule,
		PipesModule,
		NgxSkeletonLoaderModule,
	],
})
export class SearchModule {}
