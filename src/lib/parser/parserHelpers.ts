import { Parser, rainterpreterOpMeta, type Node as TreeNode } from '@beehiveinnovation/rainlang';
import { Node } from 'slate';

// Define a serializing function that takes a value and returns a string.
export const serialize = (nodes: Node[]) => {
    return nodes.map((n) => Node.string(n)).join('\n');
};

// Define a deserializing function that takes a string and returns a value.
export const deserialize = (string: string) => {
    // Return a value array of children derived by splitting the string.
    const stacks = string.split(/,+/);
    const sources = stacks.map(line => line.split(/;+/));
    const lines = sources.flat()
    const nodes = lines.map((line, i) => {
        const text = (i + 1 == lines.length) ? line.trim() : `${line.trim()},`
        return {
            type: 'expression',
            children: [{ text }],
        }
    })
    return nodes
}

export const getFlatRanges = (value: Node[]) => {
    const text = serialize(value);
    const tree = Parser.getParseTree(text, rainterpreterOpMeta);
    console.log(tree)
    const ranges: any[] = [];
    if (!Object.keys(tree).length) return ranges;

    const explode = (el: TreeNode) => {
        // console.log(el)
        if ("opcode" in el) {
            ranges.push({
                el,
                anchor: { path: [], offset: el.opcode.position[0] },
                focus: { path: [], offset: el.opcode.position[1] + 1 },
                op: true,
            });
        }
        else if ("value" in el) {
            ranges.push({
                el,
                anchor: { path: [], offset: el.position[0] },
                focus: { path: [], offset: el.position[1] + 1 },
                value: true,
            });
        }
        else if ("name" in el) {
            ranges.push({
                el,
                anchor: { path: [], offset: el.position[0] },
                focus: { path: [], offset: el.position[1] + 1 },
                name: true,
            });
        }
        else if (el?.error) {
            ranges.push({
                el,
                anchor: { path: [], offset: el.position[0] },
                focus: { path: [], offset: el.position[1] + 1 },
                error: true,
            });
        }
        if ("tag" in el && el.tag) {
            ranges.push({
                el: el.tag,
                anchor: { path: [], offset: el.tag.position[0] },
                focus: { path: [], offset: el.tag.position[1] + 1 },
                tag: true
            })
        }
        if ("parameters" in el) {
            el?.parameters.forEach(explode);
        }
    };

    tree[0].tree.forEach(explode);
    // console.log(ranges)
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