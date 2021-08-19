const taskContainer = document.querySelector(".task_container");
let  globalTaskData = [];//array to be edited layer
const saveToLocalStorage = () => {
localStorage.setItem("taskyCA",JSON.stringify({cards: globalTaskData}));//updating the local storage
}

const addNewCard = () => {//creating function
    const taskData = {//creating object
        id: `${Date.now()}`,//unique id
        title: document.getElementById("taskTitle").value,//add value by .value
        image: document.getElementById("imgurl").value,
        type: document.getElementById("taskType").value,
        description: document.getElementById("taskDescription").value,
    };
    globalTaskData.push(taskData);//pushing the object
    //update the local storage
    saveToLocalStorage();
    
    //by passing the key and the value
    //key to identify ur data
    //now open the CONSOLE LOG APPLICATIONS AND LOCAL STORAGE
    //JSON is string and every programming language can understand
    //JSON need the object input to convert to string so always 
    //contd try to convert to the object and then use it
    //stringify convert to string in json
    //localstorage is now added





    
   const generateHTML = (taskData) =>
    `<div id = ${taskData.id} class="card text-center col-md-4  col-sd-12 task_container ">
    <div class="card-header justify-content-end">
      <button class = "btn btn-outline-danger float-end" name = ${taskData.id} onclick="deleteCard.apply(this, arguments)"><i class="far fa-trash-alt" name = ${taskData.id} ></i></button>
    <button class = "btn btn-outline-info float-end" style="margin-right: 3%;" ><i class="far fa-pencil"></i></button>
    
    </div>
    
    <div class="card-body">
      <img src = ${taskData.image} class = "card-img" style="height: 250px;">
      <br>
      <br>
      <h5 class="card-title">${taskData.title}</h5>
      <p class="card-text">${taskData.description}</p>
      <span class="badge bg-primary float-start">${taskData.type}</span>
      
    </div>
    <div class="card-footer">
      <button class="btn btn-outline-primary" type="submit">Open Task</button>
    </div>
    </div>`
   ;

    const newCard = generateHTML(taskData);

//generate html code of task card
//const is used as i dont want someone to edit it in future




//inject to dode
taskContainer.insertAdjacentHTML("beforeend",newCard);//beforeend added 

//clear the form
document.getElementById("taskTitle").value = "" ;
document.getElementById("imgurl").value = "" ;
document.getElementById("taskType").value = "" ;
document.getElementById("taskDescription").value = "" ;
return
};



//load the data to the website storage
const loadExistingCards = () =>{
 //check local strrage BROWSER STORAGE (5MB)
 const getData = localStorage.getItem("taskyCA");
 //any website can store the data in the local storage of the copute
 //but that storage wil be accessible through the website only
 //parse JSON  data if exist
 if(!getData) return;

 const taskCards = JSON.parse(getData);//storing data to in soncst
 //also the parse will convrt the JSON to the JS object
 //converted to the JSON to JS reverse of stringify
 globalTaskData = taskCards.cards;
 //updting the gloabal array
 globalTaskData.map((taskData) => {
  const newCard = generateHTML(taskData);
  taskContainer.insertAdjacentHTML("beforeend",newCard);
});//map means copying the while array
//foreach 
// inject to dom
return;
};
const deleteCard = (event) => {
    const targetID = event.target.getAttribute("name");
    const elementType = event.target.tagName;

    const removeTask = globalTaskData.filter((task) => task.id !== targetID);
    globalTaskData = removeTask;


    saveToLocalStorage();

    if(elementType === "BUTTON"){
      return taskContainer.removeChild(
        event.target.parentNode.parentNode.parentNode
      );
    }else{
      return taskContainer.removeChild(
        event.target.parentNode.parentNode.parentNode.parentNode
      );
    }
    };


    //access DOM to remove Card


//we will use event which on clic gives the id of the class
//we will use name for identification


// /RELODING THE WEBSITE
//now every website is having som elocal stoRAGE nd whenever we write data through input that website save the data in the local storage 
//so what we first id that we first created a variable in js which is an array of objects and which will store the local storage as the data i sentered in
//it  globaltasjdat is the array that i am talking about
//now when accessing to this globaldata the broweser was treates as an object so we convert it to json which is easy understanca
//using stringify
//we then saved it to local storage and then we converted it back to the js file and inserted it into the HTML
//game finitshed

// event is basically the place that where we click we will get the id of that element  very cool feature if id detection is very difficult

