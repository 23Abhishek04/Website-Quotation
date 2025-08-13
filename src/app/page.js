"use client";
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function QuotationPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [estimates, setEstimates] = useState([]);
  const [totalEstimate, setTotalEstimate] = useState('₹0');
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const websiteType = watch("websiteType");
  const pageCount = watch("pageCount") || 0;
  const features = watch("features") || [];

  const calculateEstimate = (data) => {
    const newEstimates = [];
    let total = 0;

    // Base price calculation
    if (data.websiteType === "Business Website") {
      newEstimates.push({ service: "Business Website", price: "₹3,000 - ₹5,000" });
      total += 4000;
    } else if (data.websiteType === "E-Commerce Store") {
      newEstimates.push({ service: "E-Commerce Website", price: "₹7,000 - ₹15,000" });
      total += 11000;
    } else if (data.websiteType === "Portfolio/Personal Website") {
      newEstimates.push({ service: "Portfolio Website", price: "₹2,500 - ₹4,000" });
      total += 3250;
    } else if (data.websiteType === "Blog/Content Site") {
      newEstimates.push({ service: "Blog Website", price: "₹3,500 - ₹6,000" });
      total += 4750;
    } else {
      newEstimates.push({ service: "Custom Website", price: "₹5,000 - ₹20,000" });
      total += 12500;
    }

    // Additional pages
    if (data.pageCount > 5) {
      const additionalPages = data.pageCount - 5;
      newEstimates.push({
        service: `Extra Pages (${additionalPages})`,
        price: `₹${500 * additionalPages}`,
        notes: "₹500/page"
      });
      total += 500 * additionalPages;
    }

    // Features pricing
    const featurePrices = {
      "Online Store": 6000,
      "Blog Section": 3000,
      "Booking System": 4500,
      "Gallery": 2250,
      "Custom Design": 3500
    };

    features.forEach(feature => {
      if (featurePrices[feature]) {
        newEstimates.push({ 
          service: feature, 
          price: `₹${featurePrices[feature].toLocaleString('en-IN')}` 
        });
        total += featurePrices[feature];
      }
    });

    // Domain & Hosting
    newEstimates.push({
      service: "Domain & Hosting",
      price: "₹2,000 - ₹3,000",
      notes: "First year included"
    });
    total += 2500;

    setEstimates(newEstimates);
    setTotalEstimate(`₹${total.toLocaleString('en-IN')}`);
  };

