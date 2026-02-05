
function toggleDarkMode() {
    const html = document.documentElement;
    const isDark = html.getAttribute('data-theme') === 'dark';
    const newTheme = isDark ? 'light' : 'dark';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);

    const lightIcon = document.querySelector('.theme-icon-light');
    const darkIcon = document.querySelector('.theme-icon-dark');
    if (newTheme === 'dark') {
        lightIcon.style.display = 'none';
        darkIcon.style.display = 'block';
    } else {
        lightIcon.style.display = 'block';
        darkIcon.style.display = 'none';
    }
}

function initTheme() {
    const saved = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', saved);
    const lightIcon = document.querySelector('.theme-icon-light');
    const darkIcon = document.querySelector('.theme-icon-dark');
    if (saved === 'dark') {
        lightIcon.style.display = 'none';
        darkIcon.style.display = 'block';
    }
}


document.addEventListener('DOMContentLoaded', function() {
    initTheme();
    showSection('calculator');
});

function showSection(id) {
    document.querySelectorAll(".section").forEach(sec => sec.style.display = "none");
    const section = document.getElementById(id);
    if (!section) return;
    section.style.display = "block";

    // Highlight active nav item (match onclick target)
    document.querySelectorAll('nav li').forEach(li => {
        const onclick = li.getAttribute('onclick') || '';
        // check for showSection('id') or showSection("id")
        if (onclick.includes("'" + id + "'") || onclick.includes('"' + id + '"')) {
            li.classList.add('active');
        } else {
            li.classList.remove('active');
        }
    });

    // Auto-update dynamic inputs when relevant sections are shown
    if (id === 'area') updateAreaInputs();
    if (id === 'perimeter') updatePeriInputs();
}

// --- BASİT HESAP MAKİNESİ ---
function calculate(operation) {
    const num1 = parseFloat(document.getElementById("num1").value);
    const num2 = parseFloat(document.getElementById("num2").value);
    const errorDiv = document.getElementById("calcError");
    let result;
    errorDiv.textContent = "";

    if (isNaN(num1) || isNaN(num2)) {
        errorDiv.textContent = "Lütfen geçerli iki sayı girin!";
        return;
    }

    switch (operation) {
        case "add": result = num1 + num2; break;
        case "subtract": result = num1 - num2; break;
        case "multiply": result = num1 * num2; break;
        case "divide":
            if (num2 === 0) {
                errorDiv.textContent = "Sıfıra bölme hatası!";
                return;
            }
            result = num1 / num2;
            break;
        default: return;
    }
    document.getElementById("calcResult").textContent = "Sonuç: " + result;
}

// --- BMI HESAPLAMA ---
function calculateBMI() {
    const weight = parseFloat(document.getElementById("weight").value);
    const height = parseFloat(document.getElementById("height").value) / 100;
    const errorDiv = document.getElementById("bmiError");
    errorDiv.textContent = "";

    if (isNaN(weight) || isNaN(height) || height <= 0) {
        errorDiv.textContent = "Lütfen geçerli değerler girin!";
        return;
    }

    const bmi = weight / (height * height);
    document.getElementById("bmiResult").textContent = "BMI: " + bmi.toFixed(2);
}

// --- Basit Faiz ---
function calculateInterest() {
    const principal = parseFloat(document.getElementById("principal").value);
    const rate = parseFloat(document.getElementById("rate").value);
    const time = parseFloat(document.getElementById("time").value);
    const errorDiv = document.getElementById("interestError");
    errorDiv.textContent = "";

    if (isNaN(principal) || isNaN(rate) || isNaN(time)) {
        errorDiv.textContent = "Lütfen geçerli değerler girin!";
        return;
    }

    const interest = principal * (rate/100) * time;
    document.getElementById("interestResult").textContent = "Basit Faiz: " + interest.toFixed(2);
}

