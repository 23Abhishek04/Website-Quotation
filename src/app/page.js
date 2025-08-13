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

    // Base price based on website type
    if (data.websiteType === "Business Website") {
      newEstimates.push({ service: "Business Website", price: "₹3,000 - ₹5,000" });
      total += 4000; // Average
    } else if (data.websiteType === "E-Commerce Store") {
      newEstimates.push({ service: "E-Commerce Website", price: "₹7,000 - ₹15,000" });
      total += 11000; // Average
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
        service: `Additional Pages (${additionalPages})`,
        price: `₹${500 * additionalPages}`,
        notes: "₹500 per page"
      });
      total += 500 * additionalPages;
    }

    // Features
    if (features.includes("Online Store") && data.websiteType !== "E-Commerce Store") {
      newEstimates.push({ service: "Online Store", price: "₹4,000 - ₹8,000" });
      total += 6000;
    }
    if (features.includes("Blog Section") && data.websiteType !== "Blog/Content Site") {
      newEstimates.push({ service: "Blog Section", price: "₹2,000 - ₹4,000" });
      total += 3000;
    }
    if (features.includes("Booking System")) {
      newEstimates.push({ service: "Booking System", price: "₹3,000 - ₹6,000" });
      total += 4500;
    }
    if (features.includes("Gallery")) {
      newEstimates.push({ service: "Photo Gallery", price: "₹1,500 - ₹3,000" });
      total += 2250;
    }
    if (features.includes("Custom Design")) {
      newEstimates.push({ service: "Custom Design", price: "₹2,000 - ₹5,000" });
      total += 3500;
    }

    // Domain & Hosting (always included)
    newEstimates.push({
      service: "Domain & Hosting (1st year)",
      price: "₹2,000 - ₹3,000",
      notes: "Renewal ₹2,000/year"
    });
    total += 2500;

    setEstimates(newEstimates);
    setTotalEstimate(`₹${total.toLocaleString('en-IN')}`);
  };

  const onSubmit = async (data) => {
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
          features: data.features?.join(', ') || 'None',
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
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Thank You!</h1>
           <p className="text-lg text-gray-600 mb-6">
  We&apos;ve received your request and will send your detailed quotation soon.
</p>
            
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Your Estimated Costs</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Notes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {estimates.map((item, index) => (
                      <tr key={index}>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{item.service}</td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{item.price}</td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{item.notes || '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 text-right">
                <p className="text-lg font-semibold">Total Estimated Cost: {totalEstimate}</p>
              </div>
            </div>
            
           <h1 className="text-4xl font-bold text-gray-900 mb-4">Get Your Website Quotation</h1>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Get Your Website Quotation</h1>
          <p className="text-xl text-gray-600">
            Fill out the form below to receive a custom quote for your website project.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="fullName"
                  type="text"
                  {...register("fullName", { required: "Full name is required" })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
                />
                {errors.fullName && <p className="mt-1 text-sm text-red-600">{errors.fullName.message}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  {...register("email", { 
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address"
                    }
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
                />
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  id="phone"
                  type="tel"
                  {...register("phone")}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
                />
              </div>

              <div>
                <label htmlFor="businessName" className="block text-sm font-medium text-gray-700">
                  Business/Brand Name
                </label>
                <input
                  id="businessName"
                  type="text"
                  {...register("businessName")}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
                />
              </div>

              <div>
                <label htmlFor="websiteType" className="block text-sm font-medium text-gray-700">
                  Type of Website
                </label>
                <select
                  id="websiteType"
                  {...register("websiteType")}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
                >
                  <option value="Business Website">Business Website</option>
                  <option value="E-Commerce Store">E-Commerce Store</option>
                  <option value="Portfolio/Personal Website">Portfolio/Personal Website</option>
                  <option value="Blog/Content Site">Blog/Content Site</option>
                  <option value="Other">Other</option>
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
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Features Required
                </label>
                <div className="space-y-2">
                  {["Contact Form", "Online Store", "Blog Section", "Booking System", "Gallery", "Custom Design"].map((feature) => (
                    <div key={feature} className="flex items-center">
                      <input
                        id={`feature-${feature}`}
                        type="checkbox"
                        value={feature}
                        {...register("features")}
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <label htmlFor={`feature-${feature}`} className="ml-2 block text-sm text-gray-700">
                        {feature}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="budgetRange" className="block text-sm font-medium text-gray-700">
                  Budget Range
                </label>
                <select
                  id="budgetRange"
                  {...register("budgetRange")}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
                >
                  <option value="₹3,000 - ₹5,000">₹3,000 - ₹5,000</option>
                  <option value="₹5,000 - ₹10,000">₹5,000 - ₹10,000</option>
                  <option value="₹10,000 - ₹20,000">₹10,000 - ₹20,000</option>
                  <option value="₹20,000+">₹20,000+</option>
                  <option value="Not Sure">Not Sure</option>
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
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
                />
              </div>

              <div>
                <label htmlFor="additionalDetails" className="block text-sm font-medium text-gray-700">
                  Additional Details
                </label>
                <textarea
                  id="additionalDetails"
                  rows={4}
                  {...register("additionalDetails")}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Get My Quote
                </button>
              </div>
            </form>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Price Estimates</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price Range</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">Basic Website (up to 5 pages)</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">₹3,000 – ₹5,000</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">E-Commerce Website</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">₹7,000 – ₹15,000</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">Additional Page</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">₹500 / page</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">Domain & Hosting</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">₹2,000 – ₹3,000 / year</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">Contact Form</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">₹1,000 – ₹2,000</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">Online Store</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">₹4,000 – ₹8,000</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">Blog Section</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">₹2,000 – ₹4,000</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">Booking System</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">₹3,000 – ₹6,000</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">Gallery</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">₹1,500 – ₹3,000</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">Custom Design</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">₹2,000 – ₹5,000</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Dynamic Estimate Preview */}
            {(websiteType || pageCount > 0 || (features && features.length > 0)) && (
              <div className="mt-8">
                <h3 className="text-lg font-medium mb-2">Your Estimated Cost</h3>
                <button 
                  onClick={handleSubmit(calculateEstimate)}
                  className="mb-4 text-sm text-indigo-600 hover:text-indigo-800"
                >
                  Calculate Estimate
                </button>
                
                {estimates.length > 0 && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <table className="min-w-full">
                      <tbody className="divide-y divide-gray-200">
                        {estimates.map((item, index) => (
                          <tr key={index}>
                            <td className="px-2 py-1 text-sm text-gray-900">{item.service}</td>
                            <td className="px-2 py-1 text-sm text-gray-900">{item.price}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className="mt-2 pt-2 border-t border-gray-200 text-right">
                      <p className="text-sm font-semibold">Approximate Total: {totalEstimate}</p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}