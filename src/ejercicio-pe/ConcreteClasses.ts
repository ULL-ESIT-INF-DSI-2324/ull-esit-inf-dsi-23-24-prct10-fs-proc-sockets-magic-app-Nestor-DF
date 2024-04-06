import { FilterMapReduceTemplate } from './FilterMapReduceTemplate.js';

/**
 * Represents a class that extends FilterMapReduceTemplate to perform addition operation during reduction.
 */
export class FilterMapAddReduce extends FilterMapReduceTemplate {
  /**
   * Reduces a list of numbers by adding them.
   * @param list The list of numbers to reduce.
   * @returns The result of the addition operation.
   */
  reduce(list: number[]): number {
    let acc = 0;
    for (let i = 0; i < list.length; ++i) {
      acc += list[i];
    }
    return acc;
  }

  /**
   * Method to show the result after Filter
   * @param arr Array to show
   */
  protected showStateAfterFilter(arr: number[]): void {
    console.log('I am a hook method, this is the result after filtering: ', arr);
  }
}

/**
 * Represents a class that extends FilterMapReduceTemplate to perform subtraction operation during reduction.
 */
export class FilterMapSubReduce extends FilterMapReduceTemplate {
  /**
   * Reduces a list of numbers by subtracting them.
   * @param list The list of numbers to reduce.
   * @returns The result of the subtraction operation.
   */
  reduce(list: number[]): number {
    let acc = 0;
    for (let i = 0; i < list.length; ++i) {
      acc -= list[i];
    }
    return acc;
  }
}

/**
 * Represents a class that extends FilterMapReduceTemplate to perform multiplication operation during reduction.
 */
export class FilterMapProdReduce extends FilterMapReduceTemplate {
  /**
   * Reduces a list of numbers by multiplying them.
   * @param list The list of numbers to reduce.
   * @returns The result of the multiplication operation.
   */
  reduce(list: number[]): number {
    let acc = 1;
    for (let i = 0; i < list.length; ++i) {
      acc *= list[i];
    }
    return acc;
  }
}

/**
 * Represents a class that extends FilterMapReduceTemplate to perform division operation during reduction.
 */
export class FilterMapDivReduce extends FilterMapReduceTemplate {
  /**
   * Reduces a list of numbers by dividing them.
   * @param list The list of numbers to reduce.
   * @returns The result of the division operation.
   */
  reduce(list: number[]): number {
    let acc = list[0];
    for (let i = 1; i < list.length; ++i) {
      acc /= list[i];
    }
    return acc;
  }
}
