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
import { Input } from "@/components/ui/input"
import { useForm} from "react-hook-form"
import { recoverSchema, type UsuarioRecover } from "@/utils/validators/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useRecover } from "@/hooks/auth/useRecover"


export function EmailForm() {
  const { handleSendEmail } = useRecover();
  const {register, handleSubmit, formState: {errors}} = useForm({
    defaultValues: {
      email: ''
    },
    resolver: zodResolver(recoverSchema),
    mode: "onSubmit",
    reValidateMode: "onBlur"
  })

  const onSubmit = (data: UsuarioRecover) => {
    handleSendEmail(data)
  }
  return (
      <Card className=" px-2 py-10">
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Correo electrónico</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="example@senati.pe"
                  className={`h-10 ${errors.email ? 'border-red-500 dark:border-destructive' : ''}`}
                  {...register('email')}
                />
                  {errors.email && 
                    <FieldLabel htmlFor="email" className="text-red-500 dark:text-destructive text-xs">
                      {errors.email.message}
                    </FieldLabel>
                  }
              </Field>
              <Field>
                <Button type="submit" className="h-10 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">Enviar</Button>
              </Field>
              <Field>
                <Link
                    href="/login"
                    className="text-center text-sm underline-offset-4 hover:underline"
                >
                    Volver al Login
                </Link>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
  )
}
