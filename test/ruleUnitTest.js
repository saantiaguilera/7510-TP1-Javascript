var expect = require("chai").expect;
var should = require('should');
var assert = require('assert');

var Fact = require('../src/fact');
var Interpreter = require('../src/interpreter');
var Rule = require('../src/rule');

describe("Rule", function () {

    describe('Rules statement parsing', function () {

        it('Check name with 1 param composes correctly', function () {
            assert(new Rule('varon(juan):-algo(juan)').statement.name === 'varon');
        });

        it('Check name with N params composes correctly', function () {
            assert(new Rule('varon(juan, pepe, maria, mario, julio):-random(juan)').statement.name === 'varon');
        });

        it('Check single param builds correctly', function () {
            assert(new Rule('varon(juan):-algo(juan)').statement.params.toString() === ['juan'].toString());
        });

        it('Check N params builds correctly', function () {
            assert(new Rule('varon(juan,pepe,maria,mario,julio):-algo(juan)').statement.params.toString() === ['juan', 'pepe', 'maria', 'mario', 'julio'].toString());
        });

    });

    describe('Rules conditions parsing', function () {

        it('Check a rule has all conditions', function() {
            assert(new Rule('a(X,Y):-b(X),c(Y),d(X,Y),e(Y,X)').conditions.length === 4);
        });

        it('Check name with 1 param composes correctly', function () {
            assert(new Rule('varon(juan):-algo(juan)').conditions[0].name === 'algo');
        });

        it('Check name with N params composes correctly', function () {
            assert(new Rule('varon(A,B):-random(juan)').conditions[0].name === 'random');
        });

        it('Check single param builds correctly', function () {
            assert(new Rule('varon(a):-algo(juan)').conditions[0].params.toString() === ['juan'].toString());
        });

        it('Check N params builds correctly', function () {
            assert(new Rule('varon(a):-algo(juan,pepe,maria,mario,julio)').conditions[0].params.toString() === ['juan', 'pepe', 'maria', 'mario', 'julio'].toString());
        });

    });

    describe('Rules comparisons', function () {

        var db = [
            "varon(juan).",
            "varon(pepe).",
            "varon(hector).",
            "varon(roberto).",
            "varon(alejandro).",
            "mujer(maria).",
            "mujer(cecilia).",
            "padre(juan, pepe).",
            "padre(juan, pepa).",
            "padre(hector, maria).",
            "padre(roberto, alejandro).",
            "padre(roberto, cecilia).",
            "hijo(X, Y) :- varon(X), padre(Y, X).",
            "hija(X, Y) :- mujer(X), padre(Y, X)."
        ];

        var interpreter = null;
        var fact = null;

        it('Check same fact is equals', function () {
            interpreter = new Interpreter();
            interpreter.parseDB(db);
            
            fact = new Fact('hijo(pepe,juan)');

            assert(new Rule('hijo(X,Y):-varon(X),padre(Y,X).').matches(fact, interpreter.facts) === true);
        });

        it('Check different name fact is not equals', function () {
            interpreter = new Interpreter();
            interpreter.parseDB(db);
            
            fact = new Fact('random(pepe,juan)');
            
            assert(new Rule('hijo(X,Y):-varon(X),padre(Y,X).').matches(fact, interpreter.facts) === false);
        });

        it('Check same name different params is not equals', function () {
            interpreter = new Interpreter();
            interpreter.parseDB(db);
            
            fact = new Fact('hijo(A,B)');
            
            assert(new Rule('hijo(X,Y):-varon(X),padre(Y,X).').matches(fact, interpreter.facts) === false);
        });

        it('Check same name same params different order is not equals', function () {
            interpreter = new Interpreter();
            interpreter.parseDB(db);
            
            fact = new Fact('random(juan,pepe)');
            
            assert(new Rule('hijo(X,Y):-varon(X),padre(Y,X).').matches(fact, interpreter.facts) === false);
        });

    });

});


