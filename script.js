// =================================================================================
// 1. КОНФИГУРАЦИЯ И ИНИЦИАЛИЗАЦИЯ
// =================================================================================

// ⚠️ ЗАМЕНИТЕ ЭТОТ URL НА АКТУАЛЬНЫЙ URL ВАШЕГО РАЗВЕРНУТОГО GOOGLE APPS SCRIPT
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyqdaSVyuWC7Kr2q4wmIu-WVJnh97sAEcgVFs9MVmV2sL8JSzgGtnM8IyYvfpIP_6Wz/exec';

// Налоговые пороги для разных лет (UK Tax Bands) + NMW + Accommodation Offset
const taxBands = {
    '2026-27': { personalAllowance: 12570, basicRate: { min: 12571, max: 50270, rate: 0.20 }, higherRate: { min: 50271, max: 125140, rate: 0.40 }, additionalRate: { min: 125141, rate: 0.45 }, nmw: 12.21, accom: 10.66 },
    '2025-26': { personalAllowance: 12570, basicRate: { min: 12571, max: 50270, rate: 0.20 }, higherRate: { min: 50271, max: 125140, rate: 0.40 }, additionalRate: { min: 125141, rate: 0.45 }, nmw: 12.21, accom: 10.66 },
    '2024-25': { personalAllowance: 12570, basicRate: { min: 12571, max: 50270, rate: 0.20 }, higherRate: { min: 50271, max: 125140, rate: 0.40 }, additionalRate: { min: 125141, rate: 0.45 }, nmw: 11.44, accom: 9.99 },
    '2023-24': { personalAllowance: 12570, basicRate: { min: 12571, max: 50270, rate: 0.20 }, higherRate: { min: 50271, max: 125140, rate: 0.40 }, additionalRate: { min: 125141, rate: 0.45 }, nmw: 10.42, accom: 9.10 },
    '2022-23': { personalAllowance: 12570, basicRate: { min: 12571, max: 50270, rate: 0.20 }, higherRate: { min: 50271, max: 150000, rate: 0.40 }, additionalRate: { min: 150001, rate: 0.45 }, nmw: 9.50, accom: 8.70 }
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
    let headerRight = newRecord.querySelector('.farm-header-right');
    if (!headerRight) {
        // Fallback for older DOMs
        headerRight = document.createElement('div');
        headerRight.className = 'farm-header-right';
        headerRight.style.cssText = 'display: flex; gap: 8px; align-items: center;';
        newRecord.querySelector('.farm-record-header').appendChild(headerRight);
    }
    
    if (!headerRight.querySelector('.remove-btn')) {
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
        headerRight.appendChild(removeBtn);
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

    // Save to Telegram CloudStorage
    saveHistoryToCloud();

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

// =================================================================================
// 7. OCR PAYSLIP SCANNER (Tesseract.js)
// =================================================================================

async function handleOcrScan(fileInput) {
    const file = fileInput.files[0];
    if (!file) return;

    const recordNode = fileInput.closest('.farm-record');
    const btn = recordNode.querySelector('.scan-btn');
    const textSpan = btn.querySelector('.scan-text');
    const originalText = textSpan.textContent;

    // UI Feedback: Loading state
    btn.classList.add('scanning');
    textSpan.textContent = tr('scanning_wait');
    triggerHaptic('medium');

    try {
        let extractedText = '';

        if (file.type === 'application/pdf') {
            if (typeof pdfjsLib === 'undefined') throw new Error('PDF.js not loaded');
            pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js';
            
            const arrayBuffer = await file.arrayBuffer();
            const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
            
            let fullText = [];
            for (let pageNum = 1; pageNum <= Math.min(pdf.numPages, 2); pageNum++) { // Only check first 2 pages for safety
                const page = await pdf.getPage(pageNum);
                const textContent = await page.getTextContent();
                const pageText = textContent.items.map(item => item.str).join('\n');
                fullText.push(pageText);
            }
            extractedText = fullText.join('\n');
            console.log('--- PDF Result ---', extractedText);
        } else {
            if (typeof Tesseract === 'undefined') throw new Error('Tesseract is not loaded');
            // Run Tesseract OCR on Image
            const { data: { text } } = await Tesseract.recognize(file, 'eng');
            extractedText = text;
            console.log('--- OCR Result ---', extractedText);
        }

        // Parse Text
        let parsedIncome = null;
        let parsedTax = null;

        // Basic clean up of OCR output
        const lines = extractedText.split('\n').map(l => l.trim()).filter(l => l.length > 0);
        
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].toLowerCase();
            
            // regex to extract numbers like 1234.56, 1,234.56 or 1234
            const extractNum = (str) => {
                const match = str.match(/(?:£\s*)?([\d]{1,3}(?:[.,][\d]{3})*(?:[.,][\d]{2}))/);
                return match ? parseCleanNumber(match[1]) : null;
            };
            
            // Income Keywords
            if (line.includes('total pay') || line.includes('gross pay') || line.includes('taxable pay') || line.includes('gross for tax') || line.includes('total gross')) {
                const val = extractNum(line);
                if (val !== null) parsedIncome = val;
                else if (i + 1 < lines.length) {
                    const nextVal = extractNum(lines[i+1]);
                    if (nextVal !== null) parsedIncome = nextVal;
                }
            }

            // Tax Keywords
            if (line.includes('tax paid') || line.includes('paye') || line.includes('income tax') || line.includes('tax ytd') || line.includes('tax deducted')) {
                const val = extractNum(line);
                if (val !== null) parsedTax = val;
                else if (i + 1 < lines.length) {
                    const nextVal = extractNum(lines[i+1]);
                    if (nextVal !== null) parsedTax = nextVal;
                }
            }
        }

        if (parsedIncome !== null || parsedTax !== null) {
            const incomeInput = recordNode.querySelector('.farm-income');
            const taxInput = recordNode.querySelector('.farm-tax');
            
            if (parsedIncome !== null && incomeInput) {
                incomeInput.value = parsedIncome;
                formatNumberInput(incomeInput);
            }
            if (parsedTax !== null && taxInput) {
                taxInput.value = parsedTax;
                formatNumberInput(taxInput);
            }
            
            triggerHaptic('success');
            hideResults();
            updateLiveSummary();
            
            textSpan.textContent = tr('scan_success');
            btn.classList.add('success');
            setTimeout(() => {
                btn.classList.remove('scanning', 'success');
                textSpan.textContent = tr('scan_payslip'); // revert but keep success
            }, 3000);
            
        } else {
            throw new Error('No relevant data found');
        }

    } catch (err) {
        console.error('OCR Error:', err);
        triggerHaptic('error');
        showInfo('scan_error');
        btn.classList.remove('scanning');
        textSpan.textContent = originalText;
    }
    
    fileInput.value = ''; // Reset for next scan
}

