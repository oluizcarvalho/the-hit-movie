import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetailsRoutingModule } from './details-routing.module';
import { DetailsComponent } from './details.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { ListPosterModule } from '../../shared/components/list-poster/list-poster.module';
import { SwiperModule } from 'swiper/angular';
import { PipesModule } from '../../shared/pipes/pipes.module';

@NgModule({
	declarations: [DetailsComponent],
	imports: [CommonModule, DetailsRoutingModule, NgxSkeletonLoaderModule, ListPosterModule, SwiperModule, PipesModule],
})
export class DetailsModule {}
