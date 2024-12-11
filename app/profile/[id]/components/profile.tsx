"use client"

import ClientOnly from "@/components/client-only"

interface profileProps {
  id?: string,
  userId: string,
  name: string,
  img: string,
}

export const Profile = ({
 id,
 img,
 name,
 userId,
}:  profileProps) => {
  if(!id) {
    return (
      <>
      <h1>
        Não foi possível localizar esta conta
      </h1>
      <h2>
        Oque voce esta procurando? Experimente navegar pelas abas de busca.
      </h2>
      </>
    )
  }
  const currentProfile = {
    id: id,
    userId: id,
    name,
    img,
  }
  return (
    <div className="pt-[90px] ml-[90px] 2xl:pl-[185px] lg:pl-[160px] lg:pr-0 w-[calc(100%-90px)] pr-3 max-w-[1800px] 2xl:mx-auto">
      <div className="flex w-[calc(100vw-230px)]">
          <ClientOnly >
            {true ? (
              <img className="w-[120px] min-w-[120px] rounded-full" alt="" src={currentProfile.img} />
            ) : (
              <div className="min-w-[150px] h-[120px] bg-muted-foreground rounded-full"/>
            )}
          </ClientOnly>
          
          <div className="ml-5 w-full">
            <ClientOnly>
              {currentProfile.name? (
                <div>
                  <h1 className="text-3xl font-bold">{currentProfile.name}</h1>
                </div>
              ) : (
                <div className="h-[60px]"/>
              )}
            </ClientOnly>
          </div>
      </div>
    </div>
  )
}