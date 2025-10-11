# 📊 Настройка Google Sheets интеграции

## 🎯 Что будет собираться:
- Дата и время расчета
- Доход пользователя
- Удержанный налог
- Сумма возврата/доплаты
- Количество месяцев работы
- Агент/Оператор
- Название компании
- Налоговый год
- Тип результата (Возврат/Доплата)

## 🔧 Пошаговая настройка:

### Шаг 1: Создание Google Таблицы
1. Откройте [Google Sheets](https://sheets.google.com)
2. Создайте новую таблицу
3. Добавьте заголовки в первую строку:
   ```
   A1: Дата и время
   B1: Доход (£)
   C1: Удержанный налог (£)
   D1: Возврат/Доплата (£)
   E1: Месяцы работы
   F1: Агент/Оператор
   G1: Компания
   H1: Налоговый год
   I1: Тип результата
   ```
4. Скопируйте ID таблицы из URL (часть между `/d/` и `/edit`)

### Шаг 2: Создание Google Apps Script
1. Откройте [script.google.com](https://script.google.com)
2. Нажмите "Новый проект"
3. Замените код на:

```javascript
function doPost(e) {
  try {
    // Замените на ID вашей Google Таблицы
    const SHEET_ID = 'ВСТАВЬТЕ_СЮДА_ID_ВАШЕЙ_ТАБЛИЦЫ';
    const sheet = SpreadsheetApp.openById(SHEET_ID).getActiveSheet();
    
    // Парсим данные
    const data = JSON.parse(e.postData.contents);
    
    // Добавляем строку с данными
    sheet.appendRow([
      new Date(), // Дата и время
      data.income,
      data.taxPaid,
      data.refund,
      data.monthsWorked,
      data.agentOperator,
      data.companyName,
      data.taxYear,
      data.isRefund ? 'Возврат' : 'Доплата'
    ]);
    
    return ContentService
      .createTextOutput(JSON.stringify({success: true}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({success: false, error: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

4. Сохраните проект (Ctrl+S)
5. Нажмите "Развернуть" → "Новое развертывание"
6. Выберите тип: "Веб-приложение"
7. Настройки:
   - Описание: "Tax Calculator Data Collector"
   - Выполнить как: "Я"
   - У кого есть доступ: "Все"
8. Нажмите "Развернуть"
9. Скопируйте URL веб-приложения

### Шаг 3: Обновление кода сайта
В файле `script.js` найдите строку:
```javascript
const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';
```

Замените на ваш URL:
```javascript
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/ВАША_ССЫЛКА/exec';
```

## 🧪 Тестирование

Откройте консоль браузера (F12) и выполните:
```javascript
testGoogleSheets()
```

Если все настроено правильно, в консоли появится:
```
✅ Данные успешно отправлены в Google Sheets
```

## 📈 Аналитика

Теперь вы сможете:
- Отслеживать количество расчетов
- Анализировать популярных агентов
- Видеть средние суммы возвратов
- Строить графики и отчеты
- Экспортировать данные

## 🔒 Безопасность

- Данные отправляются анонимно
- Никаких персональных данных
- Только статистика расчетов
- Google Apps Script работает под вашим аккаунтом

## ❗ Важные моменты

1. **Разрешения**: При первом запуске Google Apps Script запросит разрешения
2. **Лимиты**: Google Apps Script имеет лимиты на количество запросов
3. **Задержка**: Данные могут появляться в таблице с небольшой задержкой
4. **Ошибки**: Проверяйте консоль браузера для диагностики проблем

## 🆘 Решение проблем

**Ошибка 403**: Проверьте настройки доступа в Google Apps Script
**Ошибка 404**: Проверьте правильность URL веб-приложения
**Данные не появляются**: Проверьте ID таблицы в коде Apps Script