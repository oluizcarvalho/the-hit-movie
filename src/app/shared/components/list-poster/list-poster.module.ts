import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { PipesModule } from '../../pipes/pipes.module';
import { ListPosterComponent } from './list-poster.component';
import { RouterModule } from '@angular/router';
import { SwiperModule } from 'swiper/angular';

@NgModule({
	declarations: [ListPosterComponent],
	imports: [CommonModule, NgxSkeletonLoaderModule, PipesModule, RouterModule, SwiperModule],
	exports: [ListPosterComponent],
})
export class ListPosterModule {}
