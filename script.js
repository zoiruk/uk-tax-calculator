// Инициализация Telegram Web App
if (window.Telegram?.WebApp) {
    const tg = window.Telegram.WebApp;
    tg.ready();
    tg.expand(); // Развернуть на весь экран

    // Настройка темы
    document.body.style.backgroundColor = tg.backgroundColor || '#ffffff';

    // Получение данных пользователя
    const user = tg.initDataUnsafe?.user;
    if (user) {
        console.log('👤 Пользователь Telegram:', user.first_name, user.last_name);
        console.log('🆔 ID пользователя:', user.id);
        console.log('🌐 Язык пользователя:', user.language_code);

        // Автоматически устанавливаем язык пользователя, если он поддерживается
        const supportedLanguages = ['ru', 'en', 'uz', 'kk', 'ky', 'tg'];
        if (user.language_code && supportedLanguages.includes(user.language_code)) {
            localStorage.setItem('selectedLanguage', user.language_code);
        }
    }

    console.log('✅ Telegram Web App инициализирован');
} else {
    console.log('ℹ️ Приложение запущено вне Telegram');
}

// Налоговые пороги для разных лет
const taxBands = {
    '2025-26': {
        personalAllowance: 12570,
        basicRate: { min: 12571, max: 50270, rate: 0.20 },
        higherRate: { min: 50271, max: 125140, rate: 0.40 },
        additionalRate: { min: 125141, rate: 0.45 }
    },
    '2024-25': {
        personalAllowance: 12570,
        basicRate: { min: 12571, max: 50270, rate: 0.20 },
        higherRate: { min: 50271, max: 125140, rate: 0.40 },
        additionalRate: { min: 125141, rate: 0.45 }
    },
    '2023-24': {
        personalAllowance: 12570,
        basicRate: { min: 12571, max: 50270, rate: 0.20 },
        higherRate: { min: 50271, max: 125140, rate: 0.40 },
        additionalRate: { min: 125141, rate: 0.45 }
    },
    '2022-23': {
        personalAllowance: 12570,
        basicRate: { min: 12571, max: 50270, rate: 0.20 },
        higherRate: { min: 50271, max: 150000, rate: 0.40 },
        additionalRate: { min: 150001, rate: 0.45 }
    }
};

function calculateIncomeTax(income, taxYear) {
    const bands = taxBands[taxYear];
    let tax = 0;
    let breakdown = [];

    // Необлагаемый минимум
    if (income <= bands.personalAllowance) {
        breakdown.push({
            range: `£0 - £${bands.personalAllowance.toLocaleString()}`,
            rate: '0%',
            taxableAmount: income,
            tax: 0
        });
        return { totalTax: 0, breakdown };
    }

    let remainingIncome = income;

    // Необлагаемый минимум
    breakdown.push({
        range: `£0 - £${bands.personalAllowance.toLocaleString()}`,
        rate: '0%',
        taxableAmount: bands.personalAllowance,
        tax: 0
    });
    remainingIncome -= bands.personalAllowance;

    // Базовая ставка 20%
    if (remainingIncome > 0) {
        const basicTaxableAmount = Math.min(remainingIncome, bands.basicRate.max - bands.personalAllowance);
        const basicTax = basicTaxableAmount * bands.basicRate.rate;
        tax += basicTax;

        breakdown.push({
            range: `£${bands.basicRate.min.toLocaleString()} - £${bands.basicRate.max.toLocaleString()}`,
            rate: '20%',
            taxableAmount: basicTaxableAmount,
            tax: basicTax
        });

        remainingIncome -= basicTaxableAmount;
    }

    // Повышенная ставка 40%
    if (remainingIncome > 0) {
        const higherTaxableAmount = Math.min(remainingIncome, bands.higherRate.max - bands.basicRate.max);
        const higherTax = higherTaxableAmount * bands.higherRate.rate;
        tax += higherTax;

        breakdown.push({
            range: `£${bands.higherRate.min.toLocaleString()} - £${bands.higherRate.max.toLocaleString()}`,
            rate: '40%',
            taxableAmount: higherTaxableAmount,
            tax: higherTax
        });

        remainingIncome -= higherTaxableAmount;
    }

    // Дополнительная ставка 45%
    if (remainingIncome > 0) {
        const additionalTax = remainingIncome * bands.additionalRate.rate;
        tax += additionalTax;

        breakdown.push({
            range: `£${bands.additionalRate.min.toLocaleString()}+`,
            rate: '45%',
            taxableAmount: remainingIncome,
            tax: additionalTax
        });
    }

    return { totalTax: tax, breakdown };
}

