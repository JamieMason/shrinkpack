declare module 'ssri' {
  export interface IIntegrity {
    concat: (other: IIntegrity) => IIntegrity;
    toJSON: () => string;
  }

  export declare const fromData: (data: string) => IIntegrity;
  export declare const parse: (sri: string) => IIntegrity;
}
