# API Documentation

**Base URL:** `http://localhost:3000/api`

---

## 1. Health Check

### GET `/`

Endpoint para validar el estado de salud.

**Request:**

```bash
curl -X GET http://localhost:3000/api/
```

**Response (200):**

```json
{
  "status": "Api is working"
}
```

---

## 2. Auth Routes

### POST `/auth/register`

Registra una nueva compañía con un usuario con rol de admin.

**Request:**

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "company": {
      "name": "Buses Miraluz",
      "usdotNumber": "987654",
      "state": "VAL"
    },
    "user": {
      "name": "pedro lopez",
      "email": "pedrolopez@gmail.com",
      "password": "pedrolopez123"
    }
  }'
```

**Response (201):**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "company": {
    "id": "cmc123abc456",
    "name": "Transportes Example"
  },
  "user": {
    "id": "usr789def012",
    "name": "John Doe",
    "email": "admin@example.com",
    "role": "ADMIN"
  }
}
```

---

### POST `/auth/login`

Autentica a un usuario y retorna un token JWT.

**Request:**

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "password123"
  }'
```

**Response (200):**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "usr789def012",
    "name": "John Doe",
    "email": "admin@example.com",
    "role": "ADMIN"
  },
  "company": {
    "id": "cmc123abc456",
    "name": "Transportes Example"
  }
}
```

### POST `/auth/forgot-password`

Solicitar correo electrónico de restablecimiento de contraseña

**Request:**

```bash
curl -X POST http://localhost:3000/api/auth/forgot-password \
  -H "Content-Type: application/json" \
  -d '{
    "email": "pedrio123@gmail.com"
  }'
```

**Response (200):**

```json
{
  "message": "If the email exists, a reset link has been sent"
}
```

### POST `/auth/reset-password`

Restablecer la contraseña

**Request:**

```bash
curl -X POST http://localhost:3000/api/auth/reset-password \
  -H "Content-Type: application/json" \
  -d '{
    "token": "a1b2c3d4e5f6...",
    "newPassword": "NewSecurePass123!"
  }'
```

**Response (200):**

```json
{
  "message": "Password updated successfully"
}
```

**Response (400):**

```json
{
  "error": "Invalid or expired token"
}
```

---

## 3. Company Routes

### GET `/companies`

Devuelve todas las compañías (solo retorna id y nombre).

**Request:**

```bash
curl -X GET http://localhost:3000/api/companies
```

**Response (200):**

```json
{
  "success": true,
  "data": [
    {
      "id": "cmc123abc456",
      "name": "Transportes Example"
    },
    {
      "id": "cmc789ghi012",
      "name": "Logistics Corp"
    }
  ]
}
```

---

### GET `/companies/:id/vehicles`

Devuelve los vehículos de una compañía en específico de manera compaginada.

**Request:**

```bash
curl -X GET "http://localhost:3000/api/companies/cmc123abc456/vehicles?page=1&limit=10"
```

**Query Parameters:**

- `page`: Número de página (default: 1)
- `limit`: Items por página (default: 10)

**Response (200):**

```json
{
  "success": true,
  "data": [
    {
      "id": "veh123abc",
      "unitNumber": "UNIT-001",
      "is_active": true,
      "driver": {
        "name": "John Doe"
      } | null
    }
  ],
  "pagination": {
    "total": 25,
    "page": 1,
    "limit": 10,
    "totalPages": 2
  }
}
```

---

## 4. User Routes

> **Note:** Todas las rutas de usuarios requieren autenticación JWT. Reemplaza `<token>` con el token recibido del login.

### GET `/users`

Devuelve todos los usuarios de la compañía autenticada.

**Request:**

```bash
curl -X GET http://localhost:3000/api/users \
  -H "Authorization: Bearer <token>"
```

**Response (200):**

```json
[
  {
    "id": "usr789def012",
    "name": "John Doe",
    "email": "admin@example.com",
    "role": "ADMIN",
    "isActive": true,
    "createdAt": "2026-02-27T10:00:00.000Z"
  },
  {
    "id": "usr456ghi789",
    "name": "Jane Smith",
    "email": "jane@example.com",
    "role": "COMPLIANCE",
    "isActive": true,
    "createdAt": "2026-02-20T14:30:00.000Z"
  }
]
```

