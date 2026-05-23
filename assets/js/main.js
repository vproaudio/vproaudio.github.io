document.addEventListener('DOMContentLoaded', () => {
  // Navigation disclosure controls
  const navbarToggler = document.querySelector('.navbar-toggler');
  const navbarCollapse = document.querySelector(navbarToggler?.getAttribute('data-bs-target') || '#navbarResponsive');

  if (navbarToggler && navbarCollapse) {
    navbarToggler.addEventListener('click', () => {
      const isOpen = navbarCollapse.classList.toggle('hidden') === false;
      navbarToggler.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  }

  const closeDropdown = (dropdown) => {
    if (!dropdown) return;

    dropdown.classList.remove('show');
    dropdown.querySelector(':scope > .dropdown-menu')?.classList.add('hidden');
    const toggle = dropdown.querySelector(':scope > .dropdown-toggle');
    if (toggle) toggle.setAttribute('aria-expanded', 'false');
    dropdown.querySelectorAll('.package-submenu.show').forEach(closePackageSubmenu);
  };

  const closeSiblingDropdowns = (dropdown) => {
    if (!dropdown || !dropdown.parentElement) return;

    dropdown.parentElement.querySelectorAll(':scope > .dropdown.show').forEach((sibling) => {
      if (sibling !== dropdown) closeDropdown(sibling);
    });
  };

  document.querySelectorAll('.nav-item.dropdown > .dropdown-toggle').forEach((toggle) => {
    const dropdown = toggle.closest('.dropdown');

    toggle.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();

      closeSiblingDropdowns(dropdown);
      const isOpen = dropdown.classList.toggle('show');
      dropdown.querySelector(':scope > .dropdown-menu')?.classList.toggle('hidden', !isOpen);
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  });

  const packageSubmenuToggles = document.querySelectorAll('.package-submenu-toggle');

  const closePackageSubmenu = (submenuItem) => {
    if (!submenuItem) return;

    submenuItem.classList.remove('show');
    submenuItem.querySelector(':scope > .nested-dropdown-menu')?.classList.add('hidden');
    const toggle = submenuItem.querySelector('.package-submenu-toggle');
    if (toggle) toggle.setAttribute('aria-expanded', 'false');
  };

  const closeSiblingPackageSubmenus = (submenuItem) => {
    if (!submenuItem || !submenuItem.parentElement) return;

    const siblingSubmenus = submenuItem.parentElement.querySelectorAll('.package-submenu.show');
    siblingSubmenus.forEach((sibling) => {
      if (sibling !== submenuItem) closePackageSubmenu(sibling);
    });
  };

  packageSubmenuToggles.forEach((toggle) => {
    const submenuItem = toggle.closest('.package-submenu');

    toggle.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();

      if (!submenuItem) return;

      closeSiblingPackageSubmenus(submenuItem);

      const isOpen = submenuItem.classList.toggle('show');
      submenuItem.querySelector(':scope > .nested-dropdown-menu')?.classList.toggle('hidden', !isOpen);
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  });

  document.addEventListener('click', (event) => {
    if (event.target.closest('.dropdown')) return;

    document.querySelectorAll('.dropdown.show').forEach(closeDropdown);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;

    document.querySelectorAll('.dropdown.show').forEach(closeDropdown);
    if (navbarCollapse && !navbarCollapse.classList.contains('hidden')) {
      navbarCollapse.classList.add('hidden');
      navbarToggler?.setAttribute('aria-expanded', 'false');
    }
  });

  // Accordion controls
  document.querySelectorAll('.accordion-button[data-bs-toggle="collapse"]').forEach((button) => {
    const collapse = document.querySelector(button.getAttribute('data-bs-target'));
    if (!collapse) return;

    button.addEventListener('click', () => {
      const parentSelector = collapse.getAttribute('data-bs-parent');
      const isOpen = collapse.classList.contains('show');

      if (parentSelector) {
        document.querySelectorAll(`${parentSelector} .accordion-collapse.show`).forEach((openCollapse) => {
          if (openCollapse === collapse) return;

          openCollapse.classList.remove('show');
          openCollapse.classList.add('hidden');
          const openButton = document.querySelector(`[data-bs-target="#${openCollapse.id}"]`);
          if (openButton) {
            openButton.classList.add('collapsed');
            openButton.setAttribute('aria-expanded', 'false');
          }
        });
      }

      collapse.classList.toggle('show', !isOpen);
      collapse.classList.toggle('hidden', isOpen);
      button.classList.toggle('collapsed', isOpen);
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

  // Contact form handling
  const contactForm = document.getElementById('contactForm');
  const contactSubmitButton = document.getElementById('contactSubmit');

  if (typeof emailjs !== 'undefined') {
    emailjs.init({
      publicKey: '8g9ogIfKnECKwhPCN'
    });
  } else if (contactForm) {
    console.error('EmailJS SDK failed to load.');
  }

  if (contactForm && contactSubmitButton) {
    const submitContactForm = () => {
      const name = document.getElementById('user_name');
      const email = document.getElementById('user_email');
      const eventDate = document.getElementById('event_date');
      const supportType = document.getElementById('support_type');
      const message = document.getElementById('message');
      const response = document.getElementById('responseMessage');

      let isValid = true;
      response.innerHTML = '';

      if (!name.value.trim()) {
        name.classList.add('is-invalid');
        isValid = false;
      } else {
        name.classList.remove('is-invalid');
      }

      const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
      if (!email.value.trim() || !emailRegex.test(email.value)) {
        email.classList.add('is-invalid');
        isValid = false;
      } else {
        email.classList.remove('is-invalid');
      }

      if (!message.value.trim() || message.value.length < 10) {
        message.classList.add('is-invalid');
        isValid = false;
      } else {
        message.classList.remove('is-invalid');
      }

      if (!isValid) {
        response.innerHTML = '<div class="rounded-xl border border-brand-gold/60 bg-brand-gold/20 p-4 text-brand-ink">Please fill in all fields correctly before submitting.</div>';
        return;
      }

      if (typeof emailjs === 'undefined') {
        response.innerHTML = '<div class="rounded-xl border border-brand-muted/25 bg-brand-muted p-4 text-brand-soft">Our email service is currently unavailable. Please reach out directly at <a href="mailto:bookings@vproaudio.rentals" class="font-bold underline">bookings@vproaudio.rentals</a>.</div>';
        console.error('EmailJS SDK is not available when attempting to submit the contact form.');
        return;
      }

      contactSubmitButton.disabled = true;
      const originalText = contactSubmitButton.innerHTML;
      contactSubmitButton.innerHTML = '<span class="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-brand-soft/40 border-t-brand-soft" role="status" aria-hidden="true"></span>Sending...';

      const originalMessageValue = message.value;
      const composedMessageParts = [
        `Support type: ${supportType.value}`
      ];

      if (eventDate.value.trim()) {
        composedMessageParts.push(`Event date: ${eventDate.value.trim()}`);
      }

      composedMessageParts.push('', originalMessageValue);
      message.value = composedMessageParts.join('\n');

      let didSucceed = false;

      emailjs.sendForm('service_ilnhxr9', 'template_t1xv5a8', '#contactForm')
        .then(() => {
          didSucceed = true;
          response.innerHTML = '<div class="rounded-xl border border-brand-gold/60 bg-brand-soft p-4 text-brand-ink">Thank you for contacting us. Your message has been sent!</div>';
          contactForm.reset();
        })
        .catch((error) => {
          console.error('EmailJS error:', error);
          response.innerHTML = '<div class="rounded-xl border border-brand-muted/25 bg-brand-muted p-4 text-brand-soft">Oops! Something went wrong while sending your message. Please try again later or email us directly at <a href="mailto:bookings@vproaudio.rentals" class="font-bold underline">bookings@vproaudio.rentals</a>.</div>';
        })
        .finally(() => {
          if (!didSucceed) {
            message.value = originalMessageValue;
          }
          contactSubmitButton.disabled = false;
          contactSubmitButton.innerHTML = originalText;
        });
    };

    contactSubmitButton.addEventListener('click', submitContactForm);
  }

  // FAQ filtering
  const faqSearchInput = document.querySelector('#faqSearch');
  const faqResetButton = document.querySelector('#faqReset');
  const faqAccordionItems = document.querySelectorAll('#faqAccordion .accordion-item');
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
          const collapse = item.querySelector('.accordion-collapse');
          const button = item.querySelector('.accordion-button');

          if (collapse && collapse.classList.contains('show')) {
            collapse.classList.remove('show');
            collapse.classList.add('hidden');
          }

          if (button) {
            button.classList.add('collapsed');
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
