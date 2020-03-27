declare interface IMessage {
  toolbar: {
    undo: string;
  };
  contextmenu: {
    copy: string;
  };
}

declare type lang = 'zh-cn' | 'en';

declare type messageFields = 'toolbar' | 'contextmenu';

declare interface IMessages {
  'zh-cn'?: IMessage;
  en?: IMessage;
}
