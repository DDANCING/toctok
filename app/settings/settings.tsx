"use client"

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form"
import { SettingsSchema } from "@/schemas";
import { settings } from "@/actions/settings";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useTransition, useState } from "react";
import { Input } from "@/components/ui/input";

import { ModeToggle } from "@/components/ui/mode-toggle";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCurrentUser } from "@/data/hooks/use-current-user";

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { SyncLoader } from "react-spinners";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";
import { useSession } from "next-auth/react";

import { cn } from "@/lib/utils";
import UrlTabs from "@/components/urltabs";
import { useRouter } from "next/navigation";
import { CropperDimensions } from "../types";
import { Moon } from "lucide-react";

const SettingsPage = () => {
const [error, setError] = useState<string | undefined>(); 
const [success, setSuccess] = useState<string | undefined>();   
const [isPending, startTransition] = useTransition();
const user =  useCurrentUser();
const { update } = useSession();


const form = useForm<z.infer<typeof SettingsSchema>>({
  resolver: zodResolver(SettingsSchema),
  defaultValues: {
    password: undefined,
    newPassword: undefined,
    name: user?.name || undefined,
    email: user?.email || undefined,
    isTwoFactorEnabled: user?.isTwoFactorEnabled || undefined,
  }
});

const onSubmit = (values: z.infer<typeof SettingsSchema>) => {
   startTransition(() => {
   settings(values)
   .then((data) => {
    if (data.error) {
      setError(data.error)
      toast(data.error, {
        
        action: {
          label: "Fechar",
          onClick: () => console.log("Fechar"),
        },
      })
    }

    if (data.success) {
      update(); 
      setSuccess(data.success);
      toast(data.success, {
        
        action: {
          label: "Fechar",
          onClick: () => console.log("Fechar"),
        },
      })
    }
    
   })
   .catch(() => setError("Algo deu errado!"));
   
  });
}

  return (
    <main className=" flex rounded-sm h-screen justify-between">
    <div className="flex h-full w-full bg-background">
    <UrlTabs defaultValue="account">
      <TabsList className={cn(
        "grid w-full grid-cols-3",
        user?.isOAuth !== false && "grid w-full grid-cols-3"
      )}
      >  
        <TabsTrigger value="account">Conta</TabsTrigger>
        {user?.isOAuth === false &&(
        <TabsTrigger value="password">Senha</TabsTrigger>
        )}
        <TabsTrigger value="configs">Preferências</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <Card className="shadow-none">
          <CardHeader>
            <CardTitle>Conta</CardTitle>
            <CardDescription>
              Faça alterações na sua conta aqui. Clique em salvar quando terminar.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
          
          <Form {...form}>
            <form 
            className="space-y-6" 
            onSubmit={form.handleSubmit(onSubmit)}
            >
              <div className="space-y-4" >
              <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
            <FormItem>
              <FormLabel> Nome </FormLabel>
              <FormControl>
                <Input
                {...field}
                placeholder={user?.name || ""} 
                disabled={isPending}
                />
              </FormControl>
            </FormItem>
            )}
              />

              {user?.isOAuth === false &&(
              <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
            <FormItem>
              <FormLabel> Email </FormLabel>
              <FormControl>
                <Input
                {...field}
                placeholder={user?.email || ""} 
                disabled={isPending}
                />
              </FormControl>
            </FormItem>
            )}
              />
              
            )} 
              {user?.isOAuth === false && (
              <FormField
              control={form.control}
              name="isTwoFactorEnabled"
              render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
              <div className="space-y-0.5">
                <FormLabel>  Autenticação em Duas Etapas  </FormLabel>
                <FormDescription>
                  Ative a autenticação em duas etapas para sua conta.
                </FormDescription>
              </div>
              <FormControl>
                <Switch 
                disabled={isPending}
                checked={field.value}
                onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
            )}
              />
          )}
           </div>
           <Button variant={"outline"} disabled={isPending} type="submit" className="flex box-content"> 
            {isPending? <SyncLoader size={9} color="#ffffff"/> : "Salvar"}
           </Button>
            </form>
          </Form>
          </CardContent>
          <CardFooter>
          </CardFooter>
        </Card>
      </TabsContent>
      {user?.isOAuth === false &&(
      <TabsContent value="password">
      
      <Form {...form}>
            <form 
            className="space-y-6" 
            onSubmit={form.handleSubmit(onSubmit)}
            >
              <div className="space-y-4" >
            <Card className="p-6 shadow-none"> 
                <>
              <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
            <FormItem>
              <FormLabel> Senha </FormLabel>
              <FormControl>
                <Input
                {...field}
                placeholder="******" 
                type="password"
                disabled={isPending}
                />
              </FormControl>
            </FormItem>
            )}
              />
              <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
            <FormItem>
              <FormLabel> Nova Senha </FormLabel>
              <FormControl>
                <Input
                {...field}
                placeholder="******" 
                type="password"
                disabled={isPending}
                />
              </FormControl>
              <FormMessage/>
            </FormItem>
            )}
              />
              </>
              </Card> 
              
           </div>
           <Button variant={"outline"} disabled={isPending} type="submit" className="flex box-content ml-2"> 
            {isPending? <SyncLoader size={9} color="#ffffff"/> : "Alterar senha"}
           </Button>
            </form>
          </Form>
      </TabsContent>
 )} 
      <TabsContent value="configs">
        <Card className="shadow-none">
          <CardHeader>
            <CardTitle>Preferências</CardTitle>
            <CardDescription>
              
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center gap-2">
          <Moon size={18}/>  <h1> Modo escuro </h1>
          </div>
           <ModeToggle/>
          </CardContent>
          <CardFooter>
          <Button variant={"outline"} disabled={isPending} type="submit" className="flex box-content"> 
            {isPending? <SyncLoader size={9} color="#ffffff"/> : "Save"}
           </Button>
          </CardFooter>
        </Card>
      </TabsContent>
    
    
      </UrlTabs>
    </div>
    <div className="bg-transparent backdrop-blur-md flex-1">
      <div className="h-full w-full flex justify-center items-center">
    
      <div className="absolute inset-0 -z-10">
      </div>
    </div>
    </div>
    </main>
  )}

export default SettingsPage;