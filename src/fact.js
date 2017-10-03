const Fact = function Fact(data) {

	this.name = data.replace(/\(.*/, '');
	this.params = data.replace(/.*\(/, '').replace(/\).*/, '').split(',');

	this.equals = function (pName, pParams) {
		return this.name === pName && this.params.toString() === pParams.toString();
	};

};

module.exports = Fact