function formatCurrency(amount) {
    return new Intl.NumberFormat('en-GB', {
        style: 'currency',
        currency: 'GBP',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(amount);
}

function displayResults(income, taxPaid, taxYear, monthsWorked, companyName, agentOperator) {
    // Рассчитываем налог напрямую с фактического дохода
    const { totalTax, breakdown } = calculateIncomeTax(income, taxYear);
    const refund = taxPaid - totalTax;

    // Обновляем информацию о работе
    // Получаем текущий язык для переводов
    const currentLang = localStorage.getItem('selectedLanguage') || 'ru';
    const notSpecifiedText = translations[currentLang]?.not_specified || 'Не указано';

    document.getElementById('summaryCompany').textContent = companyName || notSpecifiedText;
    document.getElementById('summaryAgent').textContent = agentOperator || notSpecifiedText;
    document.getElementById('summaryPeriod').textContent = `${monthsWorked} ${getMonthsText(monthsWorked)} (${taxYear})`;

    // Обновляем основные результаты
    document.getElementById('actualIncome').textContent = formatCurrency(income);
    document.getElementById('taxDue').textContent = formatCurrency(totalTax);
    document.getElementById('paidTax').textContent = formatCurrency(taxPaid);

    // Обновляем отображение возврата/доплаты
    const refundHighlight = document.getElementById('refundHighlight');
    const paymentItem = document.getElementById('paymentItem');
    const refundAmountElement = document.getElementById('refundAmount');
    const paymentAmountElement = document.getElementById('paymentAmount');

    if (refund > 0) {
        // Показываем возврат
        refundHighlight.style.display = 'block';
        paymentItem.style.display = 'none';
        refundAmountElement.textContent = formatCurrency(refund);

        // Добавляем анимацию
        refundAmountElement.style.animation = 'none';
        setTimeout(() => {
            refundAmountElement.style.animation = 'bounce 1s ease-out';
        }, 100);

    } else if (refund < 0) {
        // Показываем доплату
        refundHighlight.style.display = 'none';
        paymentItem.style.display = 'flex';
        paymentItem.classList.add('negative');
        paymentAmountElement.textContent = formatCurrency(Math.abs(refund));

    } else {
        // Нет возврата и доплаты
        refundHighlight.style.display = 'none';
        paymentItem.style.display = 'flex';
        paymentItem.classList.remove('positive', 'negative');
        paymentItem.querySelector('span:first-child').textContent = 'Доплата/возврат:';
        paymentAmountElement.textContent = formatCurrency(0);
    }

    // Детализация налога
    const breakdownContainer = document.getElementById('taxBreakdown');
    breakdownContainer.innerHTML = '';

    breakdown.forEach(item => {
        if (item.taxableAmount > 0) {
            const div = document.createElement('div');
            div.className = 'breakdown-item';
            div.innerHTML = `
                <span>${item.range} (${item.rate})</span>
                <span>${formatCurrency(item.tax)}</span>
            `;
            breakdownContainer.appendChild(div);
        }
    });

    // Показываем результаты
    document.getElementById('results').classList.remove('hidden');

    // Отправляем анонимный результат в Telegram
    sendResultToTelegram(income, totalTax, taxPaid, refund, monthsWorked, agentOperator);

    // Отправляем данные в Google Sheets для аналитики
    sendToGoogleSheets(income, taxPaid, refund, monthsWorked, agentOperator, companyName, taxYear);

    // Показываем рекламный блок с задержкой для привлечения внимания
    setTimeout(() => {
        const promoBlock = document.getElementById('taxServicePromo');
        promoBlock.style.display = 'block';
        promoBlock.style.animation = 'slideInUp 0.6s ease-out, pulse 2s infinite 1s';
    }, 2000); // Задержка 2 секунды после показа результата
}

function getMonthsText(months) {
    if (months === 1) return 'месяц';
    if (months >= 2 && months <= 4) return 'месяца';
    return 'месяцев';
}

// Функция для очистки и парсинга числовых значений
function parseCleanNumber(value) {
    if (!value) return 0;

    // Убираем все символы кроме цифр
    let cleanValue = value.toString().replace(/[^\d]/g, '');

    const result = parseInt(cleanValue);
    return isNaN(result) ? 0 : result;
}

// Функция для форматирования ввода в реальном времени
function formatNumberInput(input) {
    const cursorPosition = input.selectionStart;
    const originalValue = input.value;

    // Если поле пустое или содержит только пробелы, не форматируем
    if (!originalValue || originalValue.trim() === '') {
        return;
    }

    const cleanValue = parseCleanNumber(originalValue);

    // Форматируем только если получили валидное число больше 0
    if (cleanValue > 0 && !isNaN(cleanValue)) {
        // Форматируем число с разделителями тысяч
        const formattedValue = cleanValue.toLocaleString('en-US', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2
        });

        // Обновляем значение только если оно значительно изменилось
        if (input.value !== formattedValue && Math.abs(cleanValue - parseCleanNumber(input.value)) > 0.01) {
            input.value = formattedValue;

            // Пытаемся сохранить позицию курсора
            const newPosition = Math.min(cursorPosition, formattedValue.length);
            setTimeout(() => {
                input.setSelectionRange(newPosition, newPosition);
            }, 0);
        }
    }
}

// Обработчик формы
document.getElementById('taxForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const income = parseCleanNumber(document.getElementById('annualIncome').value);
    const taxPaid = parseCleanNumber(document.getElementById('taxPaid').value);
    const taxYear = document.getElementById('taxYear').value;
    const monthsWorked = parseInt(document.getElementById('monthsWorked').value);
    const companyName = document.getElementById('companyName').value.trim();
    const agentOperator = document.getElementById('agentOperator').value.trim();

    if (income <= 0 || taxPaid < 0) {
        const currentLang = localStorage.getItem('selectedLanguage') || 'ru';
        const errorMessages = {
            ru: 'Пожалуйста, введите корректные положительные значения',
            en: 'Please enter correct positive values',
            uz: 'Iltimos, to\'g\'ri musbat qiymatlarni kiriting',
            kk: 'Дұрыс оң мәндерді енгізіңіз',
            ky: 'Туура оң маанилерди киргизиңиз',
            tg: 'Лутфан қиматҳои дурусти мусбат ворид кунед'
        };
        alert(errorMessages[currentLang] || errorMessages.ru);
        return;
    }

    if (!monthsWorked) {
        const currentLang = localStorage.getItem('selectedLanguage') || 'ru';
        const errorMessages = {
            ru: 'Пожалуйста, выберите количество месяцев работы',
            en: 'Please select the number of months worked',
            uz: 'Iltimos, ishlagan oylar sonini tanlang',
            kk: 'Жұмыс істеген айлар санын таңдаңыз',
            ky: 'Иштеген айлардын санын тандаңыз',
            tg: 'Лутфан шумораи моҳҳои кориро интихоб кунед'
        };
        alert(errorMessages[currentLang] || errorMessages.ru);
        return;
    }

    displayResults(income, taxPaid, taxYear, monthsWorked, companyName, agentOperator);
});

