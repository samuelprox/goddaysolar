/**
 * Godday Solar Company - Master Interactive Script
 * Direct Hotline: 08106545901
 * WhatsApp: 08106545901
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initProductFilter();
  initProductQuickInquire();
  initOrderForm();
  initCalculator();
  initFaqAccordion();
});

/* ==========================================================================
   Navigation & Mobile Menu
   ========================================================================== */
function initNavigation() {
  const menuToggle = document.getElementById('menuToggle');
  const mobileNav = document.getElementById('mobileNav');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');
  const header = document.getElementById('header');

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('open');
      mobileNav.classList.toggle('active');
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('open');
        mobileNav.classList.remove('active');
      });
    });
  }

  // Header scroll shadow effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

/* ==========================================================================
   Product Filter Bar
   ========================================================================== */
function initProductFilter() {
  const filterBtns = document.querySelectorAll('.prod-tab-btn');
  const productCards = document.querySelectorAll('.product-store-card');

  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const targetCategory = btn.getAttribute('data-category');

      productCards.forEach(card => {
        const itemCategory = card.getAttribute('data-category');
        if (targetCategory === 'all' || itemCategory === targetCategory) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 20);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

/* ==========================================================================
   Product Quick Inquire Button Handler
   ========================================================================== */
function initProductQuickInquire() {
  const inquireButtons = document.querySelectorAll('.btn-product-inquire');

  inquireButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const productName = btn.getAttribute('data-product-name') || 'Solar/Auto Equipment';
      const notesField = document.getElementById('notes');
      const quantityField = document.getElementById('quantity');
      const orderFormSection = document.getElementById('order-form');

      // Pre-fill fields
      if (quantityField) {
        quantityField.value = `1x ${productName}`;
      }
      if (notesField) {
        notesField.value = `I am interested in ordering: ${productName}. Please call or WhatsApp me at your earliest convenience with price and delivery time.`;
      }

      // Check corresponding product checkbox if found
      const checkboxes = document.querySelectorAll('input[name="interest"]');
      checkboxes.forEach(cb => {
        if (productName.toLowerCase().includes(cb.value.toLowerCase())) {
          cb.checked = true;
        }
      });

      // Smooth scroll to form
      if (orderFormSection) {
        orderFormSection.scrollIntoView({ behavior: 'smooth' });
        const formCard = document.querySelector('.order-form-card');
        if (formCard) {
          formCard.style.boxShadow = '0 0 35px rgba(245, 158, 11, 0.7)';
          setTimeout(() => {
            formCard.style.boxShadow = '';
          }, 2000);
        }
      }
    });
  });
}

/* ==========================================================================
   Customer Details & Order Form Handler
   ========================================================================== */