---

### GET `/users/:id`

Devuelve un usuario específico usando el ID dentro de la compañía.

**Request:**

```bash
curl -X GET http://localhost:3000/api/users/usr789def012 \
  -H "Authorization: Bearer <token>"
```

**Response (200):**

```json
{
  "id": "usr789def012",
  "name": "John Doe",
  "email": "admin@example.com",
  "role": "ADMIN",
  "isActive": true,
  "createdAt": "2026-02-27T10:00:00.000Z"
}
```

---

### POST `/users`

Crea un nuevo usuario en la compañía. (Solo lo puedo hacer el ADMIN)

**Request:**

```bash
curl -X POST http://localhost:3000/api/users \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Felix Ramirez",
    "email": "felixramirez@example.com",
    "password": "felixramirez123",
    "role": "OPERATOR" # OPERATOR, COMPLIANCE, ADMIN
  }'
```

**Response (201):**

```json
{
  "id": "usr999xyz345",
  "name": "New Driver",
  "email": "driver@example.com",
  "role": "OPERATOR",
  "isActive": true,
  "createdAt": "2026-02-27T12:00:00.000Z"
}
```

---

### PUT `/users/:id`

Actualiza los detalles de un usuario.

**Request:**

```bash
curl -X PUT http://localhost:3000/api/users/usr789def012 \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Updated",
    "email": "john.updated@example.com",
    "isActive": false,
    "role": "COMPLIANCE"
  }'
```

**Response (200):**

```json
{
  "id": "usr789def012",
  "name": "John Updated",
  "email": "john.updated@example.com",
  "passwordHash": "$2b$10$f8oom9tlNrhnI3pXCP",
  "role": "COMPLIANCE",
  "isActive": false,
  "companyId": "cmc123abc456",
  "createdAt": "2026-02-27T10:00:00.000Z"
}
```

---

### DELETE `/users/:id`

Elimina a un usuario de la compañía. (Solo lo puedo hacer el admin)

**Request:**

```bash
curl -X DELETE http://localhost:3000/api/users/usr999xyz345 \
  -H "Authorization: Bearer <token>"
```

**Response (204):**

```
(No content)
```

---

## 5. Event Routes

### POST `/events/inspection`

Crea una nueva inspeccion

**Request:**

```bash
curl -X POST http://localhost:3000/api/events/inspection \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "vehicleId":"3206fb18-b7cc-4f98-88b5-db879ba076c3",
    "driverId": "01332f81-9819-41ae-8833-debafdc2e40f",
    "typeInspection": "ARRIVAL", # ARRIVAL | DEPARTURE
    "documentationVerified" : true,
    "lightsOk": true,
    "safetyElementsOk": true,
    "eSignature": "signed",
    "isConfirmed": true
  }'
```

**Response (201):**

```json
{
  "success": true,
  "message": "Inspection created successfully",
  "data": {
    "id": "02e22f12-5468-4a38-9fe9-d2ac1373d27d",
    "company_id": "d7232e7e-7be4-4558-bb35-44d7470a7076",
    "vehicle_id": "3206fb18-b7cc-4f98-88b5-db879ba076c3",
    "driver_id": "01332f81-9819-41ae-8833-debafdc2e40f",
    "event_type": "INSPECTION",
    "event_datetime": "2026-03-03T03:28:59.675Z",
    "location": null,
    "context": null,
    "general_result": null,
    "e_signature": "signed",
    "final_observations": null,
    "is_confirmed": true,
    "created_by_user_id": "266437be-85f0-4044-9bca-61b0527b1773",
    "created_at": "2026-03-03T03:28:59.718Z",
    "updated_at": "2026-03-03T03:28:59.718Z"
  }
}
```

### GET `/events/vehicle/:vehicleId/history`

Obtiene el historial de eventos de un vehículo

**Request:**

```bash
curl -X GET http://localhost:3000/api/events/vehicle/:vehicleId/history \
  -H "Authorization: Bearer <token>"
```

