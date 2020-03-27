import helper from '@core/helper';
const defaultOptions: IOption = {
  view: {
    height: () => document.documentElement.clientHeight,
    width: () => document.documentElement.clientWidth
  },
  style: {
    bgcolor: '#ffffff',
    color: '#0a0a0a',
    border: true,
    borderWidth: 1,
    borderColor: '#e6e6e6',
    font: {
      name: 'Arial',
      size: 10,
      bold: false
    }
  }
};

export default class DataProxy {
  options: IOption;
  name: string;

  constructor(name: string, options: IOption) {
    this.name = name;
    this.options = helper.merge(defaultOptions, options);
  }
}
