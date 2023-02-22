import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetailsRoutingModule } from './details-routing.module';
import { DetailsComponent } from './details.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@NgModule({
	declarations: [DetailsComponent],
	imports: [CommonModule, DetailsRoutingModule, NgxSkeletonLoaderModule],
})
export class DetailsModule {}