**Response (200):**

```json
{
  "success": true,
  "data": {
    "vehicle": {
      "id": "string",
      "unit_number": "string",
      "plate": "string"
    },
    "events": [
      {
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "company_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "vehicle_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "driver_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "event_type": "UNKNOWN",
        "event_datetime": "2026-03-11T04:07:17.155Z",
        "location": "UNKNOWN",
        "context": "UNKNOWN",
        "general_result": "WITH_OBS",
        "e_signature": "string",
        "final_observations": "string",
        "is_confirmed": true,
        "created_by_user_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "created_at": "2026-03-11T04:07:17.155Z",
        "updated_at": "2026-03-11T04:07:17.155Z"
      }
    ]
  }
}
```

### GET `/events/driver/:driverId/history`

Obtiene el historial de eventos de un conductor

**Request:**

```bash
curl -X GET http://localhost:3000/api/events/driver/:driverId/history \
  -H "Authorization: Bearer <token>"
```

**Response (200):**

```json
{
  "success": true,
  "data": {
    "driver": {
      "id": "string",
      "name": "string",
      "license_number": "string"
    },
    "events": [
      {
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "company_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "vehicle_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "driver_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "event_type": "UNKNOWN",
        "event_datetime": "2026-03-11T04:07:17.155Z",
        "location": "UNKNOWN",
        "context": "UNKNOWN",
        "general_result": "WITH_OBS",
        "e_signature": "string",
        "final_observations": "string",
        "is_confirmed": true,
        "created_by_user_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "created_at": "2026-03-11T04:07:17.155Z",
        "updated_at": "2026-03-11T04:07:17.155Z"
      }
    ]
  }
}
```

### GET `/events/vehicle/:vehicleId/current-driver`

Obtiene el conductor actual de un vehículo

**Request:**

```bash
curl -X GET http://localhost:3000/api/events/vehicle/:vehicleId/current-driver \
  -H "Authorization: Bearer <token>"
```

**Response (200):**

```json
{
  "success": true,
  "data": {
    "currentDriver": {
      "id": "string",
      "name": "string",
      "license_number": "string"
    },
    "lastEventDate": "2026-03-11T04:11:37.590Z"
  }
}
```

---

### POST `/events/accident`

Crea un nuevo evento de accidente.

**Request:**

```bash
curl -X POST http://localhost:3000/api/events/accident \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "vehicleId": "77998cbf-f9dd-4e5c-bb93-bb1714ebe1e6",
    "driverId": "30e34f23-1787-4abd-881f-d9b5f820244a",
    "eventDatetime": "2025-03-06T14:30:00Z",
    "location": "ADDRESS",
    "severity": "MODERATE",
    "injuriesReported": false,
    "cost": 2500.00,
    "mileage": 45000,
    "locationDetails": "I-35 Exit 245, Dallas, TX",
    "description": "Rear-end collision at traffic light",
    "policeReportNumber": "DPD-2025-001234",
    "eSignature": "Mario Hernández"
  }'
```

**Response (201):**

```json
{
  "success": true,
  "message": "Accident event created successfully",
  "data": {
    "id": "d53980a8-187c-4c7b-a321-67ec639757cd",
    "company_id": "46d6550b-b3a1-44e6-b4e1-fca715825b81",
    "vehicle_id": "77998cbf-f9dd-4e5c-bb93-bb1714ebe1e6",
    "driver_id": "30e34f23-1787-4abd-881f-d9b5f820244a",
    "event_type": "ACCIDENT",
    "event_datetime": "2025-03-06T14:30:00.000Z",
    "location": "ADDRESS",
    "severity": "MODERATE",
    "cost": "2500",
    "mileage": 45000,
    "injuries_reported": false,
    "e_signature": "Mario Hernández",
    "final_observations": "{\"locationDetails\":\"I-35 Exit 245, Dallas, TX\",\"description\":\"Rear-end collision at traffic light\",\"policeReportNumber\":\"DPD-2025-001234\"}",
    "vehicle": {...},
    "driver": {...},
    "createdBy": {...}
  }
}
```

---

### POST `/events/maintenance`

