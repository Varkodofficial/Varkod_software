import { useState } from 'react'
import { CONTACT_EMAIL, PHONE_NUMBER } from '../config.js'
import RichTextEditor from './RichTextEditor.jsx'
import useReveal from '../hooks/useReveal.js'

const projectTypes = [
  'Static website',
  'Dynamic web application',
  'Business management system',
  'Custom software',
  'Not sure yet',
]

const emptyForm = {
  name: '',
  email: '',
  phone: '',
  title: '',
  type: projectTypes[0],
}

const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)

// Turns the editor's HTML into plain text, keeping line breaks and list bullets
const htmlToPlain = (html) => {
  const withBreaks = html
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/(p|div|li)>/gi, '\n')
    .replace(/<li>/gi, '• ')
  const doc = new DOMParser().parseFromString(withBreaks, 'text/html')
  return doc.body.textContent.replace(/\n{3,}/g, '\n\n').trim()
}

export default function Contact() {
  useReveal()

  const [form, setForm] = useState(emptyForm)
  const [description, setDescription] = useState('')
  const [editorKey, setEditorKey] = useState(0) // changing this clears the editor
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const validate = () => {
    const found = {}
    if (!form.name.trim()) found.name = 'Please enter your name.'
    if (!isValidEmail(form.email.trim())) found.email = 'Please enter a valid email address.'
    if (!form.title.trim()) found.title = 'Please give your request a title.'
    if (!htmlToPlain(description)) found.description = 'Please describe what you need.'
    return found
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const found = validate()
    setErrors(found)
    if (Object.keys(found).length > 0) {
      setMessage('Please check the highlighted fields.')
      return
    }

    const subject = `New project query: ${form.title.trim()}`
    const body = [
      `Name: ${form.name.trim()}`,
      `Email: ${form.email.trim()}`,
      `Phone: ${form.phone.trim() || '-'}`,
      `Type of project: ${form.type}`,
      '',
      'Description:',
      htmlToPlain(description),
    ].join('\n')

    // Opens the visitor's email app with the query filled in, addressed to us
    window.location.href =
      `mailto:${CONTACT_EMAIL}` +
      `?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`

    setMessage(
      'Your email app should open with your query ready. Press Send there. If nothing opens, email us directly at ' +
        CONTACT_EMAIL +
        '.',
    )
  }

  return (
    <main>
      {/* ---------- HERO ---------- */}
      <section className="ct-hero">
        <div className="container">
          <p className="eyebrow" data-reveal>Contact</p>
          <h1 className="ct-hero__title" data-reveal>
            Tell us what you want to build.
          </h1>
          <p className="ct-hero__text" data-reveal>
            Share the basics and a short description. We will reply with a clear plan, a
            realistic timeline and honest next steps.
          </p>
        </div>
      </section>

      {/* ---------- DETAILS + FORM ---------- */}
      <section className="ct-body">
        <div className="container ct-grid">
          <aside className="ct-info" data-reveal>
            <a className="ct-info__card" href={`mailto:${CONTACT_EMAIL}`}>
              <span className="ct-info__label">Email</span>
              <span className="ct-info__value">{CONTACT_EMAIL}</span>
            </a>

            <a className="ct-info__card" href={`tel:${PHONE_NUMBER.replace(/\s/g, '')}`}>
              <span className="ct-info__label">Phone</span>
              <span className="ct-info__value">{PHONE_NUMBER}</span>
            </a>

            <p className="ct-info__note">
              Prefer to write directly? Email us at any time and a founder will reply.
            </p>
          </aside>

          <form className="ct-form" onSubmit={handleSubmit} noValidate data-reveal>
            <div className="ct-row">
              <div className="ct-field">
                <label className="ct-field__label" htmlFor="name">Your name *</label>
                <input
                  id="name"
                  name="name"
                  className={`ct-field__input${errors.name ? ' is-invalid' : ''}`}
                  value={form.name}
                  onChange={handleChange}
                  autoComplete="name"
                />
                {errors.name && <span className="ct-field__error">{errors.name}</span>}
              </div>

              <div className="ct-field">
                <label className="ct-field__label" htmlFor="email">Email *</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className={`ct-field__input${errors.email ? ' is-invalid' : ''}`}
                  value={form.email}
                  onChange={handleChange}
                  autoComplete="email"
                />
                {errors.email && <span className="ct-field__error">{errors.email}</span>}
              </div>
            </div>

            <div className="ct-row">
              <div className="ct-field">
                <label className="ct-field__label" htmlFor="phone">Phone</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  className="ct-field__input"
                  value={form.phone}
                  onChange={handleChange}
                  autoComplete="tel"
                />
              </div>

              <div className="ct-field">
                <label className="ct-field__label" htmlFor="type">Type of project</label>
                <select
                  id="type"
                  name="type"
                  className="ct-field__input"
                  value={form.type}
                  onChange={handleChange}
                >
                  {projectTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="ct-field">
              <label className="ct-field__label" htmlFor="title">Title of your request *</label>
              <input
                id="title"
                name="title"
                className={`ct-field__input${errors.title ? ' is-invalid' : ''}`}
                placeholder="For example: Online booking system for my clinic"
                value={form.title}
                onChange={handleChange}
              />
              {errors.title && <span className="ct-field__error">{errors.title}</span>}
            </div>

            <div className="ct-field">
              <label className="ct-field__label" htmlFor="description-editor">Description *</label>
              <RichTextEditor
                id="description-editor"
                key={editorKey}
                invalid={Boolean(errors.description)}
                placeholder="Describe your goals, your users and any features you have in mind. Use the toolbar to format your text."
                onChange={(html) => {
                  setDescription(html)
                  if (errors.description) setErrors((prev) => ({ ...prev, description: undefined }))
                }}
              />
              {errors.description && <span className="ct-field__error">{errors.description}</span>}
            </div>

            <div className="ct-submit-row">
              <button type="submit" className="ct-submit">
                Open email to send
                <span className="btn__arrow"> →</span>
              </button>

              {message && (
                <p className={`ct-status ${Object.keys(errors).length ? 'is-error' : 'is-success'}`} role="status">
                  {message}
                </p>
              )}
            </div>
          </form>
        </div>
      </section>
    </main>
  )
}