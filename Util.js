const colors = require('colors')

module.exports = {
  /**
   * Log something to the console.
   * @param {string} prefix The prefix that will be printed.
   * @param {string} text The text.
   */
  log: function(prefix, text) {
    console.log(`${"[".gray}${prefix.green}${"]".gray}${":".green} ${text.white}`);
  }
}