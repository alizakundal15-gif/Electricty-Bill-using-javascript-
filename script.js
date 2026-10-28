const billForm = document.getElementById("billForm");
const unitsInput = document.getElementById("units");
const resultSection = document.getElementById("result");
const totalElement = document.getElementById("total");
const breakdownElement = document.getElementById("breakdown");
const errorElement = document.getElementById("error");

function formatRupees(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
}

// Progressive slab calculation: each rate applies only to units in that slab.
function calculateBill(units) {
  const slabs = [
    { label: "First 50 units", limit: 50, rate: 3.50 },
    { label: "Next 100 units (51–150)", limit: 100, rate: 4.00 },
    { label: "Next 100 units (151–250)", limit: 100, rate: 5.20 },
    { label: "Units above 250", limit: Infinity, rate: 6.50 }
  ];

  let remainingUnits = units;
  let total = 0;
  const rows = [];

  for (const slab of slabs) {
    if (remainingUnits <= 0) break;

    const slabUnits = Math.min(remainingUnits, slab.limit);
    const amount = slabUnits * slab.rate;

    if (slabUnits > 0) {
      rows.push({
        label: `${slab.label} (${slabUnits} × ${formatRupees(slab.rate)})`,
        amount
      });
    }

    total += amount;
    remainingUnits -= slabUnits;
  }

  return { total, rows };
}

billForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const rawValue = unitsInput.value.trim();
  const units = Number(rawValue);

  if (rawValue === "" || !Number.isFinite(units) || units < 0) {
    errorElement.textContent = "Please enter a valid number of units (zero or more).";
    errorElement.hidden = false;
    resultSection.hidden = true;
    return;
  }

  errorElement.hidden = true;
  const bill = calculateBill(units);
  totalElement.textContent = formatRupees(bill.total);

  breakdownElement.replaceChildren();
  bill.rows.forEach((row) => {
    const rowElement = document.createElement("div");
    rowElement.className = "breakdown-row";

    const labelElement = document.createElement("span");
    labelElement.textContent = row.label;

    const amountElement = document.createElement("strong");
    amountElement.textContent = formatRupees(row.amount);

    rowElement.append(labelElement, amountElement);
    breakdownElement.appendChild(rowElement);
  });

  resultSection.hidden = false;
});
