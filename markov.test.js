const MarkovMachine = require('./markov');

describe("markov machine tests", function() {

    let markov;
    let content
    beforeAll(function() {
        markov = new MarkovMachine("this is a test this");
        content = markov.makeText(10);
    });

    test("test class creation", function(){ 
        expect(markov).toEqual(expect.any(MarkovMachine));
    });

    test("test chains creation", function(){ 
        expect(markov.chains['this']).toEqual(['is']);
    });

    test("test makeText", function(){ 
        expect(content).toEqual(expect.any(String));
    });

});