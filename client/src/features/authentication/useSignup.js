import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { signup as signupApi, verifyEmail as verifyEmailApi } from '../../services/apiAuth.js';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

export function useSignup() {
  const [showOtpInput, setShowOtpInput] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
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

  const { mutate: verifyEmail, isLoading: isVerifying } = useMutation({
    mutationFn: verifyEmailApi,
    onSuccess: (data) => {
      toast.success('Email verified successfully');
      queryClient.setQueryData(['user'], data.user);
      navigate('/events');
    },
    onError: (err) => {
      console.error('Verification error:', err);
      toast.error(err.response?.data?.message || 'An error occurred during verification');
    },
  });

  return { signup, isSigningUp, verifyEmail, isVerifying, showOtpInput, setShowOtpInput };
}