const onSubmit = async (data) => {
  // Ensure features is always an array before joining
  const featuresString = Array.isArray(data.features) 
    ? data.features.join(', ') 
    : 'None';

  calculateEstimate(data);
  
  try {
    await fetch("https://formsubmit.co/ajax/abhishekbamane23@gmail.com", {
      method: "POST",
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        ...data,
        features: featuresString, // Use the safe version
        estimatedPrice: totalEstimate,
        _subject: `New Quote Request from ${data.fullName}`
      }),
    });
    setIsSubmitted(true);
  } catch (error) {
    console.error('Error submitting form:', error);
  }
};

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-sm p-6">
          <div className="text-center">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">Thank You!</h1>
            <p className="text-base md:text-lg text-gray-600 mb-5">
              We&apos;ve received your request and will contact you soon.
            </p>
            
            <div className="mt-6">
              <h2 className="text-lg md:text-xl font-semibold mb-3">Your Estimate</h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="p-2 text-left text-xs sm:text-sm">Service</th>
                      <th className="p-2 text-left text-xs sm:text-sm">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {estimates.map((item, index) => (
                      <tr key={index} className="border-b border-gray-200">
                        <td className="p-2 text-xs sm:text-sm">{item.service}</td>
                        <td className="p-2 text-xs sm:text-sm">{item.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-3 text-right">
                <p className="text-sm sm:text-base font-semibold">Total: {totalEstimate}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Get Your Website Quotation
          </h1>
          <p className="text-base sm:text-lg text-gray-600">
            Fill the form below for a custom quote
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Form Section */}
          <div className="w-full lg:w-1/2 bg-white p-5 sm:p-6 rounded-lg shadow-sm">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Form Fields */}
              {[
                { id: "fullName", label: "Full Name", type: "text", required: true },
                { id: "email", label: "Email", type: "email", required: true },
                { id: "phone", label: "Phone", type: "tel" },
                { id: "businessName", label: "Business Name", type: "text" }
              ].map((field) => (
                <div key={field.id}>
                  <label htmlFor={field.id} className="block text-sm font-medium text-gray-700">
                    {field.label} {field.required && <span className="text-red-500">*</span>}
                  </label>
                  <input
                    id={field.id}
                    type={field.type}
                    {...register(field.id, { 
                      required: field.required && `${field.label} is required`,
                      ...(field.type === "email" && {
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email"
                        }
                      })
                    })}
                    className="mt-1 w-full rounded border border-gray-300 p-2 text-sm focus:ring-1 focus:ring-indigo-500"
                  />
                  {errors[field.id] && (
                    <p className="mt-1 text-xs text-red-600">{errors[field.id].message}</p>
                  )}
                </div>
              ))}

              {/* Dropdowns */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="websiteType" className="block text-sm font-medium text-gray-700">
                    Website Type
                  </label>
                  <select
                    id="websiteType"
                    {...register("websiteType")}
                    className="mt-1 w-full rounded border border-gray-300 p-2 text-sm"
                  >
                    {["Business Website", "E-Commerce Store", "Portfolio/Personal", "Blog/Content", "Other"].map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="pageCount" className="block text-sm font-medium text-gray-700">
                    Number of Pages
                  </label>
                  <input
                    id="pageCount"
                    type="number"
                    min="1"
                    defaultValue="5"
                    {...register("pageCount", { valueAsNumber: true })}
                    className="mt-1 w-full rounded border border-gray-300 p-2 text-sm"
                  />
                </div>
              </div>

              {/* Features Checkboxes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Features Needed
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {["Contact Form", "Online Store", "Blog Section", "Booking System", "Gallery", "Custom Design"].map((feature) => (
                    <div key={feature} className="flex items-center">
                      <input
                        id={`feature-${feature}`}
                        type="checkbox"
                        value={feature}
                        {...register("features")}
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600"
                      />
                      <label htmlFor={`feature-${feature}`} className="ml-2 text-sm">
                        {feature}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Budget and Deadline */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="budgetRange" className="block text-sm font-medium text-gray-700">
                    Budget Range
                  </label>
                  <select
                    id="budgetRange"
                    {...register("budgetRange")}
                    className="mt-1 w-full rounded border border-gray-300 p-2 text-sm"
                  >
                    {["₹3,000 - ₹5,000", "₹5,000 - ₹10,000", "₹10,000 - ₹20,000", "₹20,000+", "Not Sure"].map((range) => (
                      <option key={range} value={range}>{range}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="deadline" className="block text-sm font-medium text-gray-700">
                    Deadline
                  </label>
                  <input
                    id="deadline"
                    type="date"
                    {...register("deadline")}
                    className="mt-1 w-full rounded border border-gray-300 p-2 text-sm"
                  />
                </div>
              </div>

              {/* Additional Details */}
              <div>
                <label htmlFor="additionalDetails" className="block text-sm font-medium text-gray-700">
                  Additional Details
                </label>
                <textarea
                  id="additionalDetails"
                  rows={3}
                  {...register("additionalDetails")}
                  className="mt-1 w-full rounded border border-gray-300 p-2 text-sm"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Get My Quote
              </button>
            </form>
          </div>

          {/* Price Table Section */}
          <div className="w-full lg:w-1/2 bg-white p-5 sm:p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-3">Our Pricing</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-2 text-left text-xs sm:text-sm">Service</th>
                    <th className="p-2 text-left text-xs sm:text-sm">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { service: "Basic Website (5 pages)", price: "₹3,000 – ₹5,000" },
                    { service: "E-Commerce Website", price: "₹7,000 – ₹15,000" },
                    { service: "Extra Page", price: "₹500/page" },
                    { service: "Contact Form", price: "₹1,000 – ₹2,000" },
                    { service: "Online Store", price: "₹4,000 – ₹8,000" },
                    { service: "Blog Section", price: "₹2,000 – ₹4,000" },
                    { service: "Booking System", price: "₹3,000 – ₹6,000" },
                    { service: "Photo Gallery", price: "₹1,500 – ₹3,000" },
                    { service: "Custom Design", price: "₹2,000 – ₹5,000" },
                    { service: "Domain & Hosting", price: "₹2,000 – ₹3,000/year" }
                  ].map((item, index) => (
                    <tr key={index} className="border-b border-gray-200">
                      <td className="p-2 text-xs sm:text-sm">{item.service}</td>
                      <td className="p-2 text-xs sm:text-sm">{item.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Estimate Preview */}
            {(websiteType || pageCount > 0 || features.length > 0) && (
              <div className="mt-6 bg-gray-50 p-4 rounded">
                <h3 className="text-md font-medium mb-2">Your Estimate Preview</h3>
                <button 
                  onClick={handleSubmit(calculateEstimate)}
                  className="mb-3 text-sm text-indigo-600 hover:text-indigo-800"
                >
                  Calculate Now
                </button>
                
                {estimates.length > 0 && (
                  <>
                    <div className="max-h-40 overflow-y-auto">
                      {estimates.map((item, index) => (
                        <div key={index} className="flex justify-between py-1 border-b border-gray-200">
                          <span className="text-sm">{item.service}</span>
                          <span className="text-sm font-medium">{item.price}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-2 pt-2 border-t border-gray-300 text-right">
                      <p className="text-sm font-semibold">Approx. Total: {totalEstimate}</p>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}