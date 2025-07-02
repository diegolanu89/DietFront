// 📌 Rutas principales utilizadas en la aplicación
export const PATHS = {
  HOME: "/home", // Página de inicio
  INFO: "/info", // Página informativa
  LOGIN: "/login", // Página de login
  REGISTER: "/register", // Página de registro de usuario (si se implementa)
  ALL_DIET: "/todasLasDietas",
};

// ⚙️ Configuración para el componente AppBarHeader
export const APPBAR_CONFIG = {
  TITLE: "Mi Aplicación", // Título visible en la barra superior

  COLORS: {
    BACKGROUND: "linear-gradient(90deg, #ECECEC 0%, #F6F6F6 100%)", // Fondo degradado
    TEXT: "#333", // Color del texto del AppBar
  },

  ROUTES: {
    NO_BACK: ["/", "/login"], // Rutas en las que NO debe mostrarse el botón de retroceso
    HOME: "/", // Ruta del botón de "Inicio"
  },

  LABELS: {
    PROFILE: "Perfil", // Opción de menú para ver perfil
    HOME: "Inicio", // Opción para ir al inicio
    LOGOUT: "Cerrar sesión", // Opción para cerrar sesión
  },
};

export const SECURITY_LIMITS = {
  MAX_LOGIN_ATTEMPTS: 5,
  MIN_PASSWORD_LENGTH: 6,
};

export const LOGIN_TEXTS = {
  TITLE: "Iniciar Sesión",
  REGISTER_TITLE: "Registrarse",
  EMAIL_LABEL: "Correo electrónico",
  PASSWORD_LABEL: "Contraseña",
  NAME_LABEL: "Nombre completo",
  BUTTON_TEXT: "Entrar",
  REGISTER_BUTTON: "Crear cuenta",
  TOGGLE_LABEL: "¿No tenés cuenta? Registrate",
  LOADING_TEXT: "Procesando...",
  ERROR_MESSAGE: "Email o contraseña incorrectos",
  ATTEMPTS_EXCEEDED:
    "Demasiados intentos. Espera unos segundos e intenta nuevamente.",
  PASSWORD_TOO_SHORT: (min: number) =>
    `Contraseña demasiado corta (mínimo ${min} caracteres).`,
  INVALID_NAME: "Nombre inválido. Solo letras y espacios, mínimo 2 caracteres.",
  INVALID_EMAIL: "Debe ingresar un correo electrónico válido.",
  REDIRECT_PATH: "/",
  INVALID_CREDENTIALS: "Email o contraseña inválidos.",
  TOO_MANY_ATTEMPTS_COOLDOWN:
    "Demasiados intentos. Espera unos segundos e intenta nuevamente.",
  RECAPTCHA_FAILED:
    "La verificación reCAPTCHA no fue completada correctamente.",
};

export const AUTH_LIMITS = {
  MAX_ATTEMPTS: 5,
  MIN_PASSWORD_LENGTH: 6,
  COOLDOWN_SECONDS: 30, // tiempo de espera tras superar los intentos
};

// 🎨 Estilos reutilizables para el componente de login
export const LOGIN_STYLES = {
  BACKGROUND_COLOR: "#f5f5f5", // Color de fondo de la pantalla de login
  MAX_WIDTH: 400, // Ancho máximo del formulario
  PADDING_MOBILE: 3, // Padding interno en móviles (usado en Paper)
  PADDING_DESKTOP: 4, // Padding en escritorio
  BORDER_RADIUS: 3, // Bordes redondeados del contenedor
};

export const AUTH_CONFIG = {
  // Detecta si el entorno es de desarrollo
  IS_DEV_MODE: import.meta.env.MODE === "development",

  // URL de la API del backend (configurable por entorno)
  URL_API: import.meta.env.VITE_API_URL || "http://localhost:3000/api",

  // Token permitido en modo de desarrollo (simulado)
  MOCK_TOKEN: 5000,

  // Mensajes de error reutilizables
  ERRORS: {
    INVALID_TOKEN: "Token inválido",
    CONNECTION: "Error de conexión",
  },
};

export const AUTH_CONFIG_ATLAS = {
  API_URL: "https://your-api-hostname.com/api", // ← Cambiar por el dominio real del backend conectado a Mongo Atlas
};

export const AUTH_CONFIG_MONGO = {
  BASE_URL:
    import.meta.env.VITE_API_URL + "/auth" || "http://localhost:8080/auth", // se adapta al entorno
  LOGIN_PATH: "/login",
  LOGOUT_PATH: "/logout",
  REGISTER_PATH: "/register", // ← Agregado
};

export const AUTH_CONFIG_MOCK = {
  ID: "123456",
  EMAIL: "demo@mock.com",
  NAME: "Usuario Demo",
  PASSWORD: "123456",
  STORAGE_KEY: "userData", // usado por onAuthStateChanged
};

export const LOGIN_MESSAGES = {
  ERROR_TOO_MANY_ATTEMPTS:
    "Demasiados intentos. Espera unos segundos e intenta nuevamente.",
  ERROR_INVALID_INPUT:
    "Email inválido o contraseña demasiado corta (mínimo 6 caracteres).",
  ERROR_INVALID_NAME:
    "Nombre inválido. Solo letras y espacios, mínimo 2 caracteres.",
  ERROR_GENERIC: "Hubo un error al procesar la solicitud.",
  HTTPS_WARNING:
    "Esta aplicación requiere conexión segura (HTTPS) para funcionar correctamente.",
};

export const RECAPTCHA_KEYS = {
  SITE_KEY: "6LffC2krAAAAANdUq0hIpw5rjdrUux9rrSMY33FL", // reemplazá por tu clave pública de Google reCAPTCHA v2 invisible
};

export const DIET_CONFIG_MONGO = {
  BASE_URL: import.meta.env.VITE_API_URL + "/api/diet",
  ALL: "", // GET /api/diet
  MINE: "/mis-dietas", // GET /api/diet/mis-dietas
  BY_ID: "", // para usar manualmente /:id
  BASE: "", // POST en /api/diet
  ERRORS: {
    FETCH_ALL: "No se pudieron obtener las dietas públicas.",
    FETCH_OWN: "No se pudieron obtener tus dietas.",
    FETCH_ONE: "No se pudo obtener la dieta solicitada.",
    CREATE: "No se pudo crear la dieta.",
    UPDATE: "No se pudo actualizar la dieta.",
    DELETE: "No se pudo eliminar la dieta.",
  },
};
