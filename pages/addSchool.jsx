import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function AddSchool() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({
    mode: "onChange", // ✅ real-time validation
  });

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();

  const onSubmit = async (data) => {
    setIsLoading(true);
    setMessage('');

    try {
      let imageName = '';

      // ✅ Step 1: Upload image first if provided
      if (data.image && data.image[0]) {
        const formData = new FormData();
        formData.append('image', data.image[0]);

        const uploadResponse = await fetch('/api/schools/upload', {
          method: 'POST',
          body: formData,
        });

        if (!uploadResponse.ok) {
          throw new Error('Image upload failed');
        }

        const uploadResult = await uploadResponse.json();
        imageName = uploadResult.filename;
      }

      // ✅ Step 2: Send school data
      const schoolData = {
        name: data.name,
        address: data.address,
        city: data.city,
        state: data.state,
        contact: data.contact,
        email_id: data.email_id,
        image: imageName,
      };

      const response = await fetch('/api/schools', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(schoolData),
      });

      if (response.ok) {
        setMessage('School added successfully!');
        reset();
        setTimeout(() => {
          router.push('/showSchools');
        }, 1500);
      } else {
        throw new Error('Failed to add school');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Error adding school. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <h1 style={{ textAlign: 'center', marginBottom: '30px', color: '#333' }}>
          Add New School
        </h1>

        {message && (
          <div style={{
            padding: '10px',
            marginBottom: '20px',
            borderRadius: '4px',
            backgroundColor: message.includes('Error') ? '#f8d7da' : '#d4edda',
            color: message.includes('Error') ? '#721c24' : '#155724',
            border: `1px solid ${message.includes('Error') ? '#f5c6cb' : '#c3e6cb'}`
          }}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label>School Name *</label>
            <input
              type="text"
              className={errors.name ? "invalid" : "valid"}
              {...register('name', { 
                required: 'School name is required',
                minLength: { value: 2, message: 'Name must be at least 2 characters' }
              })}
            />
            {errors.name && <div className="error-message">{errors.name.message}</div>}
          </div>

          <div className="form-group">
            <label>Address *</label>
            <textarea
              rows="3"
              className={errors.address ? "invalid" : "valid"}
              {...register('address', { 
                required: 'Address is required',
                minLength: { value: 10, message: 'Address must be at least 10 characters' }
              })}
            />
            {errors.address && <div className="error-message">{errors.address.message}</div>}
          </div>

          <div className="form-group">
            <label>City *</label>
            <input
              type="text"
              className={errors.city ? "invalid" : "valid"}
              {...register('city', { 
                required: 'City is required',
                minLength: { value: 2, message: 'City must be at least 2 characters' }
              })}
            />
            {errors.city && <div className="error-message">{errors.city.message}</div>}
          </div>

          <div className="form-group">
            <label>State *</label>
            <input
              type="text"
              className={errors.state ? "invalid" : "valid"}
              {...register('state', { 
                required: 'State is required',
                minLength: { value: 2, message: 'State must be at least 2 characters' }
              })}
            />
            {errors.state && <div className="error-message">{errors.state.message}</div>}
          </div>

          <div className="form-group">
            <label>Contact Number *</label>
            <input
              type="tel"
              className={errors.contact ? "invalid" : "valid"}
              {...register('contact', { 
                required: 'Contact number is required',
                pattern: { 
                  value: /^[0-9]{10}$/,
                  message: 'Contact must be a valid 10-digit number'
                }
              })}
            />
            {errors.contact && <div className="error-message">{errors.contact.message}</div>}
          </div>

          <div className="form-group">
            <label>Email *</label>
            <input
              type="email"
              className={errors.email_id ? "invalid" : "valid"}
              {...register('email_id', { 
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address'
                }
              })}
            />
            {errors.email_id && <div className="error-message">{errors.email_id.message}</div>}
          </div>

          <div className="form-group">
            <label>School Image</label>
            <input
              type="file"
              accept="image/*"
              {...register('image')}
            />
          </div>

          <button 
            type="submit" 
            className="btn-primary"
            disabled={!isValid || isLoading} // ✅ only enable when valid
          >
            {isLoading ? 'Adding School...' : 'Add School'}
          </button>
        </form>
      </div>
    </div>
  );
}
