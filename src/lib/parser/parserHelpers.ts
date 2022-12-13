import { Parser, rainterpreterOpMeta, type Comment, type Node as TreeNode } from '@beehiveinnovation/rainlang';
import type { ParseTree } from 'rain-sdk';
import { Node } from 'slate';

// Define a serializing function that takes a value and returns a string.
export const serialize = (nodes: Node[]) => {
    return nodes.map((n) => Node.string(n)).join('\n');
};

// Define a deserializing function that takes a string and returns a value.
export const deserialize = (string: string) => {
    // pull out the comments first
    // let lines = string.split(/(?<=(?:\*\/)|(?:\/\*))/);
    // console.log(lines)
    // // remove all the new line chars
    // string = string.replaceAll('\n', '');
    // // split according to the stack and source delimiters
    // let lines = string.split(/(?<=(?:\*\/)|[;,])/);
    // // filter any empty lines
    // lines = lines.filter(line => line !== '')
    const lines = string.split('\n');
    // construct the nodes for slate
    const nodes = lines.map(line => {
        return {
            type: 'expression',
            children: [{ text: line }],
        }
    })
    return nodes
}

export const getFlatRanges = (tree: ParseTree) => {

    const ranges: any[] = [];
    // if (!Object.keys(tree).length) return ranges;

    const explode = (el: TreeNode) => {
        if ("opcode" in el) {
            ranges.push({
                el,
                anchor: { path: [], offset: el.opcode.position[0] },
                focus: { path: [], offset: el.opcode.position[1] + 1 },
                op: true,
            });

            if (el?.error && el.error == 'unknown opcode') {
                ranges.push({
                    el,
                    anchor: { path: [], offset: el.opcode.position[0] },
                    focus: { path: [], offset: el.opcode.position[1] },
                    error: true,
                });
            }
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
        // if (el?.error && el.error == 'unknown opcode') {
        //     ranges.push({
        //         el,
        //         anchor: { path: [], offset: el.opcode.position[0] },
        //         focus: { path: [], offset: el.opcode.position[1] + 1 },
        //         error: true,
        //     });
        // }
        if ("tag" in el && el.tag) {
            ranges.push({
                el: el.tag,
                anchor: { path: [], offset: el.tag.position[0] },
                focus: { path: [], offset: el.tag.position[1] + 1 },
                tag: true
            })
        }
        if ("parens" in el) {
            el.parens.forEach((parenPos) => {
                ranges.push({
                    el: el.tag,
                    anchor: { path: [], offset: parenPos },
                    focus: { path: [], offset: parenPos + 1 },
                    paren: true
                })

            })
        }
        if ("parameters" in el) {
            el?.parameters.forEach(explode);
        }
    };

    const addComment = (comment: Comment) => {
        if (comment.position.length == 2) {
            ranges.push({
                el: comment,
                anchor: { path: [], offset: comment.position[0] },
                focus: { path: [], offset: comment.position[1] + 1 },
                comment: true
            })
        }
    }

    if (typeof tree !== 'string') Object.values(tree).forEach(source => {
        if ('tree' in source) source.tree.forEach(explode)
        else source.forEach(comment => addComment(comment))
    })
    return ranges
}