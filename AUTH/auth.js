const HTMLSelectors = {
  createAccDiv: () => document.getElementsByClassName('create-account')[0],
  LoginDiv: () => document.getElementsByClassName('login')[0],
  loginButton: () => document.getElementById('login-button'),
  regButton: () => document.getElementById('register-button'),
  emailInput: () => document.getElementById('email-input'),
  emailLoginInput: () => document.getElementById('email-login-input'),
  passwordInput: () => document.getElementById('password-input'),
  passwordLoginInput: () => document.getElementById('password-login-input'),
  confirmPasswordInput: () => document.getElementById('confirm-password-input'),
  createAccButton: () => document.getElementById('create-account-button'),
  haveAccButton: () => document.getElementById('have-account-button'),
  errorMsg: () => document.getElementById('error-msg'),
  logOutForm: () => document.getElementsByClassName('logout')[0],
  logOutButton: () => document.getElementById('logout-button'),
}

HTMLSelectors.regButton().addEventListener('click', registerUser)

HTMLSelectors.loginButton().addEventListener('click', loginUser)

HTMLSelectors.createAccButton().addEventListener('click', getLoginForm)

HTMLSelectors.haveAccButton().addEventListener('click', getCreateAccountForm)

HTMLSelectors.logOutButton().addEventListener('click', logOutUser)

function registerUser(e) {
  e.preventDefault()
  const email = HTMLSelectors.emailInput().value;
  const pass = HTMLSelectors.passwordInput().value;
  const confirmPass = HTMLSelectors.confirmPasswordInput().value;
  if (pass !== confirmPass || pass.length < 6) {
    HTMLSelectors.errorMsg().style.display = 'block';
    return;
  }
  HTMLSelectors.errorMsg().style.display = 'none';
  firebase.auth().createUserWithEmailAndPassword(email, pass)
  .catch(e => console.log(e))
  cleanValues()
  window.alert(`You have create user with email: ${email}`)
  HTMLSelectors.createAccDiv().style.display = 'none';
  HTMLSelectors.LoginDiv().style.display = 'block';
}

function loginUser(e) {
  e.preventDefault()
  const email = HTMLSelectors.emailLoginInput().value;
  const pass = HTMLSelectors.passwordLoginInput().value;
  firebase.auth().signInWithEmailAndPassword(email, pass)
  .then(data => {
    window.alert(`You have logged in successfully.`)
    HTMLSelectors.LoginDiv().style.display = 'none';
    HTMLSelectors.logOutForm().style.display = 'block';
    cleanValues()
  })
  .catch(error => console.log(error));
}

function logOutUser(e) {
  e.preventDefault()
  firebase.auth().signOut()
  .then(data => {
    HTMLSelectors.logOutForm().style.display = 'none';
    HTMLSelectors.LoginDiv().style.display = 'block';
    window.alert(`You have logged out successfully.`)
  })
  .catch(e => console.log(e))
}

function getLoginForm(e) {
  e.preventDefault()
  HTMLSelectors.createAccDiv().style.display = 'block';
  HTMLSelectors.LoginDiv().style.display = 'none';
}

function getCreateAccountForm(e) {
  e.preventDefault()
  HTMLSelectors.createAccDiv().style.display = 'none';
  HTMLSelectors.LoginDiv().style.display = 'block';
}

function cleanValues() {
  HTMLSelectors.emailInput().value = '';
  HTMLSelectors.passwordInput().value = '';
  HTMLSelectors.confirmPasswordInput().value = '';
  HTMLSelectors.emailLoginInput().value = '';
  HTMLSelectors.passwordLoginInput().value = '';
}