"use client";

import { useState } from "react";
import { BsFillHouseUpFill } from "react-icons/bs";
import { BiLoader } from "react-icons/bi";

export const Upload = () => {
  let [fileDisplay, setFileDisplay] = useState('');
  let [file, setFile] = useState<File | null>(null);
  let [isUploading, setIsUploading] = useState(false);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files && files.length > 0) {
      const file = files[0];
      const fileUrl = URL.createObjectURL(file);
      setFileDisplay(fileUrl);
      setFile(file);
    }
  };

  return (
    <>
      <div className="w-full mt-[80px] mb-[40px] bg-background shadow-lg rounded-md py-6 md:px-10 px-4">
        <div>
          <h1 className="text-[23px] font-semibold">Criar Anúncio</h1>
          <h2 className="text-muted-foreground mt-1">
            Adicione um anúncio à sua conta para promover seus conteúdos.
          </h2>
        </div>
        <div className="mt-8 md:flex gap-6">
          {!fileDisplay ? (
            <label
              htmlFor="fileInput"
              className="md:mx-0 mx-auto mt-4 mb-6 flex flex-col items-center justify-center w-full max-w-[260px] h-[470px] text-center p-3 border-2 border-dashed border-muted-foreground rounded-lg hover:bg-muted cursor-pointer"
            >
              <BsFillHouseUpFill size={40} className="text-primary/50" />
              <p className="mt-4 text-[17px]">Selecione o vídeo para o seu anúncio</p>
              <p className="mt-1.5 text-muted-foreground text-[13px]">Ou arraste e solte o arquivo aqui.</p>
              <p className="mt-12 text-muted-foreground text-sm">Formato aceito: MP4</p>
              <p className="mt-2 text-muted-foreground/90 text-[13px]">Duração máxima: 30 minutos</p>
              <p className="mt-2 text-muted-foreground/90 text-[13px]">Tamanho máximo: 2 GB</p>
              <label 
                htmlFor="fileInput"
                className="px-2 py-1.5 mt-8 text-background text-[15px] w-[80%] bg-primary rounded-sm cursor-pointer"
              >
                Selecione o arquivo
              </label>
              <input type="file" id="fileInput" onChange={onChange} hidden accept=".mp4" />
            </label>
          ) : (
            <div
              className="md:mx-0 mx-auto mt-4 md:mb-12 mb-16 flex items-center justify-center w-full max-w-[260px] h-[470px] p-3 rounded-2xl cursor-pointer relative overflow-hidden bg-black"
            >
              {isUploading ? (
                <div className="absolute flex items-center justify-center z-20 bg-black h-full w-full rounded-[50px] bg-opacity-50">
                  <div className="mx-auto flex items-center justify-center gap-1">
                    <BiLoader className="animate-spin text-primary" size={30} />
                    <div className="text-secondary font-bold"> Carregando... </div>
                  </div>
                </div>
              ) : null}

              <video
                autoPlay
                loop
                muted
                className="absolute rounded-xl object-contain z-10 w-full h-full"
                src={fileDisplay}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};