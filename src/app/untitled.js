"use client";

import { useState } from "react";

export default function NameForm() {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      setStatus("Please select an image");
      return;
    }

    try {
      // 1️⃣ Upload image to Cloudinary
      const cloudData = new FormData();
      cloudData.append("file", image);
      cloudData.append("upload_preset", "my_unsigned_upload"); // from Cloudinary
      cloudData.append("cloud_name", "drtodwsne"); // from Cloudinary

      const cloudRes = await fetch(
        "https://api.cloudinary.com/v1_1/drtodwsne/image/upload",
        { method: "POST", body: cloudData }
      );

      const cloudResult = await cloudRes.json();
      const imageUrl = cloudResult.secure_url;

      // 2️⃣ Send name + image link to email via Web3Forms
      const formData = new FormData();
      formData.append("name", name);
      formData.append("image_link", imageUrl);
      formData.append("access_key", "b266b8ba-ea6f-4bc0-a63d-1be80c5bb3a3");

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        setStatus("✅ Message sent successfully!");
        setName("");
        setImage(null);
        e.target.reset();
      } else {
        setStatus("❌ Failed to send message.");
      }
    } catch (err) {
      console.error(err);
      setStatus("❌ Error uploading image or sending email.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm space-y-4"
      >
        <div>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            required
          />
        </div>

        <div>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Submit
        </button>

        {status && <p className="text-center text-sm mt-2">{status}</p>}
      </form>
    </div>
  );
}