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

This is IBAN code validation API written in Node Js.

- API server runs on 3000 port. Port number can be configured in server.js file.
- After server starts, API can be accessed at localhost:3000.
- API has one endpoint /ibanvalidation/:params
- Params can be one IBAN code, or many codes separated with comma. Example: /ibanvalidation/LT487044060008228908,LT487044060008228909
- API returns a JSON object that can be used in a backend or frontend applications.
- JSON structure: 
[{"iban":"LT487044060008228908","validity":true},{"iban":"AD1400080001001234567891","validity":false}]
- Validation algorithm runs asynchronously so it doesn't block server and allows API requests for many users.
- To test how API works after installation and run instructions simply enter http://localhost:3000/ibanvalidation/LT487044060008228908,LT487044060008228909 in your browser and press Enter. API will return JSON object with results.
- There are unit tests for validation algorithm functions.

<p align="right">(<a href="#top">back to top</a>)</p>

### Built With

The section below shows a list of used technologies and libraries.

* [JavaScript](https://www.javascript.com/)
* [Node v14.15.4](https://nodejs.org/en/download/) 
* [Express JS](https://expressjs.com)
* [Jest](https://jestjs.io)
* [Babel](https://babeljs.io)

<p align="right">(<a href="#top">back to top</a>)</p>


## Getting Started

This is an example of how you may set up project locally. <br>
To get a local copy up and running follow these simple Installation steps.

### Installation

1. Download code from:
   ```sh
   https://github.com/leopardcoder/ibanvalidation
   ```
2. Run NPM packages
   ```sh
   npm install
   ``` 
4. Run: 
   ```sh
   node server.js
   ```
   
   
   
### Running tests:
   For tests run:
   ```sh
   npm test
   ```

   
<p align="right">(<a href="#top">back to top</a>)</p>



## Project Structure

- `/ibanValidation-main/` the root folder
- `/ibanValidation-main/data/` list of IBAN length with country codes.
- `/ibanValidation-main/src/` validation algorithm source file and test file.
- `/ibanValidation-main/routes/` ibanValidation route source file.

<p align="right">(<a href="#top">back to top</a>)</p>


## Contact

Linas Mockus - linas.mockus@gmail.com

Project Link: [https://github.com/leopardcoder/ibanValidation)

<p align="right">(<a href="#top">back to top</a>)</p>



[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/linas-mockus-49a89b14a/
