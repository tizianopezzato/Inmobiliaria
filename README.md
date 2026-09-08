# Inmobiliaria — Guía paso a paso

Esta guía está pensada para alguien que no programa. Seguí los pasos **en orden**.

## 1. Qué vas a necesitar

- Una computadora con Windows
- [Node.js LTS](https://nodejs.org/) instalado (descargá la versión LTS y siguiente, siguiente, instalar)
- Una cuenta gratis en [Supabase](https://supabase.com/)
- Un número de WhatsApp (con código de país, sin + ni espacios). Ejemplo Argentina: `5492211234567`

El código del sitio **ya está creado** en esta carpeta.

## 2. Crear el proyecto en Supabase

1. Entrá a [https://supabase.com](https://supabase.com) y creá una cuenta.
2. Tocá **New project**.
3. Elegí un nombre (por ejemplo `inmobiliaria`).
4. Inventá una contraseña de base de datos **y guardala**.
5. Elegí una región cercana (por ejemplo `South America`).
6. Esperá a que el proyecto termine de crearse (1 o 2 minutos).

## 3. Crear las tablas (SQL)

1. En el menú izquierdo de Supabase, tocá **SQL Editor**.
2. Tocá **New query**.
3. Abrí en esta carpeta el archivo `supabase/schema.sql`.
4. Copiá **todo** el contenido y pegalo en el editor de Supabase.
5. Tocá **Run**.
6. Si salió bien, vas a ver un mensaje de éxito.

Eso crea:

- la tabla `properties` (datos de cada propiedad)
- la tabla `property_images` (fotos)
- el almacenamiento de imágenes `property-images`
- las reglas de seguridad (el público puede ver, solo el martillero logueado puede cargar/editar/borrar)

## 4. Crear el usuario del martillero

1. En Supabase, menú **Authentication** → **Users**.
2. Tocá **Add user** → **Create new user**.
3. Completá un email y una contraseña (son los datos para entrar a `/admin`).
4. Activá **Auto Confirm User**.
5. Guardá.

## 5. Copiar las claves al archivo `.env.local`

1. En Supabase, menú **Project Settings** (el engranaje) → **API**.
2. Copiá:
   - **Project URL**
   - **anon public** key
3. En la carpeta del proyecto, copiá el archivo `.env.example` y renombralo a `.env.local`.
4. Completalo así (reemplazá los valores de ejemplo):

```
NEXT_PUBLIC_SUPABASE_URL=https://abcdefgh.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...
NEXT_PUBLIC_SITE_NAME=Inmobiliaria
NEXT_PUBLIC_WHATSAPP_NUMBER=5492211234567
NEXT_PUBLIC_PHONE=+54 221 000-0000
NEXT_PUBLIC_EMAIL=contacto@inmobiliaria.com
NEXT_PUBLIC_FACEBOOK_URL=https://facebook.com/tu-pagina
NEXT_PUBLIC_INSTAGRAM_URL=https://instagram.com/tu-usuario
```

Importante:

- `NEXT_PUBLIC_WHATSAPP_NUMBER` va **sin + y sin espacios**.
- No subas `.env.local` a internet. Ese archivo es privado.

## 6. Instalar y arrancar el sitio

Abrí **PowerShell** en esta carpeta y ejecutá:

```
npm install
npm run dev
```

Después abrí el navegador en:

[http://localhost:3000](http://localhost:3000)

## 7. Cargar propiedades (panel admin)

1. Andá a [http://localhost:3000/admin](http://localhost:3000/admin)
2. Ingresá con el email y la contraseña del paso 4.
3. Tocá el botón **+**.
4. Completá:
   - Tipo (Venta o Alquiler)
   - Título
   - Descripción
   - Metros cuadrados
   - Habitaciones
   - Baños
   - Cochera (Sí/No)
   - Imágenes
5. Publicá.

En el dashboard podés editar o eliminar.

## 8. Cómo está armado el sitio

- Inicio: hero, buscador y propiedades recientes
- Propiedades / Venta / Alquiler: grilla con foto, título y “Ver más”
- Detalle: galería, m², habitaciones, baños, cochera, descripción y botón de WhatsApp
- Contacto: teléfono, email, Facebook, Instagram, consulta y tasación por WhatsApp
- Footer: **solo** horarios y matrícula
- **Ninguna pantalla muestra precios**

## 9. Comandos útiles

```
npm run dev      # ver el sitio en tu computadora
npm run build    # preparar versión de producción
npm run start    # servir la versión de producción
```
