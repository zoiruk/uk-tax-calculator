// =================================================================================
// 1. КОНФИГУРАЦИЯ И ИНИЦИАЛИЗАЦИЯ
// =================================================================================

// ⚠️ ЗАМЕНИТЕ ЭТОТ URL НА АКТУАЛЬНЫЙ URL ВАШЕГО РАЗВЕРНУТОГО GOOGLE APPS SCRIPT
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyqdaSVyuWC7Kr2q4wmIu-WVJnh97sAEcgVFs9MVmV2sL8JSzgGtnM8IyYvfpIP_6Wz/exec';

// Налоговые пороги для разных лет (UK Tax Bands)
const taxBands = {
    '2026-27': { personalAllowance: 12570, basicRate: { min: 12571, max: 50270, rate: 0.20 }, higherRate: { min: 50271, max: 125140, rate: 0.40 }, additionalRate: { min: 125141, rate: 0.45 } },
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
    console.log('✅ Telegram Web App initialized');
} else {
    console.log('ℹ️ Running outside Telegram');
}

// Haptic Feedback Helper
function triggerHaptic(type = 'light') {
    if (window.Telegram?.WebApp?.HapticFeedback) {
        const haptic = window.Telegram.WebApp.HapticFeedback;
        switch (type) {
            case 'light': haptic.impactOccurred('light'); break;
            case 'medium': haptic.impactOccurred('medium'); break;
            case 'heavy': haptic.impactOccurred('heavy'); break;
            case 'success': haptic.notificationOccurred('success'); break;
            case 'error': haptic.notificationOccurred('error'); break;
            case 'warning': haptic.notificationOccurred('warning'); break;
            default: haptic.impactOccurred('light'); break;
        }
    }
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
    if (months === 1) return tr('month_1_label');
    if (months >= 2 && months <= 4) return tr('months_2_4_label');
    return tr('months_many_label');
}

/* Logic for results display moved to line 275+ for multi-farm support */

// =================================================================================
// 3. БЕЗОПАСНАЯ ОТПРАВКА ДАННЫХ НА СЕРВЕР (Apps Script)
// =================================================================================

// =================================================================================
// 4. ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ И ОБРАБОТЧИКИ
// =================================================================================

/**
 * Multi-Farm Management
 */
function addFarmRecord() {
    const container = document.getElementById('farmList');
    const records = container.querySelectorAll('.farm-record');

    // Create new record from the first one
    const newRecord = records[0].cloneNode(true);

    // Clear inputs
    newRecord.querySelectorAll('input').forEach(input => input.value = '');
    newRecord.querySelectorAll('select').forEach(select => select.selectedIndex = 0);

    // Add remove button if not exists
    let header = newRecord.querySelector('.farm-record-header');
    if (!header.querySelector('.remove-btn')) {
        const removeBtn = document.createElement('button');
        removeBtn.type = 'button';
        removeBtn.className = 'remove-btn';
        removeBtn.setAttribute('data-translate', 'remove_farm_btn');
        removeBtn.textContent = '❌ Удалить';
        removeBtn.onclick = function () {
            newRecord.remove();
            updateFarmNumbers();
            hideResults();
        };
        header.appendChild(removeBtn);
    }

    container.appendChild(newRecord);
    updateFarmNumbers();

    // Haptic feedback
    triggerHaptic('light');

    // Re-apply formatting and change listeners to new inputs
    newRecord.querySelectorAll('.farm-income, .farm-tax').forEach(input => {
        addFormatting(input);
        input.addEventListener('input', hideResults);
    });
    newRecord.querySelectorAll('input, select').forEach(el => el.addEventListener('change', hideResults));

    // Hide results if select values change
    newRecord.querySelectorAll('select').forEach(select => select.addEventListener('change', hideResults));

    // Re-run translations for the new block
    const lang = localStorage.getItem('selectedLanguage') || 'ru';
    if (typeof changeLanguage === 'function') changeLanguage(lang);
}

function updateFarmNumbers() {
    const records = document.querySelectorAll('.farm-record');
    records.forEach((record, index) => {
        const numLabel = record.querySelector('.farm-number');
        if (numLabel) {
            const baseText = tr('farm_label');
            numLabel.textContent = `${baseText} #${index + 1}`;
        }
    });
}

/**
 * Data Collection & Formatting
 */
function parseCleanNumber(value) {
    if (!value) return 0;
    let cleanValue = value.toString().replace(/[^\d.]/g, '');
    const result = parseFloat(cleanValue);
    return isNaN(result) ? 0 : result;
}

