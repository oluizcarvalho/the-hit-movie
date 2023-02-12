import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule, TitleStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TemplatePageTitleStrategy } from './strategy/title-page.strategy';

@NgModule({
	declarations: [HeaderComponent],
	imports: [CommonModule, BrowserModule, BrowserAnimationsModule, RouterModule, HttpClientModule],
	exports: [BrowserModule, BrowserAnimationsModule, RouterModule, HttpClientModule, HeaderComponent],
	providers: [
		{
			provide: TitleStrategy,
			useClass: TemplatePageTitleStrategy,
		},
	],
})
export class CoreModule {}