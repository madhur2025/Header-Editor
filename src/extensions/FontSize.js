import { Mark, mergeAttributes } from '@tiptap/core'

export const FontSize = Mark.create({
    name: 'fontSize',

    addOptions() {return {HTMLAttributes:{}}},

    parseHTML() {return [{style: 'font-size'}]},

    renderHTML({ HTMLAttributes }) {return ['span', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0]},

    addAttributes() {
        return {
            style: {
                default: null,
                parseHTML: (el) => el.style.fontSize || null,
                renderHTML: (attrs) => {
                    if (!attrs.style) return {}
                    return { style: `font-size: ${attrs.style}` }
                },
            },
        }
    },

    addCommands() {
        return {
            setFontSize:
                (size) =>
                    ({ commands }) => {
                        return commands.setMark(this.name, { style: size })
                    },
        }
    },
})
