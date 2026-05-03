import React from 'react';

function TruckIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="3" width="15" height="13" rx="1"/>
      <path d="M16 8h4l3 3v5h-7V8z"/>
      <circle cx="5.5" cy="18.5" r="2.5"/>
      <circle cx="18.5" cy="18.5" r="2.5"/>
    </svg>
  );
}

function WalletIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/>
      <path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/>
      <path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/>
    </svg>
  );
}

function CardIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="4" width="22" height="16" rx="2"/>
      <line x1="1" y1="10" x2="23" y2="10"/>
      <line x1="6" y1="15" x2="9" y2="15"/>
      <line x1="12" y1="15" x2="14" y2="15"/>
    </svg>
  );
}

const METHODS = [
  { value: 'cod',         Icon: TruckIcon,  color: '#16a34a', bg: '#dcfce7', label: 'Cash on Delivery',    desc: 'Pay when your order arrives' },
  { value: 'paypal',      Icon: WalletIcon, color: '#2563eb', bg: '#dbeafe', label: 'PayPal',              desc: 'Fast & secure online payment' },
  { value: 'credit_card', Icon: CardIcon,   color: '#7c3aed', bg: '#ede9fe', label: 'Credit / Debit Card', desc: 'Visa, Mastercard, Amex & more' },
];

export default function PaymentStep({ method, onChange, onNext, onBack }) {
  return (
    <div className="checkout-card">
      <h2 className="checkout-card__title">Payment Method</h2>

      <div className="payment-options">
        {METHODS.map(({ value, Icon, color, bg, label, desc }) => (
          <label
            key={value}
            className={`payment-option${method === value ? ' payment-option--selected' : ''}`}
          >
            <input
              type="radio"
              name="paymentMethod"
              value={value}
              checked={method === value}
              onChange={() => onChange(value)}
            />
            <span className="payment-option__icon" style={{ background: bg, color }}>
              <Icon />
            </span>
            <div className="payment-option__content">
              <div className="payment-option__title">{label}</div>
              <div className="payment-option__description">{desc}</div>
            </div>
          </label>
        ))}
      </div>

      <div className="checkout-actions">
        <button className="btn btn-outline" onClick={onBack}>← Back</button>
        <button className="btn btn-primary" onClick={onNext}>Review Order →</button>
      </div>
    </div>
  );
}
