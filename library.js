let myLibrary =[];
let bookDisplayed=[];
let bookDiv;
let bookGrid;
let childSelector;
let parentSelector;
let tempArray=[]
let span;

function Book(Book_Name,Author,Pages,Read){
    this.Book_Name=Book_Name,
    this.Author=Author,
    this.Pages= Pages,
    this.Read= Read,
    this.BookNo=0
}

Book.prototype.updateBookNo=function (){
    this.BookNo= myLibrary.findIndex(Book);
}

function darken(){
    console.log('executed')
    let us = document.getElementById('Button');
    us.style.backgroundColor='#ababab';
    console.log('done')
}
function lighten(){
    console.log('notExecuted')
    document.getElementById('Button').style.backgroundColor='#e5e5e5'
}
function clearDiv(){
    console.log('executed');
    let displayBooks = document.getElementById('displayBooks');
    displayBooks.innerHTML='';
}

function indexOfObjects(){
    console.log(myLibrary)
    for (let i=0; i<myLibrary.length;i++){
        console.log(i);
        console.log(myLibrary[i])
        console.log('hello');
        myLibrary[i].BookNo=i;
        console.log(i)
    }
}

function readOrNotReadFunction(e){
    span = document.getElementById(`read${e.target.index}`)
    let value = (e.target.textContent);
    if (value=='Read'){
        console.log('1st executed')
        myLibrary[e.target.index].Read='NotRead';
        span.textContent='NotRead';
    }else{
        console.log('2nd executed')
        myLibrary[e.target.index].Read='Read';
        span.textContent='Read';
    }
    console.log(myLibrary)
}
function darkest(){
    document.getElementById('Button').style.backgroundColor='#686868'   
}

function readButton(object){
    span = document.getElementById(`read${object.BookNo}`)
    span.addEventListener('click',readOrNotReadFunction)
    span.index=object.BookNo;
}

function removeCurrentBook(e){
    let id = e.target.id;
    console.log(id);
    console.log('this is executed')
    let child =document.getElementById(`Book${id}`);
    let parentSelector= document.getElementById('displayBooks');
    parentSelector.removeChild(child);
    console.log(myLibrary)
    console.log('its happening')
    delete myLibrary[id];
    console.log('done')
    myLibrary =myLibrary.flat()
    console.log('indexOFObject')
    indexOfObjects()
}

function deleteButtonBookCard(object){
    let deleteButton=document.createElement('div');
    let bookCard = document.getElementById(`Book${object.BookNo}`);
    bookCard.appendChild(deleteButton);
    deleteButton.textContent='X'
    deleteButton.setAttribute('class','BCDeleteButton');
    deleteButton.setAttribute('id',`${object.BookNo}`)
    deleteButton.addEventListener('click',removeCurrentBook)
}

function DisplayBookCard(object){
    let newObject=object;
    let bookCard = document.createElement('div');
    let parentSelector = document.getElementById('displayBooks');
    parentSelector.appendChild(bookCard);
    let bookName = document.createElement('p');
    let authorName = document.createElement('p');
    let pages = document.createElement('p');
    let read = document.createElement('p');
    bookCard.appendChild(bookName);
    bookCard.appendChild(authorName);
    bookCard.appendChild(pages);
    bookCard.appendChild(read);
    bookName.textContent=`Title: ${object.Book_Name}`;
    authorName.textContent=`Author: ${object.Author}`;
    pages.textContent=`Pages: ${object.Pages}`;
    read.innerHTML=`Is it read: <span id= 'read${object.BookNo}'>${object.Read}<span>`;
    bookCard.setAttribute('class','BookCard');
    bookCard.setAttribute('id',`Book${object.BookNo}`);
    deleteButtonBookCard(newObject);
    readButton(newObject);
}

function displayBook(){
    let displayBooks = document.getElementById('displayBooks');
    displayBooks.innerHTML='';
    indexOfObjects();
    for (let i=0;i<myLibrary.length;i++){
        DisplayBookCard(myLibrary[i])
    }
}

function bringAddButton(){
    let childSelector= document.createElement('div');
    let parentSelector= document.getElementById('Button');
    let p = document.createElement('p')
    parentSelector.appendChild(childSelector);
    childSelector.appendChild(p);
    p.textContent='Click me to add a Book';
    childSelector.setAttribute('class','addMore');
    childSelector.addEventListener('mouseover',darken);
    childSelector.addEventListener('mouseout',lighten);
    childSelector.addEventListener('mousedown',darkest);
    childSelector.addEventListener('mouseup',lighten)
    childSelector.addEventListener('click',clearDiv)
    childSelector.addEventListener('click', PopUp);
}

