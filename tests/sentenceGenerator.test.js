const { generateRandomSentence } = require('../controllers/sentences');

describe('Sentence Generation', () => {
    test('should generate a sentence with no placeholders', () => {
        const sentence = generateRandomSentence();
        expect(sentence).not.toMatch(/\{noun\}|\{verb\}|\{adjective\}|\{adverb\}|\{preposition\}/);  // Ensure no placeholders remain
    });

    test('Generates a different sentence on each call', () => {
        const sentence1 = generateRandomSentence();
        const sentence2 = generateRandomSentence();

        expect(sentence1).not.toBe(sentence2);  // Ensure they are not the same
    });

    test('Contains all necessary placeholders in the template', () => {
        const sentence = generateRandomSentence();
        expect(sentence).toMatch(/\w+ \w+ \w+ \w+ \w+/); // Roughly matches sentence structure
    });

});
