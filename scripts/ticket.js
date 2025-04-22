if(localStorage.getItem('imageURL')){
  document.querySelector('.js-avatar-img').src = `${localStorage.getItem('imageURL')}`
} else document.querySelector('.js-avatar-img').src ='assets/images/image-avatar.jpg'

const classList = [
  '.js-title-name',
  '.js-title-email',
  '.js-ticket-name', 
  '.js-github-username',
  '.js-ticket-number',
  '.js-ticket-date-location'
];

const newHTML = [
  JSON.parse(localStorage.getItem('details')).name, 
  JSON.parse(localStorage.getItem('details')).email,
  JSON.parse(localStorage.getItem('details')).name,
  JSON.parse(localStorage.getItem('details')).gitHubName,
  JSON.parse(localStorage.getItem('ticketNumber')),

  JSON.parse(localStorage.getItem('dateAndLocation')).date + ' / ' + 
  JSON.parse(localStorage.getItem('dateAndLocation')).location,
];

const defaultHTML = [
  'Jonathat Kristof',
  'jonathat@email.com',
  'Jonathat Kristof',
  '@jonathankristof0101'
];

function generateHTML(ElementClass, newInnerHTML){
  document.querySelector(ElementClass).innerHTML = newInnerHTML;
}

for(var i = 0; i < classList.length; i++) {
  generateHTML(classList[i], newHTML[i]);
}
