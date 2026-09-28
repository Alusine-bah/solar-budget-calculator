// ─────────────────────────────────────────────────────────────
// Solar Budget Calculator — Calculation Engine
// ─────────────────────────────────────────────────────────────

// System constants (editable)
const SYSTEM_CONSTANTS = {
  deratingFactor: 0.75,       // inverter + wiring + temperature losses
  depthOfDischarge: 0.80,     // 80% for lithium
  inverterSafetyMargin: 1.25, // surge headroom
};

// Cost assumptions (USD)
const COST_ASSUMPTIONS = {
  panelPerWatt: 0.30,         // $/W retail
  batteryPerKWh: 160,         // $/kWh lithium
  inverterPerVA: 0.15,        // $/VA hybrid
  installationFraction: 0.20, // 20% of hardware
};

// ── State ──
let appliances = [
  { name: "LED Lights",   watts: 10,  qty: 6, hours: 5 },
  { name: "Phone Charger", watts: 10,  qty: 2, hours: 3 },
  { name: "Refrigerator",  watts: 150, qty: 1, hours: 24 },
];

// ── Initialization ──
document.addEventListener("DOMContentLoaded", () => {
  populateCountryDropdown();
  populateCurrencyDropdown();
  renderApplianceList();
  attachEventListeners();
  calculate();
});

function populateCountryDropdown() {
  const select = document.getElementById("country");
  select.innerHTML = '<option value="">— Select your country —</option>';
  COUNTRIES.sort((a, b) => a.name.localeCompare(b.name)).forEach(c => {
    const opt = document.createElement("option");
    opt.value = c.code;
    opt.textContent = c.name;
    opt.dataset.psh = c.psh;
    opt.dataset.currency = c.currency;
    select.appendChild(opt);
  });
  const other = document.createElement("option");
  other.value = "OTHER";
  other.textContent = "Other / Not listed";
  select.appendChild(other);
}

function populateCurrencyDropdown() {
  const select = document.getElementById("currency");
  select.innerHTML = "";
  Object.keys(CURRENCY_NAMES).sort().forEach(code => {
    const opt = document.createElement("option");
    opt.value = code;
    opt.textContent = CURRENCY_NAMES[code];
    if (code === "USD") opt.selected = true;
    select.appendChild(opt);
  });
}

function renderApplianceList() {
  const tbody = document.getElementById("appliance-rows");
  tbody.innerHTML = "";
  appliances.forEach((a, i) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td><input type="text" value="${a.name}" data-index="${i}" data-field="name"/></td>
      <td><input type="number" value="${a.watts}" min="0" step="1" data-index="${i}" data-field="watts"/></td>
      <td><input type="number" value="${a.qty}" min="1" step="1" data-index="${i}" data-field="qty"/></td>
      <td><input type="number" value="${a.hours}" min="0" max="24" step="0.5" data-index="${i}" data-field="hours"/></td>
      <td><button type="button" class="btn-remove" data-index="${i}">×</button></td>
    `;
    tbody.appendChild(tr);
  });
  tbody.querySelectorAll("input").forEach(inp => {
    inp.addEventListener("input", e => {
      const i = +e.target.dataset.index;
      const f = e.target.dataset.field;
      appliances[i][f] = f === "name" ? e.target.value : +e.target.value;
      calculate();
    });
  });
  tbody.querySelectorAll(".btn-remove").forEach(btn => {
    btn.addEventListener("click", e => {
      appliances.splice(+e.target.dataset.index, 1);
      renderApplianceList();
      calculate();
    });
  });
}

function attachEventListeners() {
  document.getElementById("country").addEventListener("change", e => {
    const opt = e.target.selectedOptions[0];
    const pshInput = document.getElementById("psh");
    const currSelect = document.getElementById("currency");
    if (e.target.value && e.target.value !== "OTHER") {
      pshInput.value = opt.dataset.psh;
      currSelect.value = opt.dataset.currency;
    } else {
      pshInput.value = "";
    }
    calculate();
  });

  document.getElementById("add-appliance").addEventListener("click", () => {
    appliances.push({ name: "New Appliance", watts: 100, qty: 1, hours: 1 });
    renderApplianceList();
    calculate();
  });

  ["psh", "days", "voltage", "currency"].forEach(id => {
    document.getElementById(id).addEventListener("input", calculate);
    document.getElementById(id).addEventListener("change", calculate);
  });
}

// ── Main calculation ──
function calculate() {
  // 1. Daily energy
  let dailyWh = 0;
  let totalRunningWatts = 0;
  appliances.forEach(a => {
    const wh = a.watts * a.qty * a.hours;
    dailyWh += wh;
    totalRunningWatts += a.watts * a.qty;
  });
  const dailyKWh = dailyWh / 1000;

  // 2. Peak sun hours
  const psh = parseFloat(document.getElementById("psh").value) || 0;

  // 3. Array size
  const arrayWatts = psh > 0
    ? dailyWh / (psh * SYSTEM_CONSTANTS.deratingFactor)
    : 0;

  // 4. Battery bank
  const days = parseFloat(document.getElementById("days").value) || 1;
  const voltage = parseFloat(document.getElementById("voltage").value) || 12;
  const batteryWh = (dailyWh * days) / SYSTEM_CONSTANTS.depthOfDischarge;
  const batteryAh = voltage > 0 ? batteryWh / voltage : 0;
  const batteryKWh = batteryWh / 1000;

  // 5. Inverter
  const inverterVA = totalRunningWatts * SYSTEM_CONSTANTS.inverterSafetyMargin;

  // 6. Cost in USD
  const panelCost = arrayWatts * COST_ASSUMPTIONS.panelPerWatt;
  const batteryCost = batteryKWh * COST_ASSUMPTIONS.batteryPerKWh;
  const inverterCost = inverterVA * COST_ASSUMPTIONS.inverterPerVA;
  const hardwareCost = panelCost + batteryCost + inverterCost;
  const installCost = hardwareCost * COST_ASSUMPTIONS.installationFraction;
  const totalUSD = hardwareCost + installCost;

  // 7. Convert to local currency
  const currCode = document.getElementById("currency").value;
  const rate = EXCHANGE_RATES[currCode] || 1;
  const totalLocal = totalUSD * rate;

  // 8. Render
  document.getElementById("out-daily").textContent = formatNum(dailyKWh, 2) + " kWh";
  document.getElementById("out-array").textContent = formatNum(arrayWatts, 0) + " W";
  document.getElementById("out-battery").textContent =
    formatNum(batteryAh, 0) + " Ah  (" + formatNum(batteryKWh, 2) + " kWh)";
  document.getElementById("out-inverter").textContent = formatNum(inverterVA, 0) + " VA";

  document.getElementById("cost-panel").textContent = "$" + formatNum(panelCost, 0);
  document.getElementById("cost-battery").textContent = "$" + formatNum(batteryCost, 0);
  document.getElementById("cost-inverter").textContent = "$" + formatNum(inverterCost, 0);
  document.getElementById("cost-install").textContent = "$" + formatNum(installCost, 0);
  document.getElementById("cost-total").textContent = "$" + formatNum(totalUSD, 0);
  document.getElementById("cost-local").textContent =
    formatNum(totalLocal, 0) + " " + currCode;
  document.getElementById("local-currency-label").textContent = currCode;
}

function formatNum(n, decimals) {
  if (!isFinite(n)) return "—";
  return n.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}