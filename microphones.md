---
layout: default
title: Microphone Packages
permalink: /packages/audio/microphones/
---

<section class="packages-hero hero-section position-relative overflow-hidden text-white">
  <div class="hero-glow"></div>
  <div class="container py-5 py-lg-6">
    <div class="row align-items-center g-5">
      <div class="col-lg-7">
        <span class="badge badge-soft-light text-uppercase">Microphone rentals</span>
        <h1 class="display-4 fw-bold mt-4 text-white">Crystal-clear vocals, speeches, and recordings.</h1>
        <p class="lead text-white-50">From handheld wireless mics to studio staples, our curated kits include stands, cables, and expert setup so every word lands with impact.</p>
        <div class="d-flex flex-wrap gap-3 mt-4">
          <a href="/about/contact/" class="btn btn-gradient btn-lg shadow-lg">Build a microphone kit</a>
          <a href="mailto:bookings@vproaudio.rentals" class="btn btn-outline-light btn-lg">Email our engineers</a>
        </div>
      </div>
      <div class="col-lg-5">
        <div class="packages-hero-card shadow-lg">
          <p class="mb-3 text-uppercase small fw-semibold text-muted">Included with every rental</p>
          <ul class="list-unstyled text-muted mb-0">
            <li class="mb-2"><i class="bi bi-gear-wide-connected me-2 text-primary"></i>Fresh batteries, cables, and stands</li>
            <li class="mb-2"><i class="bi bi-broadcast-pin me-2 text-primary"></i>Frequency coordination for your venue</li>
            <li><i class="bi bi-headset me-2 text-primary"></i>On-call support throughout your event</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="section-spacing">
  <div class="container">
    <div class="row g-4 mb-5">
      <div class="col-md-4">
        <div class="content-card feature-summary h-100 shadow-sm">
          <div class="card-icon text-primary"><i class="bi bi-mic"></i></div>
          <h2 class="h5">Wireless expertise</h2>
          <p class="text-muted mb-0">Tour-tested Shure systems with pre-programmed channels to avoid interference and feedback.</p>
        </div>
      </div>
      <div class="col-md-4">
        <div class="content-card feature-summary h-100 shadow-sm">
          <div class="card-icon text-primary"><i class="bi bi-plug"></i></div>
          <h2 class="h5">Plug-and-play ready</h2>
          <p class="text-muted mb-0">Delivered with mixers, speakers, or interfaces to integrate seamlessly with your package.</p>
        </div>
      </div>
      <div class="col-md-4">
        <div class="content-card feature-summary h-100 shadow-sm">
          <div class="card-icon text-primary"><i class="bi bi-people"></i></div>
          <h2 class="h5">Tailored recommendations</h2>
          <p class="text-muted mb-0">We'll match microphones to your performers—singers, celebrants, speakers, or podcasters.</p>
        </div>
      </div>
    </div>

    <div class="row g-4">
      {% for mic in site.data.microphones %}
        <div class="col-12 col-md-6 col-lg-4">
          <article class="package-card h-100">
            <div class="package-card__media">
              <img src="{{ mic.image }}" alt="{{ mic.title }}" class="img-fluid rounded-4" />
            </div>
            <div class="package-card__body">
              <h3 class="h4">{{ mic.title }}</h3>
              <p class="text-muted">{{ mic.description }}</p>
            </div>
            <div class="package-card__footer d-flex align-items-center justify-content-between">
              <div>
                <span class="price fw-bold">${{ mic.price }}</span>
                <span class="text-muted">/day</span>
              </div>
              <a href="/about/contact/" class="btn btn-outline-primary btn-sm">Add to package</a>
            </div>
          </article>
        </div>
      {% endfor %}
    </div>
  </div>
</section>

<section class="section-spacing pt-0">
  <div class="container">
    <div class="cta-banner shadow-lg">
      <div>
        <span class="badge badge-soft-primary">Soundcheck ready</span>
        <h2 class="h3 fw-bold mt-3">Reserve your microphones with your rental package.</h2>
        <p class="text-muted mb-0">Share your run-of-show and we’ll have the right mics labeled, tested, and ready to hand off.</p>
      </div>
      <div class="d-flex flex-column flex-sm-row gap-3">
        <a href="/about/contact/" class="btn btn-gradient btn-lg">Request availability</a>
        <a href="tel:+17072268726" class="btn btn-outline-primary btn-lg">Talk with an audio tech</a>
      </div>
    </div>
  </div>
</section>
