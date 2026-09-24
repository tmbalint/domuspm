# Update homepage copy, cards, pricing, tour, and booking form

## Changes
- Synchronize Hungarian and English copy for the hero, calls to action, services, process, pricing, and About section.
- Add the floor-plan service card and separate optional add-on card below “What you get.”
- Balance the four service cards and standardize all pricing borders and button widths.
- Standardize the shared gold button dimensions without changing their visual theme.
- Embed the supplied Keypano tour in the first tour card and permit its required fullscreen and motion features.
- Replace the free-text size field with a required three-option selector, conditionally showing a validated integer field above 120 m².
- Update the footer domain to domustours.com.

## Technical details
- Keep Web3Forms fields `size` and `squaremeter`; omit `squaremeter` unless the above-120 m² option is selected.
- Block decimal and signed scientific notation entry, and reject non-digit pasted values in the conditional size field.
- Keep the property type selected by default, including after language changes.
- Limit edits to `src/lib/i18n.tsx`, `src/routes/index.tsx`, `src/components/site/Footer.tsx`, `src/components/site/TourCard.tsx`, and the requested shared button utilities in `src/styles.css`.
- Verify the resulting build and the central form/tour behavior in the preview.
