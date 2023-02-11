import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
	declarations: [HeaderComponent],
	imports: [CommonModule, RouterModule, BrowserModule, BrowserAnimationsModule, HttpClientModule],
	exports: [HttpClientModule, RouterModule, BrowserModule, BrowserAnimationsModule],
})
export class CoreModule {}