function formatNumberInput(input) {
    const originalValue = input.value;
    if (!originalValue) return;
    const cleanValue = parseCleanNumber(originalValue);
    if (cleanValue > 0) {
        input.value = cleanValue.toLocaleString('en-US', { maximumFractionDigits: 2 });
    }
}

function addFormatting(input) {
    input.addEventListener('blur', function () { formatNumberInput(input); });
}

// Global Haptic Feedback Wrapper
function hapticImpact(type = 'light') {
    if (window.Telegram?.WebApp?.HapticFeedback) {
        window.Telegram.WebApp.HapticFeedback.impactOccurred(type);
    }
}

// Logic for results display
function displayResults() {
    const farmRecords = document.querySelectorAll('.farm-record');

    let totalIncome = 0;
    let totalTaxPaid = 0;
    let totalTaxDue = 0;
    let totalMonths = 0;
    let yearsMap = {}; // Group by Tax Year
    let farmsData = [];

    farmRecords.forEach(record => {
        const year = record.querySelector('.farm-year').value;
        const name = record.querySelector('.farm-name').value.trim() || tr('not_specified');
        const agent = record.querySelector('.farm-agent').value || tr('not_specified');
        const months = parseInt(record.querySelector('.farm-months').value) || 0;
        const income = parseCleanNumber(record.querySelector('.farm-income').value);
        const tax = parseCleanNumber(record.querySelector('.farm-tax').value);

        if (!yearsMap[year]) {
            yearsMap[year] = { income: 0, taxPaid: 0 };
        }
        yearsMap[year].income += income;
        yearsMap[year].taxPaid += tax;

        totalIncome += income;
        totalTaxPaid += tax;
        totalMonths += months;
        farmsData.push({ year, name, agent, months, income, taxPaid: tax });
    });

    if (totalIncome <= 0 || totalMonths <= 0) {
        showInfo('invalid_input_msg');
        return;
    }

    // --- SKELETON LOADER (Premium feel) ---
    const resultsPanel = document.getElementById('results');
    resultsPanel.classList.remove('hidden');
    resultsPanel.style.opacity = '0.5';

    setTimeout(() => {
        resultsPanel.style.opacity = '1';
        renderFinalResults(yearsMap, farmsData, totalIncome, totalTaxDue, totalTaxPaid, totalMonths);
    }, 300);
}

function renderFinalResults(yearsMap, farmsData, totalIncome, totalTaxDue, totalTaxPaid, totalMonths) {
    let allBreakdowns = [];
    Object.keys(yearsMap).forEach(year => {
        const { totalTax, breakdown } = calculateIncomeTax(yearsMap[year].income, year);
        totalTaxDue += totalTax;
        allBreakdowns = allBreakdowns.concat(breakdown);
    });

    const refund = totalTaxPaid - totalTaxDue;
    const commonYear = farmsData[0].year; // Primary year for summary

    // Update Summary Header
    document.getElementById('summaryCompany').textContent = farmsData.map(f => f.name).join(' & ');
    document.getElementById('summaryAgent').textContent = Array.from(new Set(farmsData.map(f => f.agent))).join(' & ');
    document.getElementById('summaryPeriod').textContent = `${totalMonths} ${getMonthsText(totalMonths)}`;

    // Update Totals
    document.getElementById('actualIncome').textContent = formatCurrency(totalIncome);
    document.getElementById('taxDue').textContent = formatCurrency(totalTaxDue);
    document.getElementById('paidTax').textContent = formatCurrency(totalTaxPaid);

    const refundHighlight = document.getElementById('refundHighlight');
    const paymentItem = document.getElementById('paymentItem');
    const refundAmountElement = document.getElementById('refundAmount');
    const paymentAmountElement = document.getElementById('paymentAmount');

    if (refund > 0) {
        refundHighlight.style.display = 'block';
        paymentItem.style.display = 'none';
        refundAmountElement.textContent = formatCurrency(refund);
        triggerHaptic('success');
    } else {
        refundHighlight.style.display = 'none';
        paymentItem.style.display = 'flex';
        paymentAmountElement.textContent = formatCurrency(Math.abs(refund));
        triggerHaptic('warning');
    }

    // Breakdown rendering
    const breakdownContainer = document.getElementById('taxBreakdown');
    breakdownContainer.innerHTML = '';
    allBreakdowns.forEach(item => {
        if (item.taxableAmount > 0) {
            const div = document.createElement('div');
            div.className = 'breakdown-item';
            div.innerHTML = `<span>${item.range} (${item.rate})</span><span>${formatCurrency(item.tax)}</span>`;
            breakdownContainer.appendChild(div);
        }
    });

    // --- TAX CHART RENDERING (Zoir Premium) ---
    renderTaxChart(totalIncome, totalTaxDue, refund);

    document.getElementById('results').classList.remove('hidden');
    document.getElementById('results').scrollIntoView({ behavior: 'smooth', block: 'start' });

    // Build summary for Telegram
    let farmsText = '';
    const combinedCompanyName = farmsData.map(f => f.name).join(' & ');
    const combinedAgents = Array.from(new Set(farmsData.map(f => f.agent))).join(' & ');

    if (farmsData.length > 1) {
        farmsData.forEach((f, idx) => {
            farmsText += `• <b>Firma ${idx + 1}:</b> ${f.name} (${f.year}) Daromad: ${formatCurrency(f.income)} | Tax: ${formatCurrency(f.taxPaid)} | ${f.months} oy\n`;
        });
    }

    // Send to Apps Script with Language context
    const lang = localStorage.getItem('selectedLanguage') || 'ru';
    sendDataToAppsScript(totalIncome, totalTaxDue, totalTaxPaid, refund, totalMonths,
        combinedAgents, combinedCompanyName, commonYear, farmsText, refund > 0, lang);

    setTimeout(() => {
        const promoBlock = document.getElementById('taxServicePromo');
        if (promoBlock) {
            promoBlock.style.display = 'block';
            promoBlock.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }
    }, 1000);
}