// --- Sıcaklık Dönüştürücü ---
function convertTemperature() {
    const temp = parseFloat(document.getElementById("tempInput").value);
    const type = document.getElementById("tempType").value;
    const errorDiv = document.getElementById("tempError");
    errorDiv.textContent = "";
    let result;

    if (isNaN(temp)) {
        errorDiv.textContent = "Geçerli bir sayı girin!";
        return;
    }

    if (type === "CtoF") {
        result = temp * 9/5 + 32;
        document.getElementById("tempResult").textContent = temp + "°C = " + result.toFixed(2) + "°F";
    } else {
        result = (temp - 32) * 5/9;
        document.getElementById("tempResult").textContent = temp + "°F = " + result.toFixed(2) + "°C";
    }
}

// --- Faktöriyel ---
function calculateFactorial() {
    const n = parseInt(document.getElementById("factInput").value);
    const errorDiv = document.getElementById("factError");
    errorDiv.textContent = "";

    if (isNaN(n) || n < 0) {
        errorDiv.textContent = "Geçerli bir sayı girin!";
        return;
    }

    let fact = 1;
    for (let i = 2; i <= n; i++) fact *= i;
    document.getElementById("factResult").textContent = n + "! = " + fact;
}

// --- Karekök ve Üs ---
function calculatePowRoot() {
    const base = parseFloat(document.getElementById("baseNumber").value);
    const power = parseFloat(document.getElementById("powerNumber").value);
    const errorDiv = document.getElementById("powError");
    errorDiv.textContent = "";

    if (isNaN(base) || isNaN(power)) {
        errorDiv.textContent = "Geçerli sayı girin!";
        return;
    }

    let result = power === 0 ? Math.sqrt(base) : Math.pow(base, power);
    document.getElementById("powResult").textContent = "Sonuç: " + result.toFixed(2);
}

// --- Ortalama ---
function calculateAverage() {
    const input = document.getElementById("avgInput").value;
    const errorDiv = document.getElementById("avgError");
    errorDiv.textContent = "";

    const numbers = input.split(",").map(x => parseFloat(x.trim())).filter(x => !isNaN(x));
    if (numbers.length === 0) {
        errorDiv.textContent = "Geçerli sayılar girin!";
        return;
    }

    const avg = numbers.reduce((a,b)=>a+b,0)/numbers.length;
    document.getElementById("avgResult").textContent = "Ortalama: " + avg.toFixed(2);
}
// --- Decimal ↔ Binary ---
function convertBinary() {
    const num = document.getElementById("binInput").value.trim();
    const type = document.getElementById("binType").value;
    const errorDiv = document.getElementById("binError");
    errorDiv.textContent = "";

    if (num === "") { errorDiv.textContent = "Sayı girin!"; return; }

    let result;
    if (type === "toBinary") {
        if (isNaN(num)) { errorDiv.textContent = "Geçerli sayı girin!"; return; }
        result = parseInt(num).toString(2);
    } else {
        if (!/^[01]+$/.test(num)) { errorDiv.textContent = "Geçerli binary girin!"; return; }
        result = parseInt(num, 2);
    }
    document.getElementById("binResult").textContent = "Sonuç: " + result;
}

// --- Hız Hesaplama ---
function calculateSpeed() {
    const distance = parseFloat(document.getElementById("distance").value);
    const time = parseFloat(document.getElementById("timeSec").value);
    const errorDiv = document.getElementById("speedError");
    errorDiv.textContent = "";

    if (isNaN(distance) || isNaN(time) || time <= 0) {
        errorDiv.textContent = "Geçerli değerler girin!";
        return;
    }

    const speed = distance / time;
    document.getElementById("speedResult").textContent = "Hız: " + speed.toFixed(2) + " m/s";
}

// --- Basınç Hesaplama ---
function calculatePressure() {
    const force = parseFloat(document.getElementById("force").value);
    const area = parseFloat(document.getElementById("pressureArea").value);
    const errorDiv = document.getElementById("pressureError");
    errorDiv.textContent = "";

    if (isNaN(force) || isNaN(area) || area <= 0) {
        errorDiv.textContent = "Geçerli değerler girin!";
        return;
    }

    const pressure = force / area;
    document.getElementById("pressureResult").textContent = "Basınç: " + pressure.toFixed(2) + " Pa";
}

