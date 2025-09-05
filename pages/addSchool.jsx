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
    <div className="container">
      <div className="form-container">
        <h1>Add New School</h1>

        {message && (
          <div className={message.includes("Error") ? "error-box" : "success-box"}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* School Name */}
          <div className="form-group">
            <label>School Name *</label>
            <input 
              {...register("name", { 
                required: "School name is required",
                minLength: {
                  value: 3,
                  message: "School name must be at least 3 characters long"
                },
                maxLength: {
                  value: 100,
                  message: "School name cannot exceed 100 characters"
                },
                pattern: {
                  value: /^[a-zA-Z0-9\s.,'-]+$/,
                  message: "School name contains invalid characters"
                }
              })} 
              className={errors.name ? "invalid" : ""}
            />
            {errors.name && <span className="error-message">{errors.name.message}</span>}
          </div>

          {/* Address */}
          <div className="form-group">
            <label>Address *</label>
            <textarea 
              {...register("address", { 
                required: "Address is required",
                minLength: {
                  value: 10,
                  message: "Address must be at least 10 characters long"
                },
                maxLength: {
                  value: 200,
                  message: "Address cannot exceed 200 characters"
                }
              })} 
              className={errors.address ? "invalid" : ""}
              rows="3"
            />
            {errors.address && <span className="error-message">{errors.address.message}</span>}
          </div>

          {/* City */}
          <div className="form-group">
            <label>City *</label>
            <input 
              {...register("city", { 
                required: "City is required",
                minLength: {
                  value: 2,
                  message: "City name must be at least 2 characters long"
                },
                maxLength: {
                  value: 50,
                  message: "City name cannot exceed 50 characters"
                },
                pattern: {
                  value: /^[a-zA-Z\s'-]+$/,
                  message: "City name can only contain letters, spaces, hyphens and apostrophes"
                }
              })} 
              className={errors.city ? "invalid" : ""}
            />
            {errors.city && <span className="error-message">{errors.city.message}</span>}
          </div>

          {/* State */}
          <div className="form-group">
            <label>State *</label>
            <input 
              {...register("state", { 
                required: "State is required",
                minLength: {
                  value: 2,
                  message: "State name must be at least 2 characters long"
                },
                maxLength: {
                  value: 50,
                  message: "State name cannot exceed 50 characters"
                },
                pattern: {
                  value: /^[a-zA-Z\s'-]+$/,
                  message: "State name can only contain letters, spaces, hyphens and apostrophes"
                }
              })} 
              className={errors.state ? "invalid" : ""}
            />
            {errors.state && <span className="error-message">{errors.state.message}</span>}
          </div>

          {/* Contact */}
          <div className="form-group">
            <label>Contact Number *</label>
            <input 
              type="tel"
              {...register("contact", { 
                required: "Contact number is required",
                pattern: {
                  value: /^[+]?[(]?[\d\s\-().+]{10,15}$/,
                  message: "Please enter a valid contact number (10-15 digits)"
                },
                minLength: {
                  value: 10,
                  message: "Contact number must be at least 10 digits"
                }
              })} 
              className={errors.contact ? "invalid" : ""}
              placeholder="e.g., +91 9876543210 or 9876543210"
            />
            {errors.contact && <span className="error-message">{errors.contact.message}</span>}
          </div>

          {/* Email */}
          <div className="form-group">
            <label>Email Address *</label>
            <input 
              type="email" 
              {...register("email_id", { 
                required: "Email address is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Please enter a valid email address"
                },
                maxLength: {
                  value: 100,
                  message: "Email address cannot exceed 100 characters"
                }
              })} 
              className={errors.email_id ? "invalid" : ""}
              placeholder="e.g., school@example.com"
            />
            {errors.email_id && <span className="error-message">{errors.email_id.message}</span>}
          </div>

          {/* School Image */}
          <div className="form-group">
            <label>School Image</label>
            <input 
              type="file" 
              accept="image/jpeg,image/jpg,image/png,image/gif,image/webp" 
              {...register("image", {
                validate: {
                  fileSize: (files) => {
                    if (files && files[0]) {
                      const file = files[0];
                      const maxSize = 5 * 1024 * 1024; // 5MB
                      return file.size <= maxSize || "Image size must be less than 5MB";
                    }
                    return true;
                  },
                  fileType: (files) => {
                    if (files && files[0]) {
                      const file = files[0];
                      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
                      return allowedTypes.includes(file.type) || "Only JPEG, PNG, GIF, and WebP images are allowed";
                    }
                    return true;
                  }
                }
              })}
              className={errors.image ? "invalid" : ""}
            />
            {errors.image && <span className="error-message">{errors.image.message}</span>}
            <small style={{ color: '#6c757d', fontSize: '0.85rem', marginTop: '5px', display: 'block' }}>
              Supported formats: JPEG, PNG, GIF, WebP (Max size: 5MB)
            </small>
          </div>

          <button 
            type="submit" 
            disabled={!isValid || isLoading}
            className="btn-primary"
          >
            {isLoading ? "Adding..." : "Add School"}
          </button>
        </form>
      </div>
    </div>
  );
}