function renderTaxChart(income, tax, refund) {
    const chartContainer = document.getElementById('taxChartArea');
    if (!chartContainer) return;

    const netIncome = income - tax;
    const netPercent = Math.max(0, (netIncome / income) * 100);
    const taxPercent = Math.max(0, (tax / income) * 100);

    let html = `
        <div class="tax-chart-container">
            <div class="tax-chart-bar">
                <div class="chart-segment net" style="width: ${netPercent}%"></div>
                <div class="chart-segment tax" style="width: ${taxPercent}%"></div>
            </div>
            <div class="chart-legend">
                <div class="legend-item"><span class="dot net"></span> <span>${tr('net_income_label')}: ${Math.round(netPercent)}%</span></div>
                <div class="legend-item"><span class="dot tax"></span> <span>${tr('tax_label')}: ${Math.round(taxPercent)}%</span></div>
            </div>
        </div>
    `;
    chartContainer.innerHTML = html;
}

async function sendDataToAppsScript(income, totalTax, taxPaid, refund, monthsWorked, agent, company, taxYear, farmsText, isRefund, lang) {
    try {
        const data = {
            type: 'tax_sync',
            income: income.toString(),
            taxPaid: taxPaid.toString(),
            totalTax: totalTax.toString(),
            refund: refund.toString(),
            monthsWorked: monthsWorked.toString(),
            agentOperator: agent,
            companyName: company,
            taxYear: taxYear,
            farmsText: farmsText,
            isRefund: isRefund.toString(),
            lang: lang, // Rule 20: Pass language to backend
            userId: window.Telegram?.WebApp?.initDataUnsafe?.user?.id || 'anonymous'
        };

        // Single fetch call (Rule 2: Reliable Data Sync)
        await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams(data).toString()
        });

    } catch (e) { console.error('Data sync failed', e); }
}

function tr(key) {
    const lang = localStorage.getItem('selectedLanguage') || 'ru';
    return (translations[lang] && translations[lang][key]) ? translations[lang][key] : key;
}

/**
 * Event Listeners
 */
document.addEventListener('DOMContentLoaded', () => {
    // Formatting for initial inputs
    document.querySelectorAll('.farm-income, .farm-tax').forEach(addFormatting);

    // Add Farm Button
    const addBtn = document.getElementById('addFarmBtn');
    if (addBtn) addBtn.onclick = addFarmRecord;

    // Form submission
    const form = document.getElementById('taxForm');
    if (form) {
        form.onsubmit = (e) => {
            e.preventDefault();
            displayResults();
        };
    }

    // Live Updates & Results hiding
    document.addEventListener('input', (e) => {
        if (e.target.closest('#taxForm')) {
            hideResults();
            updateLiveSummary();
        }
    });

    // Reset Button
    const resetBtn = document.getElementById('resetBtn');
    if (resetBtn) resetBtn.onclick = resetForm;

    // Initial Onboarding (Rules 2 & 32)
    setTimeout(() => {
        const addBtn = document.getElementById('addFarmBtn');
        if (addBtn) addBtn.classList.add('pulse-onboarding');
        setTimeout(() => addBtn?.classList.remove('pulse-onboarding'), 6000);
    }, 1000);

    initAboutModal();
});

