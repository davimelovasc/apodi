import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-forgot-pass',
  templateUrl: './forgot-pass.component.html',
  styleUrls: ['./forgot-pass.component.scss'],
})
export class ForgotPassComponent implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  close() {
    this.modalCtrl.dismiss();
  }

}
