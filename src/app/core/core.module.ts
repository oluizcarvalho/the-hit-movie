import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule, TitleStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TemplatePageTitleStrategy } from './strategy/title-page.strategy';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
	declarations: [HeaderComponent],
	imports: [
		CommonModule,
		BrowserModule,
		BrowserAnimationsModule,
		RouterModule,
		HttpClientModule,
		MatIconModule,
		MatButtonModule,
	],
	exports: [BrowserModule, BrowserAnimationsModule, RouterModule, HttpClientModule, HeaderComponent],
	providers: [
		{
			provide: TitleStrategy,
			useClass: TemplatePageTitleStrategy,
		},
	],
})
export class CoreModule {}
