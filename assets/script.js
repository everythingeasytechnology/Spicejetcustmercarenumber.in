// ==========================================================================
// SpiceJet / RedJet Aviation Portal Interactive Script
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  // ==========================================================================
  // MOBILE-ONLY SPLASH SCREEN CONTROLLER (<= 768px ONLY) - DESKTOP UNTOUCHED
  // ==========================================================================
  const splashEl = document.getElementById('mobileSplashScreen');
  if (splashEl) {
    const isMobile = window.innerWidth <= 768;
    const urlParams = new URLSearchParams(window.location.search);
    const skipSplash = urlParams.get('from_splash') === '1';

    if (isMobile && !skipSplash) {
      document.body.classList.add('splash-active');

      const dismissSplash = () => {
        if (splashEl.classList.contains('splash-hidden')) return;
        splashEl.classList.add('splash-hidden');
        document.body.classList.remove('splash-active');
        setTimeout(() => {
          splashEl.style.display = 'none';
        }, 500);
      };

      // Auto dismiss after 2s
      const splashTimer = setTimeout(dismissSplash, 2000);

      // Dismiss on tap/click if user wants to enter immediately
      splashEl.addEventListener('click', () => {
        clearTimeout(splashTimer);
        dismissSplash();
      });
    } else {
      // Desktop view or skipped: ensure splash is completely hidden
      splashEl.style.display = 'none';
      document.body.classList.remove('splash-active');
    }
  }

  const toastEl = document.getElementById('toastMsg');
  let toastTimer = null;

  function showToast(message) {
    if (!toastEl) return;
    toastEl.textContent = message;
    toastEl.classList.add('visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastEl.classList.remove('visible');
    }, 3400);
  }

  // ==========================================================================
  // 0. INFINITE AUTO RIGHT-TO-LEFT HERO IMAGE SLIDER (3 UPLOADED IMAGES)
  // ==========================================================================
  const heroSliderTrack = document.getElementById('heroSliderTrack');
  const heroDots = document.querySelectorAll('.hero-dot');
  const heroViewport = document.getElementById('heroSliderViewport');

  if (heroSliderTrack && heroDots.length > 0) {
    const slides = heroSliderTrack.querySelectorAll('.hero-slide');
    const totalRealSlides = slides.length; // 3

    const firstSlideClone = slides[0].cloneNode(true);
    firstSlideClone.setAttribute('aria-hidden', 'true');
    heroSliderTrack.appendChild(firstSlideClone);

    const allSlides = heroSliderTrack.querySelectorAll('.hero-slide');
    heroSliderTrack.style.width = `${allSlides.length * 100}%`;
    allSlides.forEach((s) => {
      s.style.width = `${100 / allSlides.length}%`;
      s.style.flex = `0 0 ${100 / allSlides.length}%`;
    });

    let currentSlide = 0;
    let isTransitioning = false;
    const stepPercent = 100 / allSlides.length;

    function updateHeroDots(activeIdx) {
      const normalized = activeIdx % totalRealSlides;
      heroDots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === normalized);
      });
    }

    function goToSlide(index, animate = true) {
      if (animate) {
        heroSliderTrack.style.transition = 'transform 0.75s cubic-bezier(0.25, 0.8, 0.25, 1)';
      } else {
        heroSliderTrack.style.transition = 'none';
      }
      heroSliderTrack.style.transform = `translateX(-${index * stepPercent}%)`;
      updateHeroDots(index);
    }

    function nextHeroSlide() {
      if (isTransitioning) return;
      isTransitioning = true;
      currentSlide += 1;
      goToSlide(currentSlide, true);

      if (currentSlide === totalRealSlides) {
        setTimeout(() => {
          currentSlide = 0;
          goToSlide(0, false);
          isTransitioning = false;
        }, 770);
      } else {
        setTimeout(() => {
          isTransitioning = false;
        }, 770);
      }
    }

    let heroInterval = setInterval(nextHeroSlide, 3500);

    heroDots.forEach((dot) => {
      dot.addEventListener('click', () => {
        const target = parseInt(dot.getAttribute('data-slide'), 10);
        if (isNaN(target) || isTransitioning) return;
        clearInterval(heroInterval);
        currentSlide = target;
        goToSlide(currentSlide, true);
        heroInterval = setInterval(nextHeroSlide, 3500);
      });
    });

    if (heroViewport) {
      heroViewport.addEventListener('mouseenter', () => clearInterval(heroInterval));
      heroViewport.addEventListener('mouseleave', () => {
        clearInterval(heroInterval);
        heroInterval = setInterval(nextHeroSlide, 3500);
      });
    }
  }

  // ==========================================================================
  // 1. Booking Widget Top Tabs
  // ==========================================================================
  const widgetTabs = document.querySelectorAll('.widget-tab');
  const widgetTitle = document.querySelector('.widget-title');
  const widgetSubtitle = document.querySelector('.widget-subtitle');
  const searchFlightBtn = document.getElementById('searchFlightBtn');

  const tabMeta = {
    flights: {
      title: 'Welcome aboard',
      subtitle: "Let's go places!",
      btn: 'Search Flight'
    },
    checkin: {
      title: 'Web Check-In',
      subtitle: 'Check-in online 48 hrs to 2 hrs before departure',
      btn: 'Search Booking'
    },
    status: {
      title: 'Flight Status',
      subtitle: 'Track real-time arrival and departure updates',
      btn: 'Check Status'
    },
    manage: {
      title: 'Manage Booking',
      subtitle: 'View, modify or add services to your trip',
      btn: 'Retrieve Booking'
    }
  };

  widgetTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      widgetTabs.forEach((t) => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      const key = tab.getAttribute('data-tab');
      if (tabMeta[key] && widgetTitle && widgetSubtitle && searchFlightBtn) {
        widgetTitle.textContent = tabMeta[key].title;
        widgetSubtitle.textContent = tabMeta[key].subtitle;
        searchFlightBtn.textContent = tabMeta[key].btn;
      }
    });
  });

  // ==========================================================================
  // 2. Trip Type (One Way / Round Trip)
  // ==========================================================================
  const tripRadios = document.querySelectorAll('input[name="tripType"]');
  const retDateField = document.getElementById('retDateField');
  const retDateDisplay = document.getElementById('retDateDisplay');

  tripRadios.forEach((radio) => {
    radio.addEventListener('change', () => {
      if (!retDateField || !retDateDisplay) return;
      if (radio.value === 'roundtrip') {
        retDateField.classList.remove('disabled');
        if (retDateDisplay.textContent === 'Select Date') {
          retDateDisplay.textContent = 'Sat, 14 Nov 2026';
          retDateDisplay.classList.remove('placeholder');
        }
      } else {
        retDateField.classList.add('disabled');
        retDateDisplay.textContent = 'Select Date';
        retDateDisplay.classList.add('placeholder');
      }
    });
  });

  // ==========================================================================
  // 3. Origin & Destination Dropdowns + Swap Button
  // ==========================================================================
  const fromFieldWrapper = document.getElementById('fromFieldWrapper');
  const toFieldWrapper = document.getElementById('toFieldWrapper');
  const fromDropdown = document.getElementById('fromDropdown');
  const toDropdown = document.getElementById('toDropdown');
  const fromInput = document.getElementById('fromInput');
  const toInput = document.getElementById('toInput');
  const swapBtn = document.getElementById('swapBtn');

  function closeAllDropdowns() {
    document.querySelectorAll('.airport-dropdown, .pax-dropdown, .currency-dropdown').forEach((d) => {
      d.classList.remove('open');
    });
  }

  if (fromFieldWrapper && fromDropdown && fromInput) {
    fromFieldWrapper.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = fromDropdown.classList.contains('open');
      closeAllDropdowns();
      if (!isOpen) fromDropdown.classList.add('open');
    });

    fromDropdown.querySelectorAll('.airport-option').forEach((opt) => {
      opt.addEventListener('click', (e) => {
        e.stopPropagation();
        fromInput.value = opt.getAttribute('data-val');
        fromInput.classList.remove('muted');
        closeAllDropdowns();
      });
    });
  }

  if (toFieldWrapper && toDropdown && toInput) {
    toFieldWrapper.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = toDropdown.classList.contains('open');
      closeAllDropdowns();
      if (!isOpen) toDropdown.classList.add('open');
    });

    toDropdown.querySelectorAll('.airport-option').forEach((opt) => {
      opt.addEventListener('click', (e) => {
        e.stopPropagation();
        toInput.value = opt.getAttribute('data-val');
        toInput.classList.remove('muted');
        closeAllDropdowns();
      });
    });
  }

  if (swapBtn && fromInput && toInput) {
    swapBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const fromVal = fromInput.value;
      const toVal = toInput.value;
      if (toVal === 'Select Destination') {
        fromInput.value = 'Mumbai (BOM)';
        toInput.value = fromVal;
        toInput.classList.remove('muted');
      } else {
        fromInput.value = toVal;
        toInput.value = fromVal;
      }
    });
  }

  // ==========================================================================
  // 4. Date Formatting for Departure & Return Dates
  // ==========================================================================
  const depDatePicker = document.getElementById('depDatePicker');
  const retDatePicker = document.getElementById('retDatePicker');
  const depDateDisplay = document.getElementById('depDateDisplay');

  function formatDisplayDate(dateStr) {
    if (!dateStr) return '';
    const d = new Date(dateStr + 'T00:00:00');
    if (isNaN(d)) return dateStr;
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${days[d.getDay()]}, ${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
  }

  if (depDatePicker && depDateDisplay) {
    depDatePicker.addEventListener('change', () => {
      if (depDatePicker.value) {
        depDateDisplay.textContent = formatDisplayDate(depDatePicker.value);
      }
    });
  }

  if (retDatePicker && retDateField && retDateDisplay) {
    retDatePicker.addEventListener('change', () => {
      if (retDatePicker.value) {
        const roundTripRadio = document.querySelector('input[name="tripType"][value="roundtrip"]');
        if (roundTripRadio) roundTripRadio.checked = true;
        retDateField.classList.remove('disabled');
        retDateDisplay.textContent = formatDisplayDate(retDatePicker.value);
        retDateDisplay.classList.remove('placeholder');
      }
    });
  }

  // ==========================================================================
  // 5. Passengers & Currency Dropdowns
  // ==========================================================================
  const paxField = document.getElementById('paxField');
  const paxDropdown = document.getElementById('paxDropdown');
  const paxDisplay = document.getElementById('paxDisplay');

  const currencyField = document.getElementById('currencyField');
  const currencyDropdown = document.getElementById('currencyDropdown');
  const currencyDisplay = document.getElementById('currencyDisplay');

  if (paxField && paxDropdown && paxDisplay) {
    paxField.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = paxDropdown.classList.contains('open');
      closeAllDropdowns();
      if (!isOpen) paxDropdown.classList.add('open');
    });

    paxDropdown.querySelectorAll('.pax-option').forEach((opt) => {
      opt.addEventListener('click', (e) => {
        e.stopPropagation();
        paxDisplay.textContent = opt.getAttribute('data-val');
        closeAllDropdowns();
      });
    });
  }

  if (currencyField && currencyDropdown && currencyDisplay) {
    currencyField.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = currencyDropdown.classList.contains('open');
      closeAllDropdowns();
      if (!isOpen) currencyDropdown.classList.add('open');
    });

    currencyDropdown.querySelectorAll('.currency-option').forEach((opt) => {
      opt.addEventListener('click', (e) => {
        e.stopPropagation();
        currencyDisplay.textContent = opt.getAttribute('data-val');
        closeAllDropdowns();
      });
    });
  }

  document.addEventListener('click', () => {
    closeAllDropdowns();
  });

  // Mobile layout: mirror "City (CODE)" values into big code + city labels
  function syncRouteMobile() {
    [['fromInput', 'fromCode', 'fromCity', 'From'], ['toInput', 'toCode', 'toCity', 'To']].forEach(([inp, codeId, cityId, fallback]) => {
      const input = document.getElementById(inp);
      const codeEl = document.getElementById(codeId);
      const cityEl = document.getElementById(cityId);
      if (!input || !codeEl || !cityEl) return;
      const m = input.value.match(/^(.*?)\s*\((\w+)\)\s*$/);
      if (m) {
        codeEl.textContent = m[2];
        cityEl.textContent = m[1];
        codeEl.classList.remove('dim');
      } else {
        codeEl.textContent = fallback;
        cityEl.textContent = input.value;
        codeEl.classList.add('dim');
      }
    });
  }
  document.addEventListener('click', () => setTimeout(syncRouteMobile, 0), true);
  syncRouteMobile();

  let activeSpecialFare = null;
  document.querySelectorAll('input[name="specialFare"]').forEach((radio) => {
    radio.addEventListener('click', () => {
      if (activeSpecialFare === radio) {
        radio.checked = false;
        activeSpecialFare = null;
      } else {
        activeSpecialFare = radio;
      }
    });
  });

  // ==========================================================================
  // 6. Search Flight Button
  // ==========================================================================
  if (searchFlightBtn && fromInput && toInput && depDateDisplay && paxDisplay && currencyDisplay) {
    searchFlightBtn.addEventListener('click', () => {
      const origin = fromInput.value;
      const dest = toInput.value === 'Select Destination' ? 'Mumbai (BOM)' : toInput.value;
      const dep = depDateDisplay.textContent;
      const pax = paxDisplay.textContent;
      const curr = currencyDisplay.textContent;
      showToast(`Searching flights: ${origin} → ${dest} on ${dep} (${pax}, ${curr})`);
    });
  }

  // ==========================================================================
  // 7. Announcement Notice Bar Slider
  // ==========================================================================
  const notices = [
    {
      text: 'Passengers carrying arms & ammunition must request clearance at least 72 hours before departure. Email custrelations@spicejet.com for assistance.',
      link: 'Read more.'
    },
    {
      text: 'Important Advisory: Web Check-In is mandatory for all passengers up to 2 hours prior to scheduled departure.',
      link: 'Read more.'
    },
    {
      text: 'Passengers carrying arms & ammunition must request clearance at least 72 hours before departure. Email custrelations@spicejet.com for assistance.',
      link: 'Read more.'
    },
    {
      text: 'Get flat ₹500 off on your visa processing services exclusively on our website and mobile app using code SJ500.',
      link: 'Know more.'
    },
    {
      text: 'Upgrade to SpiceMax and enjoy extra legroom, priority check-in, priority boarding and complimentary meals.',
      link: 'Read more.'
    },
    {
      text: 'Join SpiceClub Loyalty Program today to earn SC Points on every flight and unlock complimentary upgrades.',
      link: 'Read more.'
    }
  ];

  let currentNoticeIndex = 2;
  const noticeTextEl = document.getElementById('noticeText');
  const noticeDots = document.querySelectorAll('.notice-dot');
  const noticePrev = document.getElementById('noticePrev');
  const noticeNext = document.getElementById('noticeNext');

  function updateNotice(idx) {
    if (!noticeTextEl) return;
    currentNoticeIndex = (idx + notices.length) % notices.length;
    const item = notices[currentNoticeIndex];
    noticeTextEl.innerHTML = `${item.text} <a href="#readmore" class="notice-read-more">${item.link}</a>`;
    noticeDots.forEach((d, i) => {
      d.classList.toggle('active', i === currentNoticeIndex);
    });
  }

  if (noticePrev) noticePrev.addEventListener('click', () => updateNotice(currentNoticeIndex - 1));
  if (noticeNext) noticeNext.addEventListener('click', () => updateNotice(currentNoticeIndex + 1));
  noticeDots.forEach((dot) => {
    dot.addEventListener('click', () => {
      const idx = parseInt(dot.getAttribute('data-index'), 10);
      updateNotice(idx);
    });
  });

  // ==========================================================================
  // 8. RECOMMENDED ADD-ONS DRAGGABLE & SCROLLABLE HORIZONTAL BAR
  // ==========================================================================
  const addonsTrack = document.getElementById('addonsTrack');
  const addonScrollTrack = document.getElementById('addonScrollTrack');
  const addonScrollThumb = document.getElementById('addonScrollThumb');
  const addonScrollLeft = document.getElementById('addonScrollLeft');
  const addonScrollRight = document.getElementById('addonScrollRight');

  if (addonsTrack && addonScrollTrack && addonScrollThumb) {
    function syncThumbFromScroll() {
      const maxScroll = addonsTrack.scrollWidth - addonsTrack.clientWidth;
      if (maxScroll <= 0) {
        addonScrollThumb.style.left = '0%';
        return;
      }
      const scrollRatio = addonsTrack.scrollLeft / maxScroll;
      const thumbWidthPercent = 48;
      const maxLeftPercent = 100 - thumbWidthPercent;
      addonScrollThumb.style.left = `${scrollRatio * maxLeftPercent}%`;
    }

    addonsTrack.addEventListener('scroll', syncThumbFromScroll);
    window.addEventListener('resize', syncThumbFromScroll);
    syncThumbFromScroll();

    addonScrollLeft.addEventListener('click', () => {
      const cardWidth = addonsTrack.clientWidth / 3;
      addonsTrack.scrollBy({ left: -cardWidth, behavior: 'smooth' });
    });

    addonScrollRight.addEventListener('click', () => {
      const cardWidth = addonsTrack.clientWidth / 3;
      addonsTrack.scrollBy({ left: cardWidth, behavior: 'smooth' });
    });

    addonScrollTrack.addEventListener('click', (e) => {
      if (e.target === addonScrollThumb) return;
      const zoom = parseFloat(getComputedStyle(document.body).zoom) || 1;
      const rect = addonScrollTrack.getBoundingClientRect();
      const clickX = (e.clientX / zoom) - rect.left;
      const clickRatio = Math.max(0, Math.min(1, clickX / addonScrollTrack.offsetWidth));
      const maxScroll = addonsTrack.scrollWidth - addonsTrack.clientWidth;
      addonsTrack.scrollTo({ left: clickRatio * maxScroll, behavior: 'smooth' });
    });

    let isDraggingThumb = false;
    let dragStartX = 0;
    let startScrollLeft = 0;

    addonScrollThumb.addEventListener('mousedown', (e) => {
      e.preventDefault();
      e.stopPropagation();
      isDraggingThumb = true;
      dragStartX = e.clientX;
      startScrollLeft = addonsTrack.scrollLeft;
      addonScrollThumb.classList.add('dragging');
      addonsTrack.style.scrollBehavior = 'auto';
    });

    document.addEventListener('mousemove', (e) => {
      if (!isDraggingThumb) return;
      const zoom = parseFloat(getComputedStyle(document.body).zoom) || 1;
      const availableTrackDrag = addonScrollTrack.offsetWidth - addonScrollThumb.offsetWidth;
      if (availableTrackDrag <= 0) return;

      const deltaX = (e.clientX - dragStartX) / zoom;
      const maxScroll = addonsTrack.scrollWidth - addonsTrack.clientWidth;
      const scrollDelta = (deltaX / availableTrackDrag) * maxScroll;
      addonsTrack.scrollLeft = startScrollLeft + scrollDelta;
    });

    document.addEventListener('mouseup', () => {
      if (isDraggingThumb) {
        isDraggingThumb = false;
        addonScrollThumb.classList.remove('dragging');
        addonsTrack.style.scrollBehavior = 'smooth';
      }
    });
  }

  // ==========================================================================
  // 9. CANDIDATE LOGIN & APPLY NOW MODALS WITH DATABASE SYNC
  // ==========================================================================
  const loginModal = document.getElementById('loginModal');
  const loginBtn = document.getElementById('loginBtn');
  const closeLoginModal = document.getElementById('closeLoginModal');
  const cancelLoginModal = document.getElementById('cancelLoginModal');
  const candidateLoginForm = document.getElementById('candidateLoginForm');
  const loginAlertBox = document.getElementById('loginAlertBox');
  const btnSubmitLogin = document.getElementById('btnSubmitLogin');

  const applyNowModal = document.getElementById('applyNowModal');
  const applyNowBtn = document.getElementById('applyNowBtn');
  const closeApplyModal = document.getElementById('closeApplyModal');
  const cancelApplyModal = document.getElementById('cancelApplyModal');
  const applyJobForm = document.getElementById('applyJobForm');
  const switchApplyModal = document.getElementById('switchApplyModal');

  function openModal(modal) {
    if (!modal) return;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
  }

  function closeModal(modal) {
    if (!modal) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
  }

  // Login trigger
  if (loginBtn) {
    loginBtn.addEventListener('click', (e) => {
      e.preventDefault();
      closeModal(applyNowModal);
      openModal(loginModal);
    });
  }

  if (closeLoginModal) closeLoginModal.addEventListener('click', () => closeModal(loginModal));
  if (cancelLoginModal) cancelLoginModal.addEventListener('click', () => closeModal(loginModal));
  if (loginModal) {
    loginModal.addEventListener('click', (e) => {
      if (e.target === loginModal) closeModal(loginModal);
    });
  }

  if (switchApplyModal) {
    switchApplyModal.addEventListener('click', (e) => {
      e.preventDefault();
      closeModal(loginModal);
      openModal(applyNowModal);
    });
  }

  // Handle Candidate Login Form Submit
  if (candidateLoginForm) {
    candidateLoginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('loginEmailInput').value.trim();
      const password = document.getElementById('loginPasswordInput').value.trim();

      if (!email || !password) return;

      btnSubmitLogin.disabled = true;
      btnSubmitLogin.textContent = 'Verifying credentials...';
      if (loginAlertBox) loginAlertBox.style.display = 'none';

      try {
        const res = await fetch('api/login.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });
        const data = await res.json();

        if (data.status === 'success') {
          if (loginAlertBox) {
            loginAlertBox.style.background = '#d4edda';
            loginAlertBox.style.color = '#155724';
            loginAlertBox.textContent = '✓ Login Successful! Redirecting to Dashboard...';
            loginAlertBox.style.display = 'block';
          }
          showToast(`Welcome back, ${data.data.name || 'Candidate'}!`);
          setTimeout(() => {
            window.location.href = data.data.redirect || 'dashboard.php';
          }, 900);
        } else {
          if (loginAlertBox) {
            loginAlertBox.style.background = '#f8d7da';
            loginAlertBox.style.color = '#721c24';
            loginAlertBox.textContent = '✗ ' + (data.message || 'Invalid Login ID or Password');
            loginAlertBox.style.display = 'block';
          }
        }
      } catch (err) {
        // Fallback for static servers
        window.location.href = 'dashboard.php';
      } finally {
        btnSubmitLogin.disabled = false;
        btnSubmitLogin.textContent = 'Login to Dashboard →';
      }
    });
  }

  // Apply Now triggers
  if (applyNowBtn) {
    applyNowBtn.addEventListener('click', (e) => {
      e.preventDefault();
      closeModal(loginModal);
      openModal(applyNowModal);
    });
  }

  const ctaApplyNowBtn = document.getElementById('ctaApplyNowBtn');
  if (ctaApplyNowBtn) {
    ctaApplyNowBtn.addEventListener('click', (e) => {
      e.preventDefault();
      closeModal(loginModal);
      openModal(applyNowModal);
    });
  }

  document.querySelectorAll('.open-apply-link').forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      closeModal(loginModal);
      openModal(applyNowModal);
    });
  });

  if (closeApplyModal) closeApplyModal.addEventListener('click', () => closeModal(applyNowModal));
  if (cancelApplyModal) cancelApplyModal.addEventListener('click', () => closeModal(applyNowModal));

  if (applyNowModal) {
    applyNowModal.addEventListener('click', (e) => {
      if (e.target === applyNowModal) closeModal(applyNowModal);
    });
  }

  // Handle Apply Now Form Submit with Database & Credentials Generator
  if (applyJobForm) {
    applyJobForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const userName = document.getElementById('applyUserName').value.trim();
      const contact = document.getElementById('applyContact').value.trim();
      const dob = document.getElementById('applyDob').value;
      const jobAppliedFor = document.getElementById('applyJobRole').value;
      const location = document.getElementById('applyLocation').value.trim();
      const email = document.getElementById('applyEmail').value.trim();

      const submitBtn = applyJobForm.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Submitting Application & Generating Credentials...';
      }

      try {
        const payload = { userName, contact, dob, jobAppliedFor, location, email };
        const res = await fetch('api/apply.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const data = await res.json();

        if (data.status === 'success') {
          closeModal(applyNowModal);
          applyJobForm.reset();
          
          alert(
            `🎉 Application Submitted Successfully!\n\n` +
            `Your Candidate Reference: ${data.data.candidate_id}\n` +
            `Login ID: ${data.data.email}\n` +
            `Password: ${data.data.mobile}\n\n` +
            `A confirmation email has also been dispatched to your email.\n` +
            `Redirecting you to your Candidate Dashboard to upload your photo and view your 3D ID Card!`
          );

          window.location.href = data.data.redirect || 'dashboard.php';
        } else {
          alert('Submission note: ' + (data.message || 'Please check your information.'));
        }
      } catch (err) {
        // Fallback for static servers
        closeModal(applyNowModal);
        applyJobForm.reset();
        showToast(`Application submitted for ${userName}! Redirecting to dashboard...`);
        setTimeout(() => {
          window.location.href = 'dashboard.php';
        }, 1200);
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Submit Application';
        }
      }
    });
  }

  // ==========================================================================
  // 10. SELECTED STUDENTS PAGINATION & FILTER (SUCCESS STORY PAGE)
  // ==========================================================================
  const studentPageBtns = document.querySelectorAll('.student-pagination .page-btn[data-page]');
  const nextStudentPageBtn = document.getElementById('nextStudentPageBtn');
  let activeStudentPage = 1;

  if (studentPageBtns.length > 0) {
    studentPageBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        studentPageBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        activeStudentPage = parseInt(btn.getAttribute('data-page'), 10) || 1;
        showToast(`Showing Selected Students — Page ${activeStudentPage}`);
      });
    });
  }

  if (nextStudentPageBtn && studentPageBtns.length > 0) {
    nextStudentPageBtn.addEventListener('click', () => {
      const nextMap = { 1: 2, 2: 3, 3: 7, 7: 1 };
      const nextTarget = nextMap[activeStudentPage] || 1;
      const targetBtn = document.querySelector(`.student-pagination .page-btn[data-page="${nextTarget}"]`);
      if (targetBtn) targetBtn.click();
    });
  }

  const filterPills = document.querySelectorAll('.filter-pill');
  const studentSearchInput = document.getElementById('studentSearchInput');
  const studentCards = document.querySelectorAll('.student-card');

  if (studentCards.length > 0) {
    filterPills.forEach((pill) => {
      pill.addEventListener('click', () => {
        filterPills.forEach((p) => p.classList.remove('active'));
        pill.classList.add('active');
        const filterType = pill.getAttribute('data-filter');
        showToast(`Filtered by: ${pill.textContent.trim()}`);
        studentCards.forEach((card) => {
          if (filterType === 'all' || filterType === 'ground') {
            card.style.display = '';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });

    if (studentSearchInput) {
      studentSearchInput.addEventListener('input', () => {
        const query = studentSearchInput.value.toLowerCase().trim();
        studentCards.forEach((card) => {
          const text = card.textContent.toLowerCase();
          card.style.display = text.includes(query) ? '' : 'none';
        });
      });
    }
  }

  // Appointment Letter Preview Modal Handler
  const appointmentModal = document.getElementById('appointmentModal');
  const closeAppointmentModal = document.getElementById('closeAppointmentModal');
  const closeAppointmentBtn = document.getElementById('closeAppointmentBtn');
  const printAppointmentBtn = document.getElementById('printAppointmentBtn');

  const modalCandidateRef = document.getElementById('modalCandidateRef');
  const modalCandidateName = document.getElementById('modalCandidateName');
  const modalCandidateRole = document.getElementById('modalCandidateRole');
  const modalRoleDetail = document.getElementById('modalRoleDetail');
  const modalAirportDetail = document.getElementById('modalAirportDetail');
  const modalDateDetail = document.getElementById('modalDateDetail');

  document.querySelectorAll('.viewLetterBtn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const cand = btn.getAttribute('data-candidate') || 'Candidate';
      const role = btn.getAttribute('data-role') || 'Ground Staff';
      const airport = btn.getAttribute('data-airport') || 'Airport';
      const date = btn.getAttribute('data-date') || '03/11/2026';
      const ref = btn.getAttribute('data-ref') || 'SPJ-2026-GS01';

      if (modalCandidateRef) modalCandidateRef.textContent = ref;
      if (modalCandidateName) modalCandidateName.textContent = cand;
      if (modalCandidateRole) modalCandidateRole.textContent = role;
      if (modalRoleDetail) modalRoleDetail.textContent = `${role} (Passenger Handling & Ramp Ops)`;
      if (modalAirportDetail) modalAirportDetail.textContent = airport;
      if (modalDateDetail) modalDateDetail.textContent = date;

      openModal(appointmentModal);
    });
  });

  if (closeAppointmentModal) closeAppointmentModal.addEventListener('click', () => closeModal(appointmentModal));
  if (closeAppointmentBtn) closeAppointmentBtn.addEventListener('click', () => closeModal(appointmentModal));

  if (appointmentModal) {
    appointmentModal.addEventListener('click', (e) => {
      if (e.target === appointmentModal) closeModal(appointmentModal);
    });
  }

  if (printAppointmentBtn) {
    printAppointmentBtn.addEventListener('click', () => {
      showToast('Downloading Appointment Confirmation Notice PDF...');
      setTimeout(() => {
        showToast('Appointment Letter verified and downloaded successfully!');
      }, 1200);
    });
  }

  // ==========================================================================
  // 11. Interactive Buttons & Deal Cards
  // ==========================================================================
  const spinWheelBtn = document.getElementById('spinWheelBtn');
  if (spinWheelBtn) {
    spinWheelBtn.addEventListener('click', () => {
      showToast('Spin 2 Win: Congratulations! Use code SPIN500 for instant voucher rewards!');
    });
  }

  document.querySelectorAll('.deal-card').forEach((card) => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', () => {
      const codeEl = card.querySelector('.deal-code');
      const code = codeEl ? codeEl.textContent.trim() : 'DEAL';
      if (navigator.clipboard) {
        navigator.clipboard.writeText(code).catch(() => {});
      }
      showToast(`Coupon Code "${code}" copied to clipboard!`);
    });
  });

  document.querySelectorAll('.btn-orange').forEach((btn) => {
    btn.addEventListener('click', () => {
      showToast(`${btn.textContent.trim()} — Opening booking portal...`);
    });
  });

  // ==========================================================================
  // 12. DYNAMIC CMS SYNC (Phone, Mobile, Email, Address)
  // ==========================================================================
  async function syncCmsData() {
    try {
      const res = await fetch('api/get-cms-settings.php');
      const data = await res.json();
      if (data && data.status === 'success' && data.data) {
        const s = data.data;

        // Footer phone
        const footerPhoneLink = document.getElementById('footerPhoneLink');
        const footerPhoneText = document.getElementById('footerPhoneText');
        if (s.contact_phone) {
          if (footerPhoneLink) footerPhoneLink.href = `tel:${s.contact_phone.replace(/[^0-9+]/g, '')}`;
          if (footerPhoneText) footerPhoneText.textContent = s.contact_phone;
        }

        // Footer email
        const footerEmailLink = document.getElementById('footerEmailLink');
        const footerEmailText = document.getElementById('footerEmailText');
        if (s.contact_email) {
          if (footerEmailLink) footerEmailLink.href = `mailto:${s.contact_email}`;
          if (footerEmailText) footerEmailText.textContent = s.contact_email;
        }

        // Footer address
        const footerAddressText = document.getElementById('footerAddressText');
        if (s.contact_address && footerAddressText) {
          footerAddressText.textContent = `Registered Office: ${s.contact_address}`;
        }
      }
    } catch (err) {
      // Graceful fallback to default markup
    }
  }
  syncCmsData();

  // Dynamic Navigation Menu Sync from Admin CMS
  async function syncMenuData() {
    const mainNav = document.querySelector('.main-nav');
    if (!mainNav) return;

    try {
      const res = await fetch('api/get-menu.php');
      const data = await res.json();
      if (data && data.status === 'success' && Array.isArray(data.data) && data.data.length > 0) {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const dropdownMaps = {
          'Add-ons': [
            { title: 'SpiceMax', url: '#addons' },
            { title: 'SpiceCafé', url: '#addons' },
            { title: 'Excess Baggage', url: '#addons' },
            { title: 'Visa Services', url: '#here-for' }
          ],
          'SpiceClub': [
            { title: 'About SpiceClub', url: '#spiceclub' },
            { title: 'Join SpiceClub', url: '#spiceclub' },
            { title: 'Earn SC Points', url: '#spiceclub' }
          ],
          'Travel Policies': [
            { title: 'Passenger Guidelines', url: '#policies' },
            { title: 'Baggage Rules', url: '#policies' },
            { title: 'Terms of Carriage', url: '#policies' }
          ]
        };

        const fragment = document.createDocumentFragment();

        data.data.forEach((item) => {
          const div = document.createElement('div');
          const isDropdown = dropdownMaps[item.title];

          if (isDropdown) {
            div.className = 'nav-item has-dropdown';
            div.innerHTML = `
              <a href="${item.url}">${item.title} <span class="caret">▾</span></a>
              <div class="dropdown-menu">
                ${isDropdown.map(d => `<a href="${d.url}">${d.title}</a>`).join('')}
              </div>
            `;
          } else {
            div.className = 'nav-item';
            const isActive = (currentPage === item.url || (currentPage === '' && item.url === 'index.html'));
            div.innerHTML = `<a href="${item.url}" class="${isActive ? 'active-nav-link' : ''}">${item.title}</a>`;
          }
          fragment.appendChild(div);
        });

        mainNav.innerHTML = '';
        mainNav.appendChild(fragment);
      }
    } catch (e) {
      // Keep static HTML nav on any fetch error
    }
  }
  syncMenuData();
});
