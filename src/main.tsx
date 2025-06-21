// Importa ReactDOM desde el nuevo paquete react-dom/client, recomendado para React 18+
import ReactDOM from "react-dom/client";

// Importa el componente raíz de la aplicación
import App from "./App";

// Importa los estilos globales CSS de la app (colores, tipografías, layouts generales)
import "./css/appStyle.css";

// Crea la raíz de la aplicación React vinculándola al elemento HTML con id "root"
ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    {/* Renderiza el componente principal App dentro del DOM */}
    <App />
  </>
);