Crea un nuevo evento de mantenimiento.

**Request:**

```bash
curl -X POST http://localhost:3000/api/events/maintenance \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "vehicleId": "77998cbf-f9dd-4e5c-bb93-bb1714ebe1e6",
    "eventDatetime": "2025-03-01T09:00:00Z",
    "severity": "MINOR",
    "cost": 450.75,
    "mileage": 50000,
    "nextServiceDate": "2025-06-01T09:00:00Z",
    "maintenanceType": "PREVENTIVE",
    "serviceType": "Oil change and brake inspection",
    "serviceProvider": "Lone Star Auto Service",
    "eSignature": "Rick Ramirez"
  }'
```

**Response (201):**

```json
{
  "success": true,
  "message": "Maintenance event created successfully",
  "data": {
    "id": "e123456a-b789-4c12-d345-67890abcdef1",
    "company_id": "46d6550b-b3a1-44e6-b4e1-fca715825b81",
    "vehicle_id": "77998cbf-f9dd-4e5c-bb93-bb1714ebe1e6",
    "event_type": "MAINTENANCE",
    "event_datetime": "2025-03-01T09:00:00.000Z",
    "severity": "MINOR",
    "cost": "450.75",
    "mileage": 50000,
    "next_service_date": "2025-06-01T09:00:00.000Z",
    "e_signature": "Rick Ramirez",
    "final_observations": "{\"maintenanceType\":\"PREVENTIVE\",\"serviceType\":\"Oil change and brake inspection\",\"serviceProvider\":\"Lone Star Auto Service\"}",
    "vehicle": {...},
    "createdBy": {...}
  }
}
```

---

### POST `/events/other`

Crea un evento operacional genérico.

**Request:**

```bash
curl -X POST http://localhost:3000/api/events/other \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "vehicleId": "77998cbf-f9dd-4e5c-bb93-bb1714ebe1e6",
    "driverId": "30e34f23-1787-4abd-881f-d9b5f820244a",
    "eventDatetime": "2025-03-04T12:30:00Z",
    "location": "GPS",
    "eventTitle": "Fuel Purchase",
    "eventDescription": "Refueled 85 gallons diesel",
    "eSignature": "Mario Hernández"
  }'
```

**Response (201):**

```json
{
  "success": true,
  "message": "Event created successfully",
  "data": {
    "id": "f234567b-c890-5d23-e456-78901bcdef23",
    "company_id": "46d6550b-b3a1-44e6-b4e1-fca715825b81",
    "vehicle_id": "77998cbf-f9dd-4e5c-bb93-bb1714ebe1e6",
    "driver_id": "30e34f23-1787-4abd-881f-d9b5f820244a",
    "event_type": "OTHER",
    "event_datetime": "2025-03-04T12:30:00.000Z",
    "location": "GPS",
    "final_observations": "{\"title\":\"Fuel Purchase\",\"description\":\"Refueled 85 gallons diesel\"}",
    "vehicle": {...},
    "driver": {...}
  }
}
```

---

### GET `/events`

Obtiene todos los eventos con filtros opcionales.

**Request:**

```bash
# Todos los eventos
curl -X GET "http://localhost:3000/api/events" \
  -H "Authorization: Bearer <token>"

# Filtrar por tipo de evento
curl -X GET "http://localhost:3000/api/events?eventType=ACCIDENT" \
  -H "Authorization: Bearer <token>"

# Filtrar por severidad
curl -X GET "http://localhost:3000/api/events?severity=SEVERE" \
  -H "Authorization: Bearer <token>"

# Filtrar por rango de fechas
curl -X GET "http://localhost:3000/api/events?startDate=2025-01-01&endDate=2025-03-31" \
  -H "Authorization: Bearer <token>"

# Múltiples filtros + paginación
curl -X GET "http://localhost:3000/api/events?eventType=MAINTENANCE&severity=CRITICAL&limit=20&offset=0" \
  -H "Authorization: Bearer <token>"
```

**Query Parameters:**