// --- Potansiyel Enerji ---
function calculatePotentialEnergy() {
    const mass = parseFloat(document.getElementById("mass").value);
    const height = parseFloat(document.getElementById("heightPE").value);
    const g = 9.81; // Yerçekimi
    const errorDiv = document.getElementById("peError");
    errorDiv.textContent = "";

    if (isNaN(mass) || isNaN(height)) {
        errorDiv.textContent = "Geçerli değerler girin!";
        return;
    }

    const pe = mass * g * height;
    document.getElementById("peResult").textContent = "Potansiyel Enerji: " + pe.toFixed(2) + " J";
}

// --- Bileşik Faiz ---
function calculateCompoundInterest() {
    const P = parseFloat(document.getElementById("cprincipal").value);
    const r = parseFloat(document.getElementById("crate").value)/100;
    const n = parseInt(document.getElementById("cyears").value);
    const errorDiv = document.getElementById("compoundError");
    errorDiv.textContent = "";

    if (isNaN(P) || isNaN(r) || isNaN(n)) {
        errorDiv.textContent = "Geçerli değerler girin!";
        return;
    }

    const A = P * Math.pow((1+r), n);
    document.getElementById("compoundResult").textContent = "Bileşik Faiz: " + A.toFixed(2);
}

// --- Kredi Hesabı ---
function calculateLoan() {
    const principal = parseFloat(document.getElementById("loanAmount").value);
    const rate = parseFloat(document.getElementById("loanRate").value)/100/12;
    const months = parseInt(document.getElementById("loanMonths").value);
    const errorDiv = document.getElementById("loanError");
    errorDiv.textContent = "";

    if (isNaN(principal) || isNaN(rate) || isNaN(months) || months <= 0) {
        errorDiv.textContent = "Geçerli değerler girin!";
        return;
    }

    const payment = (principal * rate) / (1 - Math.pow(1 + rate, -months));
    document.getElementById("loanResult").textContent = "Aylık Ödeme: " + payment.toFixed(2);
}

// --- Döviz Çevirici ---
function convertCurrency() {
    const amount = parseFloat(document.getElementById("curAmount").value);
    const rate = parseFloat(document.getElementById("curType").value);
    const errorDiv = document.getElementById("currencyError");
    errorDiv.textContent = "";

    if (isNaN(amount)) { errorDiv.textContent = "Geçerli miktar girin!"; return; }

    const result = amount * rate;
    document.getElementById("currencyResult").textContent = "Sonuç: " + result.toFixed(2);
}

// --- Yüzde Hesaplama ---
function calculatePercent() {
    const value = parseFloat(document.getElementById("percentValue").value);
    const rate = parseFloat(document.getElementById("percentRate").value);
    const errorDiv = document.getElementById("percentError");
    errorDiv.textContent = "";

    if (isNaN(value) || isNaN(rate)) { errorDiv.textContent = "Geçerli değerler girin!"; return; }

    const result = (value * rate) / 100;
    document.getElementById("percentResult").textContent = "Sonuç: " + result.toFixed(2);
}

// --- Vücut Yağ Oranı ---
function calculateBodyFat() {
    const waist = parseFloat(document.getElementById("bfWaist").value);
    const neck = parseFloat(document.getElementById("bfNeck").value);
    const height = parseFloat(document.getElementById("bfHeight").value);
    const errorDiv = document.getElementById("bfError");
    errorDiv.textContent = "";

    if (isNaN(waist) || isNaN(neck) || isNaN(height)) { errorDiv.textContent = "Geçerli değerler girin!"; return; }

    // Basit formül (erkek için)
    const bodyFat = 495 / (1.0324 - 0.19077 * Math.log10(waist-neck) + 0.15456 * Math.log10(height)) - 450;
    document.getElementById("bfResult").textContent = "Vücut Yağ Oranı: " + bodyFat.toFixed(2) + "%";
}
// --- Vücut Su Oranı ---
function calculateBodyWater() {
    const gender = document.getElementById("bwGender").value;
    const weight = parseFloat(document.getElementById("bwWeight").value);
    const errorDiv = document.getElementById("bwError");
    errorDiv.textContent = "";

    if (isNaN(weight)) { errorDiv.textContent = "Geçerli kilo girin!"; return; }

    let waterPercent;
    if (gender === "male") waterPercent = weight * 0.6;
    else waterPercent = weight * 0.5;

    document.getElementById("bwResult").textContent = "Tahmini Vücut Suyu: " + waterPercent.toFixed(2) + " kg";
}

