'use client';

import { useState } from 'react';
import { Send } from 'lucide-react';

import FormInput from '@/components/form/FormInput';
import SelectInput from '@/components/form/SelectInput';
import TextArea from '@/components/form/TextArea';
import Button from '@/components/ui/Button';
import Toast from '@/components/ui/Toast';
import { CONTACT_SUBJECTS } from '@/data/site';

const EMPTY = {
  name: '',
  email: '',
  phone: '',
  subject: CONTACT_SUBJECTS[0],
  message: '',
};

/**
 * Contact form.
 *
 * There is no backend yet, so submitting validates the fields and confirms on
 * screen. When an API exists, replace the body of `handleSubmit` with the POST
 * — nothing else in this component needs to change.
 */
export default function ContactForm() {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState('');

  const update = (field) => (event) => {
    setValues((prev) => ({ ...prev, [field]: event.target.value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  function validate() {
    const next = {};
    if (!values.name.trim()) next.name = 'Please tell us your name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      next.email = 'Please enter a valid email address.';
    }
    if (!values.message.trim()) next.message = 'Please write your message.';
    return next;
  }

  function handleSubmit(event) {
    event.preventDefault();
    const found = validate();
    setErrors(found);

    if (Object.keys(found).length > 0) {
      // Move focus to the first problem so keyboard users are not stranded.
      document.querySelector('.vint-field--invalid input, .vint-field--invalid textarea')?.focus();
      return;
    }

    setValues(EMPTY);
    setToast('Thank you — your message has been received.');
  }

  return (
    <>
      <form className="vint-form-card" onSubmit={handleSubmit} noValidate>
        <h2 style={{ marginBottom: 'var(--space-2xs)' }}>Send Us a Message</h2>
        <p style={{ color: 'var(--vint-text-muted)', marginBottom: 'var(--space-lg)' }}>
          Questions about a wine, an order or a special occasion — we read every message and reply
          personally.
        </p>

        <div className="vint-form-grid">
          <FormInput
            label="Full Name"
            name="name"
            autoComplete="name"
            value={values.name}
            onChange={update('name')}
            error={errors.name}
            required
          />

          <FormInput
            label="Email Address"
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={update('email')}
            error={errors.email}
            required
          />

          <FormInput
            label="Phone Number"
            name="phone"
            type="tel"
            autoComplete="tel"
            value={values.phone}
            onChange={update('phone')}
          />

          <SelectInput
            label="Subject"
            name="subject"
            value={values.subject}
            onChange={update('subject')}
            options={CONTACT_SUBJECTS.map((subject) => ({ value: subject, label: subject }))}
          />

          <TextArea
            label="Message"
            name="message"
            rows={5}
            className="vint-form-grid__full"
            value={values.message}
            onChange={update('message')}
            error={errors.message}
            required
          />
        </div>

        <div style={{ marginTop: 'var(--space-lg)' }}>
          <Button type="submit" variant="primary" square block icon={<Send size={16} />}>
            Send Message
          </Button>
        </div>
      </form>

      <Toast message={toast} onDismiss={() => setToast('')} />
    </>
  );
}
