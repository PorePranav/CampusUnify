import { useMutation } from '@tanstack/react-query';
import { resetPassword as resetPasswordApi } from '../../services/apiAuth';
import toast from 'react-hot-toast';
import { useParams, useNavigate } from 'react-router-dom';

export function useResetPassword() {
  const { tokenId } = useParams();
  const navigate = useNavigate();

  const { mutate: resetPassword, isLoading } = useMutation({
    mutationFn: (data) => resetPasswordApi({ ...data, tokenId }),
    onSuccess: () => {
      toast.success('Password reset successfully');
      navigate('/login');
    },
    onError: (err) => {
      toast.error(err.response.data.message);
    },
  });

  return { resetPassword, isLoading };
}
