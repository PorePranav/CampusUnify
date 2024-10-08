import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

export default function PasswordInput({ id, placeholder, value, onChange }) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative">
      <input
        type={showPassword ? 'text' : 'password'}
        placeholder={placeholder}
        id={id}
        value={value}
        onChange={onChange}
        className="border p-3 rounded-lg placeholder-primary-900 w-full"
        required
      />
      <button
        type="button"
        onClick={togglePasswordVisibility}
        className="absolute right-3 top-3"
      >
        {showPassword ? (
          <FontAwesomeIcon
            icon={faEyeSlash}
            className="text-gray-600 h-5 w-5"
          />
        ) : (
          <FontAwesomeIcon icon={faEye} className="text-gray-600 h-5 w-5" />
        )}
      </button>
    </div>
  );
}
