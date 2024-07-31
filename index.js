const matrix = [
    [">", "-", "-", "-", "A", "-", "@", "-", "+"],
    [" ", " ", " ", " ", " ", " ", " ", " ", "|"],
    ["+", "-", "U", "-", "+", " ", " ", " ", "C"],
    ["|", " ", " ", " ", "|", " ", " ", " ", "|"],
    ["s", " ", " ", " ", "C", "-", "-", "-", "+"],
];

// Returns true if the char is -, @, +, | or a capital letter
const isValidChar = (char) => {
    const validCharacters = ["-", "@", "+", "|"];
    return validCharacters.includes(char) || (char >= "A" && char <= "Z");
};

// Returns an object of the position of the first char ">"
const findStartPosition = (matrix) => {
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] === ">") {
                return { x: i, y: j };
            }
        }
    }
    return { x: 0, y: 0 }; // If ">" is not found
};

// Desides wheather a move in a specific direction is valid based on 
// 1. the move should be within the matrix bounds
// 2. the char should be valid
// 3. the direction is not the opposite, to prevent going backwards
const canMove = (direction, x, y, newDirection) => {
    let newX, newY;

    switch (newDirection) {
        case "right":
            newX = x;
            newY = y + 1;
            return newY < matrix[x].length && 
                   isValidChar(matrix[x][newY]) && 
                   direction !== "left";
        case "left":
            newX = x;
            newY = y - 1;
            return newY >= 0 && 
                   isValidChar(matrix[x][newY]) && 
                   direction !== "right";
        case "down":
            newX = x + 1;
            newY = y;
            return newX < matrix.length && 
                   isValidChar(matrix[newX][y]) && 
                   direction !== "up";
        case "up":
            newX = x - 1;
            newY = y;
            return newX >= 0 && 
                   isValidChar(matrix[newX][y]) && 
                   direction !== "down";
        default:
            return false;
    }
};

const findNextDirection = (matrix, direction, x, y) => {
    let currentChar = matrix[x][y];
    if (currentChar === "+" || (currentChar >= "A" && currentChar <= "Z")) {
        if (canMove(direction, x, y, "right")) return "right";
        if (canMove(direction, x, y, "left")) return "left";
        if (canMove(direction, x, y, "down")) return "down";
        if (canMove(direction, x, y, "up")) return "up";
    }
    return direction;
};

const findPath = (matrix) => {
    const startChar = findStartPosition(matrix);
    let x = startChar.x;
    let y = startChar.y;

    let path = "";
    let letters = "";
    let direction = "right";

    while (matrix[x][y] !== "s") {
        const currentChar = matrix[x][y];
        path += currentChar;
        
        if (currentChar >= "A" && currentChar <= "Z") {
            letters += currentChar;
        }

        direction = findNextDirection(matrix, direction, x, y);

        switch (direction) {
            case "right":
                y++;
                break;
            case "left":
                y--;
                break;
            case "down":
                x++;
                break;
            case "up":
                x--;
                break;
        }
    }

    path += "s";
    console.log(`Path: ${path}`);
    console.log(`Letters: ${letters}`);
};

findPath(matrix);

