# Setlist Manager
A place to make a setlist and turn it into a playlist with simplicity.

###Content
* About
* User Guide  
* Features  
* Future Features  
* Installation Guide
* Dependencies
* API Dependencies
* Prod Dependencies
* Credits

###About
Setlist Manager is a project that aims to solve the problem for me personally and fellow musicians alike. 
When being asked for a show or when joining a musical project, either new or already existing, it can be a hassle to organize all the music in one place. 
This is where Setlist Manager comes in. 

###User Guide

In order to use all features of Setlist Manager properly make sure to be logged into spotify and have a client active before logging in to Setlist Manager. 
For testing purposes I have set up a premium test account. The **Installation Guide** explains how to access these credentials.
When prompted to allow spotify to access your data select "allow". If you select "Cancel" Setlist Manager will redirect you to the login page. 
For further guidance on how to use Setlist Manager read the **Features** below. 

###Features
Setlist Manager features several functions as of now to help you make your own setlists & playlists.

* ####*Login & Registration*
    In order to let you save your setlists you need to make an account. 
    Right now this application is still in developmental stage and for educational purpose it makes use of the Novi educational back-end. 
    User accounts get deleted after 60 minutes.
* ####*Logout*
    When logged in, three buttons are presented on the homepage. 
    The top button says **Profile**, this is where the user can review his/her own username and mailadres. 
    There is also a logout button on this page.
* ####*Reviewing created setlists*
    On the Homepage you can find the **My Setlists** button.
    When pressed you can review your created setlists. It's likely you don't have a setlist yet, these can easily created pressing the bottom button: **New Setlist**.
* ####*Creating a Setlist*
    When the **New Setlist** button is pressed the user will be asked wether or not they want to use spotify for this setlist. Pressing *No* will result in being able to submit anything into the input field. 
    This might be more suitable for new musical that are yet to distribute their material onto spotify. More features will be added to make this section more interesting in the future. *See the Future Features section for more information*.
    Pressing *Yes* will result in a *SearchQuery* type of input. 
    When one or more songs have been added to the list the *Clear* button becomes clear. 
    Pressing this button will clear the setlist and let you start over. 
    When you are happy with the setlist and have given it a name ,at the top of the *Create Setlist* form, the *Finish* button will become clear. 
    Pressing this button will save the setlist to your account. 
* ####*SearchQuery*
    In the **New Setlist** section of the project there is a list creator.
    When prompted the question whether or not you would like to use spotify and select *Yes*, the input functions as a searchquery that links to the database available on spotify.
* ####*Play/Pause Songs*
    When you are creating a setlist and you add a song using the searchquery a play button will present itself to the right of the song. 
    This button toggles the song to play or pause the song within your Spotify application. 
    In order to see the icon appear and use it properly make sure to have the spotify client running.
* ####*Create Playlist*
    When the setlist has been created you can view your setlist in the **My Selists** section.
    If you used the *searchquery* to add your songs a Spotify icon should appear in the right bottom corner of the setlist. 
    Open these setlists by clicking on the name of the setlist and a green *Create Playlist* button should present itself.
    By pushing this button a new playlist will be added within your spotify client.
    Rigt now the amount of setlists that can be created is limited to six. 
  

###Future Features
Below will be a list of features that did not make it into the application yet due to time restrictions. Nevertheless I'd like to add them in later iterations of this project. 
* ####*Adding Notes to each song*
    When I envisioned this project at first I wanted to get rid of all the writing on paper that comes with playing a show and learning a bunch of new songs.
    Each song should have the option to add personalized notes in the form of Chords, lyrics, song-structures etc.     
* ####*Adding files and html links to songs when not using spotify*
    Not all songs or versions of songs are on the spotify database. 
    For original work you might like to add a self-recorded .mp3 of rehearsals or perhaps a youtube link of a specific live performance. 
    Which of these is more suited is up to the user but it's good to have options.
* ####*Create a .pdf*
    Although the vision of this application is to get rid of most paperwork. 
    It might come in use to create .pdf of the selected setlist within the click of a button.
    This way you can store the setlists as a back-up, print it or share it with someone else.
* ####*Create Groups* 
    Creating groups with other users would make it easier to share setlists with each other, see each others notes and share drafts for setlists. 
* ####*Personalize the background* 
    Everybody has his/her own sense of style. Being able to personalize the application would encourage the pleasure of using Setlist Manager.
* ####*Styling for phone and tablet*
    Due to time constraints the styling has not been optimized for phone and tablet. The optimal setting for this application when it is finished would be on tablet.

###Installation Guide
1. Extract the 'setlist_manager_v1.0' file folder to your computer.
2. Open the extracted setlist_manager_v1.0 with you IDE.
3. In your IDE create a new file called .env in your main folder. This should appear above the file called .env.dist
4. Open the 'Setlist-Manager-Locked.zip'
5. Copy/Paste the contents of the password locked 'env.txt' in the .env file.
6. Run 'npm install' in the terminal
7. Run 'npm run build' in the terminal   
8. Run 'npm start' in the terminal
9. When prompted to log in to spotify, log in with username & password provided in the password locked 'spotify_test_account.txt'.
This account is a premium account for the time being for full functionality of the added features of Setlist Manager.


### Dependencies

NPM / node.js

axios

Router

jwt-decode@3.1.2

querystring-es3

### API Dependencies

Novi-educational-backend

Spotify Web API

### Production Dependencies

SASS

### Personal Note

Making this project made me realize just how much work goes into making even just a portion of an entire application.
Not every documentation is always up to date (I'm looking at you spotify API). 
But this did force me to learn how to use google properly and formulate my questions effectively. 
I still have a lot to learn, the styling has not quite turned out as I had envisioned and the application is far form being an extraordinary project.
But that only makes me more excited to, hopefully some day soon, work in a team of developers to learn all there is to learn, especially about UI/UX, modern styling and ReactJS.
I'm open to any and all feedback regarding this project so feel free to send me feedback either on github https://github.com/Big-beatz or https://github.com/Big-beatz/setlist-manager

### Credits

I would like to thank the team at Hogeschool Novi for the material and lessons made available.
Due to personal reasons such as having a child I have taken more time than originally planned everyone in the organisation has been very supporting. 
Hogeschool Novi is a recommendation to anyone who wants to learn how to code in The Netherlands. 

Shout out to Maker At Play Coding for walking me through the OAuth 2.0 of spotify this video helped me a lot.
https://www.youtube.com/watch?v=1vR3m0HupGI


