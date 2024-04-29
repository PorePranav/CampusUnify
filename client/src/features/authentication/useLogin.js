<<<<<<< HEAD
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login as loginApi } from '../../services/apiAuth.js';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
=======
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth.js";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
>>>>>>> b4fdd8b (sync commit)

export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (user) => {
<<<<<<< HEAD
      queryClient.setQueryData(['user'], user);
      navigate('/dashboard');
    },
    onError: (err) => {
      toast.error('Invalid email or password');
=======
      queryClient.setQueryData(["user"], user);
      navigate("/events");
    },
    onError: (err) => {
      toast.error("Invalid email or password");
>>>>>>> b4fdd8b (sync commit)
    },
  });

  return { login, isLoading };
}
