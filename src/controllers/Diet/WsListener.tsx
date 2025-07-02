/**
 * @file WsListener.tsx
 * @description Componente React que se conecta a un WebSocket y muestra notificaciones tipo Snackbar con los mensajes recibidos.
 *              Este componente está pensado para usarse globalmente en la aplicación, permitiendo mostrar mensajes
 *              en tiempo real emitidos por un servidor WebSocket.
 */

import { useEffect, useState } from "react";
import { Snackbar, Alert } from "@mui/material";

/**
 * Componente que se conecta al WebSocket en `ws://localhost:8081/ws` y escucha mensajes entrantes.
 * Cada mensaje recibido se muestra brevemente al usuario como una notificación visual (Snackbar de Material UI).
 *
 * @component
 * @example
 * // Usar este componente en App.tsx o Layout para escuchar notificaciones globales
 * <WsListener />
 *
 * @remarks
 * Actualmente, los mensajes recibidos se almacenan en un array (`mensajes`) que no se muestra.
 * Puede ser útil si se desea llevar un historial o realizar otras acciones con los mensajes entrantes.
 */
const WsListener = () => {
  /**
   * Lista acumulada de mensajes recibidos. No utilizada actualmente en el render.
   */
  const [mensajes, setMensajes] = useState<string[]>([]);

  /**
   * Último mensaje recibido por WebSocket, utilizado para mostrar en el `Snackbar`.
   */
  const [ultimoMensaje, setUltimoMensaje] = useState<string | null>(null);

  /**
   * Estado que indica si el `Snackbar` debe mostrarse.
   */
  const [open, setOpen] = useState(false);

  /**
   * Hook de efecto que establece la conexión WebSocket al montar el componente.
   * Escucha eventos `onmessage`, `onopen`, `onerror` y `onclose`.
   * Cierra la conexión automáticamente al desmontar el componente.
   */
  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8081/ws");

    socket.onopen = () => {
      console.log("✅ Conectado al WebSocket");
    };

    socket.onmessage = (event) => {
      console.log("📩 Mensaje recibido:", event.data);

      setMensajes((prev) => [...prev, event.data]);
      setUltimoMensaje(event.data);
      setOpen(true);
    };

    socket.onerror = (err) => {
      console.error("❌ Error en WebSocket:", err);
    };

    socket.onclose = () => {
      console.warn("🔌 WebSocket cerrado");
    };

    return () => {
      socket.close();
    };
  }, []);

  /**
   * Maneja el cierre del `Snackbar`, ya sea manual o automático.
   */
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="info" sx={{ width: "100%" }}>
          {ultimoMensaje}
        </Alert>
      </Snackbar>
    </>
  );
};

export default WsListener;
