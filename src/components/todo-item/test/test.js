var assert = require('chai').assert;
var todoItemComponent = require('../todo-item');

describe('Basic Mocha String Test', function () {
 it('should return number of charachters in a string', function () {
        assert.equal("Hello".length, 4);
    });
 it('should return first charachter of the string', function () {
        assert.equal("Hello".charAt(0), 'H');
    });
});