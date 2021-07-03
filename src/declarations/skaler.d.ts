declare module 'skaler' {
    interface Options {
      width?: number;
      height?: number;
    }

    export default function skaler(
      input: File | null,
      Options
    ): Promise<File>
}


// export as namespace skaler;
// export = skaler;


// declare function skale(
//         input: File,
//         { 
//           width: number,
//           height: number 
//         }) : Promise<File>;