- `eventType`: UNKNOWN, INSPECTION, ACCIDENT, MAINTENANCE, OTHER
- `severity`: MINOR, MODERATE, SEVERE, CRITICAL
- `vehicleId`: UUID del vehículo
- `driverId`: UUID del conductor
- `startDate`: Fecha inicio (YYYY-MM-DD)
- `endDate`: Fecha fin (YYYY-MM-DD)
- `limit`: Resultados por página (default: 50)
- `offset`: Offset de paginación (default: 0)

**Response (200):**

```json
{
  "success": true,
  "data": {
    "events": [
      {
        "id": "...",
        "event_type": "ACCIDENT",
        "severity": "MODERATE",
        "vehicle": {...},
        "driver": {...}
      }
    ],
    "total": 125,
    "limit": 50,
    "offset": 0
  }
}
```

---

### GET `/events/:id`

Obtiene un evento específico por ID.

**Request:**

```bash
curl -X GET http://localhost:3000/api/events/d53980a8-187c-4c7b-a321-67ec639757cd \
  -H "Authorization: Bearer <token>"
```

**Response (200):**

```json
{
  "success": true,
  "data": {
    "id": "d53980a8-187c-4c7b-a321-67ec639757cd",
    "event_type": "ACCIDENT",
    "severity": "MODERATE",
    "cost": "2500",
    "vehicle": {...},
    "driver": {...},
    "inspection_details": []
  }
}
```

**Response (404):**

```json
{
  "error": "Event not found"
}
```

---

## 6. Vehicles Routes

### POST `/vehicles`

Crear un vehiculo para la compania.

**Request:**

```bash
curl -X POST http://localhost:3000/api/vehicles \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "unit_number"?: "VAAS-302",
    "plate"?: "DEC-123",
    "is_active"?: true,
    "driverId"?: "string"
  }'
```

**Response (201):**

```json
{
  "success": true,
  "data": {
    "id": "fa56103c-c7eb-4d5b-be39-8fb2fa7c31ce",
    "companyId": "ef27bf7e-a16d-43ba-a7ff-b7d2c179c1df",
    "driverId": null,
    "unit_number": "VAAS-302",
    "plate": "DEC-123",
    "is_active": true,
    "createdAt": "2026-03-11T04:41:01.741Z",
    "updatedAt": "2026-03-11T04:41:01.741Z"
  }
}
```

### GET `/vehicles`

Obtiene todos los vehículos de una compañía

**Request:**

```bash
curl -X GET http://localhost:3000/api/vehicles \
  -H "Authorization: Bearer <token>"
```

**Response (201):**

```json
{
  "success": true,
  "data": [
    {
      "id": "fa56103c-c7eb-4d5b-be39-8fb2fa7c31ce",
      "companyId": "ef27bf7e-a16d-43ba-a7ff-b7d2c179c1df",
      "driverId": null,
      "unit_number": "VAAS-302",
      "plate": "DEC-123",
      "is_active": true,
      "createdAt": "2026-03-11T04:41:01.741Z",
      "updatedAt": "2026-03-11T04:41:01.741Z"
    }
  ]
}
```

### GET `/vehicles/:id`

Obtiene un vehiculo por id

**Request:**

```bash
curl -X GET http://localhost:3000/api/vehicles \
  -H "Authorization: Bearer <token>"
```

**Response (200):**

```json
{
  "success": true,
  "data": {
    "id": "fa56103c-c7eb-4d5b-be39-8fb2fa7c31ce",
    "companyId": "ef27bf7e-a16d-43ba-a7ff-b7d2c179c1df",
    "driverId": null,
    "unit_number": "VAAS-302",
    "plate": "DEC-123",
    "is_active": true,
    "createdAt": "2026-03-11T04:41:01.741Z",
    "updatedAt": "2026-03-11T04:41:01.741Z",
    "driver": null
  }
}
```

### PUT `/vehicles/:id`

Crear un vehiculo para la compania.

**Request:**

```bash
curl -X POST http://localhost:3000/api/vehicles \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "unit_number"?: "VAAS-302",
    "plate"?: "DEC-123",
    "is_active"?: true,
    "driverId"?: "string"
  }'
```

**Response (201):**