// Добавляем форматирование для числовых полей
const incomeInput = document.getElementById('annualIncome');
const taxPaidInput = document.getElementById('taxPaid');

// Функция для добавления форматирования
function addFormatting(input) {
    // Форматирование только при потере фокуса
    input.addEventListener('blur', function () {
        formatNumberInput(input);
    });

    // Разрешаем только цифры и пробелы
    input.addEventListener('keypress', function (e) {
        const allowedChars = /[0-9\s]/;
        if (!allowedChars.test(e.key) && !['Backspace', 'Delete', 'Tab', 'Enter', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
            e.preventDefault();
        }
    });
}

addFormatting(incomeInput);
addFormatting(taxPaidInput);

// Функция для скрытия результатов при изменении полей
function hideResults() {
    const resultsDiv = document.getElementById('results');
    const promoBlock = document.getElementById('taxServicePromo');

    if (resultsDiv && !resultsDiv.classList.contains('hidden')) {
        resultsDiv.classList.add('hidden');
    }

    if (promoBlock) {
        promoBlock.style.display = 'none';
    }
}

// Добавляем обработчики для скрытия результатов при изменении полей
document.getElementById('annualIncome').addEventListener('input', hideResults);
document.getElementById('taxPaid').addEventListener('input', hideResults);
document.getElementById('taxYear').addEventListener('change', hideResults);
document.getElementById('monthsWorked').addEventListener('change', hideResults);
document.getElementById('companyName').addEventListener('input', hideResults);
document.getElementById('agentOperator').addEventListener('change', hideResults);

function autoCalculate() {
    const income = parseCleanNumber(document.getElementById('annualIncome').value);
    const taxPaid = parseCleanNumber(document.getElementById('taxPaid').value);
    const taxYear = document.getElementById('taxYear').value;
    const monthsWorked = parseInt(document.getElementById('monthsWorked').value);
    const companyName = document.getElementById('companyName').value.trim();
    const agentOperator = document.getElementById('agentOperator').value.trim();

    if (income > 0 && taxPaid >= 0 && monthsWorked) {
        displayResults(income, taxPaid, taxYear, monthsWorked, companyName, agentOperator);
    }
}

// Функция для отправки результата в Telegram
async function sendResultToTelegram(income, totalTax, taxPaid, refund, monthsWorked, agentOperator) {
    try {
        // Конфигурация Telegram бота
        const TELEGRAM_BOT_TOKEN = '7558545607:AAGN832lBrc0nnRSzDLEVD8BI5otL9Oi-2c';
        const TELEGRAM_CHAT_ID = '-1002925530891'; // Попробуем и положительный и отрицательный ID

        console.log('🚀 Начинаем отправку в Telegram...');
        console.log('📱 Chat ID:', TELEGRAM_CHAT_ID);

        // Получаем текущий язык для локализации
        const currentLang = localStorage.getItem('selectedLanguage') || 'ru';

        // Создаем интересное сообщение
        const message = generateInterestingMessage(income, totalTax, taxPaid, refund, monthsWorked, agentOperator, currentLang);

        console.log('📝 Сообщение:', message);

        // Отправляем сообщение в Telegram
        const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
        console.log('🌐 URL:', telegramUrl);

        const requestBody = {
            chat_id: TELEGRAM_CHAT_ID,
            text: message,
            disable_web_page_preview: true,
            reply_markup: {
                inline_keyboard: [[
                    {
                        text: "🧮 Рассчитать свой налог",
                        url: "https://t.me/ZoirUKBot/SoliqHisoblagich"
                    }
                ]]
            }
        };

        console.log('📦 Тело запроса:', requestBody);

        const response = await fetch(telegramUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody)
        });

        console.log('📡 Статус ответа:', response.status);

        const responseData = await response.json();
        console.log('📄 Ответ от Telegram:', responseData);

        if (response.ok) {
            console.log('✅ Результат успешно отправлен в Telegram');
        } else {
            console.log('⚠️ Ошибка отправки в Telegram:', response.status, responseData);

            // Если Chat ID неправильный, попробуем с отрицательным
            if (responseData.error_code === 400 && responseData.description.includes('chat not found')) {
                console.log('🔄 Пробуем с отрицательным Chat ID...');
                const negativeChatId = `-${TELEGRAM_CHAT_ID}`;

                const retryResponse = await fetch(telegramUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        chat_id: negativeChatId,
                        text: message,
                        disable_web_page_preview: true,
                        reply_markup: {
                            inline_keyboard: [[
                                {
                                    text: "🧮 Рассчитать свой налог",
                                    url: "https://t.me/ZoirUKBot/SoliqHisoblagich"
                                }
                            ]]
                        }
                    })
                });

                const retryData = await retryResponse.json();
                console.log('🔄 Повторный ответ:', retryData);
            }
        }
    } catch (error) {
        console.log('❌ Ошибка при отправке в Telegram:', error);
    }
}

