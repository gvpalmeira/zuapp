"use client";

import { Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { sidebarLinks } from "@/constants"
import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Footer from "./Footer"

// Define proper types for the sidebar links
interface SidebarLink {
  route: string
  label: string
  imgURL: string
}

// Update the User interface
interface User {
  $id: string
  userId: string
  accountType: string
  nome_completo: string
  email: string
}

interface MobileNavProps {
  user: User | null
}

const MobileNav = ({ user }: MobileNavProps) => {
  const pathname = usePathname()

  return (
    <section className="w-full max-w-[264px]">
      <Sheet>
        <SheetTrigger asChild>
          <button className="flex items-center gap-2">
            <Image 
              src="/icons/hamburger.svg" 
              width={30} 
              height={30} 
              alt="menu"
              className="cursor-pointer" 
            />
          </button>
        </SheetTrigger>
        <SheetContent side="left" className="border-none bg-white">
          <Link href="/" className="cursor-pointer flex items-center gap-1 px-4">
            <Image 
              src="/icons/logo.svg" 
              width={30} 
              height={30} 
              alt="Logo" 
            />
            <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">Zupay</h1>
          </Link>
          
          <div className="mobilenav-sheet">
            <SheetClose asChild>
              <nav className="flex h-full flex-col gap-6 pt-16 text-white">
                {(sidebarLinks as SidebarLink[]).map((item) => {
                  const isActive = pathname === item.route || pathname.startsWith(`${item.route}/`)
                  
                  return (
                    <SheetClose asChild>
                      <Link 
                        key={item.route}  // Mova a key para aqui
                        href={item.route} 
                        className={cn('mobilenav-sheet_close w-full', {
                          'bg-bank-gradient': isActive
                        })}
                      >
                        <Image 
                          src={item.imgURL} 
                          alt={item.label} 
                          width={20} 
                          height={20}
                          className={cn({
                            'brightness-[3] invert-0': isActive
                          })} 
                        />
                        <p className={cn("text-16 font-semibold text-black-2", {
                          "text-white": isActive
                        })}>
                          {item.label}
                        </p>
                      </Link>
                    </SheetClose>
                  )
                })}

                {user && (
                  <SheetClose asChild>
                    <Link href="/perfil" className="mobilenav-sheet_close w-full">
                      <Image 
                        src="/icons/profile.svg" 
                        alt="Perfil" 
                        width={20} 
                        height={20} 
                      />
                      <p className="text-16 font-semibold text-black-2">
                        Perfil
                      </p>
                    </Link>
                  </SheetClose>
                )}
              </nav>
            </SheetClose>
            <Footer user={user} type="mobile" />
          </div>
        </SheetContent>
      </Sheet>
    </section>
  )
}

export default MobileNav