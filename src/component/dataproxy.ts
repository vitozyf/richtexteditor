import helper from '@core/helper';
import defaultOptions from '@src/default_options';

export default class DataProxy {
  options: IOption;
  name: string;

  constructor(name: string, options: IOption) {
    this.name = name;
    this.options = helper.merge(defaultOptions, options);
  }
}
