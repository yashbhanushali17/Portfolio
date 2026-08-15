// Ported as-is from the existing chatbot UI (script.js) — logic untouched,
// only the surrounding shell is new. See MASTER_PLAN.md §5.

export function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export function renderMarkdown(raw) {
  let text = escapeHtml(raw);

  const codeBlocks = [];
  text = text.replace(/```(\w*)\n?([\s\S]*?)```/g, (m, lang, code) => {
    codeBlocks.push({ lang: lang || 'text', code: code.replace(/\n$/, '') });
    return `\u0000CODEBLOCK${codeBlocks.length - 1}\u0000`;
  });

  text = text.replace(/`([^`]+)`/g, '<code class="md-inline-code">$1</code>');
  text = text.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  text = text.replace(/\*([^*]+)\*/g, '<em>$1</em>');
  text = text.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');

  text = text.replace(/(?:^|\n)((?:[-*] .+(?:\n|$))+)/g, (block) => {
    const items = block.trim().split('\n').map((l) => `<li>${l.replace(/^[-*]\s+/, '')}</li>`).join('');
    return `<ul class="md-list">${items}</ul>`;
  });

  text = text
    .split(/\n/)
    .join('<br>')
    .replace(/<br>(<ul)/g, '$1')
    .replace(/(<\/ul>)<br>/g, '$1');

  text = text.replace(/\u0000CODEBLOCK(\d+)\u0000/g, (m, i) => {
    const { lang, code } = codeBlocks[i];
    return `<div class="md-code-block"><div class="md-code-head"><span>${lang}</span><button class="md-copy-btn" type="button" data-copy>Copy</button></div><pre><code>${code}</code></pre></div>`;
  });

  return text;
}

export function stripMarkdown(md) {
  return md
    .replace(/```(\w*)\n?([\s\S]*?)```/g, (m, lang, code) => code.replace(/\n$/, ''))
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1');
}
