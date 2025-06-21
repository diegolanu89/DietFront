import { AUTH_CONFIG } from "../config/parameters";

/**
 * Interfaz que define el contrato de los servicios de autenticación.
 */
interface AuthService {
  startSession: (
    token: number
  ) => Promise<{ success: boolean; token?: number; message?: string }>;
}

/**
 * Clase que encapsula la lógica de autenticación, utilizando ya sea un servicio simulado
 * o el backend real, dependiendo del entorno configurado.
 */
export class ApiService implements AuthService {
  private isDevelopment: boolean;
  private apiUrl: string;
  private errorMessages: { INVALID_TOKEN: string; CONNECTION: string };

  constructor() {
    // Determina el entorno y carga las configuraciones externas
    this.isDevelopment = AUTH_CONFIG.IS_DEV_MODE;
    this.apiUrl = AUTH_CONFIG.URL_API;
    this.errorMessages = AUTH_CONFIG.ERRORS;
  }

  /**
   * Inicia una sesión con el token proporcionado.
   * Elige automáticamente entre el servicio simulado o el real.
   * @param token - Token numérico ingresado por el usuario.
   * @returns Resultado de la operación (éxito o fallo con mensaje).
   */
  async startSession(
    token: number
  ): Promise<{ success: boolean; token?: number; message?: string }> {
    if (this.isDevelopment) {
      return this.startMockSession(token);
    }
    return this.startBackendSession(token);
  }

  /**
   * Servicio simulado para pruebas locales.
   */
  private async startMockSession(token: number) {
    const mockToken = AUTH_CONFIG.MOCK_TOKEN;
    return new Promise<{ success: boolean; token?: number; message?: string }>(
      (resolve, reject) => {
        setTimeout(() => {
          if (token === mockToken) {
            resolve({ success: true, token: mockToken });
          } else {
            reject({
              success: false,
              message: this.errorMessages.INVALID_TOKEN,
            });
          }
        }, 500);
      }
    );
  }

  /**
   * Servicio real contra el backend configurado.
   */
  private async startBackendSession(token: number) {
    try {
      const response = await fetch(`${this.apiUrl}/auth`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });

      const data = await response.json();

      if (response.ok) {
        return { success: true, token: data.token };
      } else {
        throw new Error(this.errorMessages.INVALID_TOKEN);
      }
    } catch {
      throw new Error(this.errorMessages.CONNECTION);
    }
  }
}
