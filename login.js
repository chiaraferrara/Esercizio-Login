const email = "";
const emails = JSON.parse(localStorage.getItem("emails")) || [];
const today = Date.now();


const welcomeMessage = () =>{
  const user = getLoggedEmail();
  document.getElementById("containerbox").innerHTML = `
  <h1>Benvenut*</h1><br><p>${user}</p><br>
  <button id="logoutBtn">Logout</button>`
  document.getElementById('logoutBtn').addEventListener("click", function(){
    clearCurrentUserEmail();
    loginMessage();
  })
  
}


const loginMessage = () => {
  document.getElementById('containerbox').innerHTML = `
  <form id="emailForm" name="emailform" action="#">
  <input type="email" id="inputEmail" name="email"  size="30" required />
  <button type="submit" id="submitBtn"  onclick="checkEmail(document.emailform.email)">Login</button>
</form>`
document.getElementById("submitBtn").addEventListener("click", function () {
  onClickBtnLogin();
});
}


const onClickBtnLogin = () => {
  saveCurrentUserEmail()
  addEmail();
  getLoggedEmail();
  welcomeMessage();
};

const addEmail = () => {
  const input = document.getElementById("inputEmail");
  const emailValidated = checkEmail(input);
  console.log(emailValidated);
  if (emailValidated === true) {
    const email = document.getElementById("inputEmail").value;
    console.log(email);
    const user = {
      email: email,
      lastlogged: new Date(),
      counter: 1,
    };
    emails.push(user);
    localStorage.setItem("emails", JSON.stringify(emails));
  }
};

const updateEmail = () => {
  const prevUsers = JSON.parse(localStorage.getItem("emails")) || [];

}

const saveCurrentUserEmail = () =>{
  const input = document.getElementById("inputEmail");
  const emailValidated = checkEmail(input);
  if (emailValidated === true) {
  const email = document.getElementById("inputEmail").value;
  localStorage.setItem("email", email);}
    else{
      alert(`Invalid E-mail`)
    }
}

const clearCurrentUserEmail = () =>{
  localStorage.removeItem("email");
}

const getLoggedEmail = () => {
  // metodo per ottenere la mail dell'utente connesso
  const currentLoggedEmail = localStorage.getItem("email");
  console.log(`E-mail dell'utente connesso:` + currentLoggedEmail);
  return currentLoggedEmail;
  
}

const checkEmail = (input) => {
  var regex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (input.value.match(regex)) {
    // console.log(`E-mail valida`);
    return true;
  } else {
    // console.log(`E-mail invalida`);
    return false;
  }
};






document.getElementById("emailForm").addEventListener("submit", function () {
  event.preventDefault(); //deprecato? funziona
});

window.onload=() =>{
  const email = getLoggedEmail();
  const isLogged = !!email;
  if(isLogged) {
    welcomeMessage();
  } else {
    loginMessage();
  }
}