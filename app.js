console.log('Javascript Running');
notesTile();
tabsTile();

//
// let hiddentoggle = document.getElementById('hiddentoggle');
// hiddentoggle.addEventListener("click", function () {
//   var ctr=0;
//   let hidden = document.getElementById('hidden');
//   if(hidden.style.display=="none")
//   {
//     window.setTimeout(function(){
//       hidden.style.display = 'block';
//       fadein();
//     },0);
//   }
//   else
//   {
//     fadeout();
//     window.setTimeout(function(){
//       hidden.style.display = 'none';
//     },700);
//   }
//
//   function fadein(){
//     hidden.style.opacity = ctr !== 10 ? '0.'+ctr : 1;
//     hidden.style.transform = ctr !== 10 ? 'scale('+('0.'+ctr)+')' : 'scale(1)';
//     ctr++;
//
//     if (ctr < 11)
//       requestAnimationFrame(fadein);
//
//     else
//       ctr = 0;
//   }
//
//   function fadeout(){
//     hidden.style.opacity = 1 - ('0.'+ctr);
//     hidden.style.transform = 'scale('+(1 - ('0.'+ctr))+')';
//     ctr++;
//
//     if (ctr < 10)
//       requestAnimationFrame(fadeout);
//     else
//       ctr = 0;
//   }
// })

// adding the notes

let addBtn = document.getElementById('addBtn');
addBtn.addEventListener("click", function (e) {
  let addTxt = document.getElementById("addTxt");
  let addLink = document.getElementById("addLink");
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  }
  else {
    notesObj = JSON.parse(notes)
  }
  notesObj.push({"text" : addTxt.value , "link" : addLink.value});
  localStorage.setItem("notes", JSON.stringify(notesObj));
  addTxt.value = "";
  addLink.value = "";
  console.log(notesObj);
  notesTile();
})

function notesTile() {
  let notes = localStorage.getItem("notes")
  if (notes == null) {
    notesObj = [];
  }
  else {
    notesObj = JSON.parse(notes);
  }
  console.log(notesObj);
  let notesComponent = "";
  notesObj.forEach(function (element, index) {
    notesComponent += `
    <div class="noteCard card my-2 mx-2 bg-dark text-white" style="border-radius: 20px">
    <div class="card-body">
    <h5 class="card-title"><b>Item #${index + 1} </b></h5>
    <a href=${element.link}><p class="card-text">${element.text}</p></a>
    </div>
    </div>
    `;
  });
  let notesElm = document.getElementById('notes');
  if (notesObj.length != 0) {
    notesElm.innerHTML = notesComponent;
  }
  else {
    notesElm.innerHTML = `<p> Its quite lonely here 😕 <br> Add something to start Reading!`
  }

}

// displaying the notes

function tabsTile() {
  let tabs = localStorage.getItem("tabs")
  if (tabs == null) {
    tabsObj = [];
  }
  else {
    tabsObj = JSON.parse(tabs);
    if(tabsObj.length==0)
    {
      console.log("style");
      document.getElementById("removeTab").style.display = "none";
    }
    else
      document.getElementById("removeTab").style.display = "inline-block";
  }
  for(var i=0;i<tabsObj.length;i++)
  {
    console.log("here2");
    var a = document.createElement("a");
    var node = document.createElement("li");
    a.textContent = tabsObj[i].title;
    a.setAttribute('href' , tabsObj[i].url);
    node.appendChild(a);
    document.getElementById("opentab").appendChild(node);
  }

}

// removing all notes

let removeBtn = document.getElementById('removeBtn');
removeBtn.addEventListener("click", function () {
  console.log('The note is being deleted');
  let notes = localStorage.getItem("notes")
  if (notes == null) {
    notesObj = [];
  }
  else {
    notesObj = JSON.parse(notes);
  }
  notesObj.splice(0);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  notesTile();
})

// the search button

let search = document.getElementById('searchText');
search.addEventListener("input", function () {

  let inputVal = search.value.toLowerCase();
  console.log("input event", inputVal);
  let noteCards = document.getElementsByClassName('noteCard');
  Array.from(noteCards).forEach(function (element) {
    let cardText = element.getElementsByTagName("p")[0].innerText;
    if (cardText.includes(inputVal)) {
      element.style.display = "block";
    }
    else {
      element.style.display = "none";
    }
    console.log(cardText)
  })


})