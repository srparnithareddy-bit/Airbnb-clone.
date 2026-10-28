(() => {
    'use strict';

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation');

    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
        }, false);
    });
})();

// Tax Toggle Switch Logic
const taxSwitch = document.getElementById('flexSwitchCheckDefault');
if (taxSwitch) {
    taxSwitch.addEventListener('click', () => {
        const taxInfoElements = document.querySelectorAll('.tax-info');
        for (const info of taxInfoElements) {
            if (info.style.display !== 'inline') {
                info.style.display = 'inline';
            } else {
                info.style.display = 'none';
            }
        }
    });
}

// Booking Price Calculator in Show Page
const checkInInput = document.getElementById('bookingCheckIn');
const checkOutInput = document.getElementById('bookingCheckOut');
const bookingSummary = document.getElementById('bookingSummary');
const pricePerNightEl = document.getElementById('listingPricePerNight');

if (checkInInput && checkOutInput && pricePerNightEl) {
    const basePrice = Number(pricePerNightEl.dataset.price);

    // Set minimum check-in date to today
    const today = new Date().toISOString().split('T')[0];
    checkInInput.setAttribute('min', today);

    function updateBookingPrice() {
        const checkIn = new Date(checkInInput.value);
        const checkOut = new Date(checkOutInput.value);

        if (checkInInput.value) {
            checkOutInput.setAttribute('min', checkInInput.value);
        }

        if (checkInInput.value && checkOutInput.value && checkOut > checkIn) {
            const diffTime = Math.abs(checkOut - checkIn);
            const nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            
            const stayTotal = basePrice * nights;
            const taxes = Math.round(stayTotal * 0.18);
            const serviceFee = 40;
            const finalTotal = stayTotal + taxes + serviceFee;

            document.getElementById('summaryNights').innerText = `${basePrice.toLocaleString()} x ${nights} night${nights > 1 ? 's' : ''}`;
            document.getElementById('summaryBasePrice').innerText = `$${stayTotal.toLocaleString()}`;
            document.getElementById('summaryTaxes').innerText = `$${taxes.toLocaleString()}`;
            document.getElementById('summaryServiceFee').innerText = `$${serviceFee}`;
            document.getElementById('summaryTotalPrice').innerText = `$${finalTotal.toLocaleString()}`;
            bookingSummary.style.display = 'block';
        } else {
            if (bookingSummary) {
                bookingSummary.style.display = 'none';
            }
        }
    }

    checkInInput.addEventListener('change', updateBookingPrice);
    checkOutInput.addEventListener('change', updateBookingPrice);
}
