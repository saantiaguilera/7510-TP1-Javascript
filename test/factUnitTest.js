var expect = require("chai").expect;
var should = require('should');
var assert = require('assert');

var Fact = require('../src/fact');


describe("Fact", function () {

    describe('Facts parsing', function () {

        it('Check name with 1 param composes correctly', function () {
            assert(new Fact('varon(juan)').name === 'varon');
        });

        it('Check name with N params composes correctly', function () {
            assert(new Fact('varon(juan, pepe, maria, mario, julio)').name === 'varon');
        });

        it('Check single param builds correctly', function () {
            assert(new Fact('varon(juan)').params.toString() === ['juan'].toString());
        });

        it('Check N params builds correctly', function () {
            assert(new Fact('varon(juan,pepe,maria,mario,julio)').params.toString() === ['juan', 'pepe', 'maria', 'mario', 'julio'].toString());
        });

    });

    describe('Facts comparisons', function () {

        it('Check same fact is equals', function () {
            fact = new Fact('varon(juan,A,B)');
            assert(new Fact('varon(juan,A,B)').equals(fact.name, fact.params) === true);
        });

        it('Check different name fact is not equals', function () {
            fact = new Fact('mujer(A,B)');
            assert(new Fact('varon(A,B)').equals(fact.name, fact.params) === false);
        });

        it('Check same name different params is not equals', function () {
            fact = new Fact('varon(C,D)');
            assert(new Fact('varon(A,B)').equals(fact.name, fact.params) === false);
        });

        it('Check same name same params different order is not equals', function () {
            fact = new Fact('varon(B,A)');
            assert(new Fact('varon(A,B)').equals(fact.name, fact.params) === false);
        });

    });

});


