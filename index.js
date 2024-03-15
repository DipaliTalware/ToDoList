

const form = document.querySelector('#new-task-form')
const newTaskInput = document.querySelector('#new-task-input');
const SubmitBtn = document.querySelector('#new-task-submit');
const taskList = document.querySelector('.taskList');


form.addEventListener('submit', (e) => e.preventDefault());

const createElements = (inputValue) => {
    const task_el = document.createElement('div');
    task_el.classList.add("task", 'flex');

    const taskContent_el = document.createElement('div');
    taskContent_el.classList.add('content','flex-1');
    task_el.appendChild(taskContent_el);

    const taskInput_el = document.createElement('input')

    taskInput_el.classList.add('text', 'flex-1', 'p-6', 'rounded-2xl', 'text-xl', 'mr-4', 'mt-4', 'size-1/2', 'bg-green-50')
    taskInput_el.type ='text';
    taskInput_el.value = inputValue;
    taskInput_el.setAttribute('readonly','readonly')

    taskContent_el.appendChild(taskInput_el);
    
    taskList.appendChild(task_el);

  
    // const action_el = document.createElement('div');
    const editBtn = document.createElement('button');
    editBtn.innerText = 'EDIT';
    editBtn.classList.add('bg-blue-500', 'hover:bg-blue-700', 'text-white', 'font-semi-bold', 'py-2', 'px-4', 'rounded-full', 'mr-2')


    const deleteBtn =document.createElement('button');
    deleteBtn.innerText ='DELETE';
    deleteBtn.classList.add('bg-blue-500', 'hover:bg-blue-700', 'text-white', 'font-semi-bold', 'py-2', 'px-4', 'rounded-full')

    // action_el.appendChild(editBtn);
    // action_el.appendChild(deleteBtn);
    taskContent_el.appendChild(editBtn);
    taskContent_el.appendChild(deleteBtn);

    task_el.appendChild(taskContent_el);
    taskList.appendChild(task_el);

    let index;
    editBtn.addEventListener('click', ()=>{
        let storedTask = JSON.parse(localStorage.getItem('key'))
        

      if(editBtn.innerText.toLocaleLowerCase() === 'edit'){
        index = storedTask.indexOf(taskInput_el.value)
        taskInput_el.removeAttribute('readonly')
        taskInput_el.focus();
        editBtn.innerText = 'Save';
      }
      else{
          taskInput_el.setAttribute('readonly','readonly');
          editBtn.innerText = 'Edit';
          storedTask = storedTask.toSpliced(index, 1, taskInput_el.value)
          storedTask = JSON.stringify(storedTask);
          localStorage.setItem('key', storedTask);
      }
      
    })

    deleteBtn.addEventListener('click', () =>{

      taskList.removeChild(task_el);
      let storedTask = JSON.parse(localStorage.getItem('key'));
      const index = storedTask.indexOf(taskInput_el.value)
      if(index> -1){
        storedTask.splice(index, 1);
      }
      storedTask = JSON.stringify(storedTask);
      localStorage.setItem('key', storedTask);
      localStorage.removeItem(task_el.value)
    })


      newTaskInput.value = '';
}

const addTask = SubmitBtn.addEventListener('click', ()=>{
    if(!newTaskInput.value){
      alert('Cant add empty task')
      return;
    }
    else{
      let storedTask = localStorage.getItem('key');
      if (storedTask) {
        storedTask = JSON.parse(storedTask)
      }
      else {
        storedTask =[];
      }
      storedTask.push(newTaskInput.value)
      storedTask = JSON.stringify(storedTask)
      localStorage.setItem('key', storedTask)
    }
    createElements(newTaskInput.value);

})


window.addEventListener("load", (event) => {

  const retrievTask = JSON.parse(localStorage.getItem('key'));
  if(retrievTask){
    retrievTask.forEach(element => {
      createElements(element)
    });
  }  
  
});

