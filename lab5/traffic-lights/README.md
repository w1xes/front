# Лабораторна робота 5 — світлофор

## Запуск React-застосунку

```sh
npm install
Copy-Item .env.example .env.local
# Укажіть URL розгортання Apps Script /exec у .env.local.
npm run dev
```

URL розгортання є публічною клієнтською конфігурацією, а не секретом.
Не додавайте Spreadsheet ID до frontend.

## Налаштування GAS

1. Створіть Google Sheet з аркушем `TRAFFIC_LIGHTS` і стовпцями `id`,
   `current_signal`. Додайте рядок `main | red`.
2. У Apps Script додайте код із `gas/Code.gs`.
3. Створіть Script Property `DB_SPREADSHEET_ID` зі значенням Spreadsheet ID.
4. Створіть версійне розгортання Web App із доступом, який дозволяє браузерному
   застосунку виконувати запити. Використовуйте URL, що закінчується на `/exec`.
5. Запишіть URL у `VITE_GAS_API_URL` файлу `.env.local` і перезапустіть Vite.

## Контракт API

- `GET /exec?action=list` повертає `{ ok, data: { trafficLights }, error }`.
- `POST /exec` приймає JSON-текст із `Content-Type: text/plain;charset=utf-8`
  та `{ action: "updateState", id, currentSignal }`.
- Сервер зберігає тільки `id` і `currentSignal`; таймер, лічильники, орієнтація
  та режим залишаються в пам'яті React.
- Межа клієнтського API — `src/api/trafficLightsApi.js`. Запис виконується лише
  після натискання **Зберегти поточний сигнал**; автоматичний таймер не створює
  запитів на запис.

GAS Web App є мінімальним навчальним прикладом і не забезпечує виробничу
автентифікацію чи авторизацію.

## Перевірка

```sh
npm run lint
npm run build
```
