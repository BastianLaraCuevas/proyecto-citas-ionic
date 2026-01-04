import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ConfiguracionService } from '../../services/configuracion.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.page.html',
  styleUrls: ['./configuracion.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class ConfiguracionPage implements OnInit {
  permiteBorrar: boolean = false;

  constructor(
    private configuracionService: ConfiguracionService,
    private alertController: AlertController
  ) {}

  async ngOnInit() {
    this.permiteBorrar = await this.configuracionService.getPermitirBorrar();
  }

  async guardarConfiguracion() {
    await this.configuracionService.setPermitirBorrar(this.permiteBorrar);
  }

  async limpiarDatos() {
    const alert = await this.alertController.create({
      header: 'Confirmar',
      message: '¿Estás seguro de que quieres eliminar TODAS las citas?',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        { text: 'Eliminar', handler: () => {
            this.mostrarMensaje('Datos limpiados correctamente');
          }
        }
      ]
    });
    await alert.present();
  }

  async mostrarMensaje(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Información',
      message: mensaje,
      buttons: ['OK']
    });
    await alert.present();
  }
}
