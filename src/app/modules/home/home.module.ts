import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { SwiperModule } from 'swiper/angular';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { PipesModule } from '../../shared/pipes/pipes.module';
import { ListPosterModule } from '../../shared/components/list-poster/list-poster.module';

@NgModule({
	declarations: [HomeComponent],
	imports: [CommonModule, HomeRoutingModule, SwiperModule, NgxSkeletonLoaderModule, PipesModule, ListPosterModule],
})
export class HomeModule {}
