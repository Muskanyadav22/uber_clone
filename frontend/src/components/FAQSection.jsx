import { useState } from "react";

const faqs = [
  {
    question: "Can I have a lost item delivered to me?",
    answer: (
      <>
        The UrbanRide app helps provide a delivery solution that can save you a trip across town, whether it’s for a last-minute birthday gift or your forgotten keys.<br />
        Just choose Package in the UrbanRide app.<br /><br />
        <a href="#" style={{ textDecoration: "underline" }}>Get details</a>
      </>
    ),
  },
  {
    question: "Can I rent a car using UrbanRide?",
    answer: (
      <>
        Yes. <a href="#" style={{ textDecoration: "underline" }}>Find out more</a> about how car rentals work.
      </>
    ),
  },
  {
    question: "Can I request a ride that picks up friends in different locations?",
    answer: "Yes, you can add multiple stops to your ride in the app.",
  },
  {
    question: "Can I request a taxi on UrbanRide?",
    answer: "Yes, you can request a taxi if the service is available in your city.",
  },
];

export default function FAQSection() {
  const [open, setOpen] = useState(0);
  return (
    <section style={{ background: '#fff', color: '#111', padding: '40px 0', marginTop: 32 }}>
      <h2 style={{ textAlign: 'center', fontWeight: 700, fontSize: '2rem', marginBottom: 32 }}>
        Frequently asked questions
      </h2>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        {faqs.map((faq, idx) => (
          <div key={idx} style={{ borderBottom: '1px solid #eee', marginBottom: 8 }}>
            <div
              style={{
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '1.2rem',
                padding: '18px 0 8px 0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
              onClick={() => setOpen(open === idx ? -1 : idx)}
            >
              <span>{faq.question}</span>
              <span style={{ fontSize: 24, fontWeight: 400 }}>{open === idx ? '\u25B2' : '\u25BC'}</span>
            </div>
            {open === idx && (
              <div style={{ padding: '0 0 18px 0', fontSize: '1rem', color: '#222' }}>{faq.answer}</div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
