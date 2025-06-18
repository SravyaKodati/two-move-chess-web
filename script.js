class TwoMoveChess {
    constructor() {
        this.board = [];
        this.currentPlayer = 'white';
        this.movesRemaining = 1;
        this.selectedPiece = null;
        this.gameOver = false;
        this.winner = null;
        
        this.initializeBoard();
        this.setupEventListeners();
        this.renderBoard();
        this.updateGameInfo();
    }

    initializeBoard() {
        // Initialize empty board
        this.board = Array(8).fill().map(() => Array(8).fill(''));
        
        // Set up pawns
        for (let col = 0; col < 8; col++) {
            this.board[1][col] = '♟'; // Black pawns
            this.board[6][col] = '♙'; // White pawns
        }
        
        // Set up other pieces
        const blackPieces = ['♜', '♞', '♝', '♛', '♚', '♝', '♞', '♜'];
        const whitePieces = ['♖', '♘', '♗', '♕', '♔', '♗', '♘', '♖'];
        
        for (let col = 0; col < 8; col++) {
            this.board[0][col] = blackPieces[col];
            this.board[7][col] = whitePieces[col];
        }
    }

    getPieceColor(piece) {
        const whitePieces = ['♙', '♖', '♘', '♗', '♕', '♔'];
        const blackPieces = ['♟', '♜', '♞', '♝', '♛', '♚'];
        
        if (whitePieces.includes(piece)) return 'white';
        if (blackPieces.includes(piece)) return 'black';
        return '';
    }

    isValidMove(start, end) {
        const [startRow, startCol] = start;
        const [endRow, endCol] = end;
        
        // Check if start position has a piece
        if (!this.board[startRow][startCol]) return false;
        
        // Check if it's the player's piece
        const pieceColor = this.getPieceColor(this.board[startRow][startCol]);
        if (pieceColor !== this.currentPlayer) return false;
        
        // Check if end position is occupied by own piece
        if (this.board[endRow][endCol] && 
            this.getPieceColor(this.board[endRow][endCol]) === pieceColor) {
            return false;
        }
        
        const piece = this.board[startRow][startCol];
        
        // Pawn movement
        if (piece === '♙' || piece === '♟') {
            const direction = piece === '♙' ? -1 : 1;
            const startRank = piece === '♙' ? 6 : 1;
            
            // Forward move
            if (startCol === endCol && endRow === startRow + direction) {
                return !this.board[endRow][endCol];
            }
            
            // Capture move
            if (Math.abs(startCol - endCol) === 1 && endRow === startRow + direction) {
                return this.board[endRow][endCol] !== '';
            }
            
            // Initial two-square move
            if (startCol === endCol && startRow === startRank && 
                endRow === startRow + 2 * direction && !this.board[startRow + direction][startCol]) {
                return !this.board[endRow][endCol];
            }
            
            return false;
        }
        
        // Rook movement
        if (piece === '♖' || piece === '♜') {
            if (startRow === endRow || startCol === endCol) {
                return this.isPathClear(start, end);
            }
            return false;
        }
        
        // Bishop movement
        if (piece === '♗' || piece === '♝') {
            if (Math.abs(startRow - endRow) === Math.abs(startCol - endCol)) {
                return this.isPathClear(start, end);
            }
            return false;
        }
        
        // Queen movement (combination of rook and bishop)
        if (piece === '♕' || piece === '♛') {
            if ((startRow === endRow || startCol === endCol) ||
                (Math.abs(startRow - endRow) === Math.abs(startCol - endCol))) {
                return this.isPathClear(start, end);
            }
            return false;
        }
        
        // King movement
        if (piece === '♔' || piece === '♚') {
            return Math.abs(startRow - endRow) <= 1 && Math.abs(startCol - endCol) <= 1;
        }
        
        // Knight movement
        if (piece === '♘' || piece === '♞') {
            const rowDiff = Math.abs(startRow - endRow);
            const colDiff = Math.abs(startCol - endCol);
            return (rowDiff === 2 && colDiff === 1) || (rowDiff === 1 && colDiff === 2);
        }
        
        return false;
    }

    isPathClear(start, end) {
        const [startRow, startCol] = start;
        const [endRow, endCol] = end;
        
        const rowDir = startRow === endRow ? 0 : (endRow > startRow ? 1 : -1);
        const colDir = startCol === endCol ? 0 : (endCol > startCol ? 1 : -1);
        
        let row = startRow + rowDir;
        let col = startCol + colDir;
        
        while (row !== endRow || col !== endCol) {
            if (this.board[row][col] !== '') return false;
            row += rowDir;
            col += colDir;
        }
        
        return true;
    }

    makeMove(start, end) {
        const [startRow, startCol] = start;
        const [endRow, endCol] = end;
        
        if (!this.isValidMove(start, end)) return false;
        
        // Check if a piece is being captured
        const pieceCaptured = this.board[endRow][endCol] !== '';
        
        // Make the move
        this.board[endRow][endCol] = this.board[startRow][startCol];
        this.board[startRow][startCol] = '';
        
        // Apply two-move rule
        if (pieceCaptured) {
            this.movesRemaining = 2;
            this.currentPlayer = this.currentPlayer === 'white' ? 'black' : 'white';
            this.showMessage(`Piece captured! ${this.currentPlayer} gets two moves!`, 'success');
        } else {
            this.movesRemaining--;
            if (this.movesRemaining <= 0) {
                this.currentPlayer = this.currentPlayer === 'white' ? 'black' : 'white';
                this.movesRemaining = 1;
            }
        }
        
        // Check for game over
        this.checkGameOver();
        
        return true;
    }

    checkGameOver() {
        let whiteKing = false;
        let blackKing = false;
        
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                if (this.board[row][col] === '♔') whiteKing = true;
                if (this.board[row][col] === '♚') blackKing = true;
            }
        }
        
        if (!whiteKing) {
            this.gameOver = true;
            this.winner = 'black';
            this.showMessage('🎉 Black wins! White king captured!', 'success');
        } else if (!blackKing) {
            this.gameOver = true;
            this.winner = 'white';
            this.showMessage('🎉 White wins! Black king captured!', 'success');
        }
    }

    renderBoard() {
        const boardElement = document.getElementById('chess-board');
        boardElement.innerHTML = '';
        
        for (let row = 0; row < 8; row++) {
            const rowElement = document.createElement('div');
            rowElement.className = 'board-row';
            
            for (let col = 0; col < 8; col++) {
                const square = document.createElement('div');
                const isWhiteSquare = (row + col) % 2 === 0;
                square.className = `square ${isWhiteSquare ? 'white-square' : 'black-square'}`;
                
                const piece = this.board[row][col];
                if (piece) {
                    square.textContent = piece;
                }
                
                // Add selection highlighting
                if (this.selectedPiece && this.selectedPiece[0] === row && this.selectedPiece[1] === col) {
                    square.classList.add('selected');
                }
                
                // Add valid move highlighting
                if (this.selectedPiece && this.isValidMove(this.selectedPiece, [row, col])) {
                    if (piece) {
                        square.classList.add('capture');
                    } else {
                        square.classList.add('valid-move');
                    }
                }
                
                square.addEventListener('click', () => this.handleSquareClick(row, col));
                rowElement.appendChild(square);
            }
            
            boardElement.appendChild(rowElement);
        }
    }

    handleSquareClick(row, col) {
        if (this.gameOver) return;
        
        const piece = this.board[row][col];
        
        // If no piece is selected and clicked square has a piece of current player
        if (!this.selectedPiece) {
            if (piece && this.getPieceColor(piece) === this.currentPlayer) {
                this.selectedPiece = [row, col];
                this.renderBoard();
            }
        } else {
            // If a piece is selected, try to make a move
            const moveSuccessful = this.makeMove(this.selectedPiece, [row, col]);
            
            if (moveSuccessful) {
                this.selectedPiece = null;
                this.renderBoard();
                this.updateGameInfo();
            } else {
                // If move failed, try to select a different piece
                if (piece && this.getPieceColor(piece) === this.currentPlayer) {
                    this.selectedPiece = [row, col];
                    this.renderBoard();
                } else {
                    this.selectedPiece = null;
                    this.renderBoard();
                }
            }
        }
    }

    updateGameInfo() {
        document.getElementById('current-player').textContent = 
            this.currentPlayer.charAt(0).toUpperCase() + this.currentPlayer.slice(1);
        document.getElementById('moves-remaining').textContent = this.movesRemaining;
        
        const statusElement = document.querySelector('.status-message');
        if (this.gameOver) {
            statusElement.textContent = `Game Over! ${this.winner} wins!`;
            statusElement.className = 'status-message success';
        } else {
            statusElement.textContent = 
                `${this.currentPlayer.charAt(0).toUpperCase() + this.currentPlayer.slice(1)}'s turn (${this.movesRemaining} move${this.movesRemaining > 1 ? 's' : ''} remaining)`;
            statusElement.className = 'status-message';
        }
    }

    showMessage(message, type = 'info') {
        const statusElement = document.querySelector('.status-message');
        statusElement.textContent = message;
        statusElement.className = `status-message ${type}`;
        
        // Clear message after 3 seconds
        setTimeout(() => {
            this.updateGameInfo();
        }, 3000);
    }

    resetGame() {
        this.currentPlayer = 'white';
        this.movesRemaining = 1;
        this.selectedPiece = null;
        this.gameOver = false;
        this.winner = null;
        this.initializeBoard();
        this.renderBoard();
        this.updateGameInfo();
    }

    setupEventListeners() {
        document.getElementById('new-game-btn').addEventListener('click', () => {
            this.resetGame();
        });
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new TwoMoveChess();
}); 