# Electricity Bill Calculator (JavaScript)

A responsive electricity bill calculator made with HTML, CSS, and JavaScript. It runs directly in a web browser and does not require Java, JSP, Node.js, or a database.

## Tariff rules

- First 50 units: ₹3.50 per unit
- Next 100 units (51–150): ₹4.00 per unit
- Next 100 units (151–250): ₹5.20 per unit
- Units above 250: ₹6.50 per unit

The calculator uses progressive slabs. Taxes, fixed charges, and other fees are not included.

## How to run

1. Extract the ZIP file.
2. Open the `electricity-bill-javascript` folder.
3. Double-click `index.html`, or right-click it and choose a browser such as Chrome.
4. Enter the units consumed and click **Calculate Bill**.

No installation is required.

## Example

For 200 units:
- 50 × ₹3.50 = ₹175
- 100 × ₹4.00 = ₹400
- 50 × ₹5.20 = ₹260
- Total = ₹835.00

## Files

- `index.html` — webpage structure and input form
- `style.css` — responsive page styling
- `script.js` — input validation and bill calculation logic
