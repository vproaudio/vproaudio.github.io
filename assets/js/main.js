// Custom JS can go here
console.log('Bootstrap + Jekyll loaded!');

document.addEventListener('DOMContentLoaded', () => {
  // Nested package dropdowns
  const packageSubmenuToggles = document.querySelectorAll('.package-submenu-toggle');
  const desktopPackageSubmenuQuery = window.matchMedia('(min-width: 992px)');

  const closePackageSubmenu = (submenuItem) => {
    if (!submenuItem) return;

    submenuItem.classList.remove('show');
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

  const closeAllPackageSubmenus = () => {
    document.querySelectorAll('.package-submenu.show').forEach(closePackageSubmenu);
  };

  packageSubmenuToggles.forEach((toggle) => {
    const submenuItem = toggle.closest('.package-submenu');

    toggle.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();

      if (!submenuItem) return;

      closeSiblingPackageSubmenus(submenuItem);

      if (desktopPackageSubmenuQuery.matches) {
        closePackageSubmenu(submenuItem);
        toggle.blur();
        return;
      }

      const isOpen = submenuItem.classList.toggle('show');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    toggle.addEventListener('mouseenter', () => {
      if (!desktopPackageSubmenuQuery.matches || !submenuItem) return;

      closeSiblingPackageSubmenus(submenuItem);
      toggle.setAttribute('aria-expanded', 'true');
    });

    toggle.addEventListener('mouseleave', () => {
      if (desktopPackageSubmenuQuery.matches) toggle.setAttribute('aria-expanded', 'false');
    });
  });

  desktopPackageSubmenuQuery.addEventListener('change', (event) => {
    if (event.matches) closeAllPackageSubmenus();
  });

  document.querySelectorAll('.nav-item.dropdown').forEach((dropdown) => {
    dropdown.addEventListener('hidden.bs.dropdown', () => {
      dropdown.querySelectorAll('.package-submenu.show').forEach((submenu) => {
        submenu.classList.remove('show');
        const toggle = submenu.querySelector('.package-submenu-toggle');
        if (toggle) toggle.setAttribute('aria-expanded', 'false');
      });
    });
  });

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
        card.classList.toggle('d-none', !isVisible);
        if (isVisible) visibleCount += 1;
      });

      setupGuidesNoResults.classList.toggle('d-none', visibleCount > 0);
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
        response.innerHTML = '<div class="alert alert-warning">Please fill in all fields correctly before submitting.</div>';
        return;
      }

      if (typeof emailjs === 'undefined') {
        response.innerHTML = '<div class="alert alert-danger">Our email service is currently unavailable. Please reach out directly at <a href="mailto:bookings@vproaudio.rentals" class="alert-link">bookings@vproaudio.rentals</a>.</div>';
        console.error('EmailJS SDK is not available when attempting to submit the contact form.');
        return;
      }

      contactSubmitButton.disabled = true;
      const originalText = contactSubmitButton.innerHTML;
      contactSubmitButton.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Sending...';

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
          response.innerHTML = '<div class="alert alert-success">Thank you for contacting us. Your message has been sent!</div>';
          contactForm.reset();
        })
        .catch((error) => {
          console.error('EmailJS error:', error);
          response.innerHTML = '<div class="alert alert-danger">Oops! Something went wrong while sending your message. Please try again later or email us directly at <a href="mailto:bookings@vproaudio.rentals" class="alert-link">bookings@vproaudio.rentals</a>.</div>';
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
          item.classList.remove('d-none');
          visibleCount += 1;
        } else {
          const collapse = item.querySelector('.accordion-collapse');
          const button = item.querySelector('.accordion-button');

          if (collapse && collapse.classList.contains('show')) {
            collapse.classList.remove('show');
          }

          if (button) {
            button.classList.add('collapsed');
            button.setAttribute('aria-expanded', 'false');
          }

          item.classList.add('d-none');
        }
      });

      faqEmptyState.classList.toggle('d-none', visibleCount > 0);
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
