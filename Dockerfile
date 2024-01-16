# Etap 1: Budowanie aplikacji React
FROM node:16-alpine as build

# Ustaw katalog roboczy na katalog 'client'
WORKDIR /app
COPY ./client/package*.json ./

# Zainstaluj zależności
RUN npm install

# Kopiuj resztę plików projektu do katalogu 'client'
COPY ./client/ ./

# Zbuduj aplikację
RUN npm run build

# Etap 2: Uruchomienie serwera Nginx do serwowania zbudowanej aplikacji
FROM nginx:alpine

# Kopiuj zbudowaną aplikację z etapu 1
COPY --from=build /app/build /usr/share/nginx/html

# Expose'uj port 80 (Nginx nasłuchuje na tym porcie)
EXPOSE 80

# Uruchom Nginx
CMD ["nginx", "-g", "daemon off;"]
