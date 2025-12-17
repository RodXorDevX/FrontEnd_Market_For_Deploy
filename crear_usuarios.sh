#!/bin/bash
# CURL Commands para crear usuarios via API

API_BASE="https://backendmarketfordeploy-production-52ee.up.railway.app"

# Crear usuario 1: Luki Perro
curl -X POST "$API_BASE/usuarios/registro" \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Luki Perro",
    "email": "luki.perro@demo.com",
    "password": "demo123",
    "direccion": "Calle del Can 123, Ciudad Mascota",
    "avatar": "avatar1"
  }'

# Crear usuario 2: Minu Gatita
curl -X POST "$API_BASE/usuarios/registro" \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Minu Gatita",
    "email": "minu.gatita@demo.com",
    "password": "demo123",
    "direccion": "Avenida Gaturra 456, Barrio Felino",
    "avatar": "avatar2"
  }'

# Crear usuario 3: Pandi Panda
curl -X POST "$API_BASE/usuarios/registro" \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Pandi Panda",
    "email": "pandi.panda@demo.com",
    "password": "demo123",
    "direccion": "Bosque de Bambú 789, Valle Panda",
    "avatar": "avatar3"
  }'

# Crear usuario 4: Leo León
curl -X POST "$API_BASE/usuarios/registro" \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Leo León",
    "email": "leo.leon@demo.com",
    "password": "demo123",
    "direccion": "Savana Central 321, Reino Animal",
    "avatar": "avatar4"
  }'

# Crear usuario 5: Dumbo Elefante
curl -X POST "$API_BASE/usuarios/registro" \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Dumbo Elefante",
    "email": "dumbo.elefante@demo.com",
    "password": "demo123",
    "direccion": "Ruta del Elefante 654, Tierra de Gigantes",
    "avatar": "avatar5"
  }'

# Crear usuario 6: Spirit Caballo
curl -X POST "$API_BASE/usuarios/registro" \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Spirit Caballo",
    "email": "spirit.caballo@demo.com",
    "password": "demo123",
    "direccion": "Pradera Dorada 987, Llanuras Libres",
    "avatar": "avatar6"
  }'

# Crear usuario 7: Tucán Tico
curl -X POST "$API_BASE/usuarios/registro" \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Tucán Tico",
    "email": "tucan.tico@demo.com",
    "password": "demo123",
    "direccion": "Selva Tropical 147, Paraíso Verde",
    "avatar": "avatar7"
  }'

# Crear usuario 8: Pato Lucas
curl -X POST "$API_BASE/usuarios/registro" \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Pato Lucas",
    "email": "pato.lucas@demo.com",
    "password": "demo123",
    "direccion": "Lago Azul 258, Hábitat Acuático",
    "avatar": "avatar8"
  }'

# Crear usuario 9: Flip Delfín
curl -X POST "$API_BASE/usuarios/registro" \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Flip Delfín",
    "email": "flip.delfin@demo.com",
    "password": "demo123",
    "direccion": "Océano Pacífico 369, Bahía Marina",
    "avatar": "avatar9"
  }'

# Crear usuario 10: Polo Pingüino
curl -X POST "$API_BASE/usuarios/registro" \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Polo Pingüino",
    "email": "polo.pinguino@demo.com",
    "password": "demo123",
    "direccion": "Antártida 741, Polo Sur",
    "avatar": "avatar10"
  }'

