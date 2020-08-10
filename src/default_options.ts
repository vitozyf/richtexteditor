export default {
  view: {
    height: '100%',
    width: '100%'
  },
  initialContent: '',
  toolbars: [
    // 'anchor', //锚点
    'clear', // 清除格式
    'print', //打印
    'undo', //撤销
    'redo', //恢复
    'bold', //加粗
    'italic', //斜体
    'underline', //下划线
    'strikeThrough', //删除线
    'justifyLeft', //居左对齐
    'justifyRight', //居右对齐
    'justifyCenter', //居中对齐
    'justifyFull', //两端对齐
    'insertOrderedList', //有序列表
    'insertUnorderedList', //无序列表
    'removeFormat', // 清除格式
    'formatBlock', //引用
    'indent', //添加缩进
    'outdent', //删除缩进
    'createLink', //超链接
    'unlink', //取消链接
    'selectAll', // 全选
    'cut', //剪切
    'copy', // 复制
    'superscript', // 上标
    'subscript', // 下标
    'fontName', // 字体
    'fontSize', // 字体大小
    'backColor' // 背景色
    // 'touppercase', //字母大写
    // 'tolowercase' //字母小写

    // 'paste', // 粘贴
    // 'snapscreen', //截图
    // 'subscript', //下标
    // 'fontborder', //字符边框
    // 'superscript', //上标
    // 'formatmatch', //格式刷
    // 'source', //源代码
    // 'pasteplain', //纯文本粘贴模式
    // 'selectall', //全选
    // 'preview', //预览
    // 'horizontal', //分隔线
    // 'time', //时间
    // 'date', //日期

    // 'insertrow', //前插入行
    // 'insertcol', //前插入列
    // 'mergeright', //右合并单元格
    // 'mergedown', //下合并单元格
    // 'deleterow', //删除行
    // 'deletecol', //删除列
    // 'splittorows', //拆分成行
    // 'splittocols', //拆分成列
    // 'splittocells', //完全拆分单元格
    // 'deletecaption', //删除表格标题
    // 'inserttitle', //插入标题
    // 'mergecells', //合并多个单元格
    // 'deletetable', //删除表格
    // 'cleardoc', //清空文档
    // 'insertparagraphbeforetable', //"表格前插入行"
    // 'insertcode', //代码语言
    // 'fontfamily', //字体
    // 'fontsize', //字号
    // 'paragraph', //段落格式
    // 'simpleupload', //单图上传
    // 'insertimage', //多图上传
    // 'edittable', //表格属性
    // 'edittd', //单元格属性

    // 'emotion', //表情
    // 'spechars', //特殊字符
    // 'searchreplace', //查询替换
    // 'map', //Baidu地图
    // 'gmap', //Google地图
    // 'insertvideo', //视频
    // 'help', //帮助

    // 'forecolor', //字体颜色
    // 'backcolor', //背景色

    // 'fullscreen', //全屏
    // 'directionalityltr', //从左向右输入
    // 'directionalityrtl', //从右向左输入
    // 'rowspacingtop', //段前距
    // 'rowspacingbottom', //段后距
    // 'pagebreak', //分页
    // 'insertframe', //插入Iframe
    // 'imagenone', //默认
    // 'imageleft', //左浮动
    // 'imageright', //右浮动
    // 'attachment', //附件
    // 'imagecenter', //居中
    // 'wordimage', //图片转存
    // 'lineheight', //行间距
    // 'edittip ', //编辑提示
    // 'customstyle', //自定义标题
    // 'autotypeset', //自动排版
    // 'webapp', //百度应用
    // 'touppercase', //字母大写
    // 'tolowercase', //字母小写
    // 'background', //背景
    // 'template', //模板
    // 'scrawl', //涂鸦
    // 'music', //音乐
    // 'inserttable', //插入表格
    // 'drafts', // 从草稿箱加载
    // 'charts' // 图表
  ],
  zIndex: 10000,
  // lang: 'zh-cn',
  style: {
    bgcolor: '#fff',
    color: '#000',
    font: {
      size: 3,
      family: 'Arial',
      rowspacingtop: 5,
      rowspacingbottom: 5,
      lineheight: 1.35
    }
  },
  theme: 'default',
  readonly: false,
  fontfamily: [
    { key: 'Arial', title: 'Arial' },
    { key: 'Helvetica', title: 'Helvetica' },
    { key: 'Source Sans Pro', title: 'Source Sans Pro' },
    { key: 'Comic Sans MS', title: 'Comic Sans MS' },
    { key: 'Courier New', title: 'Courier New' },
    { key: 'Verdana', title: 'Verdana' },
    { key: 'Lato', title: 'Lato' }
  ],
  fontsize: [1, 2, 3, 4, 5, 6, 7], // 7:48px 6:32px 5:24px 4:18px 3:16px 2:11px 1:10px
  rowspacingtop: [5, 10, 15, 20, 25],
  rowspacingbottom: [5, 10, 15, 20, 25],
  lineheight: [1, 1.35, 1.5, 1.75, 2, 3, 4, 5],
  enableContextMenu: true,
  contextMenu: [],
  wordCount: true,
  maximumWords: 10000,
  wordCountMsg: '当前已输入{#count}个字符, 您还可以输入{#leave}个字符。',
  wordOverFlowMsg:
    '<span style="color:red;">你输入的字符个数已经超出最大允许值，服务器可能会拒绝保存！</span>',
  tabSize: 4,
  maxUndoCount: 20,
  maxInputCount: 1,
  autotypeset: {
    mergeEmptyline: true, //合并空行
    removeClass: true, //去掉冗余的class
    removeEmptyline: false, //去掉空行
    textAlign: 'left', //段落的排版方式，可以是 left，right，center，justify 去掉这个属性表示不执行排版
    imageBlockLine: 'center', //图片的浮动方式，独占一行剧中，左右浮动，默认: center，left，right，none 去掉这个属性表示不执行排版
    pasteFilter: false, //根据规则过滤没事粘贴进来的内容
    clearFontSize: false, //去掉所有的内嵌字号，使用编辑器默认的字号
    clearFontFamily: false, //去掉所有的内嵌字体，使用编辑器默认的字体
    removeEmptyNode: false, // 去掉空节点
    indent: false, // 行首缩进
    indentValue: '2em' //行首缩进的大小
  }
};
