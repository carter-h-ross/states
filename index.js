let allGuesses = []; // https://www.worldometers.info/world-population/population-by-country/

function addRow(country, score) {
    console.log(`score: ${score} | country: ${country}`);
    const gridContainer = document.getElementById("gridContainer");
    gridContainer.innerHTML = ""; // Clear previous content
    allGuesses.push([score, country]);
    allGuesses.sort((a, b) => a[0] - b[0]);

    for (let i = 0; i < allGuesses.length; i++) {
        const newRow = document.createElement("div");
        const scoreFraction = (data.length - allGuesses[i][0]) / data.length;
        newRow.classList.add("grid-item");
        newRow.textContent = `${allGuesses[i][0]} ${allGuesses[i][1]}`;
        let red = 0;
        let green = 0;
        if (scoreFraction <= 0.5) {
            green = Math.floor(scoreFraction * 510);
            red = 255;
        } else {
            red = Math.floor((1 - scoreFraction) * 510);
            green = 255;
        }

        newRow.style.background = `linear-gradient(to right, rgb(${red}, ${green}, 0) ${scoreFraction * 100}%, white ${scoreFraction * 100}%)`;
        newRow.style.padding = "20px";
        newRow.style.marginTop = "5px";
        newRow.style.border = "1px solid black";
        newRow.style.borderRadius = "10px";
        gridContainer.appendChild(newRow);
    }
}

function rgbToHex(r, g, b) {
    var redHex = r.toString(16).padStart(2, '0');
    var greenHex = g.toString(16).padStart(2, '0');
    var blueHex = b.toString(16).padStart(2, '0');
    return "#" + redHex + greenHex + blueHex;
}

//////////////////////////////////////////////////
//////////////////////////////////////////////////

function isNumber(input) {
    // regular expression patterns
    const integerPattern = /^\d+$/;
    const decimalPattern = /^\d+\.\d+$/;
    const commaDecimalPattern = /^\d{1,3}(,\d{3})*(\.\d+)?$/;

    if (integerPattern.test(input) || decimalPattern.test(input) || commaDecimalPattern.test(input)) {
        return true;
    } else {
        return false;
    }
}

function stringTo2DList(inputString) {
    const lines = inputString.split('\n');
    const result = [];
    for (let line of lines) {
        line = line.toLowerCase(); // Convert line to lowercase
        const words = line.split(/\s+/);
        for (let i = 1; i < words.length; i++) {
            if (!(isNumber(words[i]))) {
                words[0] += ` ${words[i]}`
                words.splice(i, 1);
                i--;
            }
        }
        // random fix for bug I can't explain
        if (words[0] == "afghanistan ") {
            words[0] = "afghanistan";
        }
        result.push(words);
    }

    console.log(result);
    return result;
}


function getCountryIndex (countryName) {
    return data.findIndex(country => country[0] === countryName.toLowerCase());
}

function getCountryScoreIndex (countryName) {
    return scores.findIndex(country => country[0] === countryName.toLowerCase());
}

function scoresList(relateIndex) {
    console.log(relateIndex)
    let scores = [];
    for (let params of data) {
        dist = 0;
        for (let i = 2;i < params.length;i++) {
            dist += Math.abs(parseFloat(params[i]) - parseFloat(data[relateIndex][i]));
        }
        scores.push([params[0], dist]);
    }
    // Sort the scores array based on the dist variable (index 1)
    scores.sort((a, b) => a[1] - b[1]);

    console.log(scores);
    return scores;
}

function isCountry(countryName) {
     // Check if the countryName exists in allGuesses array
     const existingGuess = allGuesses.find(guess => guess[1].toLowerCase() === countryName.toLowerCase());
     if (existingGuess) {
         alert(`${countryName} has already been guessed.`);
         return false;
     }

    // Assuming data is defined outside of this function
    for (let params of data) {
        if (params[0].toLowerCase() == countryName.toLowerCase()) {
            return true;
        }
    }
    return false;
}


function startGame() {
    while (true) {
        const nextGuess = prompt("guess a country: ")
        if (isCountry(nextGuess)) {
            console.log(`valid guess of , the distance of your guess was ${getCountryScoreIndex(nextGuess)}`);
        } else {
            console.log(`${nextGuess} is not a valid guess of a country`);
        }
    }
}

