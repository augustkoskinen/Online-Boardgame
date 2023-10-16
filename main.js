//variables
const beginbutton = document.querySelector("#beginbutton");
const savebutton = document.querySelector("#savebutton");
const loadbutton = document.querySelector("#loadbutton");
const mapwidth = 10;
const mapheight = 10;
let map;
let mademap= false;

//listeners
beginbutton.addEventListener("click", ()=>{
    let result = true
    if(map!=undefined)
        result = confirm("Are you sure you want to destroy the current map?");
    if(result){
        const oldtable = document.querySelector("#map")
        if(oldtable!=null)
            oldtable.remove();
        map = create2dArray(mapwidth,mapheight,0)
        createGame()
    }
});
savebutton.addEventListener("click", ()=>{
    if(mademap){
        let result = true
        if(localStorage.map!=undefined&&!arraysEqual(map,getObj("map")))
            result = confirm("A map has already been stored. Are you sure you want to overwrite this map?");
        if(result){
            localStorage.storedmap = JSON.stringify(true)
            setObj("map",map)
        }
    }
});
loadbutton.addEventListener("click", ()=>{
    if(localStorage.map!=undefined) {
        let result = true
        if(map!=undefined)
            result = confirm("Are you sure you want to destroy the current map?");
        if(result){
            const oldtable = document.querySelector("#map")
            if(oldtable!=null)
                oldtable.remove();
            map = getObj("map")
            createGame()
        }
    }
});
//creating map
function createGame() {
    let tbl = document.createElement("table");
    let tblBody = document.createElement("tbody");
    let size = getDimSquare(mapwidth)

    for (let i = 0; i < mapheight; i++) {
        let row = document.createElement("tr");
        for (let j = 0; j < mapwidth; j++) {
            const cell = document.createElement("td");
            cell.id = doubDig(i)+doubDig(j)
            cell.style.width = size+"px"
            cell.style.height = size+"px"
            cell.style.cursor = "pointer"
            cell.addEventListener("click", ()=>{
                let pos = decodeID(cell.id)
                map[pos.x][pos.y] = 1
                updatemap(map)
            });
            row.appendChild(cell);
        }
        tblBody.appendChild(row);
    }
    tbl.appendChild(tblBody);
    tbl.id = "map"
    mademap = true
    body.appendChild(tbl);
    // sets the border attribute of tbl to '2'
    tbl.setAttribute("border", "2");
    window.addEventListener("resize", () => {
        let tempcell;
        let tempsize = getDimSquare(mapwidth)
        for (let i = 0; i < mapheight; i++) {
            for (let j = 0; j < mapwidth; j++) {
                tempcell = document.getElementById(String(j).padStart(2,'0')+String(i).padStart(2,'0'))
                tempcell.style.width = tempsize+"px"
                tempcell.style.height = tempsize+"px"
            }
        }
    })
    updatemap(map)
}

//simple functions
function getWidth() {
    return Math.max(
        document.body.scrollWidth,
        document.documentElement.scrollWidth,
        document.body.offsetWidth,
        document.documentElement.offsetWidth,
        document.documentElement.clientWidth
    );
}

function getHeight() {
    return Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight,
        document.documentElement.clientHeight
    );
}

function getDimSquare(w){
    return Math.min(getWidth()/w,64)
}

function create2dArray(x,y,fill){
    var array = []
    for (var i = 0; i < x; i++) {
        array.push([])
        for(var j = 0; j < y; j++) {
            array[i].push(fill)
        }
    }
    return array
}

function updatemap(map){
    let tempcell;
    for (let i = 0; i < mapheight; i++) {
        for (let j = 0; j < mapwidth; j++) {
            if(map[j][i]==0){
                tempcell = document.getElementById(String(j).padStart(2,'0')+String(i).padStart(2,'0'))
                tempcell.style.cursor = "pointer"
                tempcell.style.backgroundImage = "url(Assets/grass.png)"
            } else {
                tempcell = document.getElementById(String(j).padStart(2,'0')+String(i).padStart(2,'0'))
                tempcell.style.cursor = "default"
                tempcell.style.backgroundImage = ""
            }
        }
    }
}

const setObj = function(key, obj){
    return localStorage.setItem(key,JSON.stringify(obj))
}
const getObj = function(key){
    return JSON.parse(localStorage.getItem(key))
}

function doubDig(num){
    return String(num).padStart(2,'0')
}
function decodeID(id){
    return{
        x:(parseInt(id[0]+id[1])),
        y:(parseInt(id[2]+id[3]))
    }
}

function arraysEqual(array1,array2){
    for (let i = 0; i < mapheight; i++) {
        for (let j = 0; j < mapwidth; j++) {
            if(array1[j][i]!=array2[j][i])
                return false
        }
    }
    return true
}
//let interval = setInterval(()=>{mousedown = false; clearInterval(interval)}, 10);