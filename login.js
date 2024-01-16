const email = "";
const emails = JSON.parse(localStorage.getItem("emails")) || [];
const today = Date.now();

const welcomeMessage = () => {
  document.getElementById(
    "head"
  ).innerHTML = `<p class="header-flex"><button id="logoutBtn" class="btn btn-light">Logout</button></p>`;
  const user = getLoggedEmail();
  document.getElementById("containerbox").innerHTML = `
  <h1>Benvenut*</h1><br><p>${user}</p><br>
  `;
  document.getElementById("logoutBtn").addEventListener("click", function () {
    clearCurrentUserEmail();
    loginMessage();
  });
};

const welcomeBackMessage = () => {
  const user = getLoggedEmail();
  const currentUser = getUserLogged();
  document.getElementById(
    "head"
  ).innerHTML = ` <p class="header-flex"><button id="logoutBtn" class="btn btn-light">Logout</button> </p> `;

  document.getElementById("containerbox").innerHTML = `
  <p>
 Counter: ${currentUser.counter} </br> Last seen: ${currentUser.lastlogged}</p>
  <h1>Bentornat*</h1><br><p>${user}</p><br>
  `;
  document.getElementById("logoutBtn").addEventListener("click", function () {
    clearCurrentUserEmail();
    loginMessage();
  });
};

const loginMessage = () => {
  document.getElementById("head").innerHTML = ``;
  document.getElementById("containerbox").innerHTML = `
  <h2>Esegui il Login</h2>
  <form id="emailForm" name="emailform" action="#">
  <input type="email" class="form-control"  id="inputEmail" name="email"  size="30" required />
  <button class="btn btn-light" type="submit" id="submitBtn"  onclick="checkEmail(document.emailform.email)">Login</button>
</form>`;
  document.getElementById("submitBtn").addEventListener("click", function () {
    onClickBtnLogin();
  });
};

const onClickBtnLogin = () => {
  // const user = getUserLogged();
  // const prevUsers = JSON.parse(localStorage.getItem("emails"));

  const emailInput = document.getElementById("inputEmail");
  const isEmailValid = checkEmail(emailInput)
  const email = document.getElementById("inputEmail").value;
  const existingUser = emails.find((u) => u.email === email);

  if (isEmailValid === true) {
    saveCurrentUserEmail();

    if (existingUser) {
      updateUser();
      welcomeBackMessage();
    } else {
      saveCurrentUserEmail();
      addEmail();
      welcomeMessage();
    }

    getLoggedEmail();
  } else{
    alert(`Please insert a valid e-mail!`)
  }
};

const updateUser = () => {
  const prevUsers = JSON.parse(localStorage.getItem("emails"));
  const emailLogged = getLoggedEmail();
  const newUsers = prevUsers.map((user) => {
    if (user.email === emailLogged) {
      return {
        ...user,
        lastlogged: new Date(),
        counter: user.counter + 1,
      };
    } else {
      return {
        ...user,
      };
    }
  });
  emails.splice(0, emails.length, ...newUsers);
  localStorage.setItem("emails", JSON.stringify(newUsers));
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

const saveCurrentUserEmail = () => {
  const input = document.getElementById("inputEmail");
  const emailValidated = checkEmail(input);
  if (emailValidated === true) {
    const email = document.getElementById("inputEmail").value;
    localStorage.setItem("email", email);
  } else {
    alert(`Invalid E-mail`);
  }
};

const clearCurrentUserEmail = () => {
  localStorage.removeItem("email");
};

const getLoggedEmail = () => {
  // metodo per ottenere la mail dell'utente connesso
  const currentLoggedEmail = localStorage.getItem("email");
  console.log(`E-mail dell'utente connesso:` + currentLoggedEmail);
  return currentLoggedEmail;
};

const getUserLogged = () => {
  const emailLogged = getLoggedEmail();
  const prevUsers = JSON.parse(localStorage.getItem("emails")) || [];
  const user = prevUsers.find((user) => user.email === emailLogged);
  return user;
};

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

window.onload = () => {
  const email = getLoggedEmail();
  const isLogged = !!email;
  if (isLogged) {
    const user = getUserLogged();
    if (user && user.counter > 1) {
      welcomeBackMessage();
    } else {
      welcomeMessage();
    }
  } else {
    loginMessage();
  }
};