// --- Yaş Hesaplama ---
function calculateAge() {
    const birthDate = new Date(document.getElementById("birthdate").value);
    const errorDiv = document.getElementById("ageError");
    errorDiv.textContent = "";

    if (isNaN(birthDate.getTime())) { errorDiv.textContent = "Geçerli tarih girin!"; return; }

    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;

    document.getElementById("ageResult").textContent = "Yaşınız: " + age + " yıl";
}

// --- Kalori Yakımı (MET) ---
function calculateCalories() {
    const weight = parseFloat(document.getElementById("calWeight").value);
    const minutes = parseFloat(document.getElementById("calMinutes").value);
    const MET = parseFloat(document.getElementById("calMET").value);
    const errorDiv = document.getElementById("calError");
    errorDiv.textContent = "";

    if (isNaN(weight) || isNaN(minutes) || isNaN(MET)) { errorDiv.textContent = "Geçerli değerler girin!"; return; }

    const calories = (MET * 3.5 * weight / 200) * minutes;
    document.getElementById("calResult").textContent = "Yakılan Kalori: " + calories.toFixed(2) + " kcal";
}

// --- Alan Hesaplama ---
function updateAreaInputs() {
    const type = document.getElementById("areaType").value;
    const container = document.getElementById("areaInputs");
    container.innerHTML = "";

    if (type === "rectangle") {
        container.innerHTML = '<input type="number" id="rectA" placeholder="a">' +
                              '<input type="number" id="rectB" placeholder="b">';
    } else if (type === "circle") {
        container.innerHTML = '<input type="number" id="circleR" placeholder="Yarıçap">';
    } else if (type === "triangle") {
        container.innerHTML = '<input type="number" id="triBase" placeholder="Taban">' +
                              '<input type="number" id="triHeight" placeholder="Yükseklik">';
    }
}

function calculateArea() {
    const type = document.getElementById("areaType").value;
    const errorDiv = document.getElementById("areaError");
    errorDiv.textContent = "";
    let area;

    if (type === "rectangle") {
        const a = parseFloat(document.getElementById("rectA").value);
        const b = parseFloat(document.getElementById("rectB").value);
        if (isNaN(a) || isNaN(b)) { errorDiv.textContent = "Geçerli değer girin!"; return; }
        area = a * b;
    } else if (type === "circle") {
        const r = parseFloat(document.getElementById("circleR").value);
        if (isNaN(r)) { errorDiv.textContent = "Geçerli değer girin!"; return; }
        area = Math.PI * r * r;
    } else if (type === "triangle") {
        const base = parseFloat(document.getElementById("triBase").value);
        const height = parseFloat(document.getElementById("triHeight").value);
        if (isNaN(base) || isNaN(height)) { errorDiv.textContent = "Geçerli değer girin!"; return; }
        area = 0.5 * base * height;
    }

    document.getElementById("areaResult").textContent = "Alan: " + area.toFixed(2);
}

// --- Çevre Hesaplama ---
function updatePeriInputs() {
    const type = document.getElementById("periType").value;
    const container = document.getElementById("periInputs");
    container.innerHTML = "";

    if (type === "rectangle") {
        container.innerHTML = '<input type="number" id="periA" placeholder="a">' +
                              '<input type="number" id="periB" placeholder="b">';
    } else if (type === "circle") {
        container.innerHTML = '<input type="number" id="periR" placeholder="Yarıçap">';
    }
}

