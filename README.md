# Snake

A classic snake game built with a Python Flask backend and a JavaScript frontend.

## Features

*   **Classic Snake Gameplay:** Control the snake to eat food and grow longer.
*   **Increasing Difficulty:** The game speeds up every 7 fruits eaten, increasing the challenge.
*   **High Score System:** At the end of each game, you can enter your name to be saved on the leaderboard.
*   **Pause and Resume:** Press the "Escape" key to pause the game and resume when you're ready.
*   **Clean, Modern UI:** A visually appealing and responsive user interface.

## Future Plans

*   **Design:** Make the frame look like a brick 🧱 wall.
*   **Sound Effects:** Add sound effects for eating food, game over, and other events.
*   **Visual Effects:** Implement visual effects like screen shake or particle effects to enhance the player experience.

## How to Run

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/oktobersveryown/snake-classic.git
    cd your-repo-name
    ```
2.  **Create and activate a virtual environment:**
    ```bash
    python -m venv venv
    source venv/bin/activate
    ```
    or

    ```fish
    python -m venv venv
    source venv/bin/activate.fish
    ```
    or
    ```ps1
    python -m venv venv
    .\venv\bin\activate.ps1
    ```
    
4.  **Install the dependencies:**
    ```bash
    pip install -r requirements.txt
    ```
5.  **Run the application:**
    ```bash
    flask run
    ```
6.  **Open your browser and go to `http://127.0.0.1:5000` to play.**
