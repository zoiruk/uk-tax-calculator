// Переводы для многоязычного сайта
const translations = {
    ru: {
        banner_text: "🧮 Калькулятор возврата налогов (UK)<br><small>Узнайте, сколько налога вы можете вернуть за 1 минуту.</small>",
        title: "🧮 Калькулятор возврата налогов (UK)",
        subtitle: "Узнайте, сколько налога вы можете вернуть за 1 минуту.",
        partnership_short: "Этот инструмент разработан для расчета суммы возврата подоходного налога в Великобритании.",
        about_project_link: "Подробнее о проекте",
        modal_title: "О проекте",
        modal_content: "Этот инструмент разработан <a href=\"https://t.me/Mavsumiy_Ishchilar\" target=\"_blank\" class=\"t-link\">Сообществом сезонных рабочих</a> в партнерстве с White Tax Returns — официально зарегистрированным налоговым агентством в Великобритании.",
        modal_mission_title: "Цель проекта:",
        modal_mission_text: "Инструмент создан для того, чтобы помочь участникам сообщества эффективно, прозрачно и бесплатно рассчитывать свои налоговые льготы. Все алгоритмы калькулятора основаны на актуальных данных налогового законодательства Великобритании на 2026-27 год.",
        modal_dev_title: "Разработка цифровых решений",
        modal_dev_text: "Этот калькулятор — пример того, как технологии могут упрощать сложные процессы и приносить реальную пользу людям.<br><br>Если есть задача, которую важно сделать понятной, удобной и надежной для пользователей — её можно превратить в рабочий инструмент.<br><br>Создаются решения, которые:<br>✅ упрощают взаимодействие с клиентами<br>✅ повышают доверие<br>✅ дают точный и прозрачный результат",
        modal_dev_link: "👉 Обсудить разработку решения",
        close_btn: "Понятно",
        work_info: "Информация о работе",
        company_name: "Название компании/фермы:",
        company_placeholder: "Введите название компании или фермы",
        agent_operator: "Агент/Оператор:",
        select_agent: "Выберите агента/оператора",
        other: "Другой",
        months_worked: "Количество месяцев работы:",
        select_months: "Выберите количество месяцев",
        month_1: "1 месяц",
        month_2: "2 месяца",
        month_3: "3 месяца",
        month_4: "4 месяца",
        month_5: "5 месяцев",
        month_6: "6 месяцев",
        month_7: "7 месяцев",
        month_8: "8 месяцев",
        month_9: "9 месяцев",
        month_10: "10 месяцев",
        month_11: "11 месяцев",
        month_12: "12 месяцев (полный год)",
        financial_info: "Финансовая информация",
        income_period: "Общий доход за период (£):",
        income_placeholder: "Введите ваш доход за весь период работы",
        tax_withheld: "Удержанный налог (£):",
        tax_placeholder: "Введите сумму удержанного налога",
        tax_year: "Налоговый год:",
        select_tax_year: "Выберите налоговый год",
        calculate_button: "🧮 Рассчитать возврат",
        reset_button: "🔄 Начать заново",
        reset_confirm_msg: "Вы уверены, что хотите начать заново? Данные будут удалены.",
        result_title: "Результат расчета",
        work_summary: "Информация о работе",
        company_farm: "Компания/Ферма:",
        agent_operator_result: "Агент/Оператор:",
        work_period: "Период работы:",
        income_for_period: "Доход за период:",
        tax_due: "Налог к доплате:",
        tax_paid: "Удержанный налог:",
        refund_title: "🎉 Ваш возврат от HMRC",
        refund_disclaimer: "Этот расчет является ориентировочным. Точная сумма будет подтверждена HMRC.",
        payment_hmrc: "Доплата в HMRC:",
        tax_breakdown: "Детализация налога:",
        promo_title: "💼 Нужна помощь с возвратом налогов?",
        promo_subtitle: "Получите профессиональную помощь для возврата налогов",
        company_registered: "Официальное зарегистрированное налоговое агентство",
        company_partner: "Официальный бухгалтерский отдел Fruitful Jobs и Agri-HR",
        full_support: "Полное сопровождение подачи декларации в HMRC",
        max_refund: "Максимальный возврат налогов",
        apply_button: "👉 Подать заявку",
        tax_rates_title: "Информация о налоговых ставках UK (2026-27)",
        personal_allowance: "Необлагаемый минимум: £12,570",
        basic_rate: "Базовая ставка (20%): £12,571 - £50,270",
        higher_rate: "Повышенная ставка (40%): £50,271 - £125,140",
        additional_rate: "Дополнительная ставка (45%): свыше £125,140",
        add_farm_btn: "➕ Добавить другое место работы",
        remove_farm_btn: "❌ Удалить",
        farm_label: "Ферма/Компания",
        total_income_all: "Общий доход (все фермы):",
        total_tax_all: "Всего удержано налога:",
        not_specified: "Не указано",
        developed_by: "Разработка цифровых решений —",
        live_income: "Общий доход (Live):",
        tax_year_info_text: "Британский налоговый год длится с 6 апреля до 5 апреля следующего года.",
        income_info_text: "Ваш доход 'Gross' (до вычета налогов), указанный в Payslip или P45/P60.",
        tax_paid_info_text: "Сумма подоходного налога (Income Tax), удержанная из вашей зарплаты.",
        months_info_text: "Сколько полных месяцев вы проработали в этой компании.",
        months_many_label: "месяцев",
        month_1_label: "месяц",
        months_2_4_label: "месяца",
        net_income_label: "Чистый доход",
        tax_label: "Налог",
        invalid_input_msg: "Пожалуйста, заполните все обязательные поля.",
        footer_note: "Этот калькулятор разработан в сотрудничестве с White Tax Returns, чтобы помочь членам <a href=\"https://t.me/Mavsumiy_Ishchilar\" target=\"_blank\" class=\"t-link\">Сообщества сезонных рабочих</a> рассчитать налоговые льготы в Великобритании."
    },
    en: {
        banner_text: "🧮 Tax Refund Calculator (UK)<br><small>Find out how much tax you can get back in 1 minute.</small>",
        title: "🧮 Tax Refund Calculator (UK)",
        subtitle: "Find out how much tax you can get back in 1 minute.",
        partnership_short: "This tool is designed to calculate the amount of income tax refund in the UK.",
        about_project_link: "About project",
        modal_title: "About Project",
        modal_content: "This tool was developed by the <a href=\"https://t.me/Mavsumiy_Ishchilar\" target=\"_blank\" class=\"t-link\">Seasonal Workers' Community</a> in partnership with White Tax Returns — an officially registered tax agency in the UK.",
        modal_mission_title: "Project Goal:",
        modal_mission_text: "The tool was created to help community members calculate their tax benefits efficiently, transparently, and for free. All calculator algorithms are based on current UK tax law data for 2026-27.",
        modal_dev_title: "Digital Solutions Development",
        modal_dev_text: "This calculator is an example of how technology can simplify complex processes and bring real value to people.<br><br>If there is a task that is important to make understandable, convenient and reliable for users — it can be turned into a professional tool.<br><br>We create solutions that:<br>✅ simplify interaction with customers<br>✅ increase trust<br>✅ give accurate and transparent results",
        modal_dev_link: "👉 Discuss solution development",
        close_btn: "Got it",
        work_info: "Work Information",
        company_name: "Company/Farm Name:",
        company_placeholder: "Enter company or farm name",
        agent_operator: "Agent/Operator:",
        select_agent: "Select agent/operator",
        other: "Other",
        months_worked: "Months Worked:",
        select_months: "Select number of months",
        month_1: "1 month",
        month_2: "2 months",
        month_3: "3 months",
        month_4: "4 months",
        month_5: "5 months",
        month_6: "6 months",
        month_7: "7 months",
        month_8: "8 months",
        month_9: "9 months",
        month_10: "10 months",
        month_11: "11 months",
        month_12: "12 months (full year)",
        financial_info: "Financial Information",
        income_period: "Total Income for Period (£):",
        income_placeholder: "Enter your total income for the work period",
        tax_withheld: "Tax Withheld (£):",
        tax_placeholder: "Enter amount of tax withheld",
        tax_year: "Tax Year:",
        select_tax_year: "Select tax year",
        calculate_button: "🧮 Calculate Refund",
        reset_button: "🔄 Start Over",
        reset_confirm_msg: "Are you sure you want to start over? All data will be cleared.",
        result_title: "Calculation Result",
        work_summary: "Work Information",
        company_farm: "Company/Farm:",
        agent_operator_result: "Agent/Operator:",
        work_period: "Work Period:",
        income_for_period: "Income for Period:",
        tax_due: "Tax Due:",
        tax_paid: "Tax Paid:",
        refund_title: "🎉 Your HMRC Refund",
        refund_disclaimer: "This calculation is approximate. Exact amount will be confirmed by HMRC.",
        payment_hmrc: "Payment to HMRC:",
        tax_breakdown: "Tax Breakdown:",
        promo_title: "💼 Need Help with Tax Refund?",
        promo_subtitle: "Get professional help for your tax refund",
        company_registered: "Official registered tax agency",
        company_partner: "Official accounting department of Fruitful Jobs and Agri-HR",
        full_support: "Full support for HMRC declaration submission",
        max_refund: "Maximum tax refund",
        apply_button: "👉 Apply Now",
        tax_rates_title: "UK Tax Rates Information (2026-27)",
        personal_allowance: "Personal Allowance: £12,570",
        basic_rate: "Basic Rate (20%): £12,571 - £50,270",
        higher_rate: "Higher Rate (40%): £50,271 - £125,140",
        additional_rate: "Additional Rate (45%): over £125,140",
        add_farm_btn: "➕ Add another workplace",
        remove_farm_btn: "❌ Remove",
        farm_label: "Farm/Company",
        total_income_all: "Total Income (all farms):",
        total_tax_all: "Total Tax Withheld:",
        not_specified: "Not specified",
        developed_by: "Digital Solutions Development —",
        live_income: "Total Income (Live):",
        tax_year_info_text: "The UK tax year runs from April 6th to April 5th of the following year.",
        income_info_text: "Your Gross income (before tax), as shown on your Payslip or P45/P60.",
        tax_paid_info_text: "Total Income Tax withheld from your earnings.",
        months_info_text: "How many full months you worked for this company.",
        months_many_label: "months",
        month_1_label: "month",
        months_2_4_label: "months",
        net_income_label: "Net Income",
        tax_label: "Tax",
        invalid_input_msg: "Please fill in all required fields.",
        footer_note: "This calculator was developed in partnership with White Tax Returns to assist members of the <a href=\"https://t.me/Mavsumiy_Ishchilar\" target=\"_blank\" class=\"t-link\">Seasonal Workers' Community</a> in calculating tax benefits in the UK."
    },
    uz: {
        banner_text: "🧮 Soliq Qaytarish Kalkulyatori (UK)<br><small>1 daqiqa ichida qancha soliq qaytarib olishingiz mumkinligini bilib oling.</small>",
        title: "🧮 Soliq Qaytarish Kalkulyatori (UK)",
        subtitle: "1 daqiqa ichida qancha soliq qaytarib olishingiz mumkinligini bilib oling.",
        partnership_short: "Ushbu vosita Buyuk Britaniyada daromad solig'ini qaytarish miqdorini hisoblash uchun ishlab chiqilgan.",
        about_project_link: "Loyiha haqida batafsil",
        modal_title: "Loyiha haqida",
        modal_content: "Ushbu vosita <a href=\"https://t.me/Mavsumiy_Ishchilar\" target=\"_blank\" class=\"t-link\">Mavsumiy Ishchilar Jamoasi</a> tomonidan White Tax Returns — Buyuk Britaniyadagi rasmiy ro'yxatdan o'tgan soliq agentligi bilan hamkorlikda ishlab chiqilgan.",
        modal_mission_title: "Loyiha maqsadi:",
        modal_mission_text: "Asbob hamjamiyat a'zolariga soliq imtiyozlarini samarali, shaffof va bepul hisoblashda yordam berish uchun yaratilgan. Kalkulyatorning barcha algoritmlari 2026-27 yillardagi Buyuk Britaniya soliq qonunchiligining dolzarb ma'lumotlariga asoslangan.",
        modal_dev_title: "Raqamli yechimlar ishlab chiqish",
        modal_dev_text: "Ushbu kalkulyator texnologiyalar murakkab jarayonlarni qanday soddalashtirishi va odamlarga real foyda keltirishi mumkinligiga bir misoldir.<br><br>Agar foydalanuvchilar uchun tushunarli, qulay va ishonchli bo'lishi muhim bo'lgan vazifa bo'lsa - uni ishchi vositaga aylantirish mumkin.<br><br>Quyidagi yechimlar yaratiladi:<br>✅ mijozlar bilan muloqotni soddalashtiradi<br>✅ ishonchni oshiradi<br>✅ aniq va shaffof natija beradi",
        modal_dev_link: "👉 Yechim ishlab chiqishni muhokama qilish",
        close_btn: "Tushunarli",
        work_info: "Ish Ma'lumotlari",
        company_name: "Kompaniya/Ferma Nomi:",
        company_placeholder: "Kompaniya yoki ferma nomini kiriting",
        agent_operator: "Agent/Operator:",
        select_agent: "Agent/operatorni tanlang",
        other: "Boshqa",
        months_worked: "Ishlagan Oylar:",
        select_months: "Ishlagan Oylar sonini tanlang",
        month_1: "1 oy",
        month_2: "2 oy",
        month_3: "3 oy",
        month_4: "4 oy",
        month_5: "5 oy",
        month_6: "6 oy",
        month_7: "7 oy",
        month_8: "8 oy",
        month_9: "9 oy",
        month_10: "10 oy",
        month_11: "11 oy",
        month_12: "12 oy (to'liq yil)",
        financial_info: "Moliyaviy Ma'lumotlar",
        income_period: "Umumiy Daromad (£):",
        income_placeholder: "Ish davri uchun umumiy daromadingizni kiriting",
        tax_withheld: "Ushlab Qolingan Soliq(TAX) (£):",
        tax_placeholder: "Ushlab qolingan soliq miqdorini kiriting",
        tax_year: "Soliq Yili:",
        select_tax_year: "Soliq yilini tanlang",
        calculate_button: "🧮 Qaytarishni Hisoblash",
        reset_button: "🔄 Yangidan boshlash",
        reset_confirm_msg: "Haqiqatan ham yangidan boshlamoqchimisiz? Ma'lumotlar o'chirib tashlanadi.",
        result_title: "Hisoblash Natijasi",
        work_summary: "Ish Ma'lumotlari",
        company_farm: "Kompaniya/Ferma:",
        agent_operator_result: "Agent/Operator:",
        work_period: "Ish Davri:",
        income_for_period: "Davr uchun Daromad:",
        tax_due: "To'lanishi Kerak Soliq:",
        tax_paid: "To'langan Soliq:",
        refund_title: "🎉 Sizga HMRC Qaytarishi kerak bo'lgan summa",
        refund_disclaimer: "Bu hisoblash taxminiy. Aniq miqdor HMRC tomonidan tasdiqlanadi.",
        payment_hmrc: "HMRC ga To'lov:",
        tax_breakdown: "Soliq Tafsiloti:",
        promo_title: "💼 Soliq Qaytarish uchun Yordam Kerakmi?",
        promo_subtitle: "Soliq qaytarish uchun professional yordam oling",
        company_registered: "Rasmiy ro'yxatdan o'tgan soliq agentligi",
        company_partner: "Fruitful Jobs va Agri-HR ning rasmiy buxgalteriya bo'limi",
        full_support: "HMRC deklaratsiyasini topshirish uchun to'liq yordam",
        max_refund: "Maksimal soliq qaytarish",
        apply_button: "👉 Ariza Berish",
        tax_rates_title: "Buyuk Britaniya Soliq Stavkalari Ma'lumoti (2026-27)",
        personal_allowance: "Shaxsiy Imtiyoz: £12,570",
        basic_rate: "Asosiy Stavka (20%): £12,571 - £50,270",
        higher_rate: "Yuqori Stavka (40%): £50,271 - £125,140",
        additional_rate: "Qo'shimcha Stavka (45%): £125,140 dan ortiq",
        add_farm_btn: "➕ Boshqa ish joyini qo'shish",
        remove_farm_btn: "❌ O'chirish",
        farm_label: "Ferma/Kompaniya",
        total_income_all: "Umumiy daromad (barcha fermalar):",
        total_tax_all: "Jami ushlab qolingan soliq:",
        not_specified: "Ko'rsatilmagan",
        developed_by: "Raqamli yechimlar ishlab chiqish —",
        live_income: "Jami daromad (Live):",
        tax_year_info_text: "Buyuk Britaniya soliq yili 6-apreldan keyingi yilning 5-apreligacha davom etadi.",
        income_info_text: "Sizning Payslip yoki P45/P60-da ko'rsatilgan 'Gross' (soliqgacha bo'lgan) daromadingiz.",
        tax_paid_info_text: "Sizning maoshingizdan ushlab qolingan daromad solig'i (Income Tax) miqdori.",
        months_info_text: "Ushbu kompaniyada necha to'liq oy ishlaganingiz.",
        months_many_label: "oy",
        month_1_label: "oy",
        months_2_4_label: "oy",
        net_income_label: "Sof foyda",
        tax_label: "Soliq",
        invalid_input_msg: "Iltimos, barcha kerakli maydonlarni to'ldiring.",
        footer_note: "Ushbu kalkulyator <a href=\"https://t.me/Mavsumiy_Ishchilar\" target=\"_blank\" class=\"t-link\">Mavsumiy Ishchilar Jamoasi</a> a'zolari uchun Buyuk Britaniyadagi soliq imtiyozlarini hisoblashda ko'maklashish maqsadida White Tax Returns bilan hamkorlikda ishlab chiqildi."
    },
    kk: {
        banner_text: "🧮 Салық Қайтару Калькуляторы (UK)<br><small>1 минут ішінде қанша салық қайтара алатыныңызды біліңіз.</small>",
        title: "🧮 Салық Қайтару Калькуляторы (UK)",
        subtitle: "1 минут ішінде қанша салық қайтара алатыныңызды біліңіз.",
        partnership_short: "Бұл құрал Ұлыбританиядағы табыс салығын қайтару сомасын есептеуге арналған.",
        about_project_link: "Жоба туралы толығырақ",
        modal_title: "Жоба туралы",
        modal_content: "Бұл құралды <a href=\"https://t.me/Mavsumiy_Ishchilar\" target=\"_blank\" class=\"t-link\">Маусымдық жұмысшылар қауымдастығы</a> White Tax Returns — Ұлыбританиядағы ресми тіркелген салық агенттігімен серіктестікте әзірлеген.",
        modal_mission_title: "Жобаның мақсаты:",
        modal_mission_text: "Құрал қауымдастық мүшелеріне салық жеңілдіктерін тиімді, ашық және тегін есептеуге көмектесу үшін жасалған. Калькулятордың барлық алгоритмдері 2026-27 жылдардағы Ұлыбритания салық заңнамасының өзекті мәліметтеріне негізделген.",
        modal_dev_title: "Цифрлық шешімдерді әзірлеу",
        modal_dev_text: "Бұл калькулятор технологияның күрделі процестерді қалай жеңілдететінінің және адамдарға нақты пайда әкелетінінің мысалы болып табылады.<br><br>Егер пайдаланушылар үшін түсінікті, ыңғайлы және сенімді болуы маңызды міндет болса - оны жұмыс құралына айналдыруға болады.<br><br>Келесі шешімдер жасалады:<br>✅ клиенттермен өзара әрекеттесуді жеңілдетеді<br>✅ сенімді арттырады<br>✅ дәл және ашық нәтиже береді",
        modal_dev_link: "👉 Шешім әзірлеуді талқылау",
        close_btn: "Түсінікті",
        work_info: "Жұмыс туралы ақпарат",
        company_name: "Компания/Ферма атауы:",
        company_placeholder: "Компания немесе ферма атауын енгізіңіз",
        agent_operator: "Агент/Оператор:",
        select_agent: "Агент/операторды таңдаңыз",
        other: "Басқа",
        months_worked: "Жұмыс істеген айлар:",
        select_months: "Айлар санын таңдаңыз",
        month_1: "1 ай",
        month_2: "2 ай",
        month_3: "3 ай",
        month_4: "4 ай",
        month_5: "5 ай",
        month_6: "6 ай",
        month_7: "7 ай",
        month_8: "8 ай",
        month_9: "9 ай",
        month_10: "10 ай",
        month_11: "11 ай",
        month_12: "12 ай (толық жыл)",
        financial_info: "Қаржылық ақпарат",
        income_period: "Кезең үшін жалпы табыс (£):",
        income_placeholder: "Жұмыс кезеңі үшін жалпы табысыңызды енгізіңіз",
        tax_withheld: "Ұсталған салық (£):",
        tax_placeholder: "Ұсталған салық мөлшерін енгізіңіз",
        tax_year: "Салық жылы:",
        select_tax_year: "Салық жылын таңдаңыз",
        calculate_button: "🧮 Қайтаруды есептеу",
        reset_button: "🔄 Қайта бастау",
        reset_confirm_msg: "Жаңадан бастағыңыз келетініне сенімдісіз бе? Барлық деректер жойылады.",
        result_title: "Есептеу нәтижесі",
        work_summary: "Жұмыс туралы ақпарат",
        company_farm: "Компания/Ферма:",
        agent_operator_result: "Агент/Оператор:",
        work_period: "Жұмыс кезеңі:",
        income_for_period: "Кезең үшін табыс:",
        tax_due: "Төленуі тиіс салық:",
        tax_paid: "Төленген салық:",
        refund_title: "🎉 Сіздің HMRC қайтарымыңыз",
        refund_disclaimer: "Бұл есептеу шамамен. Нақты сома HMRC тарапынан расталады.",
        payment_hmrc: "HMRC-ға төлем:",
        tax_breakdown: "Салық бөлшектемесі:",
        promo_title: "💼 Салық қайтару үшін көмек керек пе?",
        promo_subtitle: "Салық қайтару үшін кәсіби көмек алыңыз",
        company_registered: "Ресми тіркелген салық агенттігі",
        company_partner: "Fruitful Jobs және Agri-HR-дің ресми бухгалтерлік бөлімі",
        full_support: "HMRC декларациясын тапсыру үшін толық қолдау",
        max_refund: "Максималды салық қайтару",
        apply_button: "👉 Өтініш беру",
        tax_rates_title: "Ұлыбритания салық мөлшерлемелері туралы ақпарат (2026-27)",
        personal_allowance: "Жеке жеңілдік: £12,570",
        basic_rate: "Негізгі мөлшерлеме (20%): £12,571 - £50,270",
        higher_rate: "Жоғары мөлшерлеме (40%): £50,271 - £125,140",
        additional_rate: "Қосымша мөлшерлеме (45%): £125,140-тан жоғары",
        add_farm_btn: "➕ Басқа жұмыс орнын қосу",
        remove_farm_btn: "❌ Өшіру",
        farm_label: "Ферма/Компания",
        total_income_all: "Жалпы табыс (барлық фермалар):",
        total_tax_all: "Жалпы ұсталған салық:",
        not_specified: "Көрсетілмеген",
        developed_by: "Цифрлық шешімдерді әзірлеу —",
        months_many_label: "ай",
        month_1_label: "ай",
        months_2_4_label: "ай",
        footer_note: "Бұл калькулятор <a href=\"https://t.me/Mavsumiy_Ishchilar\" target=\"_blank\" class=\"t-link\">Маусымдық жұмысшылар қауымдастығы</a> мүшелеріне Ұлыбританиядағы салық жеңілдіктерін есептеуге көмектесу мақсатында White Tax Returns-пен серіктестікте әзірленген."
    },
    ky: {
        banner_text: "🧮 Салык Кайтаруу Калькулятору (UK)<br><small>1 мүнөттүн ичинде канча салык кайтарып ала тургандыгыңызды билиңиз.</small>",
        title: "🧮 Салык Кайтаруу Калькулятору (UK)",
        subtitle: "1 мүнөттүн ичинде канча салык кайтарып ала тургандыгыңызды билиңиз.",
        partnership_short: "Бул курал Улуу Британиядагы киреше салыгын кайтаруу суммасын эсептөө үчүн иштелип чыккан.",
        about_project_link: "Долбоор жөнүндө кененирээк",
        modal_title: "Долбоор жөнүндө",
        modal_content: "Бул курал <a href=\"https://t.me/Mavsumiy_Ishchilar\" target=\"_blank\" class=\"t-link\">Сезондук жумушчулар жамааты</a> тарабынан White Tax Returns — Улуу Британиядагы расмий катталган салык агенттиги менен өнөктөштүктө иштелип чыккан.",
        modal_mission_title: "Долбоордун максаты:",
        modal_mission_text: "Курал жамаат мүчөлөрүнө салык жеңилдиктерин натыйжалуу, ачык жана акысыз эсептөөгө жардам берүү үчүн түзүлгөн. Калькулятордун бардык алгоритмдери 2026-27-жылдардагы Улуу Британиянын салык мыйзамдарынын актуалдуу маалыматтарына негизделген.",
        modal_dev_title: "Санариптик чечимдерди иштеп чыгуу",
        modal_dev_text: "Бул калькулятор технология татаал процесстерди кантип жөнөкөйлөтүп, адамдарга реалдуу пайда алып келерин көрсөткөн мисал болуп саналат.<br><br>Эгерде колдонуучулар үчүн түшүнүктүү, ыңғайлуу жана ишенимдүү болуусу маанилүү болгон тапшырма болсо - аны жумушчу куралга айландырса болот.<br><br>Кийинки чечимдер түзүлөт:<br>✅ кардарлар менен өз ара аракеттенүүнү жөнөкөйлөтөт<br>✅ ишенимди арттырат<br>✅ так жана ачык жыйынтык берет",
        modal_dev_link: "👉 Чечимди иштеп чыгууну талкуулоо",
        close_btn: "Түшүнүктүү",
        work_info: "Жумуш жөнүндө маалымат",
        company_name: "Компания/Ферма аталышы:",
        company_placeholder: "Компания же ферма аталышын киргизиңиз",
        agent_operator: "Агент/Оператор:",
        select_agent: "Агент/операторду тандаңыз",
        other: "Башка",
        months_worked: "Иштеген айлар:",
        select_months: "Айлардын санын тандаңыз",
        month_1: "1 ай",
        month_2: "2 ай",
        month_3: "3 ай",
        month_4: "4 ай",
        month_5: "5 ай",
        month_6: "6 ай",
        month_7: "7 ай",
        month_8: "8 ай",
        month_9: "9 ай",
        month_10: "10 ай",
        month_11: "11 ай",
        month_12: "12 ай (толук жыл)",
        financial_info: "Каржылык маалымат",
        income_period: "Мезгил үчүн жалпы киреше (£):",
        income_placeholder: "Жумуш мезгили үчүн жалпы кирешеңизди киргизиңиз",
        tax_withheld: "Кармалган салык (£):",
        tax_placeholder: "Кармалган салык өлчөмүн киргизиңиз",
        tax_year: "Салык жылы:",
        select_tax_year: "Салык жылын тандаңыз",
        calculate_button: "🧮 Кайтарууну эсептөө",
        reset_button: "🔄 Кайра баштоо",
        reset_confirm_msg: "Кайра баштоону каалайсызбы? Бардык маалыматтар өчүрүлөт.",
        result_title: "Эсептөө жыйынтыгы",
        work_summary: "Жумуш жөнүндө маалымат",
        company_farm: "Компания/Ферма:",
        agent_operator_result: "Агент/Оператор:",
        work_period: "Жумуш мезгили:",
        income_for_period: "Мезгил үчүн киреше:",
        tax_due: "Төлөнүүгө тийиш салык:",
        tax_paid: "Төлөнгөн салык:",
        refund_title: "🎉 Сиздин HMRC кайтарымыңыз",
        refund_disclaimer: "Бул эсептөө болжолдуу. Так сумма HMRC тарабынан ырасталат.",
        payment_hmrc: "HMRC-га төлөм:",
        tax_breakdown: "Салык бөлүштүрүүсү:",
        promo_title: "💼 Салык кайтаруу үчүн жардам керекпи?",
        promo_subtitle: "Салык кайтаруу үчүн кесипкөй жардам алыңыз",
        company_registered: "Расмий катталган салык агенттиги",
        company_partner: "Fruitful Jobs жана Agri-HR-дин расмий бухгалтердик бөлүмү",
        full_support: "HMRC декларациясын тапшыруу үчүн толук колдоо",
        max_refund: "Максималдуу салык кайтаруу",
        apply_button: "👉 Арыз берүү",
        tax_rates_title: "Улуу Британия салык ставкалары жөнүндө маалымат (2026-27)",
        personal_allowance: "Жеке жеңилдик: £12,570",
        basic_rate: "Негизги ставка (20%): £12,571 - £50,270",
        higher_rate: "Жогорку ставка (40%): £50,271 - £125,140",
        additional_rate: "Кошумча ставка (45%): £125,140-дан жогору",
        add_farm_btn: "➕ Башка жумуш ордун кошуу",
        remove_farm_btn: "❌ Өчүрүү",
        farm_label: "Ферма/Компания",
        total_income_all: "Жалпы киреше (бардык фермалар):",
        total_tax_all: "Жалпы кармалган салык:",
        not_specified: "Көрсөтүлгөн эмес",
        developed_by: "Санариптик чечимдерди иштеп чыгуу —",
        months_many_label: "ай",
        month_1_label: "ай",
        months_2_4_label: "ай",
        footer_note: "Бул калькулятор <a href=\"https://t.me/Mavsumiy_Ishchilar\" target=\"_blank\" class=\"t-link\">Сезондук жумушчулар жамааты</a> мүчөлөрүнө Улуу Британиядагы салык жеңилдиктерин эсептөөгө жардам берүү максатында White Tax Returns менен өнөктөштүктө иштелип чыккан."
    },
    tg: {
        banner_text: "🧮 Калькулятори Баргардонии Андоз (UK)<br><small>Дар 1 дақиқа бифаҳмед, ки чӣ қадар андозро баргардонида метавонед.</small>",
        title: "🧮 Калькулятори Баргардонии Андоз (UK)",
        subtitle: "Дар 1 дақиқа бифаҳмед, ки чӣ қадар андозро баргардонида метавонед.",
        partnership_short: "Ин восита барои ҳисоб кардани миқдори баргардонидани андози даромад дар Бритониёи Кабир таҳия шудааст.",
        about_project_link: "Муфассал дар бораи лоиҳа",
        modal_title: "Дар бораи лоиҳа",
        modal_content: "Ин восита аз ҷониби <a href=\"https://t.me/Mavsumiy_Ishchilar\" target=\"_blank\" class=\"t-link\">Ҷамъияти коргарони мавсимӣ</a> дар ҳамкорӣ бо White Tax Returns — агентии расман сабтшудаи андоз дар Бритониёи Кабир таҳия шудааст.",
        modal_mission_title: "Ҳадафи лоиҳа:",
        modal_mission_text: "Асбоб барои кӯмак ба аъзоёни ҷомеа дар ҳисоб кардани имтиёзҳои андози худ ба таври муассир, шаффоф ва ройгон сохта шудааст. Ҳама алгоритмҳои калькулятора ба маълумоти ҷории қонунгузории андози Бритониё дар солҳои 2026-27 асос ёфтаанд.",
        modal_dev_title: "Таҳияи қарорҳои рақамӣ",
        modal_dev_text: "Ин калькулятор намунаи он аст, ки чӣ гуна технология метавонад равандҳои мураккабро содда кунад ва ба одамон фоидаи воқеӣ расонад.<br><br>Агар вазифае бошад, ки онро барои корбарон фаҳмо, қулай ва боэътимод кардан муҳим аст — онро ба воситаи корӣ табдил додан мумкин аст.<br><br>Қарорҳое сохта мешаванд, ки:<br>✅ ҳамкориро бо мизоҷон содда мекунанд<br>✅ эътимодро зиёд мекунанд<br>✅ натиҷаи дақиқ ва шаффоф медиҳанд",
        modal_dev_link: "👉 Муҳокимаи таҳияи қарор",
        close_btn: "Фаҳмост",
        work_info: "Маълумот дар бораи кор",
        company_name: "Номи ширкат/хоҷагӣ:",
        company_placeholder: "Номи ширкат ё хоҷагиро ворид кунед",
        agent_operator: "Агент/Оператор:",
        select_agent: "Агент/операторро интихоб кунед",
        other: "Дигар",
        months_worked: "Моҳҳои кор:",
        select_months: "Шумораи моҳҳоро интихоб кунед",
        month_1: "1 моҳ",
        month_2: "2 моҳ",
        month_3: "3 моҳ",
        month_4: "4 моҳ",
        month_5: "5 моҳ",
        month_6: "6 моҳ",
        month_7: "7 моҳ",
        month_8: "8 моҳ",
        month_9: "9 моҳ",
        month_10: "10 моҳ",
        month_11: "11 моҳ",
        month_12: "12 моҳ (соли пурра)",
        financial_info: "Маълумоти молиявӣ",
        income_period: "Даромади умумӣ барои давра (£):",
        income_placeholder: "Даромади умумии худро барои давраи кор ворид кунед",
        tax_withheld: "Андози нигоҳдошташуда (£):",
        tax_placeholder: "Миқдори андози нигоҳдоштаро ворид кунед",
        tax_year: "Соли андозӣ:",
        select_tax_year: "Соли андозиро интихоб кунед",
        calculate_button: "🧮 Баргардониро ҳисоб кардан",
        reset_button: "🔄 Аз нав оғоз кунед",
        reset_confirm_msg: "Оё шумо боварӣ доред, ки мехоҳед аз нав оғоз кунед? Ҳама маълумотҳо тоза карда мешаванд.",
        result_title: "Натиҷаи ҳисобкунӣ",
        work_summary: "Маълумот дар бораи кор",
        company_farm: "Ширкат/Хоҷагӣ:",
        agent_operator_result: "Агент/Оператор:",
        work_period: "Давраи кор:",
        income_for_period: "Даромад барои давра:",
        tax_due: "Андози пардохтшаванда:",
        tax_paid: "Андози пардохташуда:",
        refund_title: "🎉 Баргардонии шумо аз HMRC",
        refund_disclaimer: "Ин ҳисобкунӣ тахминӣ аст. Миқдори дақиқ аз ҷониби HMRC тасдиқ мешавад.",
        payment_hmrc: "Пардохт ба HMRC:",
        tax_breakdown: "Тафсилоти андоз:",
        promo_title: "💼 Барои баргардонии андоз кӯмак лозим аст?",
        promo_subtitle: "Барои баргардонии андоз кӯмаки касбӣ гиред",
        company_registered: "Агентии андозии расман сабтшуда",
        company_partner: "Шӯъбаи расмии ҳисобдории Fruitful Jobs ва Agri-HR",
        full_support: "Дастгирии пурра барои пешниҳоди декларатсия ба HMRC",
        max_refund: "Баргардонии максималии андоз",
        apply_button: "👉 Дархост додан",
        tax_rates_title: "Маълумот дар бораи нархҳои андози Бритониёи Кабир (2026-27)",
        personal_allowance: "Имтиёзи шахсӣ: £12,570",
        basic_rate: "Нархи асосӣ (20%): £12,571 - £50,270",
        higher_rate: "Нархи баланд (40%): £50,271 - £125,140",
        additional_rate: "Нархи иловагӣ (45%): аз £125,140 зиёд",
        add_farm_btn: "➕ Илова кардани ҷои дигари кор",
        remove_farm_btn: "❌ Нест кардан",
        farm_label: "Хоҷагӣ/Ширкат",
        total_income_all: "Даромади умумӣ (ҳамаи хоҷагиҳо):",
        total_tax_all: "Ҷамъи андози нигоҳдошташуда:",
        not_specified: "Нишон дода нашудааст",
        developed_by: "Таҳияи қарорҳои рақамӣ —",
        months_many_label: "моҳ",
        month_1_label: "моҳ",
        months_2_4_label: "моҳ",
        footer_note: "Ин калькулятор бо мақсади кӯмак ба аъзоёни <a href=\"https://t.me/Mavsumiy_Ishchilar\" target=\"_blank\" class=\"t-link\">Ҷамъияти коргарони мавсимӣ</a> дар ҳисоб кардани имтиёзҳои андоз дар Бритониёи Кабир дар ҳамкорӣ бо White Tax Returns таҳия шудааст."
    }
};

