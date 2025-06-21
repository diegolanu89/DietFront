import React from "react";

// 🎯 Definición de las props que el componente espera recibir
interface HelloWorldProps {
  name: string; // Nombre que será mostrado en el saludo
}

// 📦 Componente funcional que saluda al usuario por su nombre
const HelloWorld: React.FC<HelloWorldProps> = ({ name }) => {
  // 🖨️ Renderiza un encabezado h1 con el texto "Hello, {name}!"
  return <h1>Hello, {name}!</h1>;
};

// 🧩 Exportación del componente para su uso en otras partes de la app
export default HelloWorld;
