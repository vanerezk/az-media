# AZ Listing Media

This is the website for **AZ Listing Media**, a real estate media studio in Phoenix, Arizona. They photograph, film and fly drones over homes for sale so agents can make every listing look its best.

The site has one job: show that work beautifully and make booking a shoot as easy as possible. Everything else gets out of the way.

## What you'll find on the site

- **Home**: a full-screen slideshow of their best shots, the services they offer, a selection of recent work, a before/after slider for virtual staging, and how the process works.
- **Portfolio**: more than 60 photos you can filter by type (interiors, exteriors, twilight, aerial, virtual staging) and open full size.
- **Pricing**: every package and add-on, so nobody has to ask "how much?".
- **Contact**: phone, email, business hours and a short form for questions or custom projects.

Booking itself happens in the studio's existing booking portal. Every "Book a shoot" button links there.

## Built with

| What | Why |
| --- | --- |
| **JavaScript** with **React 19** | The pages are built from small, reusable pieces. |
| **React Router 7** | Moving between pages is instant, with no full reloads. |
| **CSS** (plain, no framework) | One small set of design tokens for colors, type and spacing keeps everything consistent. |
| **HTML** | One page shell, with search-engine and social-sharing tags plus business details for Google. |
| **Vite** | Fast local development and an optimized production build. |
| **Node.js** + **sharp** | A small script that turns huge camera files into light, modern images. |
| **Netlify** | Hosting, the contact form and the security headers. |

Fonts are *Instrument Serif* and *Manrope*. Both are free for commercial use. Icons come from *Lucide*.

## Why it's fast

Real estate photos straight off the camera can weigh 20 MB each. Before this rebuild, the home page downloaded about 190 MB. Now it loads in a couple hundred kilobytes:

- Each photo is exported in several sizes in AVIF (with a JPEG fallback). Phones download the small version and big screens get the sharp one.
- Photos below the fold only load when you scroll to them, and a tiny blurred preview fills the space until then.
- Each page's code loads only when that page is visited. The YouTube player only loads if someone presses play.

## Privacy and security

- **No client data in this repo.** The original photos have client street addresses in their file names, and their EXIF data can include GPS coordinates. They live in a private `media-src/` folder that is never committed. The published images have neutral names, such as `twilight-pool-1280.avif`, and all metadata is removed.
- **No secrets.** The site has no API keys or passwords. The contact form is handled by Netlify, and `.env` files are git-ignored just in case.
- **Security headers** in `public/_headers`: a strict Content Security Policy, plus protection against clickjacking, MIME sniffing and unnecessary browser permissions.
- **Spam protection** on the contact form uses a hidden honeypot field.

## Running it locally

You'll need Node.js 20 or newer.

```bash
npm install
npm run dev
```

Then open http://localhost:5173.

Other commands:

```bash
npm run build     # production build in dist/
npm run preview   # preview the production build
npm run lint      # check the code
```

## Changing content

You don't need to touch the components to update text or prices. Everything lives in `src/data/`:

- `site.js` has the phone, email, hours, social links and booking portal URL.
- `pricing.js` has every package and price.
- `content.js` has the hero slides, services, featured work and testimonials. The testimonials section appears on its own once you add a quote.
- `faq.js` has the frequently asked questions.

### Adding photos

Photos are processed from the private `media-src/` folder, so this step only works on a machine that has it:

1. Drop the original into `media-src/photos/`.
2. Add a line for it in `media-src/photos.config.mjs` with a short id, a description (used as alt text) and a category.
3. Run `npm run images`.

The optimized files land in `public/img/`. Use them in the code with `<Picture id="your-id" />`.

## Deploying

Netlify builds the site with `npm run build` and publishes the `dist/` folder. Contact form messages show up in the Netlify dashboard under **Forms**, where you can also turn on email notifications.

---

© AZ Listing Media. Photography and content are property of Eighteen Percent Productions LLC.
