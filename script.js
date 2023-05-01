let carDoor = null;
let goatCounterStay = 0;
let prizeCounterStay = 0;
let goatCounterSwitch = 0;
let prizeCounterSwitch = 0;

let autoRevealDoor = null;
let selectedDoor = null;
let stayDoor = null;
let switchDoor = null;


async function stayAction() {
    hideOptions();
    revealDoor(stayDoor);
}

async function switchAction() {
    hideOptions();
    revealDoor(switchDoor);
}

async function randomize() {
    carDoor = Math.floor(Math.random() * 3);
}

function randomIndex(ind) {
    var num = Math.floor(Math.random() * 3)
    while (num == ind){
        num = Math.floor(Math.random() * 3)
    }
    return num
}

async function selectInitialDoor(door) {
    if (carDoor == null) {
        randomize();
    } else {
        alert("You have already selected a door, please select an action.");
        return;
    }
    selectedDoor = door;
    //alert("Selected Door: " + selectedDoor + " carDoor: " + carDoor);
    if (selectedDoor == carDoor) {
        autoRevealDoor = randomIndex(selectedDoor);
    } else {
        autoRevealDoor = 3 - selectedDoor - carDoor;
    }
    revealInitialDoor(autoRevealDoor);
    stayDoor = door;
    switchDoor = 3 - selectedDoor - autoRevealDoor;
    showOptions();
}

async function updateCounters() {
    document.getElementById("Goat_Counts_Stay").innerHTML = "Goat Count: " + goatCounterStay;
    document.getElementById("Prize_Counts_Stay").innerHTML = "Prize Count: " + prizeCounterStay;
    document.getElementById("Goat_Counts_Switch").innerHTML = "Goat Count: " + goatCounterSwitch;
    document.getElementById("Prize_Counts_Switch").innerHTML = "Prize Count: " + prizeCounterSwitch;
    if (prizeCounterStay + goatCounterStay == 0) {
        document.getElementById("Percentage_Stay").innerHTML = "Percentage: 0%";
    } else {
        document.getElementById("Percentage_Stay").innerHTML = "Percentage: " + Math.round((prizeCounterStay/(prizeCounterStay + goatCounterStay)) * 100) + "%";
    }

    if (prizeCounterSwitch + goatCounterSwitch == 0) {
        document.getElementById("Percentage_Switch").innerHTML = "Percentage: 0%";
    } else {
        document.getElementById("Percentage_Switch").innerHTML = "Percentage: " + Math.round((prizeCounterSwitch/(prizeCounterSwitch + goatCounterSwitch)) * 100) + "%";
    }
}

async function revealInitialDoor(door) {
    //var id_name = door + 1;
    document.getElementById(door + "door").src = "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Goat_cartoon_04.svg/2070px-Goat_cartoon_04.svg.png";

    //update door to goat
    //alert("Revealed door: " + door);
}

function revealDoor(door) {
    if (door == null) {
        alert("Please select a door before trying to stay or switch");
    }

    if (door == carDoor) {
        if (door == selectedDoor) {
            prizeCounterStay = prizeCounterStay + 1;
        } else {
            prizeCounterSwitch = prizeCounterSwitch + 1;
        }
        updateCounters();
        document.getElementById(door + "door").src = "https://static.vecteezy.com/system/resources/previews/001/193/897/non_2x/sedan-car-png.png";
    } else {
        if (door == selectedDoor) {
            goatCounterStay = goatCounterStay + 1;
        } else {
            goatCounterSwitch = goatCounterSwitch + 1;
        }
        updateCounters();
        document.getElementById(door + "door").src = "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Goat_cartoon_04.svg/2070px-Goat_cartoon_04.svg.png";
    }
    //alert("Revealed door: " + door);
}

function delay(milliseconds){
    return new Promise(resolve => {
        setTimeout(resolve, milliseconds);
    });
}

async function showOptions() {
    document.getElementById("stay").style.display = "flex";
    document.getElementById("switch").style.display = "flex";
}

async function hideOptions() {
    document.getElementById("stay").style.display = "none";
    document.getElementById("switch").style.display = "none";
}

async function playAgain() {
    carDoor = null;
    selectedDoor = null;
    autoRevealDoor = null;
    stayDoor = null;
    switchDoor = null;
    for (i = 0; i<3; i++) {
        document.getElementById(i + "door").src = "https://www.freepnglogos.com/uploads/door-png/animated-door-clipart-downloadclipart-32.png";
    }
    hideOptions();
}

async function simulate() {
    var trials = document.getElementById("count").value;
    if (trials == null) {
        alert("Please enter the number of trials");
    } else {
        multipleSimulate(trials);
    }
}

async function multipleSimulate(trials) {
    var randomDoor = null;
    var randomAction = null;
    for (let i = 0; i < trials; i++) {
        setTimeout(function() {
            randomDoor = Math.floor(Math.random() * 3);
            randomAction = Math.floor(Math.random() * 2);
            selectInitialDoor(randomDoor);
            if (randomAction == 0) {
                stayAction();
            } else {
                switchAction();
            }
            playAgain();
        }, 100 * i)
    }
    showOptions();
}