function removePopUp(){
    let childSelector = document.getElementById('popup');
    let parentSelector = document.getElementById('displayBooks');
    parentSelector.removeChild(childSelector);
    displayBook()
}

function deleteButton(){ 
    let childSelector= document.getElementById('popup');
    console.log(childSelector)
    let cancelButton = document.createElement('div');
    console.log(cancelButton)
    childSelector.appendChild(cancelButton);
    cancelButton.textContent='X'
    cancelButton.setAttribute('class','cancelButton');
    cancelButton.addEventListener('click', bringAddButton);
    cancelButton.addEventListener('click',removePopUp)
}

function removeAddButton(){
    let button = document.querySelector('.addMore');
    let parentSelector= document.getElementById('Button');
    parentSelector.removeChild(button)
}

function submitBookDetails(){
    let name = document.getElementById('nameInput').value;
    let pages= document.getElementById('pagesInput').value;
    let authorName= document.getElementById('authorNameInput').value;
    let radioValue = document.querySelector('input[name="ReadOrNotRead"]:checked').value;
    if (name ==''&&pages==''&&authorName==''){ 
        return false
    }else{
    let newBook = new Book(name,pages,authorName,radioValue);
    newBook.updateBookNo(newBook);
    myLibrary.push(newBook);
    console.log(myLibrary);
    return true;
    }
}

function submitAndClear(){
    if(submitBookDetails()){
    removePopUp();
    displayBook();
    bringAddButton();
    }else{
        alert('Please fill all the forms')
    }
}


function PopUpContent(selector){
    selector.setAttribute('class','PopUpStyle');
    let childSelector= document.getElementById('popup');
    let name = document.createElement('p');
    let nameInput = document.createElement('input');
    let authorName = document.createElement('p');
    let authorNameInput = document.createElement('input');
    let pages = document.createElement('p');
    let pagesInput = document.createElement('input');
    let read= document.createElement('p');
    let checkBoxRead = document.createElement('input');
    let checkBoxReadLabel = document.createElement('label');
    let checkBoxNotRead = document.createElement('input');
    let checkBoxNotReadLabel = document.createElement('label');
    let SubmitButton = document.createElement('button');
    childSelector.appendChild(name);
    childSelector.appendChild(nameInput);
    childSelector.appendChild(authorName);
    childSelector.appendChild(authorNameInput);
    childSelector.appendChild(pages);
    childSelector.appendChild(pagesInput);
    childSelector.appendChild(read);
    childSelector.appendChild(checkBoxRead);
    childSelector.appendChild(checkBoxReadLabel);
    childSelector.appendChild(checkBoxNotRead);
    childSelector.appendChild(checkBoxNotReadLabel);
    childSelector.appendChild(SubmitButton);
    pagesInput.type='number';
    nameInput.id='nameInput';
    authorNameInput.id='authorNameInput';
    pagesInput.id='pagesInput';
    checkBoxRead.name='ReadOrNotRead';
    checkBoxNotRead.name ='ReadOrNotRead';
    checkBoxNotRead.value='NotRead';
    checkBoxNotRead.id='NotRead';
    checkBoxRead.value='Read';
    checkBoxRead.checked='checked'
    checkBoxNotRead.id='Read';
    checkBoxNotReadLabel.for='NotRead';
    checkBoxReadLabel.for='Read';
    checkBoxNotRead.type='radio';
    checkBoxRead.type='radio';
    read.textContent='Read the Book?'
    checkBoxReadLabel.textContent='Read';
    checkBoxNotReadLabel.textContent='Not Read'
    name.setAttribute('id','BookName');
    authorName.setAttribute('id','authorName');
    pages.setAttribute('id','Pages');
    SubmitButton.textContent='Submit';
    name.textContent='Name of the Book';
    authorName.textContent='Author of the Book';
    pages.textContent='No of Pages in the Book';
    nameInput.id='nameInput';
    authorNameInput.id='authorNameInput';
    pagesInput.id='pagesInput';
    SubmitButton.id='SubmitButton';
    SubmitButton.className='SubmitButton'
    SubmitButton.addEventListener('click',submitAndClear)
}

function PopUp(){
    removeAddButton()
    let popUpSelector = document.createElement('div');
    parentSelector=document.getElementById('displayBooks');
    parentSelector.appendChild(popUpSelector);
    popUpSelector.setAttribute('id','popup')
    deleteButton();
    PopUpContent(popUpSelector);
}

childSelector=document.querySelector('.addMore');
childSelector.addEventListener('mouseover',darken);
childSelector.addEventListener('mouseout',lighten);
childSelector.addEventListener('mousedown',darkest);
childSelector.addEventListener('mouseup',lighten)
childSelector.addEventListener('click',clearDiv);
childSelector.addEventListener('click', PopUp);