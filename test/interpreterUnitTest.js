var expect = require("chai").expect;
var should = require('should');
var assert = require('assert');

var Interpreter = require('../src/interpreter');


describe("Interpreter", function () {

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

    beforeEach(function () {
        // runs before each test in this block
        interpreter = new Interpreter();
    });

    describe('Interpreter Parse DB', function () {

        it('DB Should have 14 elements', function () {
            interpreter.parseDB(db);
            assert(interpreter.facts.length == 12);
            assert(interpreter.rules.length == 2);
        });

    });

    describe('Interpreter Facts', function () {

        it('Check an existent fact is found', function () {
            interpreter.parseDB(db);
            assert(interpreter.checkQuery('padre(juan, pepe)') === true);
        });
        it('Check a non existent fact name is not found', function () {
            interpreter.parseDB(db);
            assert(interpreter.checkQuery('random(maria, roberto)') === false);
        });
        it('Check a non existent param is not found', function () {
            interpreter.parseDB(db);
            assert(interpreter.checkQuery('padre(juan, random)') === false);
        });

    });

    describe('Interpreter Rules', function () {

        it('Check an existent rule is found', function () {
            interpreter.parseDB(db);
            assert(interpreter.checkQuery('hijo(pepe, juan)') === true);
        });
        it('Check a non existent rule is not found', function () {
            interpreter.parseDB(db);
            assert(interpreter.checkQuery('hijo(random, roberto)') === false);
        });

    });

    describe('Interpreter Trim Spaces', function () {

        it('Check it trims end', function () {
            assert(interpreter.trimSpaces('text.  ') === 'text.');
        });

        it('Check it trims start', function () {
            assert(interpreter.trimSpaces('  text.') === 'text.');
        });
        
        it('Check it trims middle', function () {
            assert(interpreter.trimSpaces('t e x t .') === 'text.');
        });

        it('Check it trims all', function () {
            assert(interpreter.trimSpaces('  t e x t .  ') === 'text.');
        });        

    });

});