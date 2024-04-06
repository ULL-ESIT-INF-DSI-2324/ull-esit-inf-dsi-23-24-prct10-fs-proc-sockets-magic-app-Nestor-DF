import 'mocha';
import { expect } from 'chai';
import {
  FilterMapAddReduce,
  FilterMapSubReduce,
  FilterMapProdReduce,
  FilterMapDivReduce,
} from '../../src/ejercicio-pe/ConcreteClasses.js';

describe('FilterMapAddReduce', () => {
  it('FilterMapReduce add 1', () => {
    const filterMapAddReduce: FilterMapAddReduce = new FilterMapAddReduce();
    expect(
      filterMapAddReduce.run(
        [1, 2, 3, 4, 5],
        (a) => a > 0,
        (b) => b + 1,
      ),
    ).to.be.equal(20);
  });

  it('FilterMapReduce add 2', () => {
    const filterMapAddReduce: FilterMapAddReduce = new FilterMapAddReduce();
    expect(
      filterMapAddReduce.run(
        [-1, -2, -3, -4, -5],
        (a) => a > 0,
        (b) => b + 1,
      ),
    ).to.be.equal(0);
  });

  it('FilterMapReduce add 3', () => {
    const filterMapAddReduce: FilterMapAddReduce = new FilterMapAddReduce();
    expect(
      filterMapAddReduce.run(
        [1, 2, 3, 4, 5],
        (a) => a % 2 == 0,
        (b) => b + 2,
      ),
    ).to.be.equal(10);
  });

  it('FilterMapReduce add 4', () => {
    const filterMapAddReduce: FilterMapAddReduce = new FilterMapAddReduce();
    expect(
      filterMapAddReduce.run(
        [1, 2, 3, 4, 5],
        (a) => a % 2 != 0,
        (b) => b - 2,
      ),
    ).to.be.equal(3);
  });
});

describe('FilterMapSubReduce', () => {
  it('FilterMapReduce sub 1', () => {
    const filterMapSubReduce: FilterMapSubReduce = new FilterMapSubReduce();
    expect(
      filterMapSubReduce.run(
        [1, 2, 3, 4, 5],
        (a) => a > 0,
        (b) => b + 1,
      ),
    ).to.be.equal(-20);
  });

  it('FilterMapReduce sub 2', () => {
    const filterMapSubReduce: FilterMapSubReduce = new FilterMapSubReduce();
    expect(
      filterMapSubReduce.run(
        [-1, -2, -3, -4, -5],
        (a) => a > -2,
        (b) => b + 1,
      ),
    ).to.be.equal(0);
  });

  it('FilterMapReduce sub 3', () => {
    const filterMapSubReduce: FilterMapSubReduce = new FilterMapSubReduce();
    expect(
      filterMapSubReduce.run(
        [1, 2, 3, 4, 5],
        (a) => a % 2 != 0,
        (b) => b + 1,
      ),
    ).to.be.equal(-12);
  });

  it('FilterMapReduce sub 4', () => {
    const filterMapSubReduce: FilterMapSubReduce = new FilterMapSubReduce();
    expect(
      filterMapSubReduce.run(
        [1, 2, 3, 4, 5],
        (a) => a % 2 == 0,
        (b) => b + 1,
      ),
    ).to.be.equal(-8);
  });
});

describe('FilterMapProdReduce', () => {
  it('FilterMapReduce prod 1', () => {
    const filterMapProdReduce: FilterMapProdReduce = new FilterMapProdReduce();
    expect(
      filterMapProdReduce.run(
        [1, 2, 3],
        (a) => a > 0,
        (b) => b + 1,
      ),
    ).to.be.equal(24);
  });

  it('FilterMapReduce prod 2', () => {
    const filterMapProdReduce: FilterMapProdReduce = new FilterMapProdReduce();
    expect(
      filterMapProdReduce.run(
        [-3, 7, 8],
        (a) => a > -2,
        (b) => b + 1,
      ),
    ).to.be.equal(72);
  });

  it('FilterMapReduce prod 3', () => {
    const filterMapProdReduce: FilterMapProdReduce = new FilterMapProdReduce();
    expect(
      filterMapProdReduce.run(
        [-3, 2, 8],
        (a) => a + 1 == 3,
        (b) => b + 1,
      ),
    ).to.be.equal(3);
  });

  it('FilterMapReduce prod 4', () => {
    const filterMapProdReduce: FilterMapProdReduce = new FilterMapProdReduce();
    expect(
      filterMapProdReduce.run(
        [-3, 2, 8],
        (a) => a + 1 == 3,
        (b) => b + 5,
      ),
    ).to.be.equal(7);
  });
});

describe('FilterMapDivReduce', () => {
  it('FilterMapReduce div 1', () => {
    const filterMapDivReduce: FilterMapDivReduce = new FilterMapDivReduce();
    expect(
      filterMapDivReduce.run(
        [9, -2, 4],
        (a) => a > 0,
        (b) => b + 1,
      ),
    ).to.be.equal(2);
  });

  it('FilterMapReduce div 2', () => {
    const filterMapDivReduce: FilterMapDivReduce = new FilterMapDivReduce();
    expect(
      filterMapDivReduce.run(
        [-3, 99, 9],
        (a) => a > -2,
        (b) => b + 1,
      ),
    ).to.be.equal(10);
  });

  it('FilterMapReduce div 3', () => {
    const filterMapDivReduce: FilterMapDivReduce = new FilterMapDivReduce();
    expect(
      filterMapDivReduce.run(
        [-3, 100, 10],
        (a) => a % 2 == 0,
        (b) => b / 2,
      ),
    ).to.be.equal(10);
  });

  it('FilterMapReduce div 4', () => {
    const filterMapDivReduce: FilterMapDivReduce = new FilterMapDivReduce();
    expect(
      filterMapDivReduce.run(
        [-3, 100, 10],
        (a) => a % 2 != 0,
        (b) => b ** 2,
      ),
    ).to.be.equal(9);
  });
});
