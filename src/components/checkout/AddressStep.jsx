import React from 'react';

const COUNTRIES = [
  'Afghanistan','Albania','Algeria','Argentina','Australia','Austria','Bangladesh',
  'Belgium','Bolivia','Brazil','Cambodia','Canada','Chile','China','Colombia',
  'Croatia','Czech Republic','Denmark','Ecuador','Egypt','Ethiopia','Finland',
  'France','Germany','Ghana','Greece','Hungary','India','Indonesia','Iran','Iraq',
  'Ireland','Israel','Italy','Japan','Jordan','Kazakhstan','Kenya','Kuwait',
  'Lebanon','Libya','Malaysia','Mexico','Morocco','Myanmar','Nepal','Netherlands',
  'New Zealand','Nigeria','Norway','Pakistan','Peru','Philippines','Poland',
  'Portugal','Qatar','Romania','Russia','Saudi Arabia','Serbia','Singapore',
  'South Africa','South Korea','Spain','Sri Lanka','Sudan','Sweden','Switzerland',
  'Syria','Taiwan','Tanzania','Thailand','Tunisia','Turkey','Ukraine',
  'United Arab Emirates','United Kingdom','United States','Uzbekistan',
  'Venezuela','Vietnam','Yemen','Zimbabwe',
];

const FIELDS = [
  { name: 'shippingName',       label: 'Full Name',        type: 'text',  half: false, optional: false },
  { name: 'shippingEmail',      label: 'Email',            type: 'email', half: true,  optional: false },
  { name: 'shippingPhone',      label: 'Phone Number',     type: 'tel',   half: true,  optional: false },
  { name: 'shippingAddress',    label: 'Address',          type: 'text',  half: false, optional: false },
  { name: 'shippingCity',       label: 'City',             type: 'text',  half: true,  optional: true  },
  { name: 'shippingState',      label: 'State / Province', type: 'text',  half: true,  optional: true  },
  { name: 'shippingPostalCode', label: 'Postal Code',      type: 'text',  half: true,  optional: true  },
];

export default function AddressStep({ data, onChange, onNext }) {
  function handleSubmit(e) {
    e.preventDefault();
    onNext();
  }

  return (
    <div className="checkout-card">
      <h2 className="checkout-card__title">Shipping Address</h2>
      <form onSubmit={handleSubmit}>
        <div className="address-grid">
          {FIELDS.map(({ name, label, type, half, optional }) => (
            <div className={`form-group${half ? ' form-group--half' : ''}`} key={name}>
              <label htmlFor={name}>
                {label}{optional && <span style={{ color: 'var(--clr-muted)', fontWeight: 400 }}> (optional)</span>}
              </label>
              <input
                id={name}
                name={name}
                type={type}
                required={!optional}
                value={data[name] || ''}
                onChange={(e) => onChange(name, e.target.value)}
                placeholder={label}
              />
            </div>
          ))}

          {/* Country — mandatory dropdown, full width */}
          <div className="form-group">
            <label htmlFor="shippingCountry">Country</label>
            <select
              id="shippingCountry"
              name="shippingCountry"
              required
              value={data.shippingCountry || ''}
              onChange={(e) => onChange('shippingCountry', e.target.value)}
            >
              <option value="" disabled>Select a country…</option>
              {COUNTRIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="checkout-actions">
          <button type="submit" className="btn btn-primary">Continue to Payment →</button>
        </div>
      </form>
    </div>
  );
}