```json
{
  "success": true,
  "data": {
    "id": "9bc648ee-b24b-4128-9159-3004a6808279",
    "companyId": "ef27bf7e-a16d-43ba-a7ff-b7d2c179c1df",
    "driverId": null,
    "unit_number": "TRUCK-444",
    "plate": "DUE-123",
    "is_active": true,
    "createdAt": "2026-03-11T04:48:31.261Z",
    "updatedAt": "2026-03-11T04:56:10.332Z"
  }
}
```

### DELETE `/vehicles/:id`

Elimina a un vehiculo de la compañía por id

**Request:**

```bash
curl -X DELETE http://localhost:3000/api/vehicles/usr999xyz345 \
  -H "Authorization: Bearer <token>"
```

**Response (200):**

```json
{ "success": true, "message": "Vehicle deleted" }
```

## 7. Drivers Routes

### GET `/drivers`

Obtener todos los conductos de la compania.

**Request:**

```bash
curl -X GET http://localhost:3000/api/drivers \
  -H "Authorization: Bearer <token>"
```

**Response (200):**

```json
[
  {
    "id": "f217a990-3402-4515-9d25-a6b1d3bb98cb",
    "name": "Bryan Lopez",
    "license_number": "WAR-52X",
    "is_active": true,
    "created_at": "2026-03-11T05:23:33.955Z",
    "vehicle": null
  },
  {
    "id": "d832a71f-5a29-49f3-811e-fbde93ef2eb5",
    "name": "Pablo Lucas",
    "license_number": "LOCOTOM-1234",
    "is_active": true,
    "created_at": "2026-03-11T05:21:18.763Z",
    "vehicle": null
  }
]
```

### POST `/drivers`

Crear un conductor para la compania.

**Request:**

```bash
curl -X POST http://localhost:3000/api/vehicles \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
  "name": "Bryan Lopez",
  "license_number": "WAR-52X"
}'
```

**Response (201):**

```json
{
  "newDriver": {
    "id": "d832a71f-5a29-49f3-811e-fbde93ef2eb5",
    "name": "Pablo Lucas",
    "license_number": "LOCOTOM-1234",
    "is_active": true,
    "created_at": "2026-03-11T05:21:18.763Z",
    "vehicle": null
  }
}
```

### GET `/drivers/active`

Obtener todos los conductos activos de la compania.

**Request:**

```bash
curl -X GET http://localhost:3000/api/drivers/active \
  -H "Authorization: Bearer <token>"
```

**Response (200):**

```json
[
  {
    "id": "f217a990-3402-4515-9d25-a6b1d3bb98cb",
    "name": "Bryan Lopez",
    "license_number": "WAR-52X",
    "is_active": true,
    "created_at": "2026-03-11T05:23:33.955Z",
    "vehicle": null
  },
  {
    "id": "d832a71f-5a29-49f3-811e-fbde93ef2eb5",
    "name": "Pablo Lucas",
    "license_number": "LOCOTOM-1234",
    "is_active": true,
    "created_at": "2026-03-11T05:21:18.763Z",
    "vehicle": null
  }
]
```

### GET `/drivers/:id`

Obtener un conductor de la compania por id.

**Request:**

```bash
curl -X GET http://localhost:3000/api/drivers/:id \
  -H "Authorization: Bearer <token>"
```

**Response (200):**

```json
{
  "id": "f217a990-3402-4515-9d25-a6b1d3bb98cb",
  "name": "Bryan Lopez",
  "license_number": "WAR-52X",
  "is_active": true,
  "created_at": "2026-03-11T05:23:33.955Z",
  "vehicle": null
}
```

### PUT `/drivers/:id`

Crear un vehiculo para la compania.

**Request:**

```bash
curl -X POST http://localhost:3000/api/drivers/:id \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "name"?: "Bryan Bellavona",
    "license_number"?: "CAS-52X"
    "is_active"?: true,
  }'
```

**Response (201):**

```json
{
  "id": "d832a71f-5a29-49f3-811e-fbde93ef2eb5",
  "name": "Bryan Bellavona",
  "license_number": "CAS-52X",
  "is_active": true,
  "created_at": "2026-03-11T05:21:18.763Z",
  "vehicle": null
}
```

