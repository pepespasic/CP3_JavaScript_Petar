/**
 * Name: Petar Spasic
 * Date: 11/07/2023
 *
 * Here my JavaScript file that takes user input and display after user has clicked the button.
 * It handles error if images can't be displayed.
 */
"use strict";

(function() {

   /**
   * Add a function that will be called when the window is loaded.
   */
   window.addEventListener("load", init);

   /**
   * CHANGE: Describe what your init function does here.
   */
   function init() {
     // THIS IS THE CODE THAT WILL BE EXECUTED ONCE THE WEBPAGE LOADS
     let gender = qsa("label input");
     gender[0].addEventListener("change", makeRequest);
     gender[1].addEventListener("change", makeRequest);
   }
   /**
    * Fetches data from random user api.
    */
   function makeRequest() {
    // TODO
    let gender = this.value;
    let url = "https://randomuser.me/api/?gender=" + gender;
    id("pictures").innerHTML = "";
    for (let i = 0; i < 30; i++) {
      fetch(url)
      .then(statusCheck)
      .then(resp => resp.json())
      .then(processData)
      .catch(handleError);
    }
  }
  /**
   * Displays error message on page.
   * @param {*} response error message
   */
  function handleError(response) {
    let paragraph = document.createElement("p");
    paragraph.textContent = response;
    id("pictures").appendChild(paragraph);
  }
  /**
   * Retrieves image url from response and 
   * displays it on page.
   * @param {*} response web page with JSON data
   */
  function processData(response) {
    let imagePath = response.results[0].picture.medium;
    let image = document.createElement("img");
    image.src = imagePath;
    id("pictures").appendChild(image);
  }

   /**
   * Helper function to return the response's result text if successful, otherwise
   * returns the rejected Promise result with an error status and corresponding text
   * @param {object} res - response to check for success/error
   * @return {object} - valid response if response was successful, otherwise rejected
   *                    Promise result
   */
   async function statusCheck(res) {
    if (!res.ok) {
      throw new Error(await res.text());
    }
    return res;
  }

   /** ------------------------------ Helper Functions  ------------------------------ */
   /**
   * Note: You may use these in your code, but remember that your code should not have
   * unused functions. Remove this comment in your own code.
   */

   /**
   * Returns the element that has the ID attribute with the specified value.
   * @param {string} idName - element ID
   * @returns {object} DOM object associated with id.
   */
   function id(idName) {
     return document.getElementById(idName);
   }

   /**
   * Returns the first element that matches the given CSS selector.
   * @param {string} selector - CSS query selector.
   * @returns {object} The first DOM object matching the query.
   */
   function qs(selector) {
     return document.querySelector(selector);
   }

   /**
   * Returns the array of elements that match the given CSS selector.
   * @param {string} selector - CSS query selector
   * @returns {object[]} array of DOM objects matching the query.
   */
   function qsa(selector) {
     return document.querySelectorAll(selector);
   }

   /**
   * Returns a new element with the given tag name.
   * @param {string} tagName - HTML tag name for new DOM element.
   * @returns {object} New DOM object for given HTML tag.
   */
   function gen(tagName) {
     return document.createElement(tagName);
   }

})();