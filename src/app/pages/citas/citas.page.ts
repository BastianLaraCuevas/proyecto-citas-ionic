import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CitasService, Cita } from '../../services/citas.service';

@Component({
  selector: 'app-citas',
  templateUrl: './citas.page.html',
  styleUrls: ['./citas.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IonicModule]
})
export class CitasPage implements OnInit {
  citas: Cita[] = [];
  citaForm: FormGroup;

  constructor(
    private citasService: CitasService,
    private fb: FormBuilder
  ) {
    this.citaForm = this.fb.group({
      frase: ['', [Validators.required, Validators.minLength(5)]],
      autor: ['', [Validators.required, Validators.minLength(2)]]
    });
  }

  ngOnInit() {
    this.cargarCitas();
  }

  cargarCitas() {
    this.citasService.obtenerCitas().subscribe(citas => {
      this.citas = citas;
    });
  }

  agregarCita() {
    if (this.citaForm.valid) {
      const { frase, autor } = this.citaForm.value;
      this.citasService.agregarCita(frase, autor);
      this.citaForm.reset();
    }
  }

  eliminarCita(id: number) {
    this.citasService.eliminarCita(id);
  }

  get frase() { return this.citaForm.get('frase'); }
  get autor() { return this.citaForm.get('autor'); }
}
