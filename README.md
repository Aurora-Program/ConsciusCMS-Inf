
# ConsciusCMS - Infrastructure as Code

## 📋 Descripción

<<<<<<< HEAD
**ConciusCMS** es un sistema de gestión de contenidos (CMS) serverless construido completamente en AWS usando infraestructura como código (IaC). Proporciona una solución escalable, segura y moderna para la gestión de contenido web con capacidades headless. Ademas el sistema tiene mecanismo para favorecer el la calidad de contenido en intennet a largo plazo
=======
**ConsciusCMS** es un sistema de gestión de contenidos (CMS) serverless construido completamente en AWS usando infraestructura como código (IaC). Proporciona una solución escalable, segura y moderna para la gestión de contenido web con capacidades headless.
>>>>>>> c08fa4da332fa7693128144eb0c044ea901914b4

## 🏗️ Arquitectura

El proyecto está construido con los siguientes componentes de AWS:

### 🔐 Autenticación y Autorización
- **Amazon Cognito User Pool** - Gestión de usuarios con MFA opcional
- **Grupos de usuarios** (Admin/Editor) con permisos granulares
- **Lambda Authorizer personalizado** - Autorización basada en JWT tokens

### 📊 Base de Datos
- **DynamoDB Tables**:
  - `Pages` - Gestión de páginas del sitio
  - `Schema` - Definición de componentes y estructura
  - `Settings` - Configuraciones del sistema
  - `SettingsSec` - Configuraciones sensibles
  - `Logins` - Auditoría de accesos de usuarios

### 🚀 API y Funciones
- **API Gateway REST API** - Endpoints para operaciones CRUD
- **Lambda Functions**:
  - `DDBAccessPages` - Gestión de páginas
  - `DDBAccessSchema` - Gestión de esquemas
  - `DDBAccessSettings` - Configuraciones públicas
  - `DDBAccessSettingsSec` - Configuraciones sensibles
  - `RecordLogin` - Registro de logins
  - `GetLastLogin` - Consulta de último acceso
  - `CognitoTokenAuthorizer` - Autorización personalizada

### 📁 Gestión de Archivos
- **S3 Integration** - Almacenamiento de archivos multimedia
- **CloudFront** (en desarrollo) - CDN para distribución global

## 🌐 Endpoints API

### Páginas
- `GET /pages` - Listar todas las páginas
- `GET /pages/{page}` - Obtener página específica
- `POST /pages` - Crear nueva página (Auth requerida)
- `PUT /pages` - Actualizar página (Auth requerida)
- `DELETE /pages` - Eliminar página (Auth requerida)

### Esquemas
- `GET /schema` - Listar esquemas
- `GET /schema/{page}` - Obtener esquema de página
- `POST /schema` - Crear esquema (Admin únicamente)
- `PUT /schema` - Actualizar esquema (Admin únicamente)
- `DELETE /schema` - Eliminar esquema (Admin únicamente)

### Configuraciones
- `GET /settings/{area}` - Obtener configuraciones públicas
- `POST /settings` - Crear configuración (Auth requerida)
- `GET /settingsSec/{area}` - Configuraciones sensibles (Auth requerida)
- `POST /settingsSec` - Crear configuración sensible (Auth requerida)

### Archivos
- `PUT /file/{folder}/{file}` - Subir archivo (Auth requerida)
- `GET /file/{folder}/{file}` - Descargar archivo

### Utilidades
- `GET /lastlogin` - Obtener último login del usuario (Auth requerida)

## 📁 Estructura del Proyecto

```
infrastructurasAWS/
├── README.md
├── new.yml                          # Template adicional
└── Infrastructures/
    ├── mainTemplate.yml             # Template principal del CMS
    └── accountFactory.yml           # Factory para múltiples cuentas
```

## 🚀 Despliegue

### Prerrequisitos

1. **AWS CLI** configurado con credenciales apropiadas
2. **CloudFormation** permisos de administrador
3. **Parámetros requeridos**:
   - Dominio web
   - Región de despliegue
   - Configuraciones de entorno

### Instalación

1. **Clonar el repositorio**
   ```bash
   git clone <repository-url>
   cd infrastructurasAWS
   ```

2. **Desplegar la infraestructura principal**
   ```bash
   aws cloudformation deploy \
     --template-file Infrastructures/mainTemplate.yml \
     --stack-name concius-cms \
     --capabilities CAPABILITY_NAMED_IAM \
     --parameter-overrides \
       Environment=prod \
       Domain=tu-dominio.com
   ```

3. **Para múltiples cuentas (opcional)**
   ```bash
   aws cloudformation deploy \
     --template-file Infrastructures/accountFactory.yml \
     --stack-name concius-accounts \
     --capabilities CAPABILITY_NAMED_IAM \
   ```

## ⚙️ Configuración

### Variables de Entorno

El sistema utiliza **AWS Systems Manager Parameter Store** para configuraciones:

- `/conciusapp/webdomain` - Dominio principal de la aplicación
- Variables de Cognito configuradas automáticamente

### Usuarios y Roles

1. **Admin**: Acceso completo a esquemas y configuraciones
2. **Editor**: Acceso limitado a contenido y páginas
3. **Guest**: Solo lectura a contenido público

### Configuración inicial

