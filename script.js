async function convertToPDF() {

  const { jsPDF } = window.jspdf;

  const pdf = new jsPDF();

  const input = document.getElementById('imageInput');

  const files = input.files;

  if(files.length === 0){
    alert("Select images first");
    return;
  }

  for(let i=0; i<files.length; i++){

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

          pdf.addImage(img, 'JPEG', 10, 10, 180, 250);

          resolve();
        }
      }
    });
  }

  pdf.save("KJSynthora.pdf");
}
function searchTools(){

let input=document.getElementById("toolSearch").value.toLowerCase();

let cards=document.querySelectorAll(".tool-card");

cards.forEach(card=>{

let text=card.innerText.toLowerCase();

if(text.includes(input)){

card.style.display="block";

}else{

card.style.display="none";

}

});

}
