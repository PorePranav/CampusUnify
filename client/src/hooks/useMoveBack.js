<<<<<<< HEAD
import { useNavigate } from 'react-router-dom';
=======
import { useNavigate } from "react-router-dom";
>>>>>>> b4fdd8b (sync commit)

export function useMoveBack() {
  const navigate = useNavigate();
  return () => navigate(-1);
}
