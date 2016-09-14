describe('heapster', function() {
  'use strict';

  var heapster;

  beforeEach(module('heapster'));
  beforeEach(inject(function(_heapster_) {
    heapster = _heapster_;
  }));

  describe('should humananize the CPU value', function () {
    function test_ (value, expected) {
      it(value + ' into ' + expected, function () {
        expect(heapster.HUMAN_VALUES_.CPU(value)).toEqual(expected);
      });
    }

    test_(0, '0 Cores');
    test_(NaN, '0 Cores');
    test_(1, '0.001 Cores');
    test_(1000, '1 Core');
    test_(1001, '1 Core');
    test_(1011, '1.01 Cores');
    test_(5123, '5.12 Cores');
    test_(10000, '10 Cores');
    test_(10234, '10.23 Cores');
    test_(100000, '100 Cores');
    test_(1000000, '1k Cores');
    test_(10000000, '10k Cores');
    test_(100000000, '100k Cores');
    test_(1000000000, '1m Cores');
    test_(10000000000, '> 1 million cores');
  });

  describe('should humananize Memory values', function () {
    function test_ (value, expected) {
      it(value + ' into ' + expected, function () {
        expect(heapster.HUMAN_VALUES_.Memory(value)).toEqual(expected);
      });
    }
    test_(NaN, '0 B');

    test_(0, '0 B');
    test_(100, '100 B');
    test_(1000, '1 KB');
    test_(10000, '10 KB');
    test_(100000, '100 KB');
    test_(1000000, '1 MB');
    test_(10000000, '10 MB');
    test_(100000000, '100 MB');
    test_(1000000000, '1 GB');
  });
});
