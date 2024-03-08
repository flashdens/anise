<h1 style="text-align: center;">anise</h1>

**anise** is a web application that lets you play Qwirkle online with your friends. <br>

It implements an user-friendly lobby system to let you get to the game as fast as possible!

**anise** consists of two parts:
- a client (frontend) application written in **React** with **Typescript** and **Tailwindcss**
- a server (backend) application written in the **Python** language using the **Flask** framework, with the help of ``SocketIO``



To host **anise** on your machine, you need to have:
- ``nodejs`` version 20 or later 
- ``python`` version 3.11 or later alongside `pip`<br>

installed.

To set up the server application:
1. Go to the *server* directory of the project
2. Install the project dependencies: ``pip install -r requirements.txt`` 
3. Run the application: ``python3.11 app.py``

To set up the client application:
1. Go to the *client* directory of the project
2. Install the project dependencies: ``npm install``
3. Run the application: ``npm run dev``

The app should be visible at ```localhost:3000```.

**anise** was written as an uni project for the **Graphical Interface** subject.
