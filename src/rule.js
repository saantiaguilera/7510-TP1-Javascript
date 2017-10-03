const Fact = require("../src/fact.js");
const zipmap = require('zipmap');

const Rule = function Rule(data) {

	this.statement = new Fact(data.replace(/:-.*/, ''));
	this.conditions = data.replace(/.+:-/, '').replace(/\),/g,");").split(';').map (fact => { return new Fact(fact); });

	this.matches = function (fact, facts) {
		if (this.statement.name !== fact.name) {
			return false;
		}

		this.zippedParams = zipmap(this.statement.params, fact.params)
		return this.conditions.map (cond => {
			this.pParams = cond.params.map (variable => { return this.zippedParams[variable]; });
			this.pName = cond.name;

			return facts.some (it => { return it.equals(this.pName, this.pParams); });
		}).reduce ((first, second) => { return first && second; });
	}

};

module.exports = Rule