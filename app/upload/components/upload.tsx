"use client";

import { useState } from "react";
import { BsFillHouseUpFill } from "react-icons/bs";
import { BiLoader } from "react-icons/bi";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { Button } from "@/components/ui/button";
import { MdContentCut } from "react-icons/md";
import { Input } from "@/components/ui/input";


export const Upload = () => {
  let [fileDisplay, setFileDisplay] = useState('');
  let [file, setFile] = useState<File | null>(null);
  let [isUploading, setIsUploading] = useState(false);
  let [caption, setCaption] = useState(''); // Estado para a legenda

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files && files.length > 0) {
      const file = files[0];
      const fileUrl = URL.createObjectURL(file);
      setFileDisplay(fileUrl);
      setFile(file);
    }
  };
  const discard = () => {
    setFileDisplay('');
    setFile(null);
    setCaption('');
  };


  const clearVideo = () => {
    setFileDisplay('');
    setFile(null);
  };

  const createNewPost = () => {
    console.log("createNewPost")
  }

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
            <div>
              <div
                className="md:mx-0 mx-auto mt-4 md:mb-12 mb-16 flex flex-col items-center justify-center w-full max-w-[260px] h-[470px] p-3 rounded-2xl cursor-pointer relative overflow-hidden bg-black"
              >
                {isUploading ? (
                  <div className="absolute flex flex-col items-center justify-center z-20 bg-black h-full w-full rounded-[50px] bg-opacity-50">
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

              <div className="mt-4 h-10 text-primary flex items-center rounded-xl border bg-background/50 p-1">
                <div className="flex items-center truncate">
                  <AiOutlineCheckCircle size="16" className="min-w-[16px]" />
                </div>
                <p className="text-[11px] pl-1 truncate text-ellipsis"> 
                  {file ? file.name : ""}
                </p>
                <Button className="text-[11px] h-7 m-1" onClick={() => clearVideo()} variant={"outline"}>
                  Alterar
                </Button>
              </div>
            </div>
          )}
          
          <div className="mt-4 mb-6">
            <div className="flex bg-muted py4 px-6 border p-1 shadow-xl">
              <div>
                <div>
                  <div className="flex items-center gap-1 font-semibold text-[15px] mb-1.5">
                    <MdContentCut /> <h1> Divida e edite o video </h1>
                  </div>
                  <div className="font-semibold text-[13px] text-muted-foreground">
                    Você pode dividir vídeos rapidamente em várias partes, remover trechos redundantes e transformar vídeos em paisagem em vídeos no formato retrato.
                  </div>
                </div>
                <div className="flex justify-start w-full h-full text-center my-auto">
                  <Button className="text-[11px] h-7 m-1" variant={"outline"}>
                    Edit
                  </Button>
                </div>
              </div>
              
            </div>
            <div className="mt-5">
                <div className="flex items-center justify-between">
                  <div className="mb-1 text-[15px]"> Legenda </div>
                  <div className="text-muted-foreground text-[12px]"> {caption.length}/150 </div>
                </div>
                <Input
                  type="text"
                  maxLength={150}
                  value={caption} 
                  onChange={(e) => setCaption(e.target.value)} 
                  className="w-full border p-2.5 rounded-md focus:outline-none"
                  
                />
              </div>
              <div className="flex gap-3 justify-end">  
                <Button
                    disabled={isUploading}
                    onClick={() => discard()}
                    className="px-10 py-2.5 mt-8 text-[16px]"
                    variant={"destructive"}
                >
                  Descartar
                </Button>
                <Button
                    disabled={isUploading}
                    onClick={() => createNewPost()}
                    className="px-10 py-2.5 mt-8 text-[16px]"
                >
                  {isUploading ? <BiLoader className="animate-spin" size={25}/> : "Criar anúncio"}
                </Button>
              </div>
          </div>
        </div>
      </div>
    </>
  );
};