# Curseando

**Plataforma de Cursos Online**

## Instalación

### Prerrequisitos

- **Java Development Kit (JDK)** 21 o superior
- **Maven** 3.6 o superior
- **Node.js** 14 o superior
- **npm** (incluido con Node.js)
- **Angular CLI** 15 (`npm install -g @angular/cli@15`)

### Configuración del Backend

1. Navega al directorio del backend:
```bash
cd curseando-backend
```

2. Instala las dependencias:
```bash
mvn clean install
```

### Configuración del Frontend

1. Navega al directorio del frontend:
```bash
cd curseando-frontend
```

2. Instala las dependencias:
```bash
npm install
```

## Ejecución de la Aplicación

### Backend

Desde el directorio `curseando-backend`:
```bash
mvn spring-boot:run
```

El servidor backend se iniciará en **http://localhost:8080**

### Frontend

Desde el directorio `curseando-frontend`:
```bash
ng serve
```

La aplicación frontend se iniciará en **http://localhost:4200**

Abre tu navegador y navega a `http://localhost:4200` para acceder a la aplicación.

**Nota**: Asegúrate de que el backend esté ejecutándose antes de iniciar el frontend.
