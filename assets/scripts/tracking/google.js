// Email link
document.getElementById('contact-email')?.addEventListener('click', () => {
  gtag('event', 'email_click', {
    event_category: 'contact',
    event_label: 'Email link – info@abacoaggregate.net (Contact Page)'
  });
});

// Phone link
document.getElementById('contact-phone')?.addEventListener('click', () => {
  gtag('event', 'phone_click', {
    event_category: 'contact',
    event_label: 'Phone link – +1 (242) 605-4060 (Contact Page)'
  });
});

// Contact form
document.getElementById('contact-form')?.addEventListener('submit', () => {
  gtag('event', 'form_submit', {
    event_category: 'contact',
    event_label: 'Contact form submit – Abaco Aggregate website'
  });
});
