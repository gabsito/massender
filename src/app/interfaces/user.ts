export interface User {
    "usuario_id": number,
    "username": string,
    "nombre_completo": string,
    "correo": string,
    "rol_id": number,
    "cliente_id": number,
    "telefono": string,
    "rol": {
      "estado": string,
      "fecha_insercion": string,
      "fecha_modificacion": string,
      "usuario_insercion": number,
      "usuario_modificacion": number,
      "rol_id": number,
      "scopes": string,
      "descripcion": string
    }
  }