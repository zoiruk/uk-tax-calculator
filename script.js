// =================================================================================
// 1. КОНФИГУРАЦИЯ И ИНИЦИАЛИЗАЦИЯ
// =================================================================================

// ⚠️ ЗАМЕНИТЕ ЭТОТ URL НА АКТУАЛЬНЫЙ URL ВАШЕГО РАЗВЕРНУТОГО GOOGLE APPS SCRIPT
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyqdaSVyuWC7Kr2q4wmIu-WVJnh97sAEcgVFs9MVmV2sL8JSzgGtnM8IyYvfpIP_6Wz/exec';

// Налоговые пороги для разных лет (UK Tax Bands)
const taxBands = {
    '2025-26': { personalAllowance: 12570, basicRate: { min: 12571, max: 50270, rate: 0.20 }, higherRate: { min: 50271, max: 125140, rate: 0.40 }, additionalRate: { min: 125141, rate: 0.45 } },
    '2024-25': { personalAllowance: 12570, basicRate: { min: 12571, max: 50270, rate: 0.20 }, higherRate: { min: 50271, max: 125140, rate: 0.40 }, additionalRate: { min: 125141, rate: 0.45 } },
    '2023-24': { personalAllowance: 12570, basicRate: { min: 12571, max: 50270, rate: 0.20 }, higherRate: { min: 50271, max: 125140, rate: 0.40 }, additionalRate: { min: 125141, rate: 0.45 } },
    '2022-23': { personalAllowance: 12570, basicRate: { min: 12571, max: 50270, rate: 0.20 }, higherRate: { min: 50271, max: 150000, rate: 0.40 }, additionalRate: { min: 150001, rate: 0.45 } }
};

// Инициализация Telegram Web App
if (window.Telegram?.WebApp) {
    const tg = window.Telegram.WebApp;
    tg.ready();
    tg.expand();
    document.body.style.backgroundColor = tg.backgroundColor || '#ffffff';

    const user = tg.initDataUnsafe?.user;
    if (user) {
        const supportedLanguages = ['ru', 'en', 'uz', 'kk', 'ky', 'tg'];
        if (user.language_code && supportedLanguages.includes(user.language_code)) {
            localStorage.setItem('selectedLanguage', user.language_code);
        }
    }
    console.log('✅ Telegram Web App инициализирован');
} else {
    console.log('ℹ️ Приложение запущено вне Telegram');
}

// =================================================================================
// 2. ОСНОВНЫЕ ФУНКЦИИ (Расчет и Отображение)
// =================================================================================

function calculateIncomeTax(income, taxYear) {
    const bands = taxBands[taxYear];
    let tax = 0;
    let breakdown = [];
    let remainingIncome = income;
    
    // Если доход меньше необлагаемого минимума
    if (income <= bands.personalAllowance) {
        breakdown.push({ range: `£0 - £${bands.personalAllowance.toLocaleString()}`, rate: '0%', taxableAmount: income, tax: 0 });
        return { totalTax: 0, breakdown };
    }

    // Необлагаемый минимум
    breakdown.push({ range: `£0 - £${bands.personalAllowance.toLocaleString()}`, rate: '0%', taxableAmount: bands.personalAllowance, tax: 0 });
    remainingIncome -= bands.personalAllowance;

    // Базовая ставка 20%
    if (remainingIncome > 0) {
        const basicTaxableAmount = Math.min(remainingIncome, bands.basicRate.max - bands.personalAllowance);
        const basicTax = basicTaxableAmount * bands.basicRate.rate;
        tax += basicTax;
        breakdown.push({ range: `£${bands.basicRate.min.toLocaleString()} - £${bands.basicRate.max.toLocaleString()}`, rate: '20%', taxableAmount: basicTaxableAmount, tax: basicTax });
        remainingIncome -= basicTaxableAmount;
    }

    // Повышенная ставка 40%
    if (remainingIncome > 0) {
        const higherTaxableAmount = Math.min(remainingIncome, bands.higherRate.max - bands.basicRate.max);
        const higherTax = higherTaxableAmount * bands.higherRate.rate;
        tax += higherTax;
        breakdown.push({ range: `£${bands.higherRate.min.toLocaleString()} - £${bands.higherRate.max.toLocaleString()}`, rate: '40%', taxableAmount: higherTaxableAmount, tax: higherTax });
        remainingIncome -= higherTaxableAmount;
    }

    // Дополнительная ставка 45%
    if (remainingIncome > 0) {
        const additionalTax = remainingIncome * bands.additionalRate.rate;
        tax += additionalTax;
        breakdown.push({ range: `£${bands.additionalRate.min.toLocaleString()}+`, rate: '45%', taxableAmount: remainingIncome, tax: additionalTax });
    }

    return { totalTax: tax, breakdown };
}