### DELETE `/drivers/:id`

Elimina a un conductor de la compañía. (Solo lo puedo hacer el admin)

**Request:**

```bash
curl -X DELETE http://localhost:3000/api/drivers/:id \
  -H "Authorization: Bearer <token>"
```

**Response (204):**

```
(No content)
```

## Summary

| Method | Endpoint                                    | Auth Required | Description                                                   |
| ------ | ------------------------------------------- | ------------- | ------------------------------------------------------------- |
| GET    | `/`                                         | No            | Health check                                                  |
| POST   | `/auth/register`                            | No            | Registra compañía y admin                                     |
| POST   | `/auth/login`                               | No            | Logea y obtiene JWT                                           |
| POST   | `/auth/forgot-password`                     | No            | Solicita correo electrónico de restablecimiento de contraseña |
| POST   | `/auth/reset-password`                      | No            | Restablece la contraseña                                      |
| GET    | `/companies`                                | No            | Lista todas las compañías                                     |
| GET    | `/companies/:id/vehicles`                   | No            | Devuelve los vehículos de la compañía                         |
| GET    | `/users`                                    | Sí (JWT)      | Lista usuarios en la compañía                                 |
| GET    | `/users/:id`                                | Sí (JWT)      | Devuelve usuarios por ID                                      |
| POST   | `/users`                                    | Sí (JWT)      | Crea nuevo usuario                                            |
| PUT    | `/users/:id`                                | Sí (JWT)      | Actualiza usuario                                             |
| DELETE | `/users/:id`                                | Sí (JWT)      | Elimina usuario                                               |
| POST   | `/events/inspection`                        | Sí (JWT)      | Crea nueva inspección                                         |
| POST   | `/events/accident`                          | Sí (JWT)      | Crea nuevo evento de accidente                                |
| POST   | `/events/maintenance`                       | Sí (JWT)      | Crea nuevo evento de mantenimiento                            |
| POST   | `/events/other`                             | Sí (JWT)      | Crea evento operacional genérico                              |
| GET    | `/events`                                   | Sí (JWT)      | Obtiene todos los eventos con filtros opcionales              |
| GET    | `/events/:id`                               | Sí (JWT)      | Obtiene un evento específico por ID                           |
| GET    | `/events/vehicle/:vehicleId/history`        | Sí (JWT)      | Obtiene el historial de eventos de un vehículo                |
| GET    | `/events/driver/:driverId/history`          | Sí (JWT)      | Obtiene el historial de eventos de un conductor               |
| GET    | `/events/vehicle/:vehicleId/current-driver` | Sí (JWT)      | Obtiene el conductor actual de un vehículo                    |
| POST   | `/vehicles`                                 | Sí (JWT)      | Crear un vehiculo en la compañía                              |
| GET    | `/vehicles`                                 | Sí (JWT)      | Obtener vehiculo en la compañía                               |
| GET    | `/vehicles/:id`                             | Sí (JWT)      | Devuelve un vehiculo por ID                                   |
| PUT    | `/vehicles/:id`                             | Sí (JWT)      | Actualizar un vehiculo por ID                                 |
| DELETE | `/vehicles/:id`                             | Sí (JWT)      | Elimina vehiculo                                              |
| POST   | `/drivers`                                  | Sí (JWT)      | Crear un conductor en la compañía                             |
| GET    | `/drivers`                                  | Sí (JWT)      | Obtener todos los conductos de la compañía                    |
| GET    | `/drivers/active`                           | Sí (JWT)      | Obtener todos los conductos activos de la compañía            |
| GET    | `/drivers/:id`                              | Sí (JWT)      | Obtener un conductos por ID                                   |
| PUT    | `/drivers/:id`                              | Sí (JWT)      | Actualizar un conductor por ID                                |
| DELETE | `/drivers/:id`                              | Sí (JWT)      | Elimina un conductor por ID                                   |

---

## User Roles

- **ADMIN**: Acceso completo, puede crear y eliminar usuarios.
- **OPERATOR**: Acceso limitado (Operaciones típicas de lectura).
