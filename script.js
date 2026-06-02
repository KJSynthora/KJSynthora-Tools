// ========================= PDF IMAGE TO PDF =========================

async function convertToPDF() {

  const { jsPDF } = window.jspdf;

  const pdf = new jsPDF();

  const input = document.getElementById('imageInput');

  const files = input.files;

  if (files.length === 0) {
    alert("Select images first");
    return;
  }

  const loading = document.getElementById("loading");
  if (loading) loading.style.display = "block";

  for (let i = 0; i < files.length; i++) {

    const file = files[i];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    await new Promise(resolve => {

      reader.onload = function (e) {

        const img = new Image();
        img.src = e.target.result;

        img.onload = function () {

          if (i > 0) pdf.addPage();

          const imgWidth = 190;
          const pageHeight = 295;
          const imgHeight = (img.height * imgWidth) / img.width;
          const finalHeight = imgHeight > pageHeight ? pageHeight : imgHeight;

          pdf.addImage(img, 'JPEG', 10, 10, imgWidth, finalHeight);
          resolve();
        };
      };
    });
  }

  pdf.save("KJSynthora.pdf");

  if (loading) loading.style.display = "none";
}



// ========================= TOOL SEARCH (Toolbar) =========================

function searchTools() {

  const input = document.getElementById("toolSearch");
  if (!input) return; // ✅ null check

  const query = input.value.toLowerCase();
  const cards = document.querySelectorAll(".tool-card");
  let visibleCount = 0;

  cards.forEach(card => {
    const text = card.innerText.toLowerCase();
    if (text.includes(query)) {
      card.style.display = "";
      visibleCount++;
    } else {
      card.style.display = "none";
    }
  });

  const noResults = document.getElementById("noResults");
  if (noResults) {
    noResults.style.display = visibleCount === 0 ? "block" : "none";
  }
}



// ========================= AUTO CLOCK WITH FLAG =========================

async function updateClock() {

  try {

    const response = await fetch("https://ipapi.co/json/");
    const data = await response.json();

    const country = data.country_name;
    const countryCode = data.country_code;
    const timezone = data.timezone;

    const now = new Date();

    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true,
      timeZone: timezone
    };

    const time = now.toLocaleString('en-US', options);

    const flag = countryCode
      .toUpperCase()
      .replace(/./g, char =>
        String.fromCodePoint(127397 + char.charCodeAt())
      );

    const clock = document.getElementById("clock");
    if (clock) {
      clock.innerHTML = `${flag} ${country}<br>${time}`;
    }

  } catch (error) {

    const clock = document.getElementById("clock");
    if (clock) clock.innerHTML = "Unable to load time";

  }
}

setInterval(updateClock, 1000);
updateClock();



// ========================= TOOL COUNT =========================

setTimeout(() => {

  const totalTools = document.querySelectorAll('[class*="tool-card"]').length;
  const toolCount = document.getElementById("toolCount");

  if (toolCount) {
    toolCount.innerText = totalTools + "+";
  }

}, 1000);



// ========================= SEARCH INPUT (Main Page) =========================

// ✅ FIX: null check before adding event listener
const searchInput = document.getElementById("searchInput");

if (searchInput) {
  searchInput.addEventListener("keyup", function () {

    const value = this.value.toLowerCase();
    const cards = document.querySelectorAll(".tool-card");

    cards.forEach(card => {
      const text = card.innerText.toLowerCase();
      card.style.display = text.includes(value) ? "block" : "none";
    });
  });
}



// ========================= FILTER TOOLS =========================

function filterTools(category) {

  const cards = document.querySelectorAll(".tool-card");

  cards.forEach(card => {
    if (category === "all" || card.classList.contains(category)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });

  document.querySelectorAll(".side-btn").forEach(btn => {
    btn.classList.remove("active");
  });

  // ✅ FIX: use event parameter safely
  if (event && event.target) {
    event.target.classList.add("active");
  }
}
