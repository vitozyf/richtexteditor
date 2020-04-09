import helper from '@core/helper';
import defaultOptions from '@src/default_options';

export default class DataProxy {
  options: IOption;
  name: string;
  constructor(name: string, options: IOption) {
    this.name = name;
    this.options = helper.merge(<IOption>defaultOptions, options);
  }

  getFontfamilyData() {
    let defaultFontfamily = this.options.style?.font?.family;
    const Fontfamily = this.options.fontfamily || [];

    if (!Fontfamily.find(d => d.key === defaultFontfamily)) {
      defaultFontfamily = Fontfamily[0].key;
    }
    return defaultFontfamily;
  }

  getFontSizeData() {
    let defaultFontSize = this.options.style?.font?.size;
    const FontSize = this.options.fontsize || [];

    if (!FontSize.includes(Number(defaultFontSize))) {
      defaultFontSize = FontSize[0];
    }
    return (<number>defaultFontSize).toString();
  }
  getData() {
    const { options } = this;
    return {
      defaultFontfamily: this.getFontfamilyData(),
      defaultFontsize: this.getFontSizeData(),
      fontsize: options.fontsize || [],
      fontfamily: options.fontfamily || []
    };
  }
}
