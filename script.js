var turn = 0;
let time = 0;
let end = 0;
let last_added = {};
let empty = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
let botOn = false;

function game(id) {
    if (botOn) {
        withBot(id);
    } else {
        withoutBot(id);
    }
}

function chooseGameType(id) {
    let button = document.getElementById(id);
    if (!botOn) {
        button.textContent = "BotOn";
        button.style.backgroundColor = "beige";
        botOn = true;
    } else {
        button.textContent = "BotOff";
        button.style.backgroundColor = "White";
        botOn = false;
    }
}

function randomChoice(choices) {
    var index = Math.floor(Math.random() * choices.length);
    return choices[index];
}

function chooseText(id) {
    let text = document.getElementById(id);
    if (empty.length == 9) {
        if (turn == 0) {
            text.textContent = "Turn: O";
            turn = 1;
        }  else {
            text.textContent = "Turn: X";
            turn = 0;
        }
    } else {
        alert("Че за хуйня, мухлевать никто не разрешал");
    }
}

function withBot(id) {
    if (end != 1) {
        let field = document.getElementById(id)
        if (field.textContent == "X" || field.textContent == "O") {
            return 0;
        }
        
        field.textContent = (turn == 0) ? "X" : "O";
        field.style.backgroundColor = "White"

        time++;
        last_added[id] = "X";
        
        let index = empty.findIndex(item => item == id);
        if (index !== -1) {
            empty.splice(index, 1);
        }

        if (time >= 4) {
            check(id);
        }

        if (time == 9) {
            if(!check(id)) {
                draw();
            }
        }
    }
    if (end != 1) {
        let rand = parseInt(randomChoice(empty));
        let bot = document.getElementById(rand);
        bot.textContent = (turn == 0) ? "O":"X";
        bot.style.backgroundColor = "White"

        time++;
        last_added[rand] = "O";

        index = empty.findIndex(item => item == rand);
        if (index !== -1) {
            empty.splice(index, 1);
        }

        if (time == 9) {
            if(!check(id)) {
                draw();
            }
        }

        if (time >= 4) {
            check(rand);
        }
        
    }
}


function withoutBot(id){
    if (end != 1) {
        let field = document.getElementById(id)
        if (field.textContent == "X" || field.textContent == "O") {
            return 0;
        }
        if (turn == 0) {
            field.textContent = "X";
            field.style.backgroundColor = "White"

            turn = 1;
            time++;
            document.getElementById("text").textContent = "Turn: O";
    
            last_added[id] = "X";
            let index = empty.findIndex(item => item == id);
            if (index !== -1) {
                empty.splice(index, 1);
            }
            
            if (time == 9) {
                if(!check(id)) {
                    draw();
                }
            }

        } else 
        if (turn == 1) {
            field.textContent = "O";
            field.style.backgroundColor = "White"
    
            turn = 0;
            time++;
            document.getElementById("text").textContent = "Turn: X";
    
            last_added[id] = "O";
            index = empty.findIndex(item => item == id);
            if (index !== -1) {
                empty.splice(index, 1);
            }

            if (time == 9) {
                if(!check(id)) {
                    draw();
                }
            }

            
        }
    
        if (time >= 4) {
            check(id);
        }
    }
}

function changeColor(color) {
    document.getElementsByClassName("button").style.backgroundColor = color;
}

function restart() {
    for (let i = 1; i <= 9; i++) {
        let button = document.getElementById(i);
        button.style.backgroundColor = "beige";
        button.textContent = "";
    }
    empty = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

    last_added = {};

    end = 0
    time = 0;

    document.getElementById("text").textContent ="Turn: " + ((turn == 0) ? "X":"O");
}

function draw() {
    if (end != 1) {
        for (let i = 1; i <= 9; i++) {
            document.getElementById(i).style.backgroundColor = "Red";
        }
        document.getElementById("text").textContent = "Draw";
        end = 1;
    }
}

function check_fied(id, id1, id2, id3) {
    if (id == id1 || id == id2 || id == id3) {
        if (last_added[id1] == last_added[id2] && last_added[id1] == last_added[id3]) {
            document.getElementById(id1).style.backgroundColor = "Green"; 
            document.getElementById(id2).style.backgroundColor = "Green";
            document.getElementById(id3).style.backgroundColor = "Green";
            end = 1;
            document.getElementById("text").textContent = last_added[id] + " won";
            return true;
        } else return false;
    } else {
        return false;
    }
}

function check(id) {
    check_fied(id, 1, 2, 3);

    check_fied(id, 1, 4, 7);

    check_fied(id, 1, 5, 9);

    check_fied(id, 3, 6, 9);

    check_fied(id, 3, 5, 7);

    check_fied(id, 4, 5, 6);

    check_fied(id, 7, 8, 9);

    check_fied(id, 2, 5, 8);
}