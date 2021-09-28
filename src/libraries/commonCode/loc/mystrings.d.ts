declare interface ICommonCodeLibraryStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
}

declare module 'CommonCodeLibraryStrings' {
  const strings: ICommonCodeLibraryStrings;
  export = strings;
}
