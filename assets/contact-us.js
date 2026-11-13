const form = document.querySelector('#contactForm');
const statusMessage = document.querySelector('#formStatus');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());
  statusMessage.textContent = 'Submitting...';
  try {
    const response = await fetch('./api/contact.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    const result = await response.json();
    if (!response.ok || result.status !== 'success') throw new Error(result.message || 'Submission failed.');
    statusMessage.textContent = `Thank you, ${data.name}. Your enquiry has been received.`;
    form.reset();
  } catch (error) {
    statusMessage.textContent = error.message || 'Unable to submit. Please try again.';
  }
});
