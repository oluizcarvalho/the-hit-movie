import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResizeImagePipe } from './resize-image.pipe';

@NgModule({
	declarations: [ResizeImagePipe],
	imports: [CommonModule],
	exports: [ResizeImagePipe],
})
export class PipesModule {}
