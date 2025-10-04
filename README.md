# How to Run and Use

## 1. Clone the repository
```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

## 2. Install Bootstrap using npm
```bash
npm install bootstrap
```

## 3. Make changes to the repo

Edit your files as needed.

## 4. Test changes locally
```bash
bundle exec jekyll serve
```

Then open http://localhost:4000 in your browser.

## 5. Commit changes

```bash
git status
git add .
git commit -m "Commit message"
git push origin main 
```

## 6. Run the deploy script to publish the site

Make the script executable:
```bash
chmod +x deploy.sh
```

Run the script:
```bash
./deploy.sh
```

## 7. Future UX improvements

The current content focuses on core rental packages and brand credibility. To continue polishing the
site experience, consider these enhancements:

### Navigation & information architecture

* **Surface service flows with fewer clicks.** Create a top-level “Services” link that summarizes
  audio, visual, and add-on offerings before diving into individual packages. From there, direct
  visitors to curated collections (e.g., “Ceremony Sound,” “Live Band Reinforcement,” or “Hybrid
  Events”) so they can self-identify their needs quickly.
* **Add a “Resources” menu bucket.** Consolidate FAQs, policies, and education under a single
  dropdown (e.g., “Resources → FAQs, Planning Guide, Blog, Rental Policies”) to make the site feel
  more authoritative and reduce cognitive load in the main navigation.
* **Highlight direct conversion paths.** Keep “Plan your event” and “Book a consult” actions visible
  in the sticky nav or as a secondary menu item that anchors to the contact form.

### New and expanded pages

* **Case studies / portfolio.** Showcase recent weddings, markets, and corporate activations with
  photos, gear lists, and testimonial pull-quotes. This builds trust and signals real-world
  experience for new prospects.
* **Service area & logistics.** A dedicated page outlining delivery regions, travel fees, and load-in
  requirements reassures planners who want to confirm coverage before reaching out.
* **Planning resources.** Publish a downloadable checklist or blog-style articles on topics such as
  “How to choose the right PA for outdoor ceremonies” or “Timeline tips for sound checks.” This
  positions the brand as a partner rather than a transactional rental house.
* **Add-on catalog.** Turn the microphone highlight into a full page detailing wireless mics, stage
  monitors, lighting accents, and livestream support that can be bundled with any package.

### Visual polish & trust signals

* **Consistent hero imagery.** Expand the asset library so each hero (Home, Packages, Brands, etc.)
  shares a cohesive color grade and lighting style.
* **Social proof modules.** Add rotating review cards or embedded Google/Thumbtack badges to the
  homepage and Contact page.
* **Process timeline graphic.** Convert the “How it works” steps into an illustrated timeline or
  icon-based journey graphic for an even more premium feel.

Revisiting the menu structure and layering in story-driven pages will make the site feel more
comprehensive while supporting stronger lead capture.