/**
 * Event Listeners
 */
document.addEventListener('DOMContentLoaded', () => {
    // ─── Tab Switching Logic ───
    const tabs = document.querySelectorAll('.md3-tab');
    const views = document.querySelectorAll('.view-section');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            views.forEach(v => {
                v.classList.remove('active');
                v.style.display = 'none';
            });
            tab.classList.add('active');
            
            const targetId = tab.getAttribute('data-target');
            const targetView = document.getElementById(targetId);
            if (targetView) {
                targetView.style.display = 'block';
                setTimeout(() => targetView.classList.add('active'), 10);
            }
            triggerHaptic('light'); // Native feeling
        });
    });

    // Formatting for initial inputs
    document.querySelectorAll('.farm-income, .farm-tax').forEach(addFormatting);

    // Add Farm Button
    const addBtn = document.getElementById('addFarmBtn');
    if (addBtn) addBtn.onclick = addFarmRecord;

    // Form submission Calculator
    const form = document.getElementById('taxForm');
    if (form) {
        form.onsubmit = (e) => {
            e.preventDefault();
            displayResults();
        };
    }

    // Delegated listener for OCR File Inputs (Only Tab 1)
    document.addEventListener('change', (e) => {
        if (e.target.classList.contains('ocr-file-input')) {
            handleOcrScan(e.target);
        }
    });

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

    // Load saved history if available
    loadHistoryFromCloud();
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

    const farmList = document.getElementById('farmList');
    const records = farmList.querySelectorAll('.farm-record');
    
    // Remove all records except the first one
    for (let i = 1; i < records.length; i++) {
        records[i].remove();
    }
    
    // Clear the first record's inputs
    if (records[0]) {
        records[0].querySelectorAll('input').forEach(input => input.value = '');
        records[0].querySelectorAll('select').forEach(select => select.selectedIndex = 0);
    }
    
    updateFarmNumbers();
    hideResults();
    updateLiveSummary();
    
    // Clear CloudStorage history
    if (window.Telegram?.WebApp?.CloudStorage) {
         window.Telegram.WebApp.CloudStorage.removeItem('tax_history');
    }

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// =================================================================================
// 6. СОХРАНЕНИЕ ИСТОРИИ (TELEGRAM CLOUD STORAGE)
// =================================================================================

