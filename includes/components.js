(function () {
  const path = window.location.pathname;
  const isHome = path.endsWith('/') || path.endsWith('/index.html');
  const isSuccess = path.endsWith('/success-story.html');
  const isContact = path.endsWith('/contact-us.html');
  const home = isHome ? '' : './index.html';
  const active = (condition) => condition ? ' class="current-page"' : '';

  const header = `
    <header class="top-navbar">
      <div class="navbar-inner">
        <a href="./index.html" class="brand-logo" aria-label="SpiceJet Home"><img src="./assets/brand-logo.png" alt="SpiceJet" class="brand-logo-img"></a>
        <nav class="main-nav" aria-label="Main navigation">
          <div class="nav-item has-dropdown"><a href="${home}#addons">Add-ons <span class="caret">▾</span></a><div class="dropdown-menu"><a href="${home}#addons">SpiceMax</a><a href="${home}#addons">SpiceCafé</a><a href="${home}#addons">Excess Baggage</a><a href="${home}#here-for">Visa Services</a></div></div>
          <div class="nav-item"><a href="${home}#deals">Deals</a></div>
          <div class="nav-item"><a href="${home}#spin">GiftCard</a></div>
          <div class="nav-item has-dropdown"><a href="${home}#spiceclub">SpiceClub <span class="caret">▾</span></a><div class="dropdown-menu"><a href="${home}#spiceclub">About SpiceClub</a><a href="${home}#spiceclub">Join SpiceClub</a><a href="${home}#spiceclub">Earn SC Points</a></div></div>
          <div class="nav-item"><a href="${home}#addons">SpiceScreen</a></div>
          <div class="nav-item"><a href="${home}#cargo-charter">Cargo</a></div>
          <div class="nav-item"><a href="${home}#cargo-charter">Charter</a></div>
          <div class="nav-item has-dropdown"><a href="${home}#policies">Travel Policies <span class="caret">▾</span></a><div class="dropdown-menu"><a href="${home}#policies">Passenger Guidelines</a><a href="${home}#policies">Baggage Rules</a><a href="${home}#policies">Terms of Carriage</a></div></div>
          <div class="nav-item"><a href="./success-story.html"${active(isSuccess)}>Success Story</a></div>
          <div class="nav-item"><a href="./contact-us.html"${active(isContact)}>Contact Us</a></div>
        </nav>
        <div class="auth-links"><a href="${home}#apply-now" class="apply-now-trigger" id="applyNowBtn">Apply Now</a></div>
      </div>
    </header>`;

  const footerLink = (hash, label) => `<a href="${home}${hash}">${label}</a>`;
  const footer = `
    <footer class="site-footer">
      <div class="footer-top-container">
        <div class="footer-columns">
          <div class="footer-col"><h4 class="footer-col-title">About Us</h4><ul class="footer-links"><li>${footerLink('#spice-route','Spice Route Magazine')}</li><li>${footerLink('#corporate-overview','Corporate Overview')}</li><li>${footerLink('#fleet','Fleet')}</li><li>${footerLink('#careers','Careers')}</li><li>${footerLink('#media-center','Media Center')}</li><li>${footerLink('#awards','Awards and Applaud')}</li></ul></div>
          <div class="footer-col"><h4 class="footer-col-title">Contact Us</h4><ul class="footer-links"><li>${footerLink('#airports','Airports')}</li><li>${footerLink('#international-offices','International Offices')}</li><li>${footerLink('#head-office','Corporate Head Office')}</li><li>${footerLink('#advertise','Advertise with Us')}</li><li>${footerLink('#rfp','RFP')}</li></ul></div>
          <div class="footer-col"><h4 class="footer-col-title">Travel Info</h4><ul class="footer-links"><li>${footerLink('#citizens-charter',"Citizen's Charter")}</li><li>${footerLink('#faq','FAQ')}</li><li>${footerLink('#fitness-to-fly','Fitness To Fly Guideline')}</li><li>${footerLink('#flight-schedules','Flight Schedules')}</li><li>${footerLink('#terms-of-carriage','Terms of Carriage')}</li><li>${footerLink('#fees-and-charges','Fees and Charges')}</li><li>${footerLink('#know-your-rights','Know Your Rights')}</li><li>${footerLink('#book-test','Book Any Test From Any Lab')}</li><li>${footerLink('#book-test-delhi','Book Any Test From Any Lab in Delhi')}</li></ul></div>
          <div class="footer-col"><h4 class="footer-col-title">Investors</h4><ul class="footer-links"><li>${footerLink('#corporate-governance','Corporate Governance')}</li><li>${footerLink('#financial-info','Financial Information')}</li><li>${footerLink('#notices','Notices')}</li><li>${footerLink('#corporate-announcements','Corporate Announcements')}</li><li>${footerLink('#shareholding-pattern','Shareholding Pattern')}</li><li>${footerLink('#investor-services','Investor Services')}</li><li>${footerLink('#disclosure-46','Disclosure Regulation 46')}</li></ul></div>
          <div class="footer-col footer-support-col"><h4 class="footer-col-title support-title">For Reservations or Customer Support:</h4><div class="footer-contact-row"><span class="contact-icon">☎</span><a href="tel:+917044927792" id="footerPhoneLink"><span id="footerPhoneText">+91 70444 87792</span></a></div><div class="footer-contact-row"><span class="contact-icon">✉</span><a href="mailto:support@spicejets.in" id="footerEmailLink"><span id="footerEmailText">support@spicejets.in</span></a></div><div class="footer-follow-row"><span class="follow-label">Follow us</span><a href="${home}#social" class="social-strip-link"><img src="./assets/footer-social.png" alt="Social media" class="footer-social-img"></a></div><div class="footer-app-block"><h4 class="footer-col-title app-title">Download our mobile app</h4><a href="${home}#download-app"><img src="./assets/footer-apps.png" alt="Download our app" class="footer-apps-img"></a></div></div>
        </div>
        <p class="footer-ip-note"><strong>Note:</strong> We log the IP addresses of the visitors on our website for security reasons.</p>
      </div>
      <div class="footer-divider"></div>
      <div class="footer-bottom-container"><div class="footer-bottom-row"><div class="footer-payments"><img src="./assets/footer-payments.png" alt="Accepted payment methods" class="footer-payments-img"></div><nav class="footer-policy-nav" aria-label="Footer Policies"><a href="./index.html">Home</a><span class="policy-dot">•</span><a href="./contact-us.html">Contact Us</a><span class="policy-dot">•</span>${footerLink('#privacy','Privacy Policy')}<span class="policy-dot">•</span>${footerLink('#disclaimer','Disclaimer')}<span class="policy-dot">•</span>${footerLink('#gst-info','GST Information')}<span class="policy-dot">•</span>${footerLink('#sitemap','Sitemap')}</nav></div><div class="footer-copyright"><p>© Copyright Spicejet India. All Rights Reserved</p><p id="footerAddressText">Registered Office: Level 1, Tower C, Global Business Park Mehrauli - Gurgaon Road, Gurugram, Haryana</p></div></div>
    </footer>`;

  const headerRoot = document.querySelector('[data-shared-header]');
  const footerRoot = document.querySelector('[data-shared-footer]');
  if (headerRoot) headerRoot.outerHTML = header;
  if (footerRoot) footerRoot.outerHTML = footer;

  let applyModal = document.getElementById('applyNowModal');
  const modalCreatedHere = !applyModal;
  if (modalCreatedHere) {
    document.body.insertAdjacentHTML('beforeend', `
      <div class="modal-overlay" id="applyNowModal" aria-hidden="true">
        <div class="modal-card" role="dialog" aria-modal="true" aria-labelledby="applyModalTitle">
          <div class="modal-header"><div><h3 id="applyModalTitle">Apply Now — Aviation Careers</h3><p>Fill in your details below to apply for aviation positions</p></div><button type="button" class="modal-close-btn" id="closeApplyModal" aria-label="Close">×</button></div>
          <form class="apply-form" id="applyJobForm">
            <div class="form-group"><label for="applyUserName">User Name <span>*</span></label><input type="text" id="applyUserName" name="userName" placeholder="Enter your full name" required></div>
            <div class="form-row-2"><div class="form-group"><label for="applyContact">Contact <span>*</span></label><input type="tel" id="applyContact" name="contact" placeholder="9876543210" pattern="[0-9]{10}" required></div><div class="form-group"><label for="applyDob">DOB <span>*</span></label><input type="date" id="applyDob" name="dob" required></div></div>
            <div class="form-row-2"><div class="form-group"><label for="applyJobRole">Job Applied For <span>*</span></label><select id="applyJobRole" name="jobAppliedFor" required><option value="" disabled selected>Select job role</option><option>Cabin Crew</option><option>Ground Staff / CSA</option><option>Airport Ticketing Executive</option><option>Cargo Operations Executive</option><option>Customer Support Specialist</option><option>Aircraft Maintenance Engineer</option><option>Pilot / First Officer</option></select></div><div class="form-group"><label for="applyLocation">Location <span>*</span></label><input type="text" id="applyLocation" name="location" placeholder="City / Airport Location" required></div></div>
            <div class="form-group"><label for="applyEmail">Email <span>*</span></label><input type="email" id="applyEmail" name="email" placeholder="yourname@example.com" required></div>
            <div class="modal-footer-actions"><button type="button" class="btn-cancel-modal" id="cancelApplyModal">Cancel</button><button type="submit" class="btn-submit-apply">Submit Application</button></div>
          </form>
        </div>
      </div>`);
    applyModal = document.getElementById('applyNowModal');
  }

  if (modalCreatedHere) {
    const applyButton = document.getElementById('applyNowBtn');
    const closeButton = document.getElementById('closeApplyModal');
    const cancelButton = document.getElementById('cancelApplyModal');
    const form = document.getElementById('applyJobForm');
    const openApplyModal = () => { applyModal.classList.add('open'); applyModal.setAttribute('aria-hidden', 'false'); document.body.style.overflow = 'hidden'; setTimeout(() => document.getElementById('applyUserName')?.focus(), 50); };
    const closeApplyModal = () => { applyModal.classList.remove('open'); applyModal.setAttribute('aria-hidden', 'true'); document.body.style.overflow = ''; };
    applyButton?.addEventListener('click', (event) => { event.preventDefault(); openApplyModal(); });
    closeButton?.addEventListener('click', closeApplyModal);
    cancelButton?.addEventListener('click', closeApplyModal);
    applyModal.addEventListener('click', (event) => { if (event.target === applyModal) closeApplyModal(); });
    document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && applyModal.classList.contains('open')) closeApplyModal(); });
    form?.addEventListener('submit', async (event) => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const submit = form.querySelector('[type="submit"]');
      submit.disabled = true;
      submit.textContent = 'Submitting...';
      try {
        const data = Object.fromEntries(new FormData(form).entries());
        const response = await fetch('./api/apply.php', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
        const result = await response.json();
        if (!response.ok || result.status !== 'success') throw new Error(result.message || 'Submission failed.');
        alert('Application submitted successfully. Our recruitment team will contact you shortly.');
        form.reset();
        closeApplyModal();
      } catch (error) { alert(error.message || 'Unable to submit application.'); }
      finally { submit.disabled = false; submit.textContent = 'Submit Application'; }
    });
  }

  fetch('./api/get-settings.php').then((response) => response.json()).then((result) => {
    if (result.status !== 'success' || !result.data) return;
    const settings = result.data;
    const phoneLink = document.getElementById('footerPhoneLink');
    const phoneText = document.getElementById('footerPhoneText');
    const emailLink = document.getElementById('footerEmailLink');
    const emailText = document.getElementById('footerEmailText');
    const addressText = document.getElementById('footerAddressText');
    if (phoneLink) phoneLink.href = `tel:${settings.phone.replace(/[^0-9+]/g, '')}`;
    if (phoneText) phoneText.textContent = settings.phone;
    if (emailLink) emailLink.href = `mailto:${settings.email}`;
    if (emailText) emailText.textContent = settings.email;
    if (addressText) addressText.textContent = `Registered Office: ${settings.address}`;
    document.querySelectorAll('[data-setting="phone"]').forEach((el) => { el.textContent = settings.phone; if (el.tagName === 'A') el.href = `tel:${settings.phone.replace(/[^0-9+]/g, '')}`; });
    document.querySelectorAll('[data-setting="email"]').forEach((el) => { el.textContent = settings.email; if (el.tagName === 'A') el.href = `mailto:${settings.email}`; });
    document.querySelectorAll('[data-setting="address"]').forEach((el) => { el.textContent = settings.address; });
  }).catch(() => {});
})();
