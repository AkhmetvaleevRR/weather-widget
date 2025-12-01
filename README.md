# Weather Widget (English)

Weather widget built with Vue 3 + TypeScript + Element Plus that can be embedded into any website as a custom element.

## Installation

```bash
npm install
```

## Development

### Run dev server
```bash
npm run serve
```
Opens http://localhost:8080 with test application

### Build widget
```bash
npm run build
```
Creates `dist/WeatherWidget.js` file for embedding into websites

### Linting
```bash
npm run lint
```

## Widget Usage

1. Build the widget with `npm run build`
2. Include the `dist/WeatherWidget.js` file on your website:

```html
<!DOCTYPE html>
<html>
<head>
    <title>My Website</title>
</head>
<body>
    <weather-widget></weather-widget>
    
    <script src="./WeatherWidget.js"></script>
</body>
</html>
```

## Technologies

- **Vue 3** - framework
- **TypeScript** - type safety
- **Element Plus** - UI components
- **SCSS** - styles
- **Vue Draggable** - drag & drop
- **Vue CLI + Webpack** - build tools and development environment
- **OpenWeatherMap API** - weather data



---


# Weather Widget

Виджет погоды на Vue 3 + TypeScript + Element Plus.

## Установка

```bash
npm install
```

## Разработка

### Запуск dev сервера
```bash
npm run serve
```
Откроется http://localhost:8080 с тестовым приложением

### Сборка виджета
```bash
npm run build
```
Создает файл `dist/WeatherWidget.js` для встраивания в сайты

### Линтинг
```bash
npm run lint
```

## Использование виджета

1. Соберите виджет командой `npm run build`
2. Подключите файл `dist/WeatherWidget.js` на своем сайте:

```html
<!DOCTYPE html>
<html>
<head>
    <title>Мой сайт</title>
</head>
<body>
    <weather-widget></weather-widget>
    
    <script src="./WeatherWidget.js"></script>
</body>
</html>
```

## Технологии

- **Vue 3** - фреймворк
- **TypeScript** - типизация
- **Element Plus** - UI компоненты
- **SCSS** - стили
- **Vue Draggable** - drag & drop
- **Vue CLI + Webpack** - сборщик и инструменты разработки
- **OpenWeatherMap API** - данные о погоде

