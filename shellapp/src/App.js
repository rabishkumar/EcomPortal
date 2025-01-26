import React, { Suspense, lazy } from 'react';

// Dynamically load remote components
const OrdersPage = lazy(() => import("OrdersApp/OrdersPage"));
const PaymentPage = lazy(() => import("PaymentApp/PaymentPage"));

function App() {
    return (
    <div>
      <h1>Shell Application</h1>
      <Suspense fallback={<div>Loading Orders...</div>}>
        <OrdersPage />
      </Suspense>
      <Suspense fallback={<div>Loading Payments...</div>}>
        <PaymentPage />
      </Suspense>
    </div>
  );
}

export default App;
