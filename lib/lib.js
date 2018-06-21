'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.writeFile = exports.readFile = exports.createQuestions = exports.createPrompt = exports.chooseRandom = undefined;

var _util = require('util');

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// TODO copy chooseRandom() from previous assignment
const chooseRandom = (array = [], numItems) => {
  // TODO check that array length is greater than 1
  if (array === undefined || array.length <= 1 || numItems < 1) {
    return array;
  } else if (numItems === undefined || numItems <= 0 || numItems > array.length) {
    numItems = Math.floor(Math.random() * array.length);
  }

  // array.filter(a = item, pos, self => self.indexOf(item) == pos) // Filter out unique values indecies

  const randomIndices = Array(numItems) // TODO ensure numItems is within the range 1 to the length of the array
  .fill() // Don't change this line. Just fills the array we're about to reduce.
  .reduce(res => {
    let randomIndex = Math.floor(Math.random() * array.length);

    while (res.indexOf(randomIndex) !== -1) {
      randomIndex = Math.floor(Math.random() * array.length);
    }

    return res.concat(randomIndex);
  }, []);

  return randomIndices.map(individual => array[individual]);

  // reduce the array to contain numItems # of unique index values

  // TODO return a new array filtering the passed in array for only the
  // indices contained in the randomIndices array
};

// TODO copy createPrompt() from previous assignment
const createPrompt = ({ numQuestions = 1, numChoices = 2 } = {}) => {
  const questionObject = questionNumber => ({
    type: 'input',
    name: `question-${questionNumber}`,
    message: `Enter question ${questionNumber}`
  });

  const choiceObject = (choiceNumber, questionNumber) => ({
    type: 'input',
    name: `question-${questionNumber}-choice-${choiceNumber}`,
    message: `Enter answer choice ${choiceNumber} for question ${questionNumber}`
  });

  return Array(numQuestions + numQuestions * numChoices).fill().map((val, idx) => {
    if (idx % (numChoices + 1) === 0) {
      return questionObject(idx / (numChoices + 1) ? idx / (numChoices + 1) : 1);
    } else {
      return choiceObject(idx % (numChoices + 1), Math.ceil(idx / (numChoices + 1)));
    }
  });
  // return an array
};

// TODO implement createQuestions()
const createQuestions = (questionObject = {}) => {
  let questionKeys = Object.keys(questionObject);

  let questions = {};

  questionKeys.forEach(element => {
    if (!element.includes('choice')) {
      questions[element] = {
        type: 'list',
        name: element,
        message: questionObject[element],
        choices: []
      };
    } else {
      // let workingString = element.split('-')
      let indexString = 'question-' + element.split('-')[1];
      let tempObject = questions[indexString];
      tempObject['choices'].push(questionObject[element]);
    }
    return Object.values(questions);
  });

  return Object.values(questions);
};

const readFile = fileName => new Promise((resolve, reject) => _fs2.default.readFile(fileName, (err, data) => {
  if (err) {
    reject(console.log(err));
  }
  resolve(data);
}));

const writeFile = (fileName, data) => new Promise((resolve, reject) => _fs2.default.writeFile(fileName, JSON.stringify(data), err => {
  err ? reject(console.log(err)) : resolve('File saved!');
}));

// TODO export above functions
exports.chooseRandom = chooseRandom;
exports.createPrompt = createPrompt;
exports.createQuestions = createQuestions;
exports.readFile = readFile;
exports.writeFile = writeFile;

// const createPrompt = (questionsObject = { numQuestions: 1, numChoices: 2 }) => {
//   let numQuestions = questionsObject.hasOwnProperty('numQuestions')
//     ? questionsObject['numQuestions']
//     : 1
//   let numChoices = questionsObject.hasOwnProperty('numChoices')
//     ? questionsObject['numChoices']
//     : 2

//   return [
//     ...Array(numQuestions).fill().map((currThing, numberIdx) => {
//       return [
//         {
//           type: 'input',
//           name: `question-${numberIdx + 1}`,
//           message: `Enter question ${numberIdx + 1}`
//         },
//         ...Array(numChoices).fill().map((currChoice, choiceIdx) => ({
//           type: 'input',
//           name: `question-${numberIdx + 1}-choice-${choiceIdx + 1}`,
//           message: `Enter answer choice ${choiceIdx + 1} for question ${numberIdx + 1}`
//         }))
//       ]
//     })
//   ]
// }