function start() {
    const numberOfCols = 20;
    const numberOfRows = 15;
    var boxtop = 200;
    var boxleft = 200;

    var rightPressed = false;
    var leftPressed = false;
    var upPressed = false;
    var downPressed = false;
    var box = document.getElementById("box");

    let map = [
        "    WWWWW          ",
        "    W   W          ",
        "    WB  W          ",
        "  WWW  BWW         ",
        "  W  B B W         ",
        "WWW W WW W   WWWWWW",
        "W   W WW WWWWW  OOW",
        "W B  B          OOW",
        "WWWWW WWW WSWW  OOW",
        "    W     WWWWWWWWW",
        "    WWWWWWW        "
    ]
    const mapLen = map.length;
    const gameBoard = document.getElementById('container');
    const makeGrid = (start) => {
        
        //go through the array.length
        for (let row = 0; row < start.length; row++) {
            const rows = document.createElement('div');
            rows.classList.add('row');
            let playerPos;
            //go through the string
            //add dive + give class
            let string = start[row];
            for (let char = 0; char < string.length; char++) {
                letter = string[char];
                const cell = document.createElement('div');


                if (letter === "W") {
                    cell.classList.add('cell');

                } else if (letter === "S") {
                    // cell.classList.add('box');
                    cell.setAttribute('id', "player");

                } else if (letter === "B") {
                    cell.classList.add('box');


                } else if (letter === "O") {
                    cell.classList.add('goal');


                } else {
                    cell.classList.add('blank');

                }

                rows.appendChild(cell);

            }
            
            gameBoard.appendChild(rows);

        }
        //checks to see if all of the boxes are on the X's for a win scenario
        if (map[6][17] == "B" && map[6][16] == "B" && map[7][17] == "B" && map[7][16] == "B" && map[8][17] == "B" && map[8][16] == "B") {
            
            setTimeout(function(){ alert("you win"); }, 10);
            
        }
        
    }



    makeGrid(map);

    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);

    function keyDownHandler(e) {

        if (e.keyCode == 39) {
            reset(gameBoard);
            for (i = 0; i < map.length; i++) {
                let splitRow = map[i].split("");
                let s = splitRow.indexOf("S");
                let b = splitRow.indexOf("S" + 1);
                //moving the box to the right
                if (map[i].includes("S") && map[i][s + 1] == "B" && map[i][s + 2] !== "W" && map[i][s + 2] !== "B") {

                    splitRow.splice(s, 1, " ");
                    splitRow.splice((s + 1), 2, "S", "B");
                    
                    let joinRow = splitRow.join('');
                    map[i] = joinRow;
                    

                } 
                //moving the player to the right
                else if (map[i].includes("S") && map[i][s + 1] == " ") {

                    splitRow.splice(s, 1);
                    splitRow.splice((s + 1), 0, "S");
                    
                    let joinRow = splitRow.join('');
                    map[i] = joinRow;
                    
                } else {
                    
                }
            }
            makeGrid(map);
            rightPressed = true;
            
            // console.log("right Pressed");
        } else if (e.keyCode == 37) {
            reset(gameBoard);
            for (i = 0; i < map.length; i++) {
                let splitRow = map[i].split("");
                let s = splitRow.indexOf("S");
                let b = splitRow.indexOf("S" - 1);
                if (map[i].includes("S") && map[i][s - 1] == "B" && map[i][s - 2] !== "W" && map[i][s - 2] !== "B") {

                    splitRow.splice(s, 1);
                    splitRow.splice((s - 1), 1);
                    splitRow.splice((s - 1), 0, "S");
                    splitRow.splice((s - 2), 0, "B");
                   
                    let joinRow = splitRow.join('');
                    map[i] = joinRow;
                    

                } else if (map[i].includes("S") && map[i][s - 1] == " ") {

                    splitRow.splice(s, 1);
                    splitRow.splice((s - 1), 0, "S");
                    let joinRow = splitRow.join('');
                    map[i] = joinRow;
                    
                }
            }
            makeGrid(map);
            leftPressed = true;
            // console.log("left Pressed");
        } else if (e.keyCode == 38) {
            reset(gameBoard);
            for (i = 0; i < map.length; i++) {
                if (map[i].includes("S")) {
                    let twoaboveRow = map[i - 2].split('');
                    let aboveRow = map[i - 1].split('');
                    let splitRow = map[i].split('');
                    let s = splitRow.indexOf("S");
                    if (map[i - 1][s] == "W") {
                        break;
                    }
                    if (map[i - 1][s] == "B" && map[i - 2][s] !== "W" && map[i - 2][s] !== "B") {
                        splitRow.splice(s, 1, " ");
                        aboveRow.splice((s), 1, "S");
                        twoaboveRow.splice((s), 1, "B")
                        
                        let joinRow = splitRow.join('');
                        map[i] = joinRow;

                        let joinRow2 = aboveRow.join('');
                        map[i - 1] = joinRow2;

                        let joinRow3 = twoaboveRow.join('');
                        map[i - 2] = joinRow3;

                        
                    } else if (map[i - 1][s] == " ") {
                        splitRow.splice(s, 1, " ");
                        aboveRow.splice((s), 1, "S");
                        
                        let joinRow = splitRow.join('');
                        map[i] = joinRow;

                        let joinRow2 = aboveRow.join('');
                        map[i - 1] = joinRow2;

                        
                    } else {
                        
                    }
                }
            }
            makeGrid(map);
            upPressed = true;
            // console.log("up Pressed");
        } else if (e.keyCode == 40) {
            reset(gameBoard);
            for (i = 0; i < map.length; i++) {
                if (map[i].includes("S")) {
                    let twoUnderRow = map[i + 2].split('');
                    let underRow = map[i + 1].split('');
                    let splitRow = map[i].split('');
                    let s = splitRow.indexOf("S");
                    if (map[i + 1][s] == "W") {
                        break;
                    }
                    if (map[i + 1][s] == "B" && map[i + 2][s] !== "W" && map[i + 2][s] !== "B") {
                        splitRow.splice(s, 1, " ");
                        underRow.splice((s), 1, "S");
                        twoUnderRow.splice((s), 1, "B")
                        
                        let joinRow = splitRow.join('');
                        map[i] = joinRow;

                        let joinRow2 = underRow.join('');
                        map[i + 1] = joinRow2;

                        let joinRow3 = twoUnderRow.join('');
                        map[i + 2] = joinRow3;

                        
                    }
                    if (map[i + 1][s] == " ") {
                        splitRow.splice(s, 1, " ");
                        underRow.splice((s), 1, "S");
                        
                        let joinRow = splitRow.join('');
                        map[i] = joinRow;

                        let joinRow2 = underRow.join('');
                        map[i + 1] = joinRow2;

                        
                    } else {
                        
                    }
                    break;
                }
            }
            downPressed = true;
            makeGrid(map);
            // console.log("down Pressed");
        }
        map = checkX(map);
    }


    function keyUpHandler(e) {
        if (e.keyCode == 39) {
            rightPressed = false;
        } else if (e.keyCode == 37) {
            leftPressed = false;
        } else if (e.keyCode == 38) {
            upPressed = false;
        } else if (e.keyCode == 40) {
            downPressed = false;
        }
    }

    function reset(main) {
        while (main.firstChild) {
            main.removeChild(main.firstChild);
        }
    }
    function checkX(map){
        // puts x's back in the location if theres a blank
        let rowSix = map[6];
        let rowSeven = map[7];
        let rowEight = map[8];
        
        if (map[6][16] == " ") {
            let point = map[6].split('');
            point.splice(16, 1, "O");
            map[6] = point.join('');
        }
        if (map[7][17] == " ") {
            let point = map[7].split('');
            point.splice(17, 1, "O");
            map[7] = point.join('');
        }
        if (map[7][16] == " ") {
            let point = map[7].split('');
            point.splice(16, 1, "O");
            map[7] = point.join('');
        }
        if (map[8][16] == " ") {
            let point = map[8].split('');
            point.splice(16, 1, "O");
            map[8] = point.join('');
            
        }
        return map;
    }
}