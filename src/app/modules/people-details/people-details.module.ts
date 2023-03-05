import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PeopleDetailsRoutingModule } from './people-details-routing.module';
import { PeopleDetailsComponent } from './people-details.component';

@NgModule({
	declarations: [PeopleDetailsComponent],
	imports: [CommonModule, PeopleDetailsRoutingModule],
})
export class PeopleDetailsModule {}