// Получить название языка с флагом
function getLanguageDisplay(lang) {
    const languageNames = {
        ru: '🇷🇺 Русский',
        en: '🇬🇧 English',
        uz: '🇺🇿 O\'zbek',
        kk: '🇰🇿 Қазақша',
        ky: '🇰🇬 Кыргызча',
        tg: '🇹🇯 Тоҷикӣ'
    };
    return languageNames[lang] || languageNames.ru;
}

// Функция для смены языка
function changeLanguage(lang) {
    // Переводим все элементы КРОМЕ кнопок выбора языка в модале
    const elements = document.querySelectorAll('[data-translate]');
    elements.forEach(element => {
        // Пропускаем кнопки языкового модала — у них data-translate может быть на span
        if (element.closest('.language-option')) return;
        const key = element.getAttribute('data-translate');
        if (translations[lang] && translations[lang][key]) {
            element.innerHTML = translations[lang][key];
        }
    });

    // Переводим placeholder'ы
    const placeholderElements = document.querySelectorAll('[data-translate-placeholder]');
    placeholderElements.forEach(element => {
        const key = element.getAttribute('data-translate-placeholder');
        if (translations[lang] && translations[lang][key]) {
            element.placeholder = translations[lang][key];
        }
    });

    // Обновляем кнопку выбора языка с флагом
    const langBtn = document.getElementById('langBtn');
    if (langBtn) {
        langBtn.textContent = getLanguageDisplay(lang);
    }

    // Сохраняем выбранный язык
    localStorage.setItem('selectedLanguage', lang);
}

