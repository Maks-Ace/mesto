// Var declaration
let editButoon = document.querySelector(".profile__edit-button");
let nameValue = document.querySelector('.profile__name');

editButoon.addEventListener('click', function(){
  alert(nameValue.innerHTML);
});
