// src/components/UserForm.js
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import "./Form.css";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup.string().required("Phone number is required"),
  gender: yup.string().required("Gender is required"),
  address: yup.string().required("Address is required"),
});

function Form({ onSuccess }) {
  const [emailError, setEmailError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm({
    resolver: yupResolver(schema),
  });

  // Handle form submission
  const onSubmit = async (data) => {
    try {
      // Attempt to submit the form data
      const response = await axios.post(
        "http://localhost:8080/api/users",
        data
      );

      // Check for server response indicating email exists
      if (response.data.emailExists) {
        // Email exists, show error
        setEmailError("Email is already in use.");
        setError("email", {
          type: "manual",
          message: "Email is already in use.",
        });
      } else {
        // Email is unique, proceed with success
        onSuccess();
      }
    } catch (error) {
      console.error("Error submitting form", error);
      // Handle other errors such as network issues
    }
  };

  return (
    <div className="Form">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label>Name:</label>
          <input type="text" {...register("name")} />
          {errors.name && <p className="error">{errors.name.message}</p>}
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            {...register("email")}
            onChange={(e) => {
              clearErrors("email");
              setEmailError("");
            }}
          />
          {emailError && <p className="error">{emailError}</p>}
          {errors.email && <p className="error">{errors.email.message}</p>}
        </div>
        <div className="form-group">
          <label>Phone Number:</label>
          <input type="text" {...register("phone")} />
          {errors.phone && <p className="error">{errors.phone.message}</p>}
        </div>
        <div className="form-group">
          <label>Gender:</label>
          <select {...register("gender")}>
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          {errors.gender && <p className="error">{errors.gender.message}</p>}
        </div>
        <div className="form-group">
          <label>Address:</label>
          <textarea {...register("address")}></textarea>
          {errors.address && <p className="error">{errors.address.message}</p>}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Form;
