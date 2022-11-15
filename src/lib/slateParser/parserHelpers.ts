import { Parser, rainterpreterOpMeta } from '@beehiveinnovation/rainlang';
import { Node } from 'slate';

const serialize = (nodes) => {
    return nodes.map((n) => Node.string(n)).join('\n');
};

export const getFlatRanges = (value) => {
    const text = serialize(value);
    const tree = Parser.getParseTree(text, rainterpreterOpMeta);
    console.log(tree)
    let ranges: any[] = [];

    const explode = (el) => {
        if (el?.opcode) {
            ranges.push({
                el,
                anchor: { path: [], offset: el.opcode.position[0] },
                focus: { path: [], offset: el.opcode.position[1] + 1 },
                op: true,
            });
        }
        else if (el.value) {
            ranges.push({
                el,
                anchor: { path: [], offset: el.position[0] },
                focus: { path: [], offset: el.position[1] + 1 },
                value: true,
            });
        }
        else if (el?.error && el.error.includes('unknown')) {
            ranges.push({
                el,
                anchor: { path: [], offset: el.position[0] },
                focus: { path: [], offset: el.position[1] + 1 },
                error: true,
            });
        }
        if (el?.tag) {
            ranges.push({
                el: el.tag,
                anchor: { path: [], offset: el.tag.position[0] },
                focus: { path: [], offset: el.tag.position[1] + 1 },
                tag: true
            })
        }
        if (el?.parameters) {
            el?.parameters.forEach(explode);
        }
    };

    tree[0].tree.forEach(explode);

    return ranges
};

// not using this for a sec

// export const getSlateTree = (value) => {
//     const text = serialize(value);
//     // console.log(value);
//     const tree = Parser.getParseTree(text, rainterpreterOpMeta);

//     let lastIndex = 0;
//     let textSegments = [];

//     const explode = (el) => {
//         if (el?.opcode) {
//             if (lastIndex !== el?.opcode.position[0]) {
//                 textSegments.push({
//                     children: [
//                         {
//                             text: text.slice(lastIndex, el?.opcode.position[0])
//                         }
//                     ],
//                     node: null,
//                     type: 'ignored'
//                 });
//             }
//             textSegments.push({
//                 children: [
//                     {
//                         text: text.slice(el?.opcode.position[0], el?.opcode.position[1] + 1)
//                     }
//                 ],
//                 node: el,
//                 type: 'op'
//             });
//             lastIndex = el?.opcode.position[1] + 1;
//         } else if (el.value) {
//             if (lastIndex! == el?.position[0]) {
//                 textSegments.push({
//                     children: [
//                         {
//                             text: text.slice(lastIndex, el?.position[0])
//                         }
//                     ],
//                     node: null,
//                     type: 'ignored'
//                 });
//             }
//             textSegments.push({
//                 children: [
//                     {
//                         text: text.slice(el?.position[0], el?.position[1] + 1)
//                     }
//                 ],
//                 node: el,
//                 type: 'param'
//             });
//             lastIndex = el?.position[1] + 1;
//         } else if (el?.error && el.error.includes('unknown')) {
//             if (lastIndex !== el?.position[0]) {
//                 textSegments.push({
//                     children: [
//                         {
//                             text: text.slice(lastIndex, el?.position[0])
//                         }
//                     ],
//                     node: null,
//                     type: 'ignored'
//                 });
//             }
//             textSegments.push({
//                 children: [
//                     {
//                         text: text.slice(el?.position[0], el?.position[1] + 1)
//                     }
//                 ],
//                 node: el,
//                 type: 'unknown-op'
//             });
//             lastIndex = el?.position[1] + 1;
//         } else {
//             textSegments.push({
//                 children: [
//                     {
//                         text: text.slice(lastIndex, el?.position[1] + 1)
//                     }
//                 ],
//                 node: null,
//                 type: 'ignored'
//             });
//             lastIndex = el?.position[1] + 1;
//         }
//         if (el?.parameters) {
//             el?.parameters.forEach(explode);
//         }
//     };

//     tree[0].tree.forEach(explode);
//     if (lastIndex !== text.length)
//         textSegments.push({
//             children: [
//                 {
//                     text: text.slice(lastIndex)
//                 }
//             ],
//             node: null,
//             type: 'ignored'
//         });
//     console.log(value);
//     value = textSegments;
// };