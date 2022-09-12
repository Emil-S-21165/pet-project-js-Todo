const inputBox = document.querySelector('.inputField input'),
      addBtn = document.querySelector('.inputField button'),
      todoList = document.querySelector('.todoList'),
      deleteBtn = document.querySelector('.footer button');

inputBox.addEventListener('input', () => {
    let userData = inputBox.value;
    if (userData.trim() != 0) {
        addBtn.classList.add('active');
    } else {
        addBtn.classList.remove('active');
    }
});

showTasks();

addBtn.addEventListener('click', () => {
    let userData = inputBox.value,
        getLocalStorage = localStorage.getItem('New Todo');
    if (getLocalStorage == null) {
        listArr = [];
    } else {
        listArr = JSON.parse(getLocalStorage);
    }
    listArr.push(userData);
    localStorage.setItem('New Todo', JSON.stringify(listArr));
     
    showTasks();
});

function showTasks() {
    let getLocalStorage = localStorage.getItem('New Todo'),
        newLiTag = '';
    const pendingNumb = document.querySelector('.pendingNumb');

    if (getLocalStorage == null) {
        listArr = [];
    } else {
        listArr = JSON.parse(getLocalStorage)
    }

    pendingNumb.textContent = listArr.length;

    if (listArr.length > 0) {
        deleteBtn.classList.add('active');
    } else {
        deleteBtn.classList.remove('active');
    }

    listArr.forEach((element, index) => {
        newLiTag += `<li>${element} <button onclick="deleteTask(${index})">delete</button></li>`;
    });

    todoList.innerHTML = newLiTag; // adiing new li tag into ul
    inputBox.value = '';
}

function deleteTask(index) {
    let getLocalStorage = localStorage.getItem('New Todo');
    listArr = JSON.parse(getLocalStorage);
    listArr.splice(index, 1);

    localStorage.setItem('New Todo', JSON.stringify(listArr));
     
    showTasks();
}

deleteBtn.addEventListener('click', () => {
    listArr = [];

    localStorage.setItem('New Todo', JSON.stringify(listArr));
     
    showTasks();
});