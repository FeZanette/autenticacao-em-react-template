import { useEffect } from "react";
import { irParaLogin } from "../routes/coordinator";
import { useNavigate } from "react-router-dom";

// EXERCÍCIO DE FIXAÇÃO:
// 1) Na pasta hooks, criar arquivo useProtectedPage
// 2) Não precisa retornar nada
// 3) Na página onde esse hook será usado apenas chamar a função useProtectedPage() 

const useProtectedPage = () => {
    const navigate = useNavigate()
    const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      irParaLogin(navigate);
    }
  }, [navigate]);
};

export default useProtectedPage;
