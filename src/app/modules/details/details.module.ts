import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetailsRoutingModule } from './details-routing.module';
import { DetailsComponent } from './details.component';
import { MatChipsModule } from '@angular/material/chips';

@NgModule({
	declarations: [DetailsComponent],
	imports: [CommonModule, DetailsRoutingModule, MatChipsModule],
})
export class DetailsModule {}
