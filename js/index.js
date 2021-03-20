console.log('welcome to notes app');
shownotes();
document.body.addEventListener("click",()=>{
    // console.log("clicked");
    checkcaragory();
});


// --------------------------------------------selecting category and returning ------------------------------------
function selectedcatogory(){
    let selectvalue;
    if(document.getElementById('generalselect').checked)
    {
        selectvalue = document.getElementById('generalselect').value.toUpperCase();
    }
    else if(document.getElementById('personalselect').checked)
    {
        selectvalue = document.getElementById('personalselect').value.toUpperCase();
    }
    else if(document.getElementById('businessselect').checked)
    {
        selectvalue = document.getElementById('businessselect').value.toUpperCase();
    }
    else if(document.getElementById('familyselect').checked)
    {
        selectvalue = document.getElementById('familyselect').value.toUpperCase();
    }
    return selectvalue;
};


// -----------------------------------------------------adding notes -------------------------------------------------
// if user adds a note, add it to the local storage 
let addbtn = document.getElementById('addbtn');
addbtn.addEventListener('click',(e)=>{
    // category
    let selectvalue = selectedcatogory();
    // title and value of notes 
    let addtxt = document.getElementById("addtext");
    let addtitle = document.getElementById("addtitle");
    let notearray = [selectvalue,addtitle.value,addtxt.value];
    // console.log(notearray);
    let notes = localStorage.getItem('notes');
    let notesobj;
    if(notes==null)
    {
        notesobj = [];
    }
    else
    {
        notesobj = JSON.parse(notes);
    }
    if(addtxt.value === "" || addtitle.value=="")
    {
        alert('Please enter value of Notes');
    }
    else
    {
        notesobj.push(notearray);
        localStorage.setItem('notes',JSON.stringify(notesobj));
        addtxt.value = "";
        addtitle.value = "";
        // console.log(notesobj);
        shownotes();
    }
}); 


// --------------------------------------------------------showing all notes-------------------------------------------------
function shownotes(){
    let notes = localStorage.getItem('notes');
    if(notes==null)
    {
        notesobj = [];
    }
    else
    {
        notesobj = JSON.parse(notes);
    }
    let html = "";
    notesobj.forEach(function(element,index){
        html += `
            <div class="notecard my-2 mx-2 card" style="width: 24rem;">
                <div class="card-body">
                    <p class="card-text" style="font-weight:700;">${element[0]}</p>
                    <p class="card-text" style="font-weight:700;"><span style="font-weight:700; color:black">Title</span> : ${element[1]}</p>
                    <p class="card-text" style="font-weight:700;"><span style="font-weight:700; color:black">Your Note</span> : ${element[2]}</p>
                    <button id="${index}" onclick="deletenote(this.id)" class="btn addnotebtn">Delete Note</button>
                </div>
            </div>`
    });
    let noteselement = document.getElementById('notes');
    if(notesobj.length != 0)
    {
        noteselement.innerHTML = html;
    }
    else
    {
        noteselement.innerHTML = `<h3>
        Nothing to Show you ! Because there is no Notes
        </h3> `;
    }
}

// -----------------------------------------deleting part------------------------------------------------ 
function deletenote(index){
    // console.log("i am delete");
    let notes = localStorage.getItem('notes');
    let noteobj = JSON.parse(notes);
    notesobj.splice(index,1);
    localStorage.setItem("notes",JSON.stringify(notesobj));
    shownotes();
}



// ------------------------------------------searching part--------------------------------------------- 
let searchText = document.getElementById("searchText");
let seachbtn = document.getElementById("seachbtn");
function search(e){
    let inputval = searchText.value.toLowerCase();
    // console.log('input',inputval);
    let notecards = document.getElementsByClassName('notecard');
    Array.from(notecards).forEach(function(element){
        let  cardtext  = element.getElementsByTagName('p')[1].innerText;
        if(cardtext.includes(inputval))
        {
            element.style.display = "block";
        }
        else
        {
            element.style.display = "none";
        }
    });
};

searchText.addEventListener("input",function(e){
    // console.log('searching');
    search();
});

seachbtn.addEventListener("click",function(e){
    // console.log('searching');
    search();
});


// ------------------------------------------category wise showing notes------------------------------
function detectcategory(){
    let detectvalue;
    if(document.getElementById('alldetect').checked)
    {
        detectvalue = document.getElementById('alldetect').value.toUpperCase();
    }
    else if(document.getElementById('generaldetect').checked)
    {
        detectvalue = document.getElementById('generaldetect').value.toUpperCase();
    }
    else if(document.getElementById('personaldetect').checked)
    {
        detectvalue = document.getElementById('personaldetect').value.toUpperCase();
    }
    else if(document.getElementById('businessdetect').checked)
    {
        detectvalue = document.getElementById('businessdetect').value.toUpperCase();
    }
    else if(document.getElementById('familydetect').checked)
    {
        detectvalue = document.getElementById('familydetect').value.toUpperCase();
    }
    return detectvalue;
};

// ------------------------------------------------Checking show notes category --------------------------
function checkcaragory(){
    let detectvalue= detectcategory();
    // console.log(detectvalue);
    let notecards = document.getElementsByClassName('notecard');
    Array.from(notecards).forEach(function(element){
        let currrentcatagory = element.getElementsByTagName('p')[0].innerText;
        if(detectvalue == "ALL")
        {
            element.style.display = "block";
        }
        // console.log(currrentcatagory);
        else if(currrentcatagory == detectvalue)
        {
            element.style.display = "block";
        }
        else if(currrentcatagory != detectvalue)
        {
            element.style.display = "none";
        }
    });
};



















/*
Further Features:
1. Add Title  
2. Mark a note as Important
3. Separate notes by user
4. Sync and host to web server 
*/