function formatCurrency(amount) {
    return new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(amount);
}

function getMonthsText(months) {
    if (months === 1) return 'месяц';
    if (months >= 2 && months <= 4) return 'месяца';
    return 'месяцев';
}

function displayResults(income, taxPaid, taxYear, monthsWorked, companyName, agentOperator) {
    const { totalTax, breakdown } = calculateIncomeTax(income, taxYear);
    const refund = taxPaid - totalTax;

    const notSpecifiedText = 'Не указано'; 

    document.getElementById('summaryCompany').textContent = companyName || notSpecifiedText;
    document.getElementById('summaryAgent').textContent = agentOperator || notSpecifiedText;
    document.getElementById('summaryPeriod').textContent = `${monthsWorked} ${getMonthsText(monthsWorked)} (${taxYear})`;

    document.getElementById('actualIncome').textContent = formatCurrency(income);
    document.getElementById('taxDue').textContent = formatCurrency(totalTax);
    document.getElementById('paidTax').textContent = formatCurrency(taxPaid);

    const refundHighlight = document.getElementById('refundHighlight');
    const paymentItem = document.getElementById('paymentItem');
    const refundAmountElement = document.getElementById('refundAmount');
    const paymentAmountElement = document.getElementById('paymentAmount');

    if (refund > 0) {
        refundHighlight.style.display = 'block';
        paymentItem.style.display = 'none';
        refundAmountElement.textContent = formatCurrency(refund);
        refundAmountElement.style.animation = 'none';
        setTimeout(() => { refundAmountElement.style.animation = 'bounce 1s ease-out'; }, 100);
    } else if (refund < 0) {
        refundHighlight.style.display = 'none';
        paymentItem.style.display = 'flex';
        paymentItem.classList.add('negative');
        paymentAmountElement.textContent = formatCurrency(Math.abs(refund));
    } else {
        refundHighlight.style.display = 'none';
        paymentItem.style.display = 'flex';
        paymentItem.classList.remove('positive', 'negative');
        paymentItem.querySelector('span:first-child').textContent = 'Доплата/возврат:';
        paymentAmountElement.textContent = formatCurrency(0);
    }

    const breakdownContainer = document.getElementById('taxBreakdown');
    breakdownContainer.innerHTML = '';

    breakdown.forEach(item => {
        if (item.taxableAmount > 0) {
            const div = document.createElement('div');
            div.className = 'breakdown-item';
            div.innerHTML = `<span>${item.range} (${item.rate})</span><span>${formatCurrency(item.tax)}</span>`;
            breakdownContainer.appendChild(div);
        }
    });

    document.getElementById('results').classList.remove('hidden');

    // 🚀 ЕДИНАЯ ОТПРАВКА: Отправляем все данные на сервер
    sendDataToAppsScript(income, totalTax, taxPaid, refund, monthsWorked, agentOperator, companyName, taxYear);

    setTimeout(() => {
        const promoBlock = document.getElementById('taxServicePromo');
        promoBlock.style.display = 'block';
        promoBlock.style.animation = 'slideInUp 0.6s ease-out, pulse 2s infinite 1s';
    }, 2000); 
}

// =================================================================================
// 3. БЕЗОПАСНАЯ ОТПРАВКА ДАННЫХ НА СЕРВЕР (Apps Script)
// =================================================================================

