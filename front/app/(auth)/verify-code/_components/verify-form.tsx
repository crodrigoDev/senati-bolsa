"use client"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { useForm, Controller} from "react-hook-form"
import { verifySchema, type UsuarioVerify } from "@/utils/validators/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp"
import Link from "next/link"
import { useRouter } from "next/navigation"

export function EmailForm() {
  const {control, handleSubmit, formState: {errors}} = useForm({
    defaultValues: {
      pin: ''
    },
    resolver: zodResolver(verifySchema),
    mode: "onSubmit",
    reValidateMode: "onBlur"
  })

  const router = useRouter()

  const onSubmit = (data: UsuarioVerify) => {
    console.log(data)
    router.push('/reset-password')
  }
  return (
      <Card className=" px-2 py-10">
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="verify-code">Código de Verificación</FieldLabel>
                <div className="flex items-center justify-center" >
                    <Controller
                        name="pin"
                        control={control}
                        render={({field}) => (
                            <InputOTP maxLength={6} id="verify-code" value={field.value} onChange={field.onChange} className="w-full">
                                <InputOTPGroup className="*:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:w-11 *:data-[slot=input-otp-slot]:text-xl">
                                    <InputOTPSlot index={0} aria-invalid={errors.pin ? "true" : "false"}/>
                                    <InputOTPSlot index={1} aria-invalid={errors.pin ? "true" : "false"}/>
                                    <InputOTPSlot index={2} aria-invalid={errors.pin ? "true" : "false"}/>
                                </InputOTPGroup>
                                <InputOTPSeparator className="mx-2" />
                                <InputOTPGroup className="*:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:w-11 *:data-[slot=input-otp-slot]:text-xl">
                                    <InputOTPSlot index={3} aria-invalid={errors.pin ? "true" : "false"}/>
                                    <InputOTPSlot index={4} aria-invalid={errors.pin ? "true" : "false"}/>
                                    <InputOTPSlot index={5} aria-invalid={errors.pin ? "true" : "false"}/>
                                </InputOTPGroup>
                            </InputOTP>
                        )} 
                    />
                </div>
                {errors.pin && 
                    <FieldLabel htmlFor="password" className="text-red-500 dark:text-destructive text-xs">
                        {errors.pin.message}
                    </FieldLabel>
                }
              </Field>
              <Field>
                <Button type="submit" className="h-10 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">Enviar</Button>
              </Field>
              <Field>
                <Link
                    href="/forgot-password"
                    className="text-center text-sm underline-offset-4 hover:underline"
                >
                    Volver atrás
                </Link>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
  )
}
