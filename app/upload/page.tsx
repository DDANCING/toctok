import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { UploadError } from "../types";
import UploadLayout from "../layouts/uploadLayout";
import { auth } from "@/auth";
import { Upload } from "./components/upload";

// Função para obter a localização do usuário
export const getUserLocation = async (): Promise<{ lat: number; lng: number } | null> => {
  try {
    if (!navigator.geolocation) {
      throw new Error("Geolocalização não é suportada pelo navegador.");
    }

    return new Promise<{ lat: number; lng: number } | null>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          resolve({ lat: latitude, lng: longitude });
        },
        (error) => {
          reject(new Error("Erro ao obter a localização: " + error.message));
        }
      );
    });
  } catch (error) {
    console.error("[GET_USER_LOCATION] Erro ao obter a localização:", error);
    return null;
  }
};

const UploadPage = async () => {

  const user = await auth();


  const location = await getUserLocation();

  return (
    <UploadLayout user={user}>
      <Upload   />
    </UploadLayout>
  );
}

export default UploadPage;
