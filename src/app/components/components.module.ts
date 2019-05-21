import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgotPassComponent } from './forgot-pass/forgot-pass.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [ForgotPassComponent],
  imports: [
    IonicModule,
    CommonModule
  ],
  entryComponents: [
    ForgotPassComponent
  ]
})
export class ComponentsModule { }
