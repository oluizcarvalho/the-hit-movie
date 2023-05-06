import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';

import { PeopleDetailsRoutingModule } from './people-details-routing.module';
import { PeopleDetailsComponent } from './people-details.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { ListPosterModule } from '../../shared/components/list-poster/list-poster.module';

@NgModule({
	declarations: [PeopleDetailsComponent],
	imports: [CommonModule, PeopleDetailsRoutingModule, NgxSkeletonLoaderModule, NgOptimizedImage, ListPosterModule],
})
export class PeopleDetailsModule {}
