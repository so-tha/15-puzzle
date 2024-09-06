class MinHeap {
    constructor() {
        this.heap = [];
    }

    push(node) {
        this.heap.push(node);
        this._bubbleUp(this.heap.length - 1);
    }

    pop() {
        if (this.heap.length === 1) return this.heap.pop();
        const top = this.heap[0];
        this.heap[0] = this.heap.pop();
        this._bubbleDown(0);
        return top;
    }

    _bubbleUp(index) {
        const parentIndex = Math.floor((index - 1) / 2);
        if (index > 0 && this.heap[index].f < this.heap[parentIndex].f) {
            [this.heap[index], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[index]];
            this._bubbleUp(parentIndex);
        }
    }

    _bubbleDown(index) {
        const leftIndex = 2 * index + 1;
        const rightIndex = 2 * index + 2;
        let smallestIndex = index;

        if (leftIndex < this.heap.length && this.heap[leftIndex].f < this.heap[smallestIndex].f) {
            smallestIndex = leftIndex;
        }
        if (rightIndex < this.heap.length && this.heap[rightIndex].f < this.heap[smallestIndex].f) {
            smallestIndex = rightIndex;
        }
        if (smallestIndex !== index) {
            [this.heap[index], this.heap[smallestIndex]] = [this.heap[smallestIndex], this.heap[index]];
            this._bubbleDown(smallestIndex);
        }
    }

    size() {
        return this.heap.length;
    }
}

function manhattanDistance(board, goal) {
    let distance = 0;
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (board[i][j] !== 0) {
                const value = board[i][j] - 1;
                const targetX = Math.floor(value / 4);
                const targetY = value % 4;
                distance += Math.abs(i - targetX) + Math.abs(j - targetY);
            }
        }
    }
    return distance;
}

function isSolved(board, goal) {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (board[i][j] !== goal[i][j]) {
                return false;
            }
        }
    }
    return true;
}

function findEmpty(board) {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (board[i][j] === 0) return { x: i, y: j };
        }
    }
}

function getNeighbors(board) {
    const { x, y } = findEmpty(board);
    const neighbors = [];


    const directions = [
        { dx: -1, dy: 0 },
        { dx: 1, dy: 0 },
        { dx: 0, dy: -1 },
        { dx: 0, dy: 1 }
    ];

    directions.forEach(({ dx, dy }) => {
        const newX = x + dx;
        const newY = y + dy;

        if (newX >= 0 && newX < 4 && newY >= 0 && newY < 4) {
            const newBoard = board.map(row => [...row]); // Clone o tabuleiro
            [newBoard[x][y], newBoard[newX][newY]] = [newBoard[newX][newY], newBoard[x][y]]; // Swap
            neighbors.push(newBoard);
        }
    });

    return neighbors;
}

function aStarSolver(start, goal) {
    const openSet = new MinHeap();
    const closedSet = new Set();

    openSet.push({ board: start, g: 0, h: manhattanDistance(start, goal), parent: null });

    while (openSet.size() > 0) {
        const currentNode = openSet.pop();

        if (isSolved(currentNode.board, goal)) {
            let path = [];
            let node = currentNode;
            while (node !== null) {
                path.push(node.board);
                node = node.parent;
            }
            return path.reverse();
        }

        closedSet.add(currentNode.board.toString());

        const neighbors = getNeighbors(currentNode.board);
        neighbors.forEach(neighbor => {
            const neighborString = neighbor.toString();
            if (closedSet.has(neighborString)) return;

            const g = currentNode.g + 1;
            const h = manhattanDistance(neighbor, goal);
            const f = g + h;

            openSet.push({ board: neighbor, g, h, f, parent: currentNode });
        });
    }

    return null;
}


const startBoard = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 15, 14, 0]
];

const goalBoard = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 0]
];

const solutionPath = aStarSolver(startBoard, goalBoard);

if (solutionPath) {
    console.log("Solução encontrada em " + (solutionPath.length - 1) + " movimentos:");
    solutionPath.forEach((step, index) => {
        console.log(`Movimento ${index}:`);
        console.table(step);
    });
} else {
    console.log("Nenhuma solução encontrada.");
}
