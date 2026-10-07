import { useState } from "react";

function CheckoutForm({ onSubmit, disabled = false }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: ""
  });

  const [errors, setErrors] = useState({});

  // Handle input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value
    }));
  };

  // Validate form fields
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      newErrors.email = "Enter a valid email address.";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <form
      className="checkout-form"
      onSubmit={handleSubmit}
    >
      <h3>Checkout Details</h3>

      <div className="form-group">
        <label htmlFor="name">Full Name</label>

        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your full name"
          disabled={disabled}
        />

        {errors.name && (
          <p className="form-error">{errors.name}</p>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="email">Email</label>

        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          disabled={disabled}
        />

        {errors.email && (
          <p className="form-error">{errors.email}</p>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="address">Delivery Address</label>

        <textarea
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Enter your delivery address"
          rows={3}
          disabled={disabled}
        />

        {errors.address && (
          <p className="form-error">{errors.address}</p>
        )}
      </div>

      <button type="submit" disabled={disabled}>
        Place Order
      </button>
    </form>
  );
}

export default CheckoutForm;