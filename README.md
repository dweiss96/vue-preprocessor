# vue-preprocessor

A Jest preprocessor to load .vue files in tests.

Portions of the preprocessor are based on [vueify](https://github.com/vuejs/vueify) (Copyright (c) 2014-2016 Evan You).

### Installation

  1.  add package you your project
    
   *  `yarn add --dev vue-preprocessor` or  `npm install --saveDev vue-preprocessor`
 
  2.  modify your jest config **transform** properites:

      ```javascript
      "jest": {
        "moduleFileExtensions": [
          "js",
          "vue"
        ],
        "transform": {
          "^.+\\.js$": "<rootDir>/node_modules/babel-jest",
          ".*\\.(vue)$": "<rootDir>/node_modules/vue-preprocessor"
        }
      }
      ```
  3.  Start writing test that can import `*.vue` components.
  4.  Cover your files!

  ### License: MIT