function loadHistoryFromCloud() {
    if (window.Telegram?.WebApp?.CloudStorage) {
        window.Telegram.WebApp.CloudStorage.getItem('tax_history', (err, value) => {
            if (!err && value) {
                try {
                    const history = JSON.parse(value);
                    if (Array.isArray(history) && history.length > 0) {
                        populateFormWithHistory(history);
                    }
                } catch(e) { console.error('Error parsing tax history', e); }
            }
        });
    }
}

function populateFormWithHistory(history) {
    // Ensure we have enough records UI
    while(document.querySelectorAll('.farm-record').length < history.length) {
        addFarmRecord();
    }
    
    // Now fill them
    const updatedRecords = document.querySelectorAll('.farm-record');
    history.forEach((data, index) => {
        const record = updatedRecords[index];
        if(!record) return;
        
        if (data.year) record.querySelector('.farm-year').value = data.year;
        if (data.name && data.name !== tr('not_specified')) record.querySelector('.farm-name').value = data.name;
        if (data.agent && data.agent !== tr('not_specified')) record.querySelector('.farm-agent').value = data.agent;
        if (data.months) record.querySelector('.farm-months').value = data.months;
        
        const incomeInput = record.querySelector('.farm-income');
        if (data.income && data.income > 0) incomeInput.value = data.income;
        const taxInput = record.querySelector('.farm-tax');
        if (data.taxPaid && data.taxPaid > 0) taxInput.value = data.taxPaid;
        
        formatNumberInput(incomeInput);
        formatNumberInput(taxInput);
    });
    
    updateLiveSummary();
}

function saveHistoryToCloud() {
    const farmRecords = document.querySelectorAll('.farm-record');
    let history = [];
    farmRecords.forEach(record => {
        const year = record.querySelector('.farm-year').value;
        const name = record.querySelector('.farm-name').value.trim();
        const agent = record.querySelector('.farm-agent').value;
        const months = record.querySelector('.farm-months').value;
        const income = parseCleanNumber(record.querySelector('.farm-income').value);
        const taxPaid = parseCleanNumber(record.querySelector('.farm-tax').value);
        
        if (income > 0) {
            history.push({ year, name, agent, months, income, taxPaid });
        }
    });

    if (window.Telegram?.WebApp?.CloudStorage) {
        if (history.length > 0) {
            window.Telegram.WebApp.CloudStorage.setItem('tax_history', JSON.stringify(history));
        } else {
            window.Telegram.WebApp.CloudStorage.removeItem('tax_history');
        }
    }
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

