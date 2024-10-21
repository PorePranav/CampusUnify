import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { signup as signupApi } from '../../services/apiAuth.js';
import { useState } from 'react';

export function useSignup() {
  const [showOtpInput, setShowOtpInput] = useState(false);

  const { mutate: signup, isLoading: isSigningUp } = useMutation({
    mutationFn: signupApi,
    onSuccess: (data) => {
      toast.success(data.message);
      setShowOtpInput(true);
    },
    onError: (err) => {
      console.error('Signup error:', err);
      toast.error(err.message || 'An error occurred during signup');
    },
  });

  return { signup, isSigningUp, showOtpInput, setShowOtpInput };
}
