---
layout: default
title: Microphone Rental Packages
permalink: /packages/audio/microphones/
description: >
  Rent professional wireless and wired microphones for weddings, speeches, and performances, available a la carte or bundled with our event audio packages.
---

<section class="relative isolate overflow-hidden bg-[radial-gradient(circle_at_12%_18%,rgb(255_211_105/.28),transparent_28%),radial-gradient(circle_at_88%_16%,rgb(255_211_105/.22),transparent_32%),linear-gradient(135deg,#222831_0%,#393E46_55%,#222831_100%)] py-16 text-brand-soft lg:py-24">
  <div class="pointer-events-none absolute -right-24 -bottom-24 h-80 w-80 rounded-full bg-brand-gold/20 blur-3xl"></div>
  <div class="relative mx-auto w-[min(100%-1.5rem,1180px)] md:w-[min(100%-2rem,1180px)]">
    <div class="grid items-center gap-12 lg:grid-cols-12">
      <div class="lg:col-span-7">
        <span class="font-display inline-flex rounded-full bg-brand-soft/15 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-brand-soft ring-1 ring-brand-soft/20">Microphone rentals</span>
        <h1 class="mt-4 font-display text-4xl font-bold text-brand-soft md:text-6xl">Crystal-clear vocals, speeches, and recordings.</h1>
        <p class="mt-4 max-w-3xl text-lg leading-8 text-brand-soft/75">From handheld wireless mics to studio staples, our curated kits include stands, cables, and expert setup so every word lands with impact.</p>
        <div class="mt-6 flex flex-wrap gap-3">
          <a href="/about/contact/" class="font-display inline-flex min-h-[3.25rem] items-center justify-center rounded-full bg-brand-gold px-6 py-2.5 text-sm font-bold text-brand-ink shadow-[0_18px_40px_rgb(255_211_105/.26)] transition hover:-translate-y-0.5 hover:bg-brand-ink hover:text-brand-soft">Build a microphone kit</a>
          <a href="mailto:bookings@vproaudio.rentals" class="font-display inline-flex min-h-[3.25rem] items-center justify-center rounded-full border border-brand-soft/35 bg-brand-soft/10 px-6 py-2.5 text-sm font-bold text-brand-soft transition hover:-translate-y-0.5 hover:bg-brand-soft hover:text-brand-ink">Email our engineers</a>
        </div>
      </div>
      <div class="lg:col-span-5">
        <div class="rounded-2xl border border-brand-soft/15 bg-brand-soft/95 p-6 text-brand-muted shadow-stage">
          <p class="mb-3 text-sm font-semibold uppercase text-brand-muted">Included with every rental</p>
          <ul class="list-none p-0 text-brand-muted">
            <li class="mb-2"><i class="bi bi-gear-wide-connected mr-2 text-brand-ink"></i>Fresh batteries, cables, and stands</li>
            <li class="mb-2"><i class="bi bi-broadcast-pin mr-2 text-brand-ink"></i>Frequency coordination for your venue</li>
            <li><i class="bi bi-headset mr-2 text-brand-ink"></i>On-call support throughout your event</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="py-16 lg:py-24">
  <div class="mx-auto w-[min(100%-1.5rem,1180px)] md:w-[min(100%-2rem,1180px)]">
    <div class="mb-10 grid gap-6 md:grid-cols-3">
      <div class="rounded-2xl border border-brand-ink/10 bg-brand-soft/95 p-8 shadow-card">
        <div class="grid h-[3.25rem] w-[3.25rem] place-items-center rounded-xl bg-brand-gold/25 text-xl text-brand-ink"><i class="bi bi-mic"></i></div>
        <h2 class="mt-4 font-display text-lg font-bold text-brand-ink">Wireless expertise</h2>
        <p class="mt-3 text-brand-muted/80">Tour-tested Shure systems with pre-programmed channels to avoid interference and feedback.</p>
      </div>
      <div class="rounded-2xl border border-brand-ink/10 bg-brand-soft/95 p-8 shadow-card">
        <div class="grid h-[3.25rem] w-[3.25rem] place-items-center rounded-xl bg-brand-gold/25 text-xl text-brand-ink"><i class="bi bi-plug"></i></div>
        <h2 class="mt-4 font-display text-lg font-bold text-brand-ink">Plug-and-play ready</h2>
        <p class="mt-3 text-brand-muted/80">Delivered with mixers, speakers, or interfaces to integrate seamlessly with your package.</p>
      </div>
      <div class="rounded-2xl border border-brand-ink/10 bg-brand-soft/95 p-8 shadow-card">
        <div class="grid h-[3.25rem] w-[3.25rem] place-items-center rounded-xl bg-brand-gold/25 text-xl text-brand-ink"><i class="bi bi-people"></i></div>
        <h2 class="mt-4 font-display text-lg font-bold text-brand-ink">Tailored recommendations</h2>
        <p class="mt-3 text-brand-muted/80">We'll match microphones to your performers—singers, celebrants, speakers, or podcasters.</p>
      </div>
    </div>

    <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {% for mic in site.data.microphones %}
        <article class="rounded-2xl border border-brand-ink/10 bg-brand-soft/95 p-4 shadow-card transition hover:-translate-y-1 hover:shadow-stage">
          <div class="flex min-h-56 items-center justify-center rounded-xl bg-gradient-to-br from-brand-soft to-brand-gold/25 p-4">
            <img src="{{ mic.image }}" alt="{{ mic.title }}" class="aspect-4/3 object-contain" />
          </div>
          <div class="p-4">
            <h2 class="font-display text-xl font-bold text-brand-ink">{{ mic.title }}</h2>
            <p class="mt-2 text-brand-muted/80">{{ mic.description }}</p>
          </div>
          <div class="flex items-center justify-between p-4 pt-0">
            <div>
              <span class="font-bold text-brand-ink">${{ mic.price }}</span>
              <span class="text-brand-muted/80">/day</span>
            </div>
            <a href="/about/contact/" class="font-display inline-flex min-h-9 items-center justify-center rounded-full border border-brand-ink/20 bg-brand-soft px-4 text-sm font-bold text-brand-ink transition hover:-translate-y-0.5">Add to package</a>
          </div>
        </article>
      {% endfor %}
    </div>
  </div>