async function sendDataToAppsScript(income, totalTax, taxPaid, refund, monthsWorked, agentOperator, companyName, taxYear) {
    try {
        const data = {
            income: income,
            totalTax: totalTax, 
            taxPaid: taxPaid,
            refund: refund,
            monthsWorked: monthsWorked,
            agentOperator: agentOperator || 'Не указан',
            companyName: companyName || 'Не указана',
            taxYear: taxYear,
            // Передаем булево значение как строку 'true'/'false'
            isRefund: refund > 0 ? 'true' : 'false', 
            currentLang: localStorage.getItem('selectedLanguage') || 'ru' 
        };

        console.log('📊 Отправляем данные на сервер (Sheets + Telegram)...', data);

        // ✅ ИСПРАВЛЕНИЕ: Используем URLSearchParams и application/x-www-form-urlencoded для обхода CORS
        const formData = new URLSearchParams(data).toString();

        const response = await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            headers: {
                 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: formData // Отправляем строку параметров
        });

        const responseText = await response.text();
        console.log('📄 Ответ от сервера:', responseText);

        // Проверяем статус ответа
        if (response.ok) {
            console.log('✅ Данные успешно отправлены в Google Sheets и Telegram.');
        } else {
             console.log('⚠️ Ошибка сети или сервера при отправке. Статус:', response.status);
        }

    } catch (error) {
        console.log('❌ Ошибка сети при отправке на сервер:', error);
    }
}

// =================================================================================
// 4. ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ И ОБРАБОТЧИКИ
// =================================================================================

function parseCleanNumber(value) {
    if (!value) return 0;
    // Убираем все символы кроме цифр
    let cleanValue = value.toString().replace(/[^\d]/g, ''); 
    const result = parseInt(cleanValue);
    return isNaN(result) ? 0 : result;
}

function formatNumberInput(input) {
    const cursorPosition = input.selectionStart;
    const originalValue = input.value;
    if (!originalValue || originalValue.trim() === '') return;
    const cleanValue = parseCleanNumber(originalValue);

    if (cleanValue > 0 && !isNaN(cleanValue)) {
        const formattedValue = cleanValue.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 });
        if (input.value !== formattedValue && Math.abs(cleanValue - parseCleanNumber(input.value)) > 0.01) {
            input.value = formattedValue;
            const newPosition = Math.min(cursorPosition, formattedValue.length);
            setTimeout(() => { input.setSelectionRange(newPosition, newPosition); }, 0);
        }
    }
}

document.getElementById('taxForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const income = parseCleanNumber(document.getElementById('annualIncome').value);
    const taxPaid = parseCleanNumber(document.getElementById('taxPaid').value);
    const taxYear = document.getElementById('taxYear').value;
    const monthsWorked = parseInt(document.getElementById('monthsWorked').value);
    const companyName = document.getElementById('companyName').value.trim();
    const agentOperator = document.getElementById('agentOperator').value.trim();

    if (income <= 0 || taxPaid < 0 || !monthsWorked) {
        // ... (Ваша логика валидации с alert)
        return;
    }

    displayResults(income, taxPaid, taxYear, monthsWorked, companyName, agentOperator);
});

// Добавляем форматирование и обработчики
const incomeInput = document.getElementById('annualIncome');
const taxPaidInput = document.getElementById('taxPaid');

function addFormatting(input) {
    input.addEventListener('blur', function () { formatNumberInput(input); });
    input.addEventListener('keypress', function (e) {
        const allowedChars = /[0-9\s]/;
        if (!allowedChars.test(e.key) && !['Backspace', 'Delete', 'Tab', 'Enter', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
            e.preventDefault();
        }
    });
}

addFormatting(incomeInput);
addFormatting(taxPaidInput);

function hideResults() {
    const resultsDiv = document.getElementById('results');
    const promoBlock = document.getElementById('taxServicePromo');
    if (resultsDiv && !resultsDiv.classList.contains('hidden')) { resultsDiv.classList.add('hidden'); }
    if (promoBlock) { promoBlock.style.display = 'none'; }
}

document.getElementById('annualIncome').addEventListener('input', hideResults);
document.getElementById('taxPaid').addEventListener('input', hideResults);
document.getElementById('taxYear').addEventListener('change', hideResults);
document.getElementById('monthsWorked').addEventListener('change', hideResults);
document.getElementById('companyName').addEventListener('input', hideResults);
document.getElementById('agentOperator').addEventListener('change', hideResults);
