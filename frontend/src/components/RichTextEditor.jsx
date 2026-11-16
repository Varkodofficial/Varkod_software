
import { useRef } from 'react'

const tools = [
  { cmd: 'bold', label: 'B', title: 'Bold', className: 'rte__btn--bold' },
  { cmd: 'italic', label: 'I', title: 'Italic', className: 'rte__btn--italic' },
  { cmd: 'underline', label: 'U', title: 'Underline', className: 'rte__btn--underline' },
  { cmd: 'insertUnorderedList', label: '• List', title: 'Bullet list' },
  { cmd: 'insertOrderedList', label: '1. List', title: 'Numbered list' },
  { cmd: 'createLink', label: 'Link', title: 'Add link' },
  { cmd: 'removeFormat', label: 'Clear', title: 'Clear formatting' },
]

export default function RichTextEditor({
  onChange,
  placeholder,
  invalid,
  id,
}) {
  const areaRef = useRef(null)

  const runCommand = (cmd) => {
    const area = areaRef.current

    if (!area) return

    area.focus()

    if (cmd === 'createLink') {
      const url = window.prompt(
        'Enter the link address (starting with https://)',
      )

      if (!url) return

      const clean = url.trim()

      if (/^(https?:\/\/|mailto:)/i.test(clean)) {
        document.execCommand('createLink', false, clean)
      } else {
        window.alert('Please enter a valid HTTPS, HTTP, or email link.')
        return
      }
    } else {
      document.execCommand(cmd, false, null)
    }

    onChange(area.innerHTML)
  }

  return (
    <div className={`rte${invalid ? ' is-invalid' : ''}`}>
      <div
        className="rte__toolbar"
        role="toolbar"
        aria-label="Text formatting"
      >
        {tools.map((tool) => (
          <button
            key={tool.cmd}
            type="button"
            title={tool.title}
            aria-label={tool.title}
            className={`rte__btn ${tool.className || ''}`}
            // Keep focus in the editor while clicking the toolbar
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => runCommand(tool.cmd)}
          >
            {tool.label}
          </button>
        ))}
      </div>

      <div
        id={id}
        ref={areaRef}
        className="rte__area"
        contentEditable
        suppressContentEditableWarning
        role="textbox"
        aria-multiline="true"
        aria-label="Project description"
        aria-required="true"
        aria-invalid={Boolean(invalid)}
        aria-placeholder={placeholder}
        data-placeholder={placeholder}
        onInput={(e) => onChange(e.currentTarget.innerHTML)}
      />
    </div>
  )
}