1. **Crear usuarios administradores** en Cognito User Pool
2. **Asignar grupos** apropiados (Admin/Editor)
3. **Configurar dominio personalizado** en API Gateway
4. **Configurar CloudFront** para CDN (opcional)

## 🔒 Seguridad

### Características de Seguridad

- ✅ **MFA Opcional** con software tokens
- ✅ **JWT Token validation** con aws-jwt-verify
- ✅ **Autorización granular** por endpoint
- ✅ **Auditoría de accesos** en DynamoDB
- ✅ **CORS configurado** para frontends específicos
- ✅ **Encriptación** en tránsito y reposo

### Políticas de Passwords

- Mínimo 8 caracteres
- Requiere mayúsculas, minúsculas, números y símbolos
- Contraseñas temporales válidas por 7 días

## 📊 Monitoreo y Logs

- **CloudWatch Logs** para todas las funciones Lambda
- **API Gateway logging** habilitado
- **Métricas de DynamoDB** disponibles
- **Cognito analytics** para gestión de usuarios

## 🛠️ Desarrollo

### Arquitectura Headless

El CMS está diseñado como una API headless, permitiendo:

- **Múltiples frontends** (React, Vue, Angular, etc.)
- **Aplicaciones móviles** nativas
- **Generadores de sitios estáticos** (Gatsby, Next.js)
- **Integraciones personalizadas**

### Extensibilidad

- **Funciones Lambda modulares** - Fácil modificación de lógica
- **Esquemas flexibles** - Tipos de contenido configurables
- **Configuraciones dinámicas** - Sin redeployment necesario

## 📈 Escalabilidad

- **DynamoDB** - Escalado automático
- **Lambda** - Concurrencia automática
- **API Gateway** - Manejo de tráfico ilimitado
- **CloudFront** - Distribución global (próximamente)

## 🔄 Versionado

El sistema incluye:
- **Timestamps automáticos** en todas las modificaciones
- **Usuario tracking** para auditoría
- **Condiciones de escritura** para prevenir conflictos

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📜 Licencia

Este proyecto está bajo la licencia [MIT](LICENSE) - ver el archivo LICENSE para más detalles.

## 📞 Soporte

Para soporte técnico o preguntas:

- **Email**: support@example.com
- **Issues**: GitHub Issues
- **Documentación**: [Wiki del proyecto](../../wiki)

## 🚧 Roadmap

### Próximas características:

- [ ] **CloudFront Distribution** completa
- [ ] **S3 Bucket definitions** 
- [ ] **Lambda Layers** para dependencias compartidas
- [ ] **API versioning**
- [ ] **Workflow de aprobación** para contenido
- [ ] **Templates/themes management**
- [ ] **SEO metadata management**
- [ ] **Multi-tenancy support**

---

<<<<<<< HEAD
**ConciusCMS** - Construido con ❤️ usando AWS Serverless Technologies
 ------

 ✨ Philosophy

Freedom: open and scalable architecture, accessible to all.

Truth: safeguards and validations that prioritize quality over noise.

Purpose: every piece of content should contribute positively to individuals, communities, and the planet.

Open Source, Open Spirit: knowledge and creation are not locked away, they are shared.

🏗️ Architecture

ConciusCMS is built on a serverless, Infrastructure as Code (IaC) foundation:

S3 Buckets: public frontend, admin console, and content storage.

CloudFront: fast and secure content delivery with origin access control.

Cognito: user authentication (Admins / Editors).

API Gateway: REST endpoints for managing content.

Lambda (Node.js 20.x): serverless microservices interacting with DynamoDB.

DynamoDB: database for pages, schemas, settings, and login audits.

IAM: security enforced by least-privilege policies.

A single CloudFormation template (mainTemplate.yml) can deploy the entire infrastructure in minutes.

⚡ Quick Deployment

Clone this repository.

First deploy accountfactory.yaml to set up the base account environment.

Then deploy mainTemplate.yml via AWS CloudFormation.

Configure your environment variables and credentials.

In less than 20 minutes you will have a professional, secure, and scalable CMS instance.

🖋️ Application

Schemas: define data structures visually.

Content: create, edit, and publish with automatic validations.

Multifield: nested blocks for fractal and flexible layouts.

Editorial workflows: draft → review → publish.

Ethical filters & validations: built-in AI to enhance quality and truth.

Headless Frontend (React): clean separation of data and presentation for maximum design freedom.

🔄 CI/CD

GitHub Actions automates QA and production deployments.

A simple commit and merge pushes changes to production in less than one minute.

Identical QA and production stacks ensure maximum consistency.

📦 Ready-to-Use Templates

Landing + Sections (marketing, SaaS, courses).

Docs / Knowledge Base.

Blog / Magazine.

Basic Catalog / E-commerce.

Portfolio / Institutional.

All based on composable schemas with multifield blocks.

📜 License

ConciusCMS is part of the Aurora Program, under dual license:

Apache 2.0 (code).

CC BY 4.0 (content & documentation).

👉 Note: any modification that removes references to the sustainability of information philosophy must also remove references to ConciusCMS.

🤝 Community

Explore and deploy your own instance.

Contribute templates, schemas, and improvements.

Adopt the philosophy: treat content not as noise, but as a force for truth and harmony.
=======
**ConsciusCMS** - Construido con ❤️ usando AWS Serverless Technologies
>>>>>>> c08fa4da332fa7693128144eb0c044ea901914b4