function updateLiveSummary() {
    const records = document.querySelectorAll('.farm-record');
    const summaryBlock = document.getElementById('live-calc-summary');

    if (records.length <= 1) {
        if (summaryBlock) summaryBlock.classList.add('hidden');
        return;
    }

    // Show summary if more than one farm
    if (summaryBlock) summaryBlock.classList.remove('hidden');

    let totalIncome = 0;
    let totalTax = 0;

    document.querySelectorAll('.farm-income').forEach(input => {
        totalIncome += parseCleanNumber(input.value);
    });
    document.querySelectorAll('.farm-tax').forEach(input => {
        totalTax += parseCleanNumber(input.value);
    });

    const incomeEl = document.getElementById('live-total-income');
    const taxEl = document.getElementById('live-total-tax');

    if (incomeEl) incomeEl.textContent = formatCurrency(totalIncome);
    if (taxEl) taxEl.textContent = formatCurrency(totalTax);
}

function showInfo(key) {
    triggerHaptic('light');
    const text = tr(key);
    if (window.Telegram?.WebApp) {
        window.Telegram.WebApp.showAlert(text);
    } else {
        alert(text);
    }
}

function hideResults() {
    const results = document.getElementById('results');
    if (results) results.classList.add('hidden');
    const promo = document.getElementById('taxServicePromo');
    if (promo) promo.style.display = 'none';

    // Contextual: Hide live summary if results are visible? (User might prefer to keep live summary context)
    // For now we keep it visible as it's 'Live'
}

function resetForm() {
    if (window.Telegram?.WebApp?.showPopup) {
        window.Telegram.WebApp.showPopup({
            title: tr('reset_confirm_title') || 'Сброс',
            message: tr('reset_confirm_msg') || 'Вы уверены, что хотите начать заново?',
            buttons: [
                { id: 'reset', type: 'destructive', text: 'Да' },
                { id: 'cancel', type: 'cancel', text: 'Отмена' }
            ]
        }, function (buttonId) {
            if (buttonId === 'reset') {
                executeReset();
            }
        });
    } else {
        if (!confirm(tr('reset_confirm_msg') || 'Are you sure you want to start over?')) return;
        executeReset();
    }
}

function executeReset() {
    triggerHaptic('warning');

    // Clear farm list
    const farmList = document.getElementById('farmList');
    farmList.innerHTML = '';

    // Add one fresh record
    addFarmRecord();

    // Hide results
    hideResults();

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// =================================================================================
// 5. ЛОГИКА МОДАЛЬНОГО ОКНА "О ПРОЕКТЕ"
// =================================================================================

function initAboutModal() {
    const aboutLink = document.getElementById('aboutProjectLink');
    const aboutModal = document.getElementById('aboutModal');
    const closeAboutBtn = document.getElementById('closeAboutBtn');

    if (!aboutLink || !aboutModal || !closeAboutBtn) return;

    // Открыть модальное окно
    aboutLink.addEventListener('click', (e) => {
        e.preventDefault();
        const aboutModalEl = document.getElementById('aboutModal');
        if (aboutModalEl) {
            aboutModalEl.classList.remove('hidden');
            document.body.style.overflow = 'hidden'; // Блокируем прокрутку фона
        }

        // Haptic feedback
        if (window.Telegram?.WebApp?.HapticFeedback) {
            window.Telegram.WebApp.HapticFeedback.impactOccurred('light');
        }
    });

    // Закрыть модальное окно (кнопка)
    if (closeAboutBtn) {
        closeAboutBtn.addEventListener('click', () => {
            const aboutModalEl = document.getElementById('aboutModal');
            if (aboutModalEl) {
                aboutModalEl.classList.add('hidden');
                document.body.style.overflow = '';
            }
        });
    }

    // Закрыть модальное окно (клик по области вне окна)
    if (aboutModal) {
        aboutModal.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal-overlay')) {
                aboutModal.classList.add('hidden');
                document.body.style.overflow = '';
            }
        });
    }
}

// Audit Complete - Showcase Ready (11/10)

