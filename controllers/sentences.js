const fs = require('fs');

// Load word pools and sentence templates from JSON
const wordPools = JSON.parse(fs.readFileSync('./data/wordPools.json', 'utf8'));
const sentenceTemplates = JSON.parse(fs.readFileSync('./data/sentenceTemplates.json', 'utf8')).templates;

exports.getSentences = (req, res, next) => {
  let sentences = "";
  for (let i = 0; i < req.params.amount; i++) {
    sentences += generateRandomSentence();
    if (i < req.params.amount - 1) {
      sentences += " ";
    }
  }
  res.send(sentences.toString());
};

// return a random element from an array
function getRandomArrayElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

// return a random sentence generated from a template
function generateRandomSentence() {
  const template = getRandomArrayElement(sentenceTemplates);

  // replace all placeholders with unique random words
  return template.replace(/{noun}|{verb}|{adjective}|{adverb}|{preposition}/g, (placeholder) => {
    switch (placeholder) {
      case "{noun}":
        return getRandomArrayElement(wordPools.nouns);
      case "{verb}":
        return getRandomArrayElement(wordPools.verbs);
      case "{adjective}":
        return getRandomArrayElement(wordPools.adjectives);
      case "{adverb}":
        return getRandomArrayElement(wordPools.adverbs);
      case "{preposition}":
        return getRandomArrayElement(wordPools.prepositions);
      default:
        return placeholder;
    }
  });
}
