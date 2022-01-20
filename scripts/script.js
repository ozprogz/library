let myLibrary =[];
const exampleBook = new Book("Harry Potter and the Philosopher's Stone", "J. K. Rowling", 223, "read");
myLibrary.push(exampleBook);

function Book(title, author, pages, read){
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    
}

function addBooktoLibrary(){
    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const pages = document.querySelector("#pages").value;
    const read = document.querySelector("#read").value;
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    removeElement(document.getElementById("myTable"));
    addBook();
}

const submitButton = document.querySelector(".submit");
submitButton.addEventListener("click", addBooktoLibrary);




function addBook(){
    
    let x = document.createElement("TABLE");
    x.setAttribute("id", "myTable");
    document.body.appendChild(x);

    for(let i =0; i < myLibrary.length;i++){
        let row = document.createElement("TR");
        row.setAttribute("id", `${i}`)
        console.log(row);
        let cell = document.createElement("TD");
        let cellContent = document.createTextNode(Object.values(myLibrary[i]))
        cell.appendChild(cellContent);
        row.appendChild(cell);
        let button = document.createElement("button");
        //button.setAttribute("id", `button-${i}`);
        //button.setAttribute("class", "remove");
        button.addEventListener("click", (i)=>{
            if(button.parentElement.nodeName==="TR") {
                removeElement(button.parentElement);
                myLibrary.splice(i,1)
            }
            
        })
        row.appendChild(button);
        document.getElementById("myTable").appendChild(row);

  }
}
function removeElement(x){
    if(x!== null) x.remove();
}