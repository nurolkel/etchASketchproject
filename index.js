const container = document.querySelector('.container');
let gridRows = 16;
let numOfDivs = gridRows * gridRows;
let gridWidth = 400;
let color = "blackAndWhite"
let gridDivsSize = gridWidth / gridRows;


const id = (id) => document.getElementById(id)

const blackBtn = id('black-btn');
const greyBtn = id('grey-btn');
const rainbowBtn = id('rainbow-btn');
const eraseBtn = id("erase-btn")
const freshBtn = id("fresh-btn")
const numberForm = id("number")
const submitBtn = id("submit-btn")
const formEl = id("form")


formEl.addEventListener('submit',(e) => {
    let message = ""
    if (numberForm.value > 100 || numberForm < 1) {
        message = "Value Must be between 1 and 100"
    }

    e.preventDefault();
    const value = numberForm.value;
    
    
    recalculateGridSize(value)
    resetGrid()
    
    return numberForm.value = "";
    
})

greyBtn.addEventListener('click', (e) => {
    color = "greyColor"
    greyBtn.classList.add('selected')
    blackBtn.classList.remove('selected')
    rainbowBtn.classList.remove('selected')
})
blackBtn.addEventListener('click', (e) => {
    color = "blackAndWhite"
    greyBtn.classList.remove('selected')
    blackBtn.classList.add('selected')
    rainbowBtn.classList.remove('selected')
})
rainbowBtn.addEventListener('click', (e) => {
    color = "rainbowColor"
    greyBtn.classList.remove('selected')
    blackBtn.classList.remove('selected')
    rainbowBtn.classList.add('selected')
})
eraseBtn.addEventListener('click', (e) => {
    color = "eraseColor"
})
freshBtn.addEventListener('click', (e) => {
    freshGrid();
})

function displayGrid() {
    
    for (let i = 0; i < numOfDivs; i++) {
        createDiv();
    }

    let gridItems = document.querySelectorAll('.gridItems')

    gridItems.forEach(grid => {
        grid.addEventListener('mouseenter', (e) => {
            if (color === "blackAndWhite") {
                blackGrid(e)
                
                if (e.target.style.opacity) {
                    e.target.style.opacity = 1.0
                }
            }

            if (color === "greyColor") {
                greyGrid(e)
                
                if (!e.target.style.opacity) {
                    e.target.style.opacity = 0.5;
                } else {
                    let plusOpacity = Number(e.target.style.opacity) + 0.1;
                    e.target.style.opacity = plusOpacity
                }
            }

            if (color === "rainbowColor") {
                rainbowGrid(e)
                
                if (e.target.style.opacity) {
                    e.target.style.opacity = 1.0
                }
            }

            if (color === "eraseColor") {
                eraseGrid(e)
            }

        })
    })

   
   
}

function createDiv() {
    const div = document.createElement('div');
    div.setAttribute('class',"gridItems")
    div.style.cssText = `width: ${gridDivsSize}px; height: ${gridDivsSize}px;`
    container.appendChild(div)
}

function blackGrid(e) {
    color = "blackAndWhite";
    const div = e.target;
    div.style.backgroundColor = "#000000"
    
}

function greyGrid(e) {
    color = "greyColor"
    const div = e.target;
    div.style.backgroundColor = "#333333"
   
}

function rainbowGrid(e) {
    color = "rainbowColor"
    const hex = '0123456789ABCDEF';
    let output = "#"
    for (let i = 0; i < 6; i++) {
    let randomNum = Math.floor(Math.random() * hex.length)
    
    output += hex[randomNum]
    
    }
   
    let div = e.target
    div.style.backgroundColor = `${output}`
    
}

function eraseGrid(e) {
    color = "eraseColor"
    const div = e.target;
    div.style.backgroundColor = "#FFFFFF"
}

function deleteGrid() {
   const gridItems = document.querySelectorAll('.gridItems');
    gridItems.forEach((div) => {
        div.remove();
    })
}

function recalculateGridSize(value) {
    gridRows = value;
    numOfDivs = gridRows * gridRows;
    gridDivsSize = gridWidth / gridRows;
}



function resetGrid() {
    deleteGrid()
    color = "blackAndWhite"
    displayGrid()
}

function freshGrid() {
    deleteGrid();

    gridRows = 16;
    numOfDivs = gridRows * gridRows;
    gridWidth = 400;
    gridDivsSize = gridWidth / gridRows;

    displayGrid();
}


window.addEventListener('load',displayGrid)