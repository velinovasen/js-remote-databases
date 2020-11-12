const HTMLSelectors = {
  createAccDiv: () => document.getElementsByClassName('create-account')[0],
  LoginDiv: () => document.getElementsByClassName('login')[0],
  loginButton: () => document.getElementById('login-button'),
  regButton: () => document.getElementById('register-button'),
  emailInput: () => document.getElementById('email-input'),
  passwordInput: () => document.getElementById('password-input'),
  confirmPasswordInput: () => document.getElementById('confirm-password-input'),
  createAccButton: () => document.getElementById('create-account-button'),
  haveAccButton: () => document.getElementById('have-account-button'),
  errorMsg: () => document.getElementById('error-msg'),
}

HTMLSelectors.regButton().addEventListener('click', registerUser)

HTMLSelectors.loginButton().addEventListener('click', loginUser)

HTMLSelectors.createAccButton().addEventListener('click', getLoginForm)

HTMLSelectors.haveAccButton().addEventListener('click', getCreateAccountForm)

function registerUser(e) {
  e.preventDefault()
  const email = HTMLSelectors.emailInput().value;
  const pass = HTMLSelectors.passwordInput().value;
  const confirmPass = HTMLSelectors.confirmPasswordInput().value;
  if (pass !== confirmPass || pass.length < 6) {
    HTMLSelectors.errorMsg().style.display = 'block';
    console.log(' NE MINAVA')
    return;
  }
  HTMLSelectors.errorMsg().style.display = 'none';
  console.log('SUCCESSFULL')
  firebase.auth().createUserWithEmailAndPassword(email, pass)
  .catch(e => console.log(e))
  HTMLSelectors.emailInput().value = '';
  HTMLSelectors.passwordInput().value = '';
  HTMLSelectors.confirmPasswordInput().value = '';
  window.alert(`You have create user with email: ${email}`)
}

function loginUser() {
  const email = HTMLSelectors.emailInput().value;
  const pass = HTMLSelectors.passwordInput().value;
  firebase.auth().signInWithEmailAndPassword(email, pass)
  .catch(error => console.log(error));

  window.alert(`You have logged in successfully.`)
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