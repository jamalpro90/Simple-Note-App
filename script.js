const inputTitle = document.querySelector('.input-title');
const inputText = document.querySelector('.input-text');
const addBtn = document.querySelector('button');
let notes = document.querySelector('.notes');

let notesObj;

addBtn.addEventListener('click', e => {
  if (inputTitle.value == '' || inputText.value == '') {
    return alert('Enter The Title And Text.');
  }

  if (localStorage.getItem('notes') === null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(localStorage.getItem('notes'));
  }

  let myObj = {
    title: inputTitle.value,
    text: inputText.value
  }

  notesObj.push(myObj);
  localStorage.setItem('notes', JSON.stringify(notesObj));
  inputTitle.value = '';
  inputText.value = '';

  ShowNotes();
});

// window.addEventListener('load', ShowNotes);

function ShowNotes() {
  if (localStorage.getItem('notes') === null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(localStorage.getItem('notes'));
  }

  let html = ``;
  notesObj.forEach((e, i) => {
    html += `
        <div class="note-group">
          <p class="note-counter">Note ${i+1}</p>
          <h3 class="note-title">${e.title}</h3>
          <p class="note-text">${e.text}</p>
          <button type="button" class="btn btn-delete">delete</button>
        </div>
      `;
  });


  if (notesObj.length > 0) {
    notes.innerHTML = html;
  } else {
    notes.innerHTML = 'No Notes, Please Enter Some Notes.';
  }
  DeleteNotes();
}


function DeleteNotes() {
  if (localStorage.getItem('notes') === null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(localStorage.getItem('notes'));
  }

  let deleteBtn = document.querySelectorAll('.btn-delete');
  deleteBtn.forEach((e, i) => {
    e.addEventListener('click', function (e) {
      this.parentNode.parentNode.removeChild(this.parentNode);
      notesObj.splice(i, 1);
      localStorage.setItem('notes', JSON.stringify(notesObj));
    })
  });
  // ShowNotes()
}


ShowNotes();