<div id="top"></div>
<br>


[![LinkedIn][linkedin-shield]][linkedin-url]

<br>

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#project-structure">Project Structure</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



## About The Project

This is IBAN number validation API written in Node Js.

- API server runs at 3000 port, port number can be configured in server.js file.
- After server starts, API can be accessed at localhost:3000
- API has one endpoint GET /ibanvalidation/{params}
- Params can be one IBAN number, or many numbers separated with semicolon. Example: /ibanvalidation/LT487044060008228908,LT487044060008228909
- Endpoint returns a JSON object that can be used anywhere.
- To test how API works, simply enter localhost:3000/ibanvalidation/LT487044060008228908,LT487044060008228909 in your browser and press Enter. API will return JSON object with results.
- Buys healing items when 1 live is left. So that the player can replenish his health and achieve score.
- Shows each step how game is played.

<p align="right">(<a href="#top">back to top</a>)</p>



### Built With

The section below shows a list of used technologies, libraries and IDE


* [JavaScript](https://www.javascript.com/)
* [Node v14.15.4](https://nodejs.org/en/download/) 
* [dotenv](https://www.npmjs.com/package/dotenv/) 

<p align="right">(<a href="#top">back to top</a>)</p>



## Getting Started

This is an example of how you may set up project locally. <br>
To get a local copy up and running follow these simple Installation steps.

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/leopardcoder/dragon
   ```
2. Run NPM packages
   ```sh
   npm install
   ```
3. Check if .env file exists in root folder and contains URL variable with value 'dragonsofmugloar.com' 
4. Run: 
   ```sh
   node startGame.js
   ```
 

   
<p align="right">(<a href="#top">back to top</a>)</p>



## Project Structure

- `/dragon-main/` the root folder
- `/dragon-main/src` project source file

<p align="right">(<a href="#top">back to top</a>)</p>


## Contact

Linas Mockus - linas.mockus@gmail.com

Project Link: [https://github.com/leopardcoder/dragon)

<p align="right">(<a href="#top">back to top</a>)</p>



[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/linas-mockus-49a89b14a/
