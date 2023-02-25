import { Pipe, PipeTransform } from '@angular/core';

export enum Resolutions {
	'360x470' = '_V1_UX360_CR1,360,470_AL_.jpg',
	'218x267' = '_V1_UX218_CR1,218,267_AL_.jpg',
	'240x315' = '_V1_UX240_CR1,240,315_AL_.jpg',
	'600x900' = '_V1_UX600_CR1,600,900_AL_.jpg',
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
