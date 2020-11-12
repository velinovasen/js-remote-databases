baseURL = 'https://students-87347.firebaseio.com/'
const HTMLSelectors = {
  id: () => document.getElementById('id'),
  firstName: () => document.getElementById('first-name'),
  lastName: () => document.getElementById('last-name'),
  facultyNumber: () => document.getElementById('faculty-number'),
  grade: () => document.getElementById('grade'),
  submitButton: () => document.getElementById('submit-button'),
  getIdButton: () => document.getElementById('getid-button'),
  getFacNumberButton: () => document.getElementById('getfacnumber-button'),
  tableBody: () => document.getElementById('table-body'),
  errorMsg: () => document.getElementById('error'),
}
//load the students
createTDElements()
// set listeners
HTMLSelectors.submitButton().addEventListener('click', submitStudentData);

HTMLSelectors.getIdButton().addEventListener('click', getId);

HTMLSelectors.getFacNumberButton().addEventListener('click', getFacNumber)

//create student
function submitStudentData(event) {
  event.preventDefault()
  let id = HTMLSelectors.id().value
  let firstName = HTMLSelectors.firstName().value;
  let lastName = HTMLSelectors.lastName().value;
  let facultyNumber = HTMLSelectors.facultyNumber().value;
  let grade = HTMLSelectors.grade().value;
  if (firstName && lastName && facultyNumber && grade && id) { // validations
    if(validateInputs(firstName, lastName, grade) == 'accepted') {
      let studentData = {
        id: id,
        firstName: firstName,
        lastName: lastName,
        facultyNumber: facultyNumber,
        grade: Number.parseFloat(grade).toFixed(2),
      }
      fetch(baseURL + '.json', {
        method: "POST",
        body: JSON.stringify(studentData)
      })
      .then(res => res.json())
      cleanValues()
      createTDElements()
      HTMLSelectors.errorMsg().style.display = 'none';
    } else { HTMLSelectors.errorMsg().style.display = 'block';}
  } else { HTMLSelectors.errorMsg().style.display = 'block';}
}

//create and load the students
function createTDElements(data) {
  HTMLSelectors.tableBody().innerHTML = '';
  fetch(baseURL + '.json')
  .then(res => res.json())
  .then(students => {
    
    Object.values(students).forEach(student => {
      
      let tableRow = document.createElement('tr');
      let idCol = document.createElement('td');
      let firstNameCol = document.createElement('td');
      let lastNameCol = document.createElement('td');
      let facultyNumberCol = document.createElement('td');
      let gradeCol = document.createElement('td');
      
      idCol.innerText = student.id;
      firstNameCol.innerText = student.firstName;
      lastNameCol.innerText = student.lastName;
      facultyNumberCol.innerText = student.facultyNumber;
      gradeCol.innerText = student.grade;

      tableRow.appendChild(idCol);
      tableRow.appendChild(firstNameCol);
      tableRow.appendChild(lastNameCol);
      tableRow.appendChild(facultyNumberCol);
      tableRow.appendChild(gradeCol);
      HTMLSelectors.tableBody().appendChild(tableRow);
    })
  })
 }

function cleanValues() {
  HTMLSelectors.id().value = '';
  HTMLSelectors.firstName().value = '';
  HTMLSelectors.lastName().value = '';
  HTMLSelectors.facultyNumber().value = '';
  HTMLSelectors.grade().value = '';
}

function validateInputs(firstName, lastName, grade) {
  let state = 'accepted';
  let regName = /^[a-zA-Z]+$/;
  if (2 > parseFloat(grade) || parseFloat(grade) > 6) {
    state = 'rejected';
  }
  if (!regName.test(firstName) || !regName.test(lastName)) {
    state = 'rejected';
  }
  return state;
}

//increment id
function getId(e) {
  e.preventDefault()
  async function getIdJSON() {
    const response = await fetch(baseURL + '.json')
    const objects = await response.json()
    return objects
  }
  getIdJSON().then(obj => {
    HTMLSelectors.id().value = Object.keys(obj).length + 1
  }).catch(e => HTMLSelectors.id().value = 1)
}

//increment faculty number
function getFacNumber(e) {
  e.preventDefault()
  async function getFacJSON() {
    const response = await fetch(baseURL + '.json')
    const objects = await response.json()
    return objects
  }
  getFacJSON().then(obj => {
    let lastObj = Object.values(obj)[Object.keys(obj).length - 1]
    HTMLSelectors.facultyNumber().value = Number(lastObj.facultyNumber) + 1312; // :P
  }).catch(e => HTMLSelectors.facultyNumber().value = 90000432543)
}