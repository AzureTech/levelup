/* Copyright (c) 2012-2016 LevelUP contributors
 * See list at <https://github.com/level/levelup#contributing>
 * MIT License <https://github.com/level/levelup/blob/master/LICENSE.md>
 */

var levelup = require('../lib/levelup.js')
var leveldown = require('leveldown')
var assert = require('referee').assert
var buster = require('bustermove')

buster.testCase('Destroy & Repair', {
  'destroy() is alias for leveldown.destroy()': function () {
    var ldmock = this.mock(leveldown)
    var expect = ldmock.expects('destroy').once()
    levelup.destroy()
    ldmock.verify()
    assert.same(expect.getCall(0).args[0], undefined)
  },

  'repair() is alias for leveldown.repair()': function () {
    var ldmock = this.mock(leveldown)
    var expect = ldmock.expects('repair').once()
    levelup.repair()
    ldmock.verify()
    assert.same(expect.getCall(0).args[0], undefined)
  },

  'destroy() passes on arguments': function () {
    var ldmock = this.mock(leveldown)
    var args = [ 'location', function () { } ]
    ldmock
      .expects('destroy')
      .once()
      .withExactArgs(args[0], args[1])

    levelup.destroy.apply(null, args)
    ldmock.verify()
  },

  'repair() passes on arguments': function () {
    var ldmock = this.mock(leveldown)
    var args = [ 'location', function () { } ]
    ldmock
      .expects('repair')
      .once()
      .withExactArgs(args[0], args[1])

    levelup.repair.apply(null, args)
    ldmock.verify()
  },

  'destroy() substitutes missing callback argument': function () {
    var ldmock = this.mock(leveldown)
    var args = [ 'location' ]
    var expect = ldmock
          .expects('destroy')
          .once()
          .withArgs(args[0])

    levelup.destroy.apply(null, args)
    ldmock.verify()
    assert.equals(2, expect.getCall(0).args.length)
    assert.isFunction(expect.getCall(0).args[1])
  },

  'repair() substitutes missing callback argument': function () {
    var ldmock = this.mock(leveldown)
    var args = [ 'location' ]
    var expect = ldmock
          .expects('repair')
          .once()
          .withArgs(args[0])

    levelup.repair.apply(null, args)
    ldmock.verify()
    assert.equals(2, expect.getCall(0).args.length)
    assert.isFunction(expect.getCall(0).args[1])
  }
})
