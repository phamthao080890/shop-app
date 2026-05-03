import React from 'react';

const STEPS = ['Shipping', 'Payment', 'Confirm'];

export default function CheckoutSteps({ current }) {
  return (
    <div className="steps" role="list">
      {STEPS.map((label, idx) => {
        const stepNum = idx + 1;
        const cls =
          stepNum < current ? 'step done' :
          stepNum === current ? 'step active' : 'step';
        return (
          <div key={label} className={cls} role="listitem">
            <div className="step__circle">
              {stepNum < current ? '✓' : stepNum}
            </div>
            <span className="step__label">{label}</span>
          </div>
        );
      })}
    </div>
  );
}