document.addEventListener("DOMContentLoaded", function() {
    const input = document.querySelector('.input');
    input.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            const countryName = input.value.trim(); // Get the trimmed value of the input
            input.value = "";
            if (isCountry(countryName)) {
                addRow(countryName , getCountryScoreIndex(countryName));
            } else {
                alert(`${countryName} is not a valid guess of a country`);
            }
        }
    });
});


// Example usage:
const inputString = `Alabama 67.5 26.59 0.51 1.39 0.04 3.97
Alaska 63.36 3.24 14.56 6.42 1.42 11
Arizona 73.77 4.53 4.34 3.33 0.2 13.82
Arkansas 75.37 15.2 0.64 1.53 0.35 6.92
California 56.05 5.72 0.79 14.83 0.38 22.23
Colorado 81.52 4.15 0.94 3.2 0.16 10.04
Connecticut 74.22 10.7 0.25 4.57 0.03 10.22
Delaware 67.44 21.99 0.37 3.98 0.07 6.15
Florida 71.64 15.94 0.26 2.78 0.06 9.32
Georgia 57.25 31.57 0.33 4.13 0.07 6.65
Hawaii 24.15 1.88 0.25 37.64 10.4 25.68
Idaho 88.41 0.66 1.31 1.4 0.18 8.05
Illinois 69.79 14.13 0.27 5.58 0.04 10.2
Indiana 82.28 9.44 0.21 2.37 0.03 5.67
Iowa 89.09 3.72 0.33 2.52 0.13 4.22
Kansas 82.96 5.69 0.76 2.99 0.08 7.52
Kentucky 86.25 8.1 0.19 1.53 0.07 3.87
Louisiana 61.25 32.17 0.56 1.73 0.04 4.25
Maine 93.68 1.39 0.66 1.14 0.01 3.12
Maryland 54.24 29.86 0.26 6.37 0.04 9.22
Massachusetts 76.56 7.47 0.2 6.78 0.04 8.95
Michigan 77.56 13.64 0.5 3.18 0.03 5.09
Minnesota 81.64 6.43 0.97 4.91 0.04 6
Mississippi 58 37.68 0.47 1 0.04 2.82
Missouri 81.29 11.4 0.4 2.02 0.15 4.75
Montana 87.8 0.56 6.17 0.82 0.06 4.6
Nebraska 85.31 4.78 0.88 2.49 0.06 6.48
Nevada 62.08 9.33 1.24 8.33 0.71 18.32
New Hampshire 91.98 1.55 0.16 2.7 0.03 3.57
New Jersey 65.5 13.39 0.25 9.65 0.04 11.17
New Mexico 70 2.07 9.31 1.61 0.09 16.93
New York 62.31 15.39 0.39 8.58 0.05 13.28
North Carolina 67.58 21.35 1.16 2.97 0.07 6.86
North Dakota 85.68 3.15 5.15 1.58 0.13 4.32
Ohio 80.47 12.36 0.18 2.3 0.03 4.67
Oklahoma 71.15 7.29 7.69 2.2 0.16 11.51
Oregon 82.59 1.89 1.09 4.5 0.39 9.54
Pennsylvania 79.37 11.09 0.16 3.51 0.03 5.83
Rhode Island 79 6.54 0.41 3.45 0.07 10.52
South Carolina 66.51 26.45 0.33 1.64 0.07 5
South Dakota 83.61 2.14 8.53 1.41 0.06 4.25
Tennessee 76.73 16.67 0.25 1.81 0.06 4.47
Texas 69.16 12.1 0.48 4.94 0.09 13.22
Utah 85.14 1.21 1.05 2.32 0.93 9.34
Vermont 93.6 1.28 0.3 1.62 0.03 3.17
Virginia 66.32 19.05 0.27 6.7 0.07 7.6
Washington 73.53 3.86 1.22 8.82 0.68 11.88
West Virginia 92.52 3.56 0.17 0.79 0.03 2.93
Wisconsin 84.3 6.34 0.84 2.81 0.05 5.67
Wyoming 90.35 0.87 2.26 0.84 0.1 5.58`

let data = stringTo2DList(inputString);

const todaysIndex = getCountryIndex("Maryland".toLowerCase());
let scores = scoresList(todaysIndex);

let guesses = [];

// startGame();
