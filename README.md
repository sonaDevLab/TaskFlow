# 🗂 Task Manager App

Aplicación **full-stack de gestión de tareas** que permite a los usuarios crear, organizar y gestionar sus tareas de forma sencilla y segura.

El proyecto combina un **frontend moderno** con React y Tailwind CSS junto a una **API REST desarrollada con Spring Boot**, incluyendo autenticación basada en **JWT**.

---

# 📌 Descripción

Task Manager es una aplicación web diseñada para mejorar la productividad personal mediante la gestión de tareas.

Los usuarios pueden registrarse, iniciar sesión y administrar sus tareas en un entorno seguro gracias al uso de **autenticación con JSON Web Tokens (JWT)**.

La aplicación sigue una arquitectura **cliente-servidor**, donde el frontend consume una API REST desarrollada con Spring Boot.

---

# ✨ Funcionalidades

- 🔐 Registro e inicio de sesión de usuarios
- 📝 Crear nuevas tareas
- ✏️ Editar tareas existentes
- ✅ Marcar tareas como completadas
- 🗑 Eliminar tareas
- 🔒 Autenticación segura mediante **JWT**
- 🌐 Aplicación desplegada en la nube

---

# 🛠 Tecnologías utilizadas

## Backend

![Java](https://img.shields.io/badge/Java-red?style=for-the-badge&logo=java)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-green?style=for-the-badge&logo=springboot)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=jsonwebtokens)

- **Java**
- **Spring Boot**
- **Spring Security**
- **JWT Authentication**
- **REST API**

---

## Frontend

![React](https://img.shields.io/badge/React-blue?style=for-the-badge&logo=react)
![JavaScript](https://img.shields.io/badge/JavaScript-yellow?style=for-the-badge&logo=javascript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-blue?style=for-the-badge&logo=tailwindcss)

- **React**
- **JavaScript**
- **Tailwind CSS**

---

## ☁️ Deploy

![Vercel](https://img.shields.io/badge/Vercel-black?style=for-the-badge&logo=vercel)
![Railway](https://img.shields.io/badge/Railway-purple?style=for-the-badge&logo=railway)

- **Frontend:** Vercel  
- **Backend:** Railway  

---

# 🏗 Arquitectura

La aplicación sigue una arquitectura **Full-Stack basada en cliente-servidor**:
- **Frontend**: se encarga de la interfaz de usuario y consume la API REST. Está desarrollado en **React** con estilos mediante **Tailwind CSS**.
- **Backend**: expone una **API REST** con **Spring Boot**, maneja la lógica de negocio y la persistencia de datos. La seguridad está implementada con **Spring Security** y **JWT**.
- **Base de datos**: persistencia de usuarios y tareas con **PostgreSQL**.
- **Comunicación**: el frontend realiza llamadas HTTP al backend, enviando el **token JWT** para validar cada acción.

---

# 📚 Cosas que aprendí

- Implementar **autenticación y autorización segura** usando JWT con **Spring Security**.
- Crear un **frontend interactivo** con React y manejar estados complejos.
- Conectar **frontend y backend** de manera eficiente consumiendo una **API REST**.
- **Deploy** de aplicaciones full-stack en la nube usando **Vercel y Railway**.
- Uso de **Tailwind CSS** para un diseño responsivo y moderno sin escribir mucho CSS manual.
- Buenas prácticas de arquitectura **cliente-servidor** y separación de responsabilidades.

---

# ⚠️ Retos enfrentados

- Integrar **JWT** correctamente entre frontend y backend para proteger rutas privadas.
- Manejar el estado de la aplicación en React para **actualizar la UI** al crear, editar o eliminar tareas.
- Configurar **CORS y seguridad** para permitir que el frontend desplegado en Vercel se comunique con el backend en Railway.
- Optimizar el **despliegue full-stack** y mantener consistencia entre entornos de desarrollo y producción.
- Aprender a estructurar un proyecto full-stack profesional **combinando tecnologías** diferentes.
