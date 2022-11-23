import { Parser, rainterpreterOpMeta, type Comment, type Node as TreeNode, type ParseTree } from '@beehiveinnovation/rainlang';
import { Node } from 'slate';

// Define a serializing function that takes a value and returns a string.
export const serialize = (nodes: Node[]) => {
    return nodes.map((n) => Node.string(n)).join('\n');
};

// Define a deserializing function that takes a string and returns a value.
export const deserialize = (string: string) => {
    // remove all the new line chars
    string = string.replaceAll('\n', '');
    // split according to the stack and source delimiters
    let lines = string.split(/(?<=(?:\*\/)|[;,])/);
    // filter any empty lines
    lines = lines.filter(line => line !== '')
    // construct the nodes for slate
    const nodes = lines.map(line => {
        return {
            type: 'expression',
            children: [{ text: line }],
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

    Object.values(tree).forEach(source => {
        if ('tree' in source) source.tree.forEach(explode)
        else source.forEach(comment => addComment(comment))
    })
    return ranges
}