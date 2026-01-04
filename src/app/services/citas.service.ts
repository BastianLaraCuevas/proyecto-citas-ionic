import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Cita {
  id: number;
  frase: string;
  autor: string;
  fechaCreacion: Date;
}

@Injectable({
  providedIn: 'root'
})
export class CitasService {
  private citas: Cita[] = [
    { id: 1, frase: 'La vida es lo que pasa mientras estás ocupado haciendo otros planes', autor: 'John Lennon', fechaCreacion: new Date() },
    { id: 2, frase: 'Sé el cambio que quieres ver en el mundo', autor: 'Mahatma Gandhi', fechaCreacion: new Date() },
    { id: 3, frase: 'La única manera de hacer un gran trabajo es amar lo que haces', autor: 'Steve Jobs', fechaCreacion: new Date() },
    { id: 4, frase: 'El éxito es la suma de pequeños esfuerzos repetidos día tras día', autor: 'Robert Collier', fechaCreacion: new Date() },
    { id: 5, frase: 'No cuentes los días, haz que los días cuenten', autor: 'Muhammad Ali', fechaCreacion: new Date() }
  ];
  
  private citasSubject = new BehaviorSubject<Cita[]>(this.citas);
  
  constructor() { }
  
  obtenerCitas(): Observable<Cita[]> {
    return this.citasSubject.asObservable();
  }
  
  obtenerCitaAleatoria(): Cita | null {
    if (this.citas.length === 0) return null;
    const indice = Math.floor(Math.random() * this.citas.length);
    return this.citas[indice];
  }
  
  agregarCita(frase: string, autor: string): void {
    const nuevaCita: Cita = {
      id: Date.now(),
      frase,
      autor,
      fechaCreacion: new Date()
    };
    this.citas.push(nuevaCita);
    this.citasSubject.next([...this.citas]);
  }
  
  eliminarCita(id: number): void {
    this.citas = this.citas.filter(cita => cita.id !== id);
    this.citasSubject.next([...this.citas]);
  }
}
