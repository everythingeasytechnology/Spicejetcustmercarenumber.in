const form = document.querySelector('#contactForm');
const statusMessage = document.querySelector('#formStatus');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  const name = new FormData(form).get('name').trim();
  statusMessage.textContent = `Thank you, ${name}. Your enquiry has been received.`;
  form.reset();
});
