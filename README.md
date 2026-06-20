# Portafolio Técnico - Guillermo Vásquez

Este es el repositorio del portafolio personal y profesional de **Guillermo Vásquez**, **Ingeniero de Sistemas Aplicados**. El objetivo central de este proyecto es demostrar capacidades avanzadas en arquitectura de software, hiper-optimización de flujos, ecosistemas serverless e integración de tecnologías (IoT, Edge Computing, Bases de Datos Relacionales).

## 🚀 Objetivo del Proyecto

El sitio web sirve como un documento vivo y técnico (no solo un currículum) diseñado para "traducir la complejidad al lenguaje de negocio". A través del portafolio se presentan:
- **Enfoque Tecnológico:** Eliminación de cuellos de botella operativos y optimización de flujos asíncronos.
- **Arquitecturas Complejas:** Diagramas y explicaciones de integraciones de IoT, sistemas distribuidos y estructuración de bases de datos relacionales.
- **Identidad Profesional:** Un diseño con alto rigor técnico en "Dark Mode" diseñado para impresionar visualmente bajo los estándares del "Consejo de Agentes".

## 🛠️ Stack Tecnológico

Aunque la filosofía del desarrollador valora el entendimiento base por encima de los frameworks de moda, este proyecto ha sido construido utilizando herramientas modernas para garantizar el mejor rendimiento, SEO y experiencia de usuario (UX):

- **Framework Core:** [Next.js](https://nextjs.org/) (App Router) - Para renderizado rápido, rutas estáticas y optimización SEO automática.
- **Lenguaje:** TypeScript - Proveyendo estricto tipado estático y seguridad en el código.
- **Estilos:** [Tailwind CSS](https://tailwindcss.com/) - Para un sistema de diseño directo, modular y con modo oscuro optimizado.
- **Motor de Base de Datos:** Prisma ORM - Esquemas estructurados para un eventual manejo de datos dinámicos.
- **Iconografía y Fuentes:** `next/font` (Inter y Fira Code) y SVGs personalizados.

## 📂 Arquitectura y Piezas Principales

El proyecto sigue una estructura limpia orientada a componentes, usando el paradigma del *App Router* de Next.js:

- `app/layout.tsx`: Archivo principal de jerarquía. Controla todo el contenedor de la aplicación, inyecta fuentes, y establece parámetros clave de SEO (OpenGraph, Json-LD, iconos).
- `app/page.tsx`: Punto de entrada principal y ensamblador del sitio. Orquesta todos los componentes visuales de la "Landing Page".
- `components/`: Directorio donde vive la lógica visual desacoplada. Incluye componentes como:
  - `About.tsx`: Sección principal sobre filosofía de trabajo y mentalidad de ingeniería.
  - `Approach.tsx`: Explicación metodológica.
  - `Navbar.tsx`: Navegación principal.
- `public/`: Assets estáticos. 
  - `/images/`: Contiene diagramas técnicos (IoT, Serverless), GIFs de demostración y optimizaciones gráficas vitales.
- `prisma/`: Configuraciones de bases de datos.

## ⚙️ Desarrollo Local

Para probar e interactuar con la aplicación localmente:

1. **Instalar dependencias:**
   ```bash
   npm install
   ```
2. **Levantar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```
3. **Explorar:**
   Visita automáticamente [http://localhost:3000](http://localhost:3000) en tu navegador. 

## 🛡️ Principios y Estándares

Cada línea de código aquí sigue el precepto de **eliminar la fricción**. Si una parte de la infraestructura no agiliza el rendimiento final o no sirve para una verdadera justificación de negocio, **se rediseña o se elimina**.

---
*Hecho por y para el escrutinio técnico. Guillermo Vásquez - 2026*
