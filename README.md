# Rock Paper Scissors App

Designed in mind for the pre-assignment for Reaktor 2022 Summer Developer Position.

Assignment 2022: Developers
Your task is to implement a web application that displays rock-paper-scissors match results. The web application must display the games as they are in progress, and you must also be able to look at historical results of individual players. In addition, the currently ongoing games must be visible at all times.

The historical results must include all games that a player has played and it must also include the following aggregate data: win ratio, total number of matches played, and the most played hand (rock, paper, or scissors).

There are two API endpoints running at https://bad-api-assignment.reaktor.com. /rps/history which returns a page of historical data, and a path for the next page of data. Be aware that there are many pages of data. The other endpoint /rps/live is a WebSocket API and will send events to connected clients as they happen.

Your application does not need to look especially pretty (but it won’t hurt) but it should be fast and snappy, showing data to the end user as fast as possible and being up-to-date with the backend.

In no particular order, we especially pay attention to the following details when looking at your submission:

Readability of the code as whole
Performance and maintainability
Technology and library choices made
User interface and experience

## Technologies used

Built with:

- HTML
- JS
- CSS
- Reactjs
- Axios
- Bootstrap
- Netlify

## Steps and Proposed Solutions:

1. [x] Get Data from Historical API and Render

Currently attaining data but not all of it through the cursor function. Page would take some time to load through all options. Keeping it to just the first set of data at the moment until I find a workable solution. Realise there is some 1400+ pages of data to sift through. I wonder if some sort of data sort algorithm could be beneficial here.

2. [x] Generate Statistics from Data for individual players

Goal here is to process the data and manipulate it into a more useful visual representation as per user request.

3. [x] Get Data from Websocket API and update live

This was a brand new topic for me, I have never used web sockets and this section has taught me a lot in how to receive data and process it into useful output.

Did not realise you could parse a string twice into a JSON object. The first time I attempted this it did not give me the output I expected and I had to research the reasons why, I certainly will not take this for granted in the future!

Had some problems here with the useEffect hook updating too quickly, attempted to slow it down by setting an interval but that only made the issue more complicated later when trying to retrieve the games.

Really learnt and understood the importance of conditional rendering here to prevent app from crashing if websocket data passing to a hook was undefined. This gave me a headache for some time.

4. [x] Generate statistics for Individual players

5. [x] Beautify and add some icons for visual impact

6. [ ] Allow data to be sorted / searched

## Learnings and Potentials:

- Fantastic assignment, really tested my thought processes across a range of opportunities in my chosen platform and base. I can clearly see the API was implemented with lots of different problems all which required different solutions.

- CSS could be improved massively with far more attention to detail spent on the UI/UX design aspects.

- Unfortunately running out of time for this one.

## Setup and usage

A not finished link, but I wanted to demonstrate a CI/CD opportunity.
<a href="https://rockpaperscissors-mh.netlify.app/">https://rockpaperscissors-mh.netlify.app/</a>

## Screenshot

<!-- ![alt text](home.png?raw=true "Home Page") -->

## Sources

<a href="https://www.flaticon.com/free-icons/rock" title="rock icons">Rock icons created by Freepik - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/cut" title="cut icons">Cut icons created by Tomas Knop - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/paper" title="paper icons">Paper icons created by torskaya - Flaticon</a>

## Authors and acknowledgment

- Martin Holland: https://github.com/martin-holland/

### Acknowledgements

- http://github.com/ElaFinIta/ - for being a ever vigilant listener and person to bounce ideas off to make a working project

-http://github.com/ElaFinIta/ - for the Statistics Component

- http://github.com/KatiRemo - for inspiring me to attempt to make this project work
