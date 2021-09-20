declare module 'blurify' {
    interface Options {
      width?: number;
      height?: number;
    }

    export default function blurify(
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


