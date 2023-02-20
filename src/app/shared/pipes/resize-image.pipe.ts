import { Pipe, PipeTransform } from '@angular/core';

export enum Resolutions {
	'384x528' = '_V1_UX384_CR0,9,384,528_AL_.jpg',
}

@Pipe({
	name: 'resizeImage',
})
export class ResizeImagePipe implements PipeTransform {
	transform(value: string | undefined, resolution: keyof typeof Resolutions): string {
		if (!value) return '';
		const index = value.lastIndexOf('_V1');
		const image = value.slice(0, index);
		return image + Resolutions[resolution];
	}
}
