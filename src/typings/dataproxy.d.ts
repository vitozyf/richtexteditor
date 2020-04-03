declare interface IOptionView {
  width: (() => number) | number | string;
  height: (() => number) | number | string;
}

type Theme = 'default';

type TextAlign = 'left' | 'right' | 'center' | 'justify';
type ImageBlockLine = 'center' | 'left' | 'right' | 'none';
interface IAutotypeset {
  mergeEmptyline: boolean; //合并空行
  removeClass: boolean; //去掉冗余的class
  removeEmptyline: boolean; //去掉空行
  textAlign: TextAlign; //段落的排版方式，可以是 left，right，center，justify 去掉这个属性表示不执行排版
  imageBlockLine: ImageBlockLine; //图片的浮动方式，独占一行剧中，左右浮动，默认: center，left，right，none 去掉这个属性表示不执行排版
  pasteFilter: boolean; //根据规则过滤没事粘贴进来的内容
  clearFontSize: boolean; //去掉所有的内嵌字号，使用编辑器默认的字号
  clearFontFamily: boolean; //去掉所有的内嵌字体，使用编辑器默认的字体
  removeEmptyNode: boolean; // 去掉空节点
  indent: boolean; // 行首缩进
  indentValue: string; //行首缩进的大小
}

declare interface IOption {
  view?: IOptionView;
  // 初始值内容
  initialContent?: string;
  // 工具栏
  toolbars?: Array<string>;
  // z-index
  zIndex?: number;
  // 语言
  lang?: lang;
  // 样式
  style?: {
    bgcolor?: string;
    color?: string;
    font?: {
      // 字号选项配置的值之一
      size?: number;
      // fontfamily之一的key
      family?: string;
      //段间距选项配置的值之一
      rowspacingtop?: number;
      rowspacingbottom?: number;
      // 行高选项配置的值之一
      lineheight?: number;
    };
  };
  // 主题
  theme?: Theme;
  // 是否只读
  readonly?: boolean;
  // 字体设置 label留空支持多语言自动切换
  fontfamily?: Array<{
    key: string;
    title: string;
  }>;
  //字号选项
  fontsize?: Array<number>;
  // 段间距
  rowspacingtop?: Array<number>;
  rowspacingbottom?: Array<number>;
  // 行高
  lineheight?: Array<number>;
  // 启用右键功能
  enableContextMenu?: boolean;
  // 自定义的右键菜单
  contextMenu?: Array<{
    label: string;
    cmdName: string;
    exec: () => {};
  }>;
  // 是否开启字数统计
  wordCount?: boolean;
  // 允许的最大字符数
  maximumWords?: number;
  // 字数统计提示，{#count}代表当前字数，{#leave}代表还可以输入多少字符数 留空支持多语言自动切换
  wordCountMsg?: string;
  // 超出字数限制提示 留空支持多语言自动切换
  wordOverFlowMsg?: string;
  // 点击tab键时移动的空格距离
  tabSize?: number;
  // undo操作 可以最多回退的次数
  maxUndoCount?: number;
  // undo操作 当输入的字符数超过该值时，保存一次现场
  maxInputCount?: number;
  // 自动排版参数
  autotypeset?: IAutotypeset;
}
