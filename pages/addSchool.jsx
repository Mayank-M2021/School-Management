import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/router";

export default function AddSchool() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({ mode: "onChange" });

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const onSubmit = async (data) => {
    setIsLoading(true);
    setMessage("");

    try {
      let imageUrl = "";

      // ✅ Upload image to API
      if (data.image && data.image[0]) {
        const formData = new FormData();
        formData.append("image", data.image[0]);

        const uploadResponse = await fetch("/api/schools/upload", {
          method: "POST",
          body: formData,
        });

        if (!uploadResponse.ok) throw new Error("Image upload failed");

        const uploadResult = await uploadResponse.json();
        imageUrl = uploadResult.url;
      }

      // ✅ Save school details
      const schoolData = {
        name: data.name,
        address: data.address,
        city: data.city,
        state: data.state,
        contact: data.contact,
        email_id: data.email_id,
        image: imageUrl,
      };

      const response = await fetch("/api/schools", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(schoolData),
      });

      if (response.ok) {
        setMessage("✅ School added successfully!");
        reset();
        setTimeout(() => router.push("/showSchools"), 1500);
      } else {
        throw new Error("Failed to add school");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("❌ Error adding school. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container max-w-2xl mx-auto py-10">
      <div className="bg-white p-8 rounded-2xl shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          ➕ Add New School
        </h1>

        {message && (
          <div
            className={`p-3 mb-5 rounded-md text-center font-medium ${
              message.includes("Error") || message.includes("❌")
                ? "bg-red-100 text-red-700 border border-red-300"
                : "bg-green-100 text-green-700 border border-green-300"
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* School Name */}
          <div>
            <label className="block font-medium mb-1">School Name *</label>
            <input
              type="text"
              className="w-full p-2 border rounded-md focus:ring focus:ring-blue-200"
              {...register("name", { required: "School name is required" })}
            />
            {errors.name && (
              <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Address */}
          <div>
            <label className="block font-medium mb-1">Address *</label>
            <textarea
              rows="3"
              className="w-full p-2 border rounded-md focus:ring focus:ring-blue-200"
              {...register("address", { required: "Address is required" })}
            />
            {errors.address && (
              <p className="text-sm text-red-500 mt-1">
                {errors.address.message}
              </p>
            )}
          </div>

          {/* City & State */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-1">City *</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md focus:ring focus:ring-blue-200"
                {...register("city", { required: "City is required" })}
              />
            </div>
            <div>
              <label className="block font-medium mb-1">State *</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md focus:ring focus:ring-blue-200"
                {...register("state", { required: "State is required" })}
              />
            </div>
          </div>

          {/* Contact & Email */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-1">Contact *</label>
              <input
                type="tel"
                className="w-full p-2 border rounded-md focus:ring focus:ring-blue-200"
                {...register("contact", {
                  required: "Contact is required",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Must be a 10-digit number",
                  },
                })}
              />
              {errors.contact && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.contact.message}
                </p>
              )}
            </div>
            <div>
              <label className="block font-medium mb-1">Email *</label>
              <input
                type="email"
                className="w-full p-2 border rounded-md focus:ring focus:ring-blue-200"
                {...register("email_id", { required: "Email is required" })}
              />
              {errors.email_id && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.email_id.message}
                </p>
              )}
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block font-medium mb-1">School Image</label>
            <input
              type="file"
              accept="image/*"
              className="block w-full text-sm text-gray-600 border rounded-md cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
              {...register("image")}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!isValid || isLoading}
            className={`w-full py-2 px-4 rounded-md text-white font-semibold transition ${
              isLoading || !isValid
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isLoading ? "Adding School..." : "Add School"}
          </button>
        </form>
      </div>
    </div>
  );
}
