// ========================= PDF IMAGE TO PDF =========================

async function convertToPDF() {

  const { jsPDF } = window.jspdf;

  const pdf = new jsPDF();

  const input = document.getElementById('imageInput');

  const files = input.files;

  if(files.length === 0){
    alert("Select images first");
    return;
  }

  // Loading message
  const loading = document.getElementById("loading");

  if(loading){
    loading.style.display = "block";
  }

  for(let i = 0; i < files.length; i++){

    const file = files[i];

    const reader = new FileReader();

    reader.readAsDataURL(file);

    await new Promise(resolve => {

      reader.onload = function(e){

        const img = new Image();

        img.src = e.target.result;

        img.onload = function(){

          if(i > 0){
            pdf.addPage();
          }

          // Auto image sizing
          const imgWidth = 190;

          const pageHeight = 295;

          const imgHeight =
          (img.height * imgWidth) / img.width;

          let finalHeight = imgHeight;

          if(finalHeight > pageHeight){
            finalHeight = pageHeight;
          }

          pdf.addImage(
            img,
            'JPEG',
            10,
            10,
            imgWidth,
            finalHeight
          );

          resolve();
        }
      }
    });
  }

  pdf.save("KJSynthora.pdf");

  // Hide loading
  if(loading){
    loading.style.display = "none";
  }
}



// ========================= TOOL SEARCH =========================

function searchTools(){

let input =
document.getElementById("toolSearch")
.value
.toLowerCase();

let cards =
document.querySelectorAll(".tool-card");

let visibleCount = 0;

cards.forEach(card=>{

let text =
card.innerText.toLowerCase();

if(text.includes(input)){

card.style.display = "";

visibleCount++;

}
else{

card.style.display = "none";

}

});

const noResults =
document.getElementById("noResults");

if(visibleCount === 0){

noResults.style.display = "block";

}
else{

noResults.style.display = "none";

}

}



// ========================= AUTO CLOCK WITH FLAG =========================

async function updateClock() {

  try {

    const response =
    await fetch("https://ipapi.co/json/");

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

    const time =
    now.toLocaleString('en-US', options);

    // Country Flag
    const flag = countryCode
    .toUpperCase()
    .replace(/./g, char =>
      String.fromCodePoint(
        127397 + char.charCodeAt()
      )
    );

    const clock =
    document.getElementById("clock");

    if(clock){

      clock.innerHTML = `
      ${flag} ${country}<br>
      ${time}
      `;

    }

  }

  catch(error){

    const clock =
    document.getElementById("clock");

    if(clock){

      clock.innerHTML =
      "Unable to load time";

    }

  }

}

// Update every second
setInterval(updateClock, 1000);

updateClock();

window.onload = function(){

const totalTools =
document.querySelectorAll(".tool-card").length;

document.getElementById("toolCount")
.innerText = totalTools;

};

