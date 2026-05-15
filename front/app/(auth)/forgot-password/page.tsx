'use client'
import { EmailForm } from "./_components/email-form"
import SenatiLogo from "@/assets/Senati-Symbol.svg"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import ToggleTheme from "@/components/AppHeader/ToggleTheme"
import Typewriter from "typewriter-effect"

export default function page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center justify-center gap-3 mb-6 ">
          <div className="flex items-center p-2 gap-4">
            <Image
              src={SenatiLogo}
              alt="logo de senati"
              height={150}
              width={100}
              className="invert dark:invert-0"
            />
            <Label className="text-6xl font-bold">
              SENATI
            </Label>
          </div>
          <Label className="text-2xl">
            Recuperar Contraseña
          </Label>
          <Label className="text-center">
            <Typewriter
                onInit={(typewriter) => {
                  typewriter
                    .typeString('Ingresa tu correo para el envio del codigo de recuperación.')
                    .stop()
                    .start()
                }}
                options={{
                  delay: 75
                }}
            />
          </Label>
        </div>
        <EmailForm />
      </div>
    </div>
  )
}
