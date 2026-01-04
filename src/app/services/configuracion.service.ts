import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class ConfiguracionService {
  private readonly PERMITIR_BORRAR_KEY = 'permiteBorrar';

  constructor() {}

  async setPermitirBorrar(valor: boolean): Promise<void> {
    await Preferences.set({
      key: this.PERMITIR_BORRAR_KEY,
      value: JSON.stringify(valor)
    });
  }

  async getPermitirBorrar(): Promise<boolean> {
    try {
      const resultado = await Preferences.get({ key: this.PERMITIR_BORRAR_KEY });
      return resultado.value ? JSON.parse(resultado.value) : false;
    } catch (error) {
      console.error('Error al obtener configuración:', error);
      return false;
    }
  }
}