function initOrderForm() {
  const form = document.getElementById('solarQuoteForm');
  const statusBox = document.getElementById('formStatus');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const fullName = document.getElementById('fullName').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const whatsappNumber = document.getElementById('whatsappNumber')?.value.trim() || phone;
    const email = document.getElementById('email').value.trim();
    const address = document.getElementById('propertyAddress').value.trim();
    const quantity = document.getElementById('quantity')?.value.trim() || 'Not specified';
    const delivery = document.getElementById('deliveryPreference')?.value || 'Standard';
    const notes = document.getElementById('notes')?.value.trim() || 'None';

    // Get selected items
    const checkedInterests = Array.from(document.querySelectorAll('input[name="interest"]:checked'))
      .map(cb => cb.value);

    if (!fullName || !phone || !email || !address) {
      statusBox.className = 'form-status error';
      statusBox.innerHTML = '⚠️ Please complete all required fields (Full Name, Phone Number, Email, Delivery Address).';
      return;
    }

    if (checkedInterests.length === 0) {
      statusBox.className = 'form-status error';
      statusBox.innerHTML = '⚠️ Please select at least one product you are interested in purchasing.';
      return;
    }

    // Build WhatsApp message text
    const waText = encodeURIComponent(
      `*NEW ORDER / INQUIRY - GODDAY SOLAR COMPANY*\n` +
      `👤 *Customer Name:* ${fullName}\n` +
      `📞 *Phone Number:* ${phone}\n` +
      `💬 *WhatsApp:* ${whatsappNumber}\n` +
      `📍 *Delivery Address:* ${address}\n` +
      `📦 *Items Selected:* ${checkedInterests.join(', ')}\n` +
      `🔢 *Quantity / Specs:* ${quantity}\n` +
      `🚚 *Delivery Mode:* ${delivery}\n` +
      `📝 *Notes:* ${notes}`
    );

    const waLink = `https://wa.me/2348106545901?text=${waText}`;

    // Display rich confirmation box
    statusBox.className = 'form-status success';
    statusBox.innerHTML = `
      <div style="font-size: 1.15rem; font-weight: 800; margin-bottom: 0.5rem; color: #065f46;">
        🎉 Details Received Successfully, ${fullName}!
      </div>
      <p style="margin-bottom: 0.85rem; color: #047857; line-height: 1.5;">
        Your order request for <strong>${checkedInterests.join(', ')}</strong> has been recorded. Our team will call you shortly on <strong>${phone}</strong>.
      </p>
      <div style="margin-top: 1rem; display: flex; flex-wrap: wrap; gap: 0.75rem;">
        <a href="${waLink}" target="_blank" rel="noopener" class="btn btn-whatsapp btn-sm" style="font-weight: 700;">
          💬 Send Directly via WhatsApp to 08106545901
        </a>
        <a href="tel:08106545901" class="btn btn-primary btn-sm">
          📞 Call 08106545901 Now
        </a>
      </div>
    `;

    // Persist in localStorage
    try {
      const orders = JSON.parse(localStorage.getItem('godday_solar_orders') || '[]');
      orders.push({
        fullName,
        phone,
        whatsappNumber,
        email,
        address,
        checkedInterests,
        quantity,
        delivery,
        notes,
        date: new Date().toLocaleString()
      });
      localStorage.setItem('godday_solar_orders', JSON.stringify(orders));
    } catch (err) {
      console.log('Storage notice:', err);
    }

    form.reset();
  });
}

/* ==========================================================================
   Savings Calculator
   ========================================================================== */
function initCalculator() {
  const billSlider = document.getElementById('billSlider');
  const billValueDisplay = document.getElementById('billValueDisplay');
  const twentyFiveYearSavings = document.getElementById('twentyFiveYearSavings');
  const firstYearSavings = document.getElementById('firstYearSavings');
  const systemSize = document.getElementById('systemSize');
  const paybackPeriod = document.getElementById('paybackPeriod');
  const co2Offset = document.getElementById('co2Offset');
  const batteryToggle = document.getElementById('batteryToggle');
  const propButtons = document.querySelectorAll('.prop-btn');

  if (!billSlider) return;

  let currentMultiplier = 1.0;

  propButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      propButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const type = btn.getAttribute('data-type');
      if (type === 'residential') currentMultiplier = 1.0;
      if (type === 'commercial') currentMultiplier = 1.3;
      if (type === 'industrial') currentMultiplier = 1.5;
      calculate();
    });
  });

  if (batteryToggle) {
    batteryToggle.addEventListener('change', calculate);
  }

  billSlider.addEventListener('input', calculate);

  function calculate() {
    const monthlyBill = parseFloat(billSlider.value);
    billValueDisplay.textContent = `$${monthlyBill} / month`;

    const annualBill = monthlyBill * 12;
    const annualSavings = Math.round(annualBill * 0.85 * currentMultiplier);

    let total25Year = 0;
    let inflatedSavings = annualSavings;
    for (let yr = 1; yr <= 25; yr++) {
      total25Year += inflatedSavings;
      inflatedSavings *= 1.035;
    }

    const kw = (monthlyBill / 28.5 * currentMultiplier).toFixed(1);
    const payback = (batteryToggle && batteryToggle.checked) 
      ? (4.6 / currentMultiplier).toFixed(1) 
      : (3.8 / currentMultiplier).toFixed(1);
    const trees = Math.round(kw * 17);

    twentyFiveYearSavings.textContent = `$${Math.round(total25Year).toLocaleString()}`;
    firstYearSavings.textContent = `$${annualSavings.toLocaleString()}`;
    systemSize.textContent = `${kw} kW Array`;
    paybackPeriod.textContent = `${payback} Years`;
    co2Offset.textContent = `${trees} Trees / yr`;
  }

  calculate();
}

/* ==========================================================================
   FAQ Accordion
   ========================================================================== */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      faqItems.forEach(otherItem => otherItem.classList.remove('active'));
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}