function calculatePerimeter() {
    const type = document.getElementById("periType").value;
    const errorDiv = document.getElementById("periError");
    errorDiv.textContent = "";
    let peri;

    if (type === "rectangle") {
        const a = parseFloat(document.getElementById("periA").value);
        const b = parseFloat(document.getElementById("periB").value);
        if (isNaN(a) || isNaN(b)) { errorDiv.textContent = "Geçerli değer girin!"; return; }
        peri = 2 * (a + b);
    } else if (type === "circle") {
        const r = parseFloat(document.getElementById("periR").value);
        if (isNaN(r)) { errorDiv.textContent = "Geçerli değer girin!"; return; }
        peri = 2 * Math.PI * r;
    }

    document.getElementById("periResult").textContent = "Çevre: " + peri.toFixed(2);
}

// --- Üçgen Alanı (Heron) ---
function calculateTriangleArea() {
    const a = parseFloat(document.getElementById("triA").value);
    const b = parseFloat(document.getElementById("triB").value);
    const c = parseFloat(document.getElementById("triC").value);
    const errorDiv = document.getElementById("triError");
    errorDiv.textContent = "";

    if (isNaN(a) || isNaN(b) || isNaN(c)) { errorDiv.textContent = "Geçerli değer girin!"; return; }

    const s = (a + b + c) / 2;
    const area = Math.sqrt(s * (s - a) * (s - b) * (s - c));

    document.getElementById("triResult").textContent = "Alan: " + area.toFixed(2);
}

// --- Ortalama Hız ---
function calculateAvgSpeed() {
    const distance = parseFloat(document.getElementById("avgDistance").value);
    const time = parseFloat(document.getElementById("avgTime").value);
    const errorDiv = document.getElementById("avgSpeedError");
    errorDiv.textContent = "";

    if (isNaN(distance) || isNaN(time) || time <= 0) { errorDiv.textContent = "Geçerli değer girin!"; return; }

    const avgSpeed = distance / time;
    document.getElementById("avgSpeedResult").textContent = "Ortalama Hız: " + avgSpeed.toFixed(2) + " km/saat";
}

// --- İş-Bitirme Süresi ---
function calculateWorkTime() {
    const t1 = parseFloat(document.getElementById("t1").value);
    const t2 = parseFloat(document.getElementById("t2").value);
    const errorDiv = document.getElementById("workTimeError");
    errorDiv.textContent = "";

    if (isNaN(t1) || isNaN(t2) || t1 <= 0 || t2 <= 0) { errorDiv.textContent = "Geçerli değer girin!"; return; }

    const workTime = (t1 * t2) / (t1 + t2);
    document.getElementById("workTimeResult").textContent = "İş Bitirme Süresi: " + workTime.toFixed(2) + " saat";
}


function resetSection(sectionId, inputIds = [], resultIds = []) {

    inputIds.forEach(id => {
        const el = document.getElementById(id);
        if (!el) return;
        if (el.tagName === 'INPUT' || el.tagName === 'SELECT' || el.tagName === 'TEXTAREA') {
            el.value = '';

            if (el.tagName === 'SELECT') el.selectedIndex = 0;
        }
    });


    resultIds.forEach(id => {
        const el = document.getElementById(id);
        if (!el) return;
        el.textContent = '';
    });

    if (sectionId === 'area') {
        document.getElementById('areaType').selectedIndex = 0;
        updateAreaInputs();
    }
    if (sectionId === 'perimeter') {
        document.getElementById('periType').selectedIndex = 0;
        updatePeriInputs();
    }
}

function resetAreaSection() {
    document.getElementById('areaType').selectedIndex = 0;
    updateAreaInputs();
    document.getElementById('areaResult').textContent = '';
    document.getElementById('areaError').textContent = '';
}

function resetPeriSection() {
    document.getElementById('periType').selectedIndex = 0;
    updatePeriInputs();
    document.getElementById('periResult').textContent = '';
    document.getElementById('periError').textContent = '';
}
