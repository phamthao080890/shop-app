import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createOrder } from '../api/orderApi.js';
import { useCart } from '../context/CartContext.jsx';
import CheckoutSteps from '../components/checkout/CheckoutSteps.jsx';
import AddressStep   from '../components/checkout/AddressStep.jsx';
import PaymentStep   from '../components/checkout/PaymentStep.jsx';
import ConfirmStep   from '../components/checkout/ConfirmStep.jsx';

const INITIAL_SHIPPING = {
  shippingName: '', shippingEmail: '', shippingPhone: '', shippingAddress: '',
  shippingCity: '', shippingState: '', shippingPostalCode: '', shippingCountry: '',
};

export default function CheckoutPage() {
  const { fetchCart } = useCart();
  const navigate = useNavigate();

  const [step,    setStep]    = useState(1);
  const [shipping, setShipping] = useState(INITIAL_SHIPPING);
  const [payment,  setPayment]  = useState('cod');
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState(null);

  const handleShippingChange = (field, value) =>
    setShipping((prev) => ({ ...prev, [field]: value }));

  async function placeOrder() {
    setLoading(true);
    setError(null);
    try {
      const res = await createOrder({ ...shipping, paymentMethod: payment });
      await fetchCart();
      navigate('/order-success', { state: { order: res.data.order } });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to place order.');
      setLoading(false);
    }
  }

  return (
    <div className="checkout-page">
      <h1 className="checkout-page__title">Checkout</h1>
      <CheckoutSteps current={step} />

      {error && <p className="checkout-error">{error}</p>}

      {step === 1 && (
        <AddressStep data={shipping} onChange={handleShippingChange} onNext={() => setStep(2)} />
      )}
      {step === 2 && (
        <PaymentStep method={payment} onChange={setPayment} onNext={() => setStep(3)} onBack={() => setStep(1)} />
      )}
      {step === 3 && (
        <ConfirmStep
          shipping={shipping}
          paymentMethod={payment}
          onPlace={placeOrder}
          onBack={() => setStep(2)}
          loading={loading}
        />
      )}
    </div>
  );
}