// Функция для получения флага языка
function getLanguageFlag(lang) {
    const flags = {
        ru: '🇷🇺 Русский',
        en: '🇬🇧 English',
        uz: '🇺🇿 O\'zbek',
        kk: '🇰🇿 Қазақша',
        ky: '🇰🇬 Кыргызча',
        tg: '🇹🇯 Тоҷикӣ'
    };
    return flags[lang] || flags.ru;
}

// Функция для тестирования Telegram бота (можно вызвать из консоли)
async function testTelegramBot() {
    console.log('🧪 Тестируем Telegram бота...');

    const TELEGRAM_BOT_TOKEN = '7558545607:AAGN832lBrc0nnRSzDLEVD8BI5otL9Oi-2c';

    // Сначала проверим информацию о боте
    try {
        const botInfoUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getMe`;
        const botResponse = await fetch(botInfoUrl);
        const botData = await botResponse.json();

        console.log('🤖 Информация о боте:', botData);

        if (botData.ok) {
            console.log('✅ Бот активен:', botData.result.username);
        } else {
            console.log('❌ Проблема с ботом:', botData);
            return;
        }
    } catch (error) {
        console.log('❌ Ошибка при проверке бота:', error);
        return;
    }

    // Теперь попробуем отправить тестовое сообщение
    await sendResultToTelegram(15000, 1500, 1200, 300, 6, 'Test Agent');
}

// Функция для получения Chat ID
async function getChatId() {
    const TELEGRAM_BOT_TOKEN = '7558545607:AAGN832lBrc0nnRSzDLEVD8BI5otL9Oi-2c';

    try {
        const updatesUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getUpdates`;
        const response = await fetch(updatesUrl);
        const data = await response.json();

        console.log('📨 Последние сообщения:', data);

        if (data.ok && data.result.length > 0) {
            data.result.forEach((update, index) => {
                if (update.message) {
                    console.log(`💬 Сообщение ${index + 1}:`);
                    console.log(`   Chat ID: ${update.message.chat.id}`);
                    console.log(`   Тип чата: ${update.message.chat.type}`);
                    console.log(`   Название: ${update.message.chat.title || update.message.chat.first_name}`);
                }
            });
        } else {
            console.log('❌ Нет сообщений. Отправьте сообщение боту или в группу с ботом.');
        }
    } catch (error) {
        console.log('❌ Ошибка получения Chat ID:', error);
    }
}

