import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CitasService, Cita } from '../../services/citas.service';
import { IonItemOption } from "@ionic/angular/standalone";

@Component({
  selector: 'app-citas',
  templateUrl: './citas.page.html',
  styleUrls: ['./citas.page.scss'],
})
export class CitasPage implements OnInit {
  citas: Cita[] = [];
  citaForm: FormGroup;

  constructor(
    private citasService: CitasService,
    private fb: FormBuilder
  ) {
    // Inicializar formulario con validaciones
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
      
      // Mostrar mensaje de éxito (en una app real usarías un toast)
      console.log('Cita agregada exitosamente');
    }
  }

  eliminarCita(id: number) {
    this.citasService.eliminarCita(id);
  }

  // Getters para acceder fácilmente a los controles del formulario
  get frase() { return this.citaForm.get('frase'); }
  get autor() { return this.citaForm.get('autor'); }
}