// Показать модальное окно выбора языка
function showLanguageModal() {
    const modal = document.getElementById('languageModal');
    if (modal) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden'; // Блокируем прокрутку
    }
}

// Скрыть модальное окно выбора языка
function hideLanguageModal() {
    const modal = document.getElementById('languageModal');
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = ''; // Разблокируем прокрутку
    }
}

// Инициализация языка при загрузке страницы
function initLanguage() {
    const savedLanguage = localStorage.getItem('selectedLanguage');

    // Если язык не выбран, показываем модальное окно
    if (!savedLanguage) {
        showLanguageModal();
    } else {
        // Применяем сохраненный язык
        changeLanguage(savedLanguage);
    }

    // Обработчики для кнопок выбора языка в модальном окне
    const languageOptions = document.querySelectorAll('.language-option');
    languageOptions.forEach(option => {
        option.addEventListener('click', (e) => {
            const lang = e.currentTarget.getAttribute('data-lang');
            changeLanguage(lang);
            if (window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.HapticFeedback) {
                window.Telegram.WebApp.HapticFeedback.impactOccurred('light');
            }
            // Скрываем модальное окно
            hideLanguageModal();
        });
    });

    // Закрытие модального окна при клике вне его
    const modal = document.getElementById('languageModal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                // Если язык не выбран, выбираем русский по умолчанию
                if (!localStorage.getItem('selectedLanguage')) {
                    changeLanguage('ru');
                }
                hideLanguageModal();
            }
        });
    }

    // Кнопка открытия языкового модала из translations.js
    const langBtnEl = document.getElementById('langBtn');
    if (langBtnEl) {
        langBtnEl.addEventListener('click', showLanguageModal);
    }
}

// Запускаем инициализацию после загрузки DOM
document.addEventListener('DOMContentLoaded', initLanguage);
