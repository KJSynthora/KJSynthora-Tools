# KNR Optical Premium Website Starter

This package is a static HTML/CSS/JavaScript website designed for GitHub Pages or Vercel.

## Upload to GitHub
1. Download and unzip this package.
2. Open your GitHub repository: `KJSynthora/KJSynthora-Tools`.
3. Open the `optical` folder.
4. Replace the existing optical files with the contents of this package (keep the package contents directly inside `optical`, not inside an extra nested folder).
5. Commit the changes.
6. Open the Vercel deployment and wait for the new build.

Your current URL should remain:
`https://kj-synthora-tools.vercel.app/optical/index.html`

## Important before publishing
- All catalogue products, prices, SKUs and product illustrations are DEMO placeholders. Replace them with actual store inventory and real product photos.
- Brand directory entries are suggestions only. Confirm actual stocked brands and any authorised-dealer status before publishing.
- The hero image is a generated campaign visual, not a real customer or store photo.
- The checkout currently creates an order enquiry and opens WhatsApp. It does NOT process card/UPI payments. To enable actual online payment, integrate a payment provider such as Razorpay or another provider using merchant credentials and a secure server-side verification flow. Never put secret keys in frontend JavaScript.
- Appointment and wholesale forms open WhatsApp with the submitted information. They do not save submissions to a database.
- Policy pages are placeholders and need business/legal review.
- Confirm the displayed address, phone number, business hours and map pin before launch.

## Business configuration
Edit `js/config.js`:
- WhatsApp number is stored in international format: 919866304224.
- Maps share link: https://maps.app.goo.gl/B7vkAwMn4MMviDc87
- Map coordinates: 16.5141455, 80.6301947.

## Add real products
Edit `data/products.json`. Keep each product's `id` unique. Use image paths relative to the optical folder, e.g. `images/products/my-frame.webp`.
Product fields: id, name, brand, category, type, shape, material, color, price, sku, size, stock, image, description.

## Brand image and profile notes
- Each brand has its own illustrative SVG image and a typographic wordmark treatment. These are NOT official trademark logos or product photographs.
- Replace with brand-approved assets or original photos of genuine stock if you have permission to use them.
- Brand profiles use general positioning language; model specifications always vary by product.

## Add brands
Edit `data/brands.json`. Only include brands KNR Optical actually stocks or is prepared to source; do not imply authorised dealer status without evidence.

## Retail, warehouse and contact lens sections
- Homepage communicates retail, optical services and wholesale/warehouse enquiries.
- Contact lens category is available as an enquiry-only demo category; do not publish clinical claims or sell lenses without correct professional and regulatory processes.
- Warehouse page describes trade enquiries only. Add a warehouse address or operational claims only after confirming details.

## Test checklist
- Homepage loads and hero image displays.
- Mobile navigation opens.
- Shop search, filters and sort work.
- Product details open from product cards.
- Add to cart, quantity change, remove and cart count work.
- Checkout opens WhatsApp with order summary.
- Appointment and wholesale forms open WhatsApp.
- Contact map, phone and directions links work.
- Replace demo inventory and policy placeholders before public launch.
