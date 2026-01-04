import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CitasService, Cita } from '../services/citas.service';
import { ConfiguracionService } from '../services/configuracion.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class HomePage implements OnInit {
  citaActual: Cita | null = null;
  permiteBorrar: boolean = false;

  constructor(
    private citasService: CitasService,
    private configuracionService: ConfiguracionService
  ) {}

  ngOnInit() {
    this.cargarCitaAleatoria();
    this.cargarConfiguracion();
  }

  ionViewWillEnter() {
    this.cargarCitaAleatoria();
  }

  cargarCitaAleatoria() {
    this.citaActual = this.citasService.obtenerCitaAleatoria();
  }

  async cargarConfiguracion() {
    this.permiteBorrar = await this.configuracionService.getPermitirBorrar();
  }

  obtenerNuevaCita() {
    this.cargarCitaAleatoria();
  }

  eliminarCita() {
    if (this.citaActual && this.permiteBorrar) {
      this.citasService.eliminarCita(this.citaActual.id);
      this.cargarCitaAleatoria();
    }
  }
}
