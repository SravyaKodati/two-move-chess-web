# ♔ Two-Move Chess ♔

A modern, interactive web-based chess game with a unique twist: **when you capture a piece, your opponent gets two consecutive moves!**

## 🎮 Live Demo

Play the game online: https://sravyakodati.github.io/two-move-chess-web/

## 🎯 Special Rules

- **Standard chess rules** apply for piece movement
- **Two-Move Capture Rule**: If you capture an opponent's piece, they get **two consecutive moves** on their turn
- **Maximum two moves**: No player can make more than two moves in a row, even if multiple pieces are captured
- **Win condition**: Game ends when a king is captured

## 🚀 Features

- **Beautiful, modern UI** with responsive design
- **Drag-and-drop style** piece selection and movement
- **Visual feedback** for valid moves and captures
- **Real-time game state** tracking
- **Mobile-friendly** design
- **No backend required** - pure HTML, CSS, and JavaScript

## 🛠️ Technology Stack

- **HTML5** - Structure and semantic markup
- **CSS3** - Modern styling with gradients, animations, and responsive design
- **Vanilla JavaScript** - Game logic and interactivity
- **GitHub Pages** - Free hosting and deployment

## 🎮 How to Play

1. **Select a piece**: Click on any piece belonging to the current player
2. **Make a move**: Click on a destination square (highlighted in orange for valid moves, red for captures)
3. **Special rule**: If you capture a piece, your opponent gets two moves!
4. **Win**: Capture the opponent's king to win

## 📁 Project Structure

```
two-move-chess-web/
├── index.html          # Main HTML file
├── style.css           # CSS styles and animations
├── script.js           # Game logic and interactivity
└── README.md           # This file
```

## 🚀 Local Development

1. **Clone or download** the repository
2. **Open `index.html`** in any modern web browser
3. **Start playing!** No server or build process required

## 🌐 Deployment

This project is deployed using **GitHub Pages**:

1. Push code to a GitHub repository
2. Go to Settings → Pages
3. Set source to main branch
4. Your site will be live at: `https://[username].github.io/[repository-name]/`

## 🎨 Design Features

- **Modern gradient background** with purple-blue theme
- **Smooth animations** for piece movement and captures
- **Responsive design** that works on desktop and mobile
- **Visual feedback** with hover effects and selection highlighting
- **Clean typography** using Inter font family

## 🧩 Game Logic

The game implements:
- **Complete chess rules** for all pieces (pawns, rooks, bishops, knights, queens, kings)
- **Path validation** to ensure pieces can't jump over others
- **Turn management** with the special two-move capture rule
- **Win condition** detection
- **Game state persistence** during the session

## 🔧 Customization

Easy to customize:
- **Colors**: Modify CSS variables in `style.css`
- **Board size**: Adjust square dimensions in CSS
- **Animations**: Modify keyframes and transition properties
- **Rules**: Extend the game logic in `script.js`

## 📱 Browser Compatibility

- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile browsers

## 🤝 Contributing

Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests
- Fork and modify for your own projects

## 📄 License

This project is open source and available under the MIT License.

## 🎯 Future Enhancements

Potential improvements:
- Move history and notation
- AI opponent
- Multiplayer support
- Sound effects
- Different chess variants
- Tournament mode

---
