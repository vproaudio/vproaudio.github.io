document.addEventListener('DOMContentLoaded', () => {
  // Navigation disclosure controls
  const navbarToggler = document.querySelector('[data-nav-toggle]');
  const navbarCollapse = document.querySelector(navbarToggler?.getAttribute('data-nav-target') || '#navbarResponsive');

  if (navbarToggler && navbarCollapse) {
    navbarToggler.addEventListener('click', () => {
      const isOpen = navbarCollapse.classList.toggle('hidden') === false;
      navbarToggler.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  }

  const closeDropdown = (dropdown) => {
    if (!dropdown) return;

    dropdown.classList.remove('is-open');
    dropdown.querySelector(':scope > .nav-disclosure-panel')?.classList.add('hidden');
    const toggle = dropdown.querySelector(':scope > [data-nav-disclosure-toggle]');
    if (toggle) toggle.setAttribute('aria-expanded', 'false');
    dropdown.querySelectorAll('.package-submenu.is-open').forEach(closePackageSubmenu);
  };

  const closeSiblingDropdowns = (dropdown) => {
    if (!dropdown || !dropdown.parentElement) return;

    dropdown.parentElement.querySelectorAll(':scope > .nav-disclosure.is-open').forEach((sibling) => {
      if (sibling !== dropdown) closeDropdown(sibling);
    });
  };

  const openDropdown = (dropdown) => {
    if (!dropdown) return;

    closeSiblingDropdowns(dropdown);
    dropdown.classList.add('is-open');
    dropdown.querySelector(':scope > .nav-disclosure-panel')?.classList.remove('hidden');
    dropdown.querySelector(':scope > [data-nav-disclosure-toggle]')?.setAttribute('aria-expanded', 'true');
  };

  const isDesktop = () => window.matchMedia('(min-width: 1024px)').matches;

  document.querySelectorAll('.nav-disclosure').forEach((dropdown) => {
    const toggle = dropdown.querySelector(':scope > [data-nav-disclosure-toggle]');
    let closeTimer;

    toggle?.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();

      if (isDesktop()) return;

      closeSiblingDropdowns(dropdown);
      const isOpen = dropdown.classList.toggle('is-open');
      dropdown.querySelector(':scope > .nav-disclosure-panel')?.classList.toggle('hidden', !isOpen);
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    dropdown.addEventListener('mouseenter', () => {
      if (!isDesktop()) return;

      clearTimeout(closeTimer);
      openDropdown(dropdown);
    });

    dropdown.addEventListener('mouseleave', () => {
      if (!isDesktop()) return;

      closeTimer = setTimeout(() => closeDropdown(dropdown), 150);
    });
  });

  const packageSubmenuToggles = document.querySelectorAll('.package-submenu-toggle');

  const closePackageSubmenu = (submenuItem) => {
    if (!submenuItem) return;

    submenuItem.classList.remove('is-open');
    submenuItem.querySelector(':scope > .nested-disclosure-panel')?.classList.add('hidden');
    const toggle = submenuItem.querySelector('.package-submenu-toggle');
    if (toggle) toggle.setAttribute('aria-expanded', 'false');
  };

  const closeSiblingPackageSubmenus = (submenuItem) => {
    if (!submenuItem || !submenuItem.parentElement) return;

    const siblingSubmenus = submenuItem.parentElement.querySelectorAll('.package-submenu.is-open');
    siblingSubmenus.forEach((sibling) => {
      if (sibling !== submenuItem) closePackageSubmenu(sibling);
    });
  };

  const openPackageSubmenu = (submenuItem) => {
    if (!submenuItem) return;

    closeSiblingPackageSubmenus(submenuItem);
    submenuItem.classList.add('is-open');
    submenuItem.querySelector(':scope > .nested-disclosure-panel')?.classList.remove('hidden');
    submenuItem.querySelector('.package-submenu-toggle')?.setAttribute('aria-expanded', 'true');
  };

  packageSubmenuToggles.forEach((toggle) => {
    const submenuItem = toggle.closest('.package-submenu');
    let closeTimer;

    toggle.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();

      if (!submenuItem || isDesktop()) return;

      closeSiblingPackageSubmenus(submenuItem);

      const isOpen = submenuItem.classList.toggle('is-open');
      submenuItem.querySelector(':scope > .nested-disclosure-panel')?.classList.toggle('hidden', !isOpen);
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    submenuItem?.addEventListener('mouseenter', () => {
      if (!isDesktop()) return;

      clearTimeout(closeTimer);
      openPackageSubmenu(submenuItem);
    });

    submenuItem?.addEventListener('mouseleave', () => {
      if (!isDesktop()) return;

      closeTimer = setTimeout(() => closePackageSubmenu(submenuItem), 150);
    });
  });

  document.addEventListener('click', (event) => {
    if (event.target.closest('.nav-disclosure')) return;

    document.querySelectorAll('.nav-disclosure.is-open').forEach(closeDropdown);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;

    document.querySelectorAll('.nav-disclosure.is-open').forEach(closeDropdown);
    if (navbarCollapse && !navbarCollapse.classList.contains('hidden')) {
      navbarCollapse.classList.add('hidden');
      navbarToggler?.setAttribute('aria-expanded', 'false');
    }
  });

  // Accordion controls
  document.querySelectorAll('.faq-accordion-button[data-collapse-target]').forEach((button) => {
    const collapse = document.querySelector(button.getAttribute('data-collapse-target'));
    if (!collapse) return;

    button.addEventListener('click', () => {
      const parentSelector = collapse.getAttribute('data-collapse-parent');
      const isOpen = collapse.classList.contains('is-open');

      if (parentSelector) {
        document.querySelectorAll(`${parentSelector} .faq-accordion-panel.is-open`).forEach((openCollapse) => {
          if (openCollapse === collapse) return;

          openCollapse.classList.remove('is-open');
          openCollapse.classList.add('hidden');
          const openButton = document.querySelector(`[data-collapse-target="#${openCollapse.id}"]`);
          if (openButton) {
            openButton.setAttribute('aria-expanded', 'false');
          }
        });
      }

      collapse.classList.toggle('is-open', !isOpen);
      collapse.classList.toggle('hidden', isOpen);
      button.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
    });
  });

  // Scroll reveal animations
  const faders = document.querySelectorAll('.fade-in');

  if (faders.length > 0) {
    if (!('IntersectionObserver' in window)) {
      faders.forEach((fader) => fader.classList.add('visible'));
    } else {
      const appearOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        });
      }, { threshold: 0.1 });

      faders.forEach((fader) => appearOnScroll.observe(fader));
    }
  }

  // Setup guides filtering
  const setupGuidesSearchInput = document.getElementById('setupGuidesSearch');
  const setupGuidesCards = Array.from(document.querySelectorAll('.guide-card-item'));
  const setupGuidesNoResults = document.getElementById('setupGuidesNoResults');

  if (setupGuidesSearchInput && setupGuidesCards.length > 0 && setupGuidesNoResults) {
    const filterGuides = () => {
      const query = setupGuidesSearchInput.value.trim().toLowerCase();
      let visibleCount = 0;

      setupGuidesCards.forEach((card) => {
        const haystack = card.dataset.search || '';
        const isVisible = !query || haystack.includes(query);
        card.classList.toggle('hidden', !isVisible);
        if (isVisible) visibleCount += 1;
      });

      setupGuidesNoResults.classList.toggle('hidden', visibleCount > 0);
    };

    setupGuidesSearchInput.addEventListener('input', filterGuides);
  }

  // Contact and quote form handling
  const quoteForm = document.getElementById('quoteForm');
  const contactForm = document.getElementById('contactForm');
  const formsUsingEmail = [quoteForm, contactForm].filter(Boolean);

  const setFieldValidity = (field, isFieldValid) => {
    if (!field) return;
    field.classList.toggle('is-invalid', !isFieldValid);
    field.classList.toggle('border-red-500', !isFieldValid);
    field.classList.toggle('ring-4', !isFieldValid);
    field.classList.toggle('ring-red-500/20', !isFieldValid);

    const feedback = field.nextElementSibling;
    if (feedback) feedback.classList.toggle('hidden', isFieldValid);
  };

  const setGroupValidity = (group, feedback, isGroupValid) => {
    if (!group || !feedback) return;
    group.classList.toggle('border-red-500', !isGroupValid);
    group.classList.toggle('ring-4', !isGroupValid);
    group.classList.toggle('ring-red-500/20', !isGroupValid);
    group.setAttribute('aria-invalid', isGroupValid ? 'false' : 'true');
    feedback.classList.toggle('hidden', isGroupValid);
  };

  const isEmailValid = (value) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value);

  const initializeFormGuards = (form) => {
    const startedAtInput = form?.querySelector('input[name="form_started_at"]');
    if (startedAtInput && !startedAtInput.value) {
      startedAtInput.value = String(Date.now());
    }

    if (form && !form.dataset.spamGuardInitialized) {
      const markInteraction = (event) => {
        const target = event.target;
        const isTypingControl = target instanceof HTMLInputElement
          || target instanceof HTMLSelectElement
          || target instanceof HTMLTextAreaElement;
        if (!isTypingControl) return;
        if (target instanceof HTMLInputElement && ['submit', 'button'].includes(target.type)) return;

        if (!startedAtInput?.value) {
          startedAtInput.value = String(Date.now());
        }
      };

      form.addEventListener('focusin', markInteraction);
      form.addEventListener('input', markInteraction);
      form.addEventListener('change', markInteraction);
      form.dataset.spamGuardInitialized = 'true';
    }
  };

  const evaluateSpamGuards = (form) => {
    const honeypot = form.querySelector('input[name="website"]');
    const startedAtInput = form.querySelector('input[name="form_started_at"]');
    const rawStartedAt = startedAtInput?.value.trim() || '';
    const startedAt = rawStartedAt ? Number(rawStartedAt) : null;
    const hasValidStartedAt = Number.isFinite(startedAt) && startedAt > 0;
    const elapsedMs = hasValidStartedAt ? Date.now() - startedAt : null;
    const hasInvalidTimestamp = Boolean(rawStartedAt) && !hasValidStartedAt;
    const hasFutureOrZeroTimestamp = hasValidStartedAt && elapsedMs <= 0;

    return {
      shouldBlock: Boolean(honeypot?.value.trim()) || hasInvalidTimestamp || hasFutureOrZeroTimestamp,
      isSuspiciouslyFast: hasValidStartedAt && elapsedMs < 500
    };
  };

  if (formsUsingEmail.length > 0 && typeof emailjs !== 'undefined') {
    emailjs.init({
      publicKey: '8g9ogIfKnECKwhPCN'
    });
  } else if (formsUsingEmail.length > 0) {
    console.error('EmailJS SDK failed to load.');
  }

  formsUsingEmail.forEach(initializeFormGuards);

  const submitWithEmailJs = ({ form, button, response, messageField, validate, buildMessage, successMessage }) => {
    if (!form || !button || !response || !messageField) return;

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      response.innerHTML = '';

      if (!validate()) {
        response.innerHTML = '<div class="rounded-xl border border-brand-gold/60 bg-brand-gold/20 p-4 text-brand-ink">Please fill in all required fields before submitting.</div>';
        return;
      }

      const spamCheck = evaluateSpamGuards(form);
      if (spamCheck.shouldBlock) {
        response.innerHTML = '<div class="rounded-xl border border-brand-gold/60 bg-brand-gold/20 p-4 text-brand-ink">We could not verify your request. Please try again in a moment.</div>';
        return;
      }
      if (spamCheck.isSuspiciouslyFast) {
        response.innerHTML = '<div class="rounded-xl border border-brand-gold/60 bg-brand-gold/20 p-4 text-brand-ink">We could not verify your request. Please try again in a moment.</div>';
        console.warn('Suspiciously fast form submission blocked:', form.id);
        return;
      }

      if (typeof emailjs === 'undefined') {
        response.innerHTML = '<div class="rounded-xl border border-brand-muted/25 bg-brand-muted p-4 text-brand-soft">Our email service is currently unavailable. Please reach out directly at <a href="mailto:bookings@vproaudio.rentals" class="font-bold underline">bookings@vproaudio.rentals</a>.</div>';
        console.error('EmailJS SDK is not available when attempting to submit form:', form.id);
        return;
      }

      button.disabled = true;
      const originalText = button.innerHTML;
      button.innerHTML = '<span class="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-brand-soft/40 border-t-brand-soft" role="status" aria-hidden="true"></span>Sending...';

      const originalMessageValue = messageField.value;
      messageField.value = buildMessage(originalMessageValue);
      let didSucceed = false;

      emailjs.sendForm('service_ilnhxr9', 'template_t1xv5a8', form)
        .then(() => {
          didSucceed = true;
          response.innerHTML = `<div class="rounded-xl border border-brand-gold/60 bg-brand-soft p-4 text-brand-ink">${successMessage}</div>`;
          form.reset();
          initializeFormGuards(form);
        })
        .catch((error) => {
          console.error('EmailJS error:', error);
          response.innerHTML = '<div class="rounded-xl border border-brand-muted/25 bg-brand-muted p-4 text-brand-soft">Oops! Something went wrong while sending your message. Please try again later or email us directly at <a href="mailto:bookings@vproaudio.rentals" class="font-bold underline">bookings@vproaudio.rentals</a>.</div>';
        })
        .finally(() => {
          if (!didSucceed) {
            messageField.value = originalMessageValue;
          }
          button.disabled = false;
          button.innerHTML = originalText;
        });
    });
  };

  if (quoteForm) {
    const quoteSubmitButton = document.getElementById('quoteSubmit');
    const quoteResponse = document.getElementById('quoteResponseMessage');
    const quoteName = document.getElementById('quote_user_name');
    const quoteEmail = document.getElementById('quote_user_email');
    const quoteEventType = document.getElementById('quote_event_type');
    const quoteVenueCity = document.getElementById('quote_venue_city');
    const quoteGuestCount = document.getElementById('quote_guest_count');
    const quoteEventDate = document.getElementById('quote_event_date');
    const quoteTimeWindow = document.getElementById('quote_event_time_window');
    const quoteMessage = document.getElementById('quote_message');
    const quoteServices = Array.from(quoteForm.querySelectorAll('input[name="services_needed"]'));
    const quoteServicesSummary = document.getElementById('quote_services_summary');
    const quoteServicesGroup = document.getElementById('quoteServicesNeededGroup');
    const quoteServicesFeedback = document.getElementById('quoteServicesNeededFeedback');
    const quoteBudgetRange = document.getElementById('budget_range');
    const quotePackageInterest = document.getElementById('quote_package_interest');

    submitWithEmailJs({
      form: quoteForm,
      button: quoteSubmitButton,
      response: quoteResponse,
      messageField: quoteMessage,
      validate: () => {
        let isValid = true;

        const nameOk = Boolean(quoteName?.value.trim());
        setFieldValidity(quoteName, nameOk);
        if (!nameOk) isValid = false;

        const emailOk = Boolean(quoteEmail?.value.trim()) && isEmailValid(quoteEmail.value.trim());
        setFieldValidity(quoteEmail, emailOk);
        if (!emailOk) isValid = false;

        const typeOk = Boolean(quoteEventType?.value.trim());
        setFieldValidity(quoteEventType, typeOk);
        if (!typeOk) isValid = false;

        const venueOk = Boolean(quoteVenueCity?.value.trim());
        setFieldValidity(quoteVenueCity, venueOk);
        if (!venueOk) isValid = false;

        const guestCountValue = Number(quoteGuestCount?.value || 0);
        const guestCountOk = Number.isFinite(guestCountValue) && guestCountValue > 0;
        setFieldValidity(quoteGuestCount, guestCountOk);
        if (!guestCountOk) isValid = false;

        const eventDateOk = Boolean(quoteEventDate?.value.trim());
        setFieldValidity(quoteEventDate, eventDateOk);
        if (!eventDateOk) isValid = false;

        const timeWindowOk = Boolean(quoteTimeWindow?.value.trim());
        setFieldValidity(quoteTimeWindow, timeWindowOk);
        if (!timeWindowOk) isValid = false;

        const selectedServices = quoteServices.filter((option) => option.checked).map((option) => option.value);
        const servicesOk = selectedServices.length > 0;
        setGroupValidity(quoteServicesGroup, quoteServicesFeedback, servicesOk);
        quoteServices.forEach((option) => option.setAttribute('aria-invalid', servicesOk ? 'false' : 'true'));
        quoteServicesSummary.value = servicesOk ? selectedServices.join(', ') : '';
        if (!servicesOk) isValid = false;

        const messageOk = Boolean(quoteMessage?.value.trim()) && quoteMessage.value.trim().length >= 10;
        setFieldValidity(quoteMessage, messageOk);
        if (!messageOk) isValid = false;

        return isValid;
      },
      buildMessage: (originalMessage) => {
        const selectedServices = quoteServices.filter((option) => option.checked).map((option) => option.value).join(', ');
        const details = [
          `Request type: Quote request`,
          `Event type: ${quoteEventType.value}`,
          `Venue/city: ${quoteVenueCity.value.trim()}`,
          `Guest count: ${quoteGuestCount.value.trim()}`,
          `Event date: ${quoteEventDate.value.trim()}`,
          `Time window: ${quoteTimeWindow.value.trim()}`,
          `Services needed: ${selectedServices}`,
          `Budget range: ${quoteBudgetRange?.value || 'Not specified'}`,
          `Package or gear interests: ${quotePackageInterest?.value.trim() || 'Not specified'}`,
          '',
          originalMessage
        ];
        return details.join('\n');
      },
      successMessage: 'Thank you for your quote request. We will follow up shortly with availability and pricing.'
    });
  }

  if (contactForm) {
    const contactSubmitButton = document.getElementById('contactSubmit');
    const contactResponse = document.getElementById('responseMessage');
    const contactName = document.getElementById('contact_user_name');
    const contactEmail = document.getElementById('contact_user_email');
    const contactSupportType = document.getElementById('contact_support_type');
    const contactMessage = document.getElementById('contact_message');

    submitWithEmailJs({
      form: contactForm,
      button: contactSubmitButton,
      response: contactResponse,
      messageField: contactMessage,
      validate: () => {
        let isValid = true;

        const nameOk = Boolean(contactName?.value.trim());
        setFieldValidity(contactName, nameOk);
        if (!nameOk) isValid = false;

        const emailOk = Boolean(contactEmail?.value.trim()) && isEmailValid(contactEmail.value.trim());
        setFieldValidity(contactEmail, emailOk);
        if (!emailOk) isValid = false;

        const messageOk = Boolean(contactMessage?.value.trim()) && contactMessage.value.trim().length >= 10;
        setFieldValidity(contactMessage, messageOk);
        if (!messageOk) isValid = false;

        return isValid;
      },
      buildMessage: (originalMessage) => {
        const details = [
          `Request type: General inquiry`,
          `Support type: ${contactSupportType?.value || 'General inquiry'}`,
          '',
          originalMessage
        ];
        return details.join('\n');
      },
      successMessage: 'Thank you for contacting us. Your inquiry has been sent.'
    });
  }

  // FAQ filtering
  const faqSearchInput = document.querySelector('#faqSearch');
  const faqResetButton = document.querySelector('#faqReset');
  const faqAccordionItems = document.querySelectorAll('#faqAccordion .faq-accordion-item');
  const faqEmptyState = document.querySelector('#faqEmptyState');

  if (faqSearchInput && faqAccordionItems.length > 0 && faqEmptyState) {
    const updateFaqVisibility = () => {
      const query = faqSearchInput.value.trim().toLowerCase();
      let visibleCount = 0;

      faqAccordionItems.forEach((item) => {
        const text = item.dataset.faqText ? item.dataset.faqText.toLowerCase() : '';
        const matches = !query || text.includes(query);

        if (matches) {
          item.classList.remove('hidden');
          visibleCount += 1;
        } else {
          const collapse = item.querySelector('.faq-accordion-panel');
          const button = item.querySelector('.faq-accordion-button');

          if (collapse && collapse.classList.contains('is-open')) {
            collapse.classList.remove('is-open');
            collapse.classList.add('hidden');
          }

          if (button) {
            button.setAttribute('aria-expanded', 'false');
          }

          item.classList.add('hidden');
        }
      });

      faqEmptyState.classList.toggle('hidden', visibleCount > 0);
    };

    faqSearchInput.addEventListener('input', updateFaqVisibility);

    if (faqResetButton) {
      faqResetButton.addEventListener('click', () => {
        faqSearchInput.value = '';
        faqSearchInput.focus();
        updateFaqVisibility();
      });
    }

    updateFaqVisibility();
  }
});
