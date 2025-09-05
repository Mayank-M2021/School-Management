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

      // ✅ Step 1: Upload to Cloudinary if image exists
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

      // ✅ Step 2: Save school in DB
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
        setMessage("School added successfully!");
        reset();
        setTimeout(() => {
          router.push("/showSchools");
        }, 1500);
      } else {
        throw new Error("Failed to add school");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Error adding school. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <h1>Add New School</h1>

        {message && (
          <div className={message.includes("Error") ? "error-box" : "success-box"}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label>School Name *</label>
            <input {...register("name", { required: true })} />
            {errors.name && <span>Name is required</span>}
          </div>

          <div className="form-group">
            <label>Address *</label>
            <textarea {...register("address", { required: true })} />
          </div>

          <div className="form-group">
            <label>City *</label>
            <input {...register("city", { required: true })} />
          </div>

          <div className="form-group">
            <label>State *</label>
            <input {...register("state", { required: true })} />
          </div>

          <div className="form-group">
            <label>Contact *</label>
            <input {...register("contact", { required: true })} />
          </div>

          <div className="form-group">
            <label>Email *</label>
            <input type="email" {...register("email_id", { required: true })} />
          </div>

          <div className="form-group">
            <label>School Image</label>
            <input type="file" accept="image/*" {...register("image")} />
          </div>

          <button type="submit" disabled={!isValid || isLoading}>
            {isLoading ? "Adding..." : "Add School"}
          </button>
        </form>
      </div>
    </div>
  );
}
