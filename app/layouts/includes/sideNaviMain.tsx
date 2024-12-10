"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import MenuItem from "./menuItem";
import ClientOnly from "@/components/client-only";
import MenuItemFollow from "./menu-item-follow";
import { Button } from "@/components/ui/button";
import { FaChevronDown } from "react-icons/fa";
import { useState, useEffect } from "react";
import { getUserHistory } from "@/actions/history";

// Define o tipo para `user` e `userId`
type UserProps = {
  user: {
    id: string;
  } | null;
};

// Define o tipo do item do histórico
type UserHistoryItem = {
  id: string;
  action: string;
  listing?: {
    title: string;
    locale: string;
    image: string;
  } | null;
};

export default function SideNavMain({ user }: UserProps) {
  const pathname = usePathname();
  const userId = user?.id;

  const [history, setHistory] = useState<UserHistoryItem[]>([]);
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const take = 3; // Número de itens por página

  // Carrega o histórico do usuário
  const loadUserHistory = async () => {
    if (!userId || !hasMore) return;

    try {
      const newHistory = await getUserHistory(userId, skip, take);

      // Transforma os dados recebidos no formato esperado
      const transformedHistory = newHistory.map((item) => ({
        id: item.id,
        action: item.action,
        listing: item.listing
          ? {
              title: item.listing.title,
              locale: item.listing.location || "Desconhecido",
              image: item.listing.images?.[0] || "https://placehold.co/50",
            }
          : null,
      }));

      // Filtra os itens já existentes para evitar duplicação
      const uniqueHistory = transformedHistory.filter(
        (newItem) =>
          !history.some((existingItem) => existingItem.id === newItem.id)
      );

      // Atualiza o estado com os novos itens
      setHistory((prev) => [...prev, ...uniqueHistory]);
      setSkip((prev) => prev + take);

      // Verifica se há mais itens
      if (newHistory.length < take) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("[LOAD_USER_HISTORY]", error);
    }
  };

  // Limpa o histórico ao mudar de usuário
  useEffect(() => {
    setHistory([]); // Limpa o histórico quando o `userId` mudar
    setSkip(0); // Reseta a paginação
    setHasMore(true); // Reseta a condição de "tem mais"
    if (userId) {
      loadUserHistory(); // Carrega o histórico do novo usuário
    }
  }, [userId]);

  return (
    <>
      <div
        id="SideNavMain"
        className={`fixed left-0 z-20 bg-background pt-[70px] h-full w-[75px] overflow-auto 
          ${pathname === "/" ? "lg:w-[320px]" : "lg:w-[230px]"}`}
      >
        <div className="lg:w-full w-[55px] mx-auto ">
          <Link href="/">
            <MenuItem
              iconString="Sua localização"
              colorString={pathname === "/" ? "#22c55e" : ""}
              sizeString="25"
            />
          </Link>
          <MenuItem
            iconString="Seguindo"
            colorString={pathname === "/" ? "muted" : ""}
            sizeString="25"
          />
          <MenuItem
            iconString="LIVE"
            colorString={pathname === "/" ? "muted" : ""}
            sizeString="25"
          />
          {user && (
            <div>
              <div className="border-b border-muted lg:ml-2 mt-2" />
              <h3 className="lg:block hidden text-muted-foreground font-semibold pt-4 pb-2 px-2 ">
                Últimas pesquisas
              </h3>
              <div className="lg:hidden block pt-3 " />
              <ClientOnly>
                <div className="cursor-pointer scrollbar-none">
                  {history.map((item) => (
                    <MenuItemFollow
                      key={item.id}
                      id={item.id}
                      title={item.listing?.title || "Título Desconhecido"}
                      locale={item.listing?.locale || "Localização Desconhecida"}
                      image={item.listing?.image || "https://placehold.co/50"}
                    />
                  ))}
                </div>
              </ClientOnly>
              {hasMore && (
                <Button
                  className="bg-transparent lg:block hidden pt-1.5 pl-2 text-[13px] font-bold text-foreground"
                  variant="ghost"
                  onClick={loadUserHistory}
                >
                  <div className="flex gap-2">
                    <FaChevronDown /> <p>Ver mais</p>
                  </div>
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
