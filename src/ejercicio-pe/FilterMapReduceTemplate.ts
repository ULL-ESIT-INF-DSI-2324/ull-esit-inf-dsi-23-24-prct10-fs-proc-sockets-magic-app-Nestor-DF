/**
 * Abstract class representing a Filter-Map-Reduce template.
 */
export abstract class FilterMapReduceTemplate {
  /**
   * Executes the template method, performing filter, map, and reduce operations on a list of numbers.
   * @param list The list of numbers to operate on.
   * @param predicate The predicate function for filtering.
   * @param transform The transform function for mapping.
   * @returns The result of the reduce operation.
   */
  public run(list: number[], predicate: (num: number) => boolean, transform: (num: number) => number): number {
    const filteredList = this.filter(list, predicate);
    this.showStateAfterFilter(filteredList);
    const mappedList = this.map(filteredList, transform);
    this.showStateAfterMap(mappedList);
    const reducedResult = this.reduce(mappedList);
    return reducedResult;
  }

  /**
   * Filters a list of numbers based on a predicate function.
   * @param list The list of numbers to filter.
   * @param predicate The predicate function to filter the list.
   * @returns The filtered list of numbers.
   */
  protected filter(list: number[], predicate: (num: number) => boolean): number[] {
    const filteredList: number[] = [];
    for (const num of list) {
      if (predicate(num)) {
        filteredList.push(num);
      }
    }
    return filteredList;
  }

  /**
   * Maps a list of numbers based on a transform function.
   * @param list The list of numbers to map.
   * @param transform The transform function to apply to each element.
   * @returns The mapped list of numbers.
   */
  protected map(list: number[], transform: (num: number) => number): number[] {
    const mappedList: number[] = [];
    for (const num of list) {
      mappedList.push(transform(num));
    }
    return mappedList;
  }

  /**
   * Abstract method to reduce a list of numbers.
   * @param list The list of numbers to reduce.
   * @returns The reduced number.
   */
  protected abstract reduce(list: number[]): number;

  /**
   * Show the state after filter
   * @param arr array to show
   */
  protected showStateAfterFilter(arr: number[]) {}

  /**
   * Show the state after map
   * @param arr array to show
   */
  protected showStateAfterMap(arr: number[]) {}
}
