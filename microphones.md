---
layout: default
title: Microphone Packages
permalink: /packages/audio/microphones/
---

<div class="container py-5">

  <!-- Page Header -->
  <section class="text-center mb-5">
    <h1 class="display-4 fw-bold text-primary">Microphone Packages</h1>
    <p class="lead text-muted">Professional microphones for every occasion — live performances, events, podcasts, and more.</p>
  </section>

  <!-- Microphone Package Cards -->
  <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
    {% for mic in site.data.microphones %}
    <div class="col">
      <div class="card h-100 shadow-sm">
        <img src="{{ mic.image }}" class="card-img-top" alt="{{ mic.title }}">
        <div class="card-body">
          <h5 class="card-title text-primary">{{ mic.title }}</h5>
          <p class="card-text text-muted">{{ mic.description }}</p>
        </div>
        <div class="card-footer text-center bg-white">
          <span class="h5 fw-bold">${{ mic.price }}/day</span>
        </div>
      </div>
    </div>
    {% endfor %}
  </div>

</div>

