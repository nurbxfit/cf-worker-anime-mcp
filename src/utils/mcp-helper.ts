export const MCPTextResponse = (text: string): { content: { type: 'text'; text: string }[] } => {
    return {
        content: [{
            type: 'text',
            text
        }]
    }
}