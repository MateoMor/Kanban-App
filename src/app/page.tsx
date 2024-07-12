"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

function Home() {
  const router = useRouter();

  useEffect(() => {
    // Verificar que estamos en el lado del cliente
    if (typeof window !== "undefined") {
      // Verificar el token en el localStorage
      const token = localStorage.getItem("token");

      if (token) {
        // Si hay token válido, redirige a /dashboard
        router.push("/dashboard");
      } else {
        // Si no hay token, redirige a /login
        router.push("/login");
      }
    }
  }, [router]); // Asegurar que router esté en la lista de dependencias

  // Este componente no renderiza contenido visible, ya que se redirige inmediatamente
  return null;
}

export default Home;
