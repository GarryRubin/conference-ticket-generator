let formDetails ={
  name: "",
  email: "",
  gitHubName: ""
};
let ticketNumber = '';

let dateAndLocation = {
  date: '',
  location: ''
}

let fileInput = document.querySelector('.file-input');
// let fileInputBox = fileInput.closest('.file-input-box');
// The closest() method in JavaScript is used to find the nearest ancestor (including itself) that matches a given CSS selector. But in our project we can just directly find our element
let fileInputBox = document.querySelector('.file-input-box');

function fileInputBoxOver(){
  fileInput.addEventListener('change', e=>{
    // e.preventDefault();
    if (fileInput.files.length){
      updateFileInputBox(fileInputBox, fileInput.files[0])
    }
  })

  fileInputBox.addEventListener('dragover', e =>{
  e.preventDefault();
  fileInputBox.classList.add('file-input-box-over')
  });

  ['dragleave', 'dragend'].forEach(type => {
    fileInputBox.addEventListener(type, e =>{
      fileInputBox.classList.remove('file-input-box-over')
    })
  });

  fileInputBox.addEventListener('drop', e =>{
    e.preventDefault();
    // console.log(e.dataTransfer.files[0])
    if (e.dataTransfer.files.length){
      // we are taking the file from the event object and assigning it directly to our imput element
      
      fileInput.files = e.dataTransfer.files;
      updateFileInputBox(fileInputBox, e.dataTransfer.files[0])
    }

    fileInputBox.classList.remove('file-input-box-over');
  });
}


function updateFileInputBox(fileInputBox, file){
  console.log(fileInputBox);
  console.log(file);
  
  if(file.type.startsWith('image/')){
    const reader = new FileReader();
    //build in obj allowing to read files
    
    reader.readAsDataURL(file);
    reader.onload = () => {
      localStorage.setItem('imageURL', reader.result);
      console.log(reader.result);

      fileInputBox.innerHTML = `
      <img class="file-input-thumbnail" src="${reader.result}">
      <div>
        <button class="input-btn js-remove-btn">Remove image</button>
        <button class="input-btn js-change-btn">Change image</button>
      </div>
    `
    document.querySelector('.js-remove-btn').addEventListener('click', e =>  removeInputThumbnail(e) );
    document.querySelector('.js-change-btn').addEventListener('click', e =>  changeInputThumbnail(e) )
    }
  } 

}

function removeInputThumbnail(e){
  e.preventDefault();
  fileInputBox.innerHTML = `
    <input type="file" accept="image/png, image/jpg" class="file-input" id="file-input">
    <img class="upload-icon" src="assets/images/icon-upload.svg">
    <p class="upload-instruction-1">Drag and drop or click to upload</p>
  `
  localStorage.removeItem('imageURL')
}

function changeInputThumbnail(e){
  e.preventDefault();
  fileInput.click()
}

function returnDate(){
  let months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  let date = new Date();
  let month = months[date.getMonth()];
  let day = date.getDate();
  let year = date.getFullYear();
  return `${month} ${day}, ${year}`
}

function returnLocation(){
  return 'London, UK'
}

function collectDetails() {
  const generateBtn = document.querySelector('form');
  generateBtn.addEventListener('submit', (event) => {
    event.preventDefault();

    // make sure form submits once fields are filled
    let allFilled = true;
    let inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
      if(input.value.trim() === ''){
        allFilled = false;
      } 
    })

    if(allFilled){
      formDetails.name = document.querySelector('.js-name-input').value;
      formDetails.email = document.querySelector('.js-email-input').value;
      formDetails.gitHubName = document.querySelector('.js-github-name-input').value;

      ticketNumber = '#'+ Math.floor((Math.random() * 10000));
      
      dateAndLocation.date = returnDate();
      dateAndLocation.location = returnLocation();

      localStorage.setItem('details', JSON.stringify(formDetails));
      localStorage.setItem('ticketNumber', JSON.stringify(ticketNumber));
      localStorage.setItem('dateAndLocation', JSON.stringify(dateAndLocation));

      window.location.href="./ticket.html"
      } else {
        alert('Fill in all the fields please')
      }
  });
}


fileInputBoxOver();
collectDetails();



