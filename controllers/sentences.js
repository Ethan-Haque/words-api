const fs = require('fs');

// Load word pools and sentence templates from JSON
const wordPools = JSON.parse(fs.readFileSync('./data/wordPools.json', 'utf8'));
const sentenceTemplates = JSON.parse(fs.readFileSync('./data/sentenceTemplates.json', 'utf8')).templates;

exports.getSentences = (req, res, next) => {
  const sentences = [];
  for (let i = 0; i < req.params.amount; i++) {
    sentences.push(generateRandomSentence());
  }
  res.send(sentences);
};

// return a random word from an array
function getRandomWord(array) {
  return array[Math.floor(Math.random() * array.length)];
}

// return a random sentence generated from a template
function generateRandomSentence() {
  const template = getRandomWord(sentenceTemplates);

  return template
    .replace(/\{noun\}/g, getRandomWord(wordPools.nouns))
    .replace(/\{verb\}/g, getRandomWord(wordPools.verbs))
    .replace(/\{adjective\}/g, getRandomWord(wordPools.adjectives))
    .replace(/\{adverb\}/g, getRandomWord(wordPools.adverbs))
    .replace(/\{preposition\}/g, getRandomWord(wordPools.prepositions));
}