const chai = require("chai");
const expect = chai.expect;
const alea = require("./dist");

describe("Alea", function() {

  it("should test that random() returns everytime the same values", function() {

    expect(alea.random()).to.be.equal(0.6551482998766005);
    expect(alea.random()).to.be.equal(0.3048086166381836);
    expect(alea.random()).to.be.equal(0.9227445721626282);

  });

  it("should reset the seed and generate the same values using intBetween", function() {

    expect(alea.reset(0)).to.be.equal(0);
    expect(alea.intBetween(10,1)).to.be.equal(7);
    expect(alea.intBetween(10,1)).to.be.equal(4);
    expect(alea.intBetween(10,1)).to.be.equal(9);

  });

  it("should reset the seed and generate the same values using floatBetween", function() {

    expect(alea.reset(0)).to.be.equal(0);
    expect(alea.floatBetween(10,1)).to.be.equal(6.8963346988894045);
    expect(alea.floatBetween(10,1)).to.be.equal(3.7432775497436523);
    expect(alea.floatBetween(10,1)).to.be.equal(9.304701149463654);

  });

  it("should reset the seed and shuffle an array", function() {

    expect(alea.reset(0)).to.be.equal(0);
    expect(alea.shuffle([1,2,3,4,5])).to.be.deep.equal([5,1,3,2,4]);

  });

  it("should reset the seed and pick 3 elements from an array", function() {

    expect(alea.reset(0)).to.be.equal(0);
    expect(alea.pick([1,2,3,4,5], 20)).to.be.deep.equal([4,2,5,2,5,1,2,1,3,4,2,1,4,3,4,3,2,3,4,1]);

  });

  it("should reset the seed and take 3 elements from an array", function() {

    expect(alea.reset(0)).to.be.equal(0);
    expect(alea.take([1,2,3,4,5], 20)).to.be.deep.equal([4,2,5,1,3]);

  });

  it("should reset the seed and pickOne from an array", function() {

    expect(alea.reset(0)).to.be.equal(0);
    expect(alea.pickOne([1,2,3,4,5])).to.be.deep.equal(4);

  });

  it("should reset the seed and takeOne from an array", function() {

    expect(alea.reset(0)).to.be.equal(0);
    expect(alea.takeOne([1,2,3,4,5])).to.be.deep.equal(4);

  });

});