// Функция для генерации сообщения в Telegram
function generateInterestingMessage(income, totalTax, taxPaid, refund, monthsWorked, agentOperator, currentLang) {
    const isRefund = refund > 0;
    const resultAmount = Math.abs(refund);

    const message = `🕵️‍♂️ Anonim foydalanuvchi soliq qaytarilishi hisob-kitobini oldi

📈 Tafsilotlar:
• Daromad: £${income.toLocaleString()}
• Ushlab qolingan soliq: £${taxPaid.toLocaleString()}
• Davr: ${monthsWorked} месяцев
• Agent: ${agentOperator || 'Не указан'}

💰 Natija: ${isRefund ? `Soliq qaytarilishi — £${resultAmount.toLocaleString()}` : `Qo'shimcha to'lov — £${resultAmount.toLocaleString()}`}

⚠️ Muhim: Bu hisob-kitob faqat taxminiy. Aniq summa HMRC (Buyuk Britaniya Soliq Xizmati) tomonidan tasdiqlanadi.

📢 Yordam kerakmi? White Tax Returns — rasmiy ro‘yxatdan o‘tgan soliq agentligi, Fruitful Jobs va Agri HR operatorlarining rasmiy buxgalteriya bo‘limidir.

📎 Ariza topshirish uchun: 👉 whitetax.site/uzbekistan`;

    return message;
}

// Функция для отправки данных в Google Sheets
async function sendToGoogleSheets(income, taxPaid, refund, monthsWorked, agentOperator, companyName, taxYear) {
    try {
        // URL вашего Google Apps Script веб-приложения
        const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxnTi13NXwBuRp1iwyi8osomH-fPlX0LSz6iFseAnUbUK2wCzhgEuyyBqSW6WUe-hPCuw/exec';

        const data = {
            income: income,
            taxPaid: taxPaid,
            refund: refund,
            monthsWorked: monthsWorked,
            agentOperator: agentOperator || 'Не указан',
            companyName: companyName || 'Не указана',
            taxYear: taxYear,
            isRefund: refund > 0
        };

        console.log('📊 Отправляем данные в Google Sheets...', data);

        const response = await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (result.success) {
            console.log('✅ Данные успешно отправлены в Google Sheets');
        } else {
            console.log('⚠️ Ошибка отправки в Google Sheets:', result.error);
        }

    } catch (error) {
        console.log('❌ Ошибка при отправке в Google Sheets:', error);
    }
}

// Функция для быстрого тестирования отправки сообщения
async function testQuickMessage() {
    console.log('🧪 Быстрый тест отправки сообщения...');
    await sendResultToTelegram(25000, 2500, 3000, -500, 8, 'Test Agent');
}

// Функция для тестирования Google Sheets
async function testGoogleSheets() {
    console.log('📊 Тестируем Google Sheets...');
    await sendToGoogleSheets(25000, 2500, -500, 8, 'Test Agent', 'Test Company', '2024-25');
}

// Добавляем функции в глобальную область для тестирования
window.testTelegramBot = testTelegramBot;
window.getChatId = getChatId;
window.testQuickMessage = testQuickMessage;
window.testGoogleSheets = testGoogleSheets;