</section>

<section class="pb-16 lg:pb-24">
  <div class="mx-auto w-[min(100%-1.5rem,1180px)] md:w-[min(100%-2rem,1180px)]">
    <div class="relative overflow-hidden rounded-2xl border border-brand-ink/10 bg-brand-soft/95 p-8 shadow-stage md:flex md:items-center md:justify-between md:gap-8">
      <div>
        <span class="font-display inline-flex rounded-full bg-brand-gold/25 px-3 py-1.5 text-xs font-bold tracking-wider text-brand-ink ring-1 ring-brand-gold/40">Soundcheck ready</span>
        <h2 class="mt-3 font-display text-2xl font-bold text-brand-ink">Reserve your microphones with your rental package.</h2>
        <p class="mt-2 text-brand-muted/80">Share your run-of-show and we’ll have the right mics labeled, tested, and ready to hand off.</p>
      </div>
      <div class="mt-6 flex flex-col gap-3 sm:flex-row md:mt-0">
        <a href="/about/contact/" class="font-display inline-flex min-h-[3.25rem] items-center justify-center rounded-full bg-brand-gold px-6 py-2.5 text-sm font-bold text-brand-ink transition hover:-translate-y-0.5 hover:bg-brand-ink hover:text-brand-soft">Request availability</a>
        <a href="tel:+17076600414" class="font-display inline-flex min-h-[3.25rem] items-center justify-center rounded-full border border-brand-ink/20 bg-brand-soft px-6 py-2.5 text-sm font-bold text-brand-ink transition hover:-translate-y-0.5">Talk with an audio tech</a>
      </div>
    </div>
  </div>
</section>
