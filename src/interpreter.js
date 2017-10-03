const Fact = require("../src/fact.js");
const Rule = require("../src/rule.js");

const Interpreter = function () {

	this.facts = [];
	this.rules = [];

	this.trimSpaces = function (line) {
		return line.replace(/\s/g, '');
	}

    this.parseDB = function (params) {
    	params.forEach (value => {
    		this.trimmedValue = this.trimSpaces(value);
    		if (this.trimmedValue.match(/:-/)) {
    			this.rules.push(new Rule(this.trimmedValue));
    		} else {
    			this.facts.push(new Fact(this.trimmedValue));
    		}
    	})
    };

    this.checkQuery = function (params) {
    	this.fact = new Fact(this.trimSpaces(params));

    	this.matchingRules = this.rules.filter (item => { return item.statement.name === this.fact.name; });

    	if (this.matchingRules > 1) {
    		throw "Two same rules with the same name.";
    	}

    	if (this.matchingRules.length > 0) {
    		return this.matchingRules[0].matches(this.fact, this.facts);
    	} else {
    		return this.facts.some (item => { return item.equals(this.fact.name, this.fact.params); });
    	}
    };

};

module.exports = Interpreter;
