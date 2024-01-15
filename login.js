const isLogged = false;
const email = "";
const emails = JSON.parse(localStorage.getItem("emails")) || [];
const today = Date.now();

const onClickBtnLogin = () => {
  const email = document.getElementById("inputEmail").value;
  const foundUser = emails.find((email) => emails.email === email);
  if (foundUser) {
    const user = {
      email: email,
      lastlogged: [Date.now().toLocaleString()],
      counter: foundUser.counter + 1,
    };
    if (email != "") {
      isLogged = true;
      emails.push(user);
      console.log(emails);
      localStorage.setItem("emails", JSON.stringify(emails));
    }
  } else if (!foundUser) {
    const user = {
        email: email,
        lastlogged: [Date.now().toLocaleString()],
        counter: 1,
      };
      isLogged = true;
      if(email != ""){
        emails.push(user);
      console.log(emails);
      localStorage.setItem("emails",JSON.stringify(emails));

      } else {
        alert('Email Non Valida')
      }
      
  }
};

const checkEmail = () => {
 const emailInput = document.getElementById('inputEmail');
 const submitBtn = document.getElementById('submitBtn')
//  submitBtn.disabled = true;

};

document.getElementById('submitBtn').addEventListener('click', function (){
    onClickBtnLogin();
})


