import React from "react";
import Header from "./components/Header"
import InvoiceForm from "./components/InvoiceForm";

function App() {
  return (
    <div className='dark:bg-[#141625] bg-[#f8f8fb] duration-300 min-h-screen'>

      <Header />
      <InvoiceForm/>
    </div>
  );
}

export default App;
