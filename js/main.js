'use strict'
const form = document.querySelector('form')
const taskInput = document.querySelector("#taskInput")
const tasksList = document.querySelector("#tasksList")
const emptyList = document.querySelector("#emptyList")
const deleteDoneTask = document.querySelector('.delete')

let tasks = []


if (localStorage.getItem("tasks")){
    tasks = JSON.parse(localStorage.getItem("tasks"))
}
//////////////////////        Вносим розметку сайта под наш масив           //////////////////////
tasks.forEach(function (task)  {
    renderTask (task)
})
//////////////////////        Проверка есть ли задачи через масив          //////////////////////
// tasks.length > 0 ? emptyList.classList.add("none") : "none"
checkEmptyList()
//////////////////////        Проверка есть ли задачи через розметку           //////////////////////
// tasksList.children.length > 1 ? emptyList.classList.add("none") : "none"
//////////////////////        Добавления елемента в наш список          //////////////////////
form.addEventListener('submit', addTask)
//////////////////////        Удаления елемента с нашего списка           //////////////////////
tasksList.addEventListener('click', deleteTask)
//////////////////////        Отмечаем выполненые елементы          //////////////////////
tasksList.addEventListener('click',doneTask)

//////////////////////        Удаляю выполнены задачи          //////////////////////
deleteDoneTask.addEventListener('click', deleteDone )

//////////////////////        Function          //////////////////////
function addTask (event) {
    event.preventDefault()
    
    const taskText = taskInput.value
    console.log(taskText);
    if (!taskText.trim() ) {
       
        return alert('Строка пустая или состоит только из пробелов')
    }
    const newTask = {
        id: Date.now(),
        text: taskText,
        done: false,
    }

    tasks.push(newTask)
    console.log(tasks);
    renderTask (newTask)
    taskInput.value = ""
    taskInput.focus()
    // tasks.length === 1 ? emptyList.classList.add("none") : "none"
    checkEmptyList()
    saveToLocalStorage()
}
function deleteTask(event) {
    if (event.target.dataset.action !== 'delete') return
    const parentNode = event.target.closest('li')
    const id = +parentNode.id
//    //////////////////////        1 способ  Масив поиск индекса        //////////////////////
//     const index = tasks.findIndex(function (task) {
//        return task.id === id
//     })
//     tasks.splice(index, 1 )
//   //////////////////////        1 cпособ          //////////////////////
console.log(); 
//////////////////////        2 cпособ Масив Фильр          //////////////////////
    tasks = tasks.filter((task) => {
    return task.id !== id
    })
///////////////////////                  //////////////////////
    console.log(tasks);
    parentNode.remove()
    // tasks.length === 0 ? emptyList.classList.remove('none'): "none"
    checkEmptyList()
    saveToLocalStorage()
               
}
function doneTask(event) {
    if(event.target.dataset.action !== 'done') return
    const parentNode = event.target.closest('li')
    const taskTitle = parentNode.querySelector('.task-title')
    taskTitle.classList.toggle('task-title--done')
    const id = +parentNode.id;
   
    //////////////////////        мой способ           //////////////////////
    // tasks.forEach( (task) => {
    //     task.id === id ? task.done = !task.done : 'none'
    // })
    //////////////////////                  //////////////////////
    //////////////////////        Способ из видео          //////////////////////
    const task = tasks.find(function (task) {
        if (task.id === id) {
           return true
        }
    })
    task.done = !task.done
    saveToLocalStorage()
}
//////////////////////        Проверка есть ли задачи в листе           //////////////////////
function checkEmptyList() {
    tasks.length > 0 ? emptyList.classList.add("none") : emptyList.classList.remove("none")
}
//////////////////////        сохраняем в локал сторедж          //////////////////////
function saveToLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(tasks))
}
//////////////////////        Выносим розметку в отделбную функцию          //////////////////////
function renderTask (task) {
    const cssClass = task.done ? 'task-title task-title--done' : 'task-title'
    const taskHTML = `
                        <li id="${task.id}" class="list-group-item d-flex justify-content-between task-item">
                            <span  class="${cssClass}">${task.text}</span>
                            <div class="task-item__buttons">
                                <button type="button" data-action="done" class="btn-action">
                                    <img src="./img/tick.svg" alt="Done" width="18" height="18">
                                </button>
                                 <button type="button" data-action="delete" class="btn-action">
                                    <img src="./img/cross.svg" alt="Done" width="18" height="18">
                                </button>
                            </div>
                        </li>`
    tasksList.insertAdjacentHTML("beforeend", taskHTML)
}
function deleteDone() {
    tasks.forEach(function (task) {
        const id = task.id
        if (task.done === true) {
            let dones = document.getElementById(task.id)
            dones.remove()
            tasks = tasks.filter((task) => {
            return task.id !== id
            })
            saveToLocalStorage() 
            
        }
        
    })
    
}

