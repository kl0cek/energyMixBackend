# Energy Mix Backend

Backend aplikacji do analizy miksu energetycznego Wielkiej Brytanii.

## Instalacja

```bash
npm install
```

## Konfiguracja .env.example

```
PORT - port
API_BASE_URL - link do api
```

## Uruchomienie

### Tryb deweloperski

```bash
npm run dev
```

### Tryb produkcyjny

```bash
npm run build
npm start
```

## Testy

```bash
npm test
```

## Endpointy API

### GET /api/energy-mix

Zwraca miks energetyczny dla trzech dni (dzisiaj, jutro, pojutrze).

### GET /api/optimal-charging?duration={hours}

Wyznacza optymalne okno ładowania dla podanego czasu.

## Struktura projektu

```
src/
├── controllers/     # Kontrolery HTTP
├── services/        # Logika biznesowa
├── utils/           # Funkcje pomocnicze
├── types/           # Typy TypeScript
├── test/            # Testy
├── server.ts        # Server
└── index.ts         # Entry point
```