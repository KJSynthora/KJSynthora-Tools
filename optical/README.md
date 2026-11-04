# KNR Optical Premium Website — V3

## Deployment
1. Download and extract this ZIP.
2. Open the extracted `optical` folder.
3. Upload the contents of that folder into `KJSynthora-Tools/optical/` in GitHub, replacing the existing website files.
4. Commit the changes and wait for the Vercel deployment to finish.
5. Test the homepage, catalogue filters, product pages, wishlist, cart, appointment form, wholesale form and mobile menu.

## Important business configuration
Business contact and address are in `js/config.js`. Confirm all details before launch.

## Catalogue integrity
The existing 48 frame images are illustrative, unbranded concepts, not photographs of confirmed store stock. The product data labels these as illustrative and uses enquiry-only pricing. Add actual store products only after confirming model, brand authenticity, material, colour, measurements, available sizes, stock and price. The site does not claim authorised-dealer status for listed brands.

## Online payments
The checkout supports order enquiries and a customer-entered secure Razorpay hosted payment link. This avoids collecting card data on the website. To accept payments, KNR Optical must first complete Razorpay merchant onboarding/KYC and create a payment link for the confirmed quote using the Razorpay Dashboard. Send that link to the customer; they can paste it into the secure payment section on checkout. The site does not yet have a merchant account or API credentials, so payment acceptance is not active automatically. Do not publish payment instructions until merchant onboarding and a live test transaction are complete.

## Optical services
Eye-test and home-visit features are enquiry forms only. Confirm professional availability, home-visit coverage, appointment slots and service terms before advertising confirmed service delivery. Contact lens suitability requires a valid prescription and qualified professional fitting.

## Design and assets
The website uses locally stored image assets to avoid broken external image links. Some campaign/lifestyle images are illustrative generated visuals. Do not represent them as actual KNR Optical customers, staff, store interiors or specific product models. Brand wordmarks are typographic placeholders/illustrative treatments, not official brand logos.

## QA checklist
- Check all images and local links on Vercel after deployment.
- Verify phone, WhatsApp and Google Maps links.
- Test cart quantity, size/colour selection and wishlist in desktop/mobile browsers.
- Verify all forms open WhatsApp with the correct details.
- Check that product sizes and measurements are populated only with verified item data.
- Test the Razorpay payment-link flow with a small test payment after merchant activation.
- Add verified inventory, policies, privacy notice and business details before public promotion.
