// src/Components/Form.jsx

import { useState } from "react";
import axios from "axios";

const Form = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    address: "",
  });
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setFormError("");
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";
    if (!formData.phone) newErrors.phone = "Phone number is required";
    if (!formData.gender) newErrors.gender = "Gender is required";
    if (!formData.address) newErrors.address = "Address is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const response = await axios.post(
        "http://localhost:8080/api/users",
        formData
      );
      if (response.data.emailExists) {
        setErrors((prev) => ({ ...prev, email: "Email is already in use." }));
      } else {
        onSuccess();
        setFormData({
          name: "",
          email: "",
          phone: "",
          gender: "",
          address: "",
        });
      }
    } catch (error) {
      console.error("Error submitting form", error);
      setFormError("There was an error submitting the form. Please try again.");
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white border border-gray-300 rounded-lg shadow-lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="name" className="text-lg font-semibold">
            Name:
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded"
          />
          {errors.name && <p className="text-red-500">{errors.name}</p>}
        </div>
        <div className="flex flex-col">
          <label htmlFor="email" className="text-lg font-semibold">
            Email:
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded"
          />
          {errors.email && <p className="text-red-500">{errors.email}</p>}
        </div>
        <div className="flex flex-col">
          <label htmlFor="phone" className="text-lg font-semibold">
            Phone Number:
          </label>
          <input
            id="phone"
            name="phone"
            type="text"
            value={formData.phone}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded"
          />
          {errors.phone && <p className="text-red-500">{errors.phone}</p>}
        </div>
        <div className="flex flex-col">
          <label htmlFor="gender" className="text-lg font-semibold">
            Gender:
          </label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded"
          >
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          {errors.gender && <p className="text-red-500">{errors.gender}</p>}
        </div>
        <div className="flex flex-col">
          <label htmlFor="address" className="text-lg font-semibold">
            Address:
          </label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded"
            rows="4"
          ></textarea>
          {errors.address && <p className="text-red-500">{errors.address}</p>}
        </div>
        {formError && <p className="text-red-500">{formError}</p>}
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form;
