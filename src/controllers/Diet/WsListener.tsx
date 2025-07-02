import { useEffect, useState } from "react";

/**
 * Componente que se suscribe a ws://localhost:8080/ws
 * y muestra en tiempo real los mensajes recibidos.
 */
const WsListener = () => {
  const [mensajes, setMensajes] = useState<string[]>([]);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8081/ws");

    socket.onopen = () => {
      console.log("✅ Conectado al WebSocket");
    };

    socket.onmessage = (event) => {
      console.log("📩 Mensaje recibido:", event.data);
      setMensajes((prev) => [...prev, event.data]);
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

  return (
    <div style={{ padding: 16 }}>
      <h3>Mensajes WebSocket</h3>
      <ul>
        {mensajes.map((msg, i) => (
          <li key={i}>{msg}</li>
        ))}
      </ul>
    </div>
  );
};

export default WsListener;
