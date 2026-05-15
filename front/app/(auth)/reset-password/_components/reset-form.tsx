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
import { useForm} from "react-hook-form"
import { resetSchema, type UsuarioReset } from "@/utils/validators/schemas"
import { InputGroup, InputGroupButton, InputGroupInput } from "@/components/ui/input-group"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"


export function ResetForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const {register, handleSubmit, formState: {errors}} = useForm({
    defaultValues: {
      password: '',
      confirmPassword: ''
    },
    resolver: zodResolver(resetSchema),
    mode: "onSubmit",
    reValidateMode: "onBlur"
  })
  const router = useRouter()

  const onSubmit = (data: UsuarioReset) => {
    console.log(data)
    router.push('/login')

  }
  return (
      <Card className=" px-2 py-10">
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="password">Nueva Contraseña</FieldLabel>
                <InputGroup className={`flex items-center overflow-hidden h-10 p-0 ${errors.password ? 'border-red-500 dark:border-destructive' : ''}`}>
                  <InputGroupInput 
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    {...register('password')}
                  />
                  <InputGroupButton onClick={() => setShowPassword(!showPassword)} className=" p-3 h-full cursor-pointer">
                    {showPassword ? <EyeOff /> : <Eye />}
                  </InputGroupButton>
                </InputGroup>
                {errors.password && 
                  <FieldLabel htmlFor="password" className="text-red-500 dark:text-destructive text-xs">
                    {errors.password.message}
                  </FieldLabel>
                }
              </Field>
              <Field>
                <FieldLabel htmlFor="confirmPassword">Repetir Contraseña</FieldLabel>
                <InputGroup className={`flex items-center overflow-hidden h-10 p-0 ${errors.confirmPassword ? 'border-red-500 dark:border-destructive' : ''}`}>
                  <InputGroupInput 
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    {...register('confirmPassword')}
                  />
                  <InputGroupButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} className=" p-3 h-full cursor-pointer">
                    {showConfirmPassword ? <EyeOff /> : <Eye />}
                  </InputGroupButton>
                </InputGroup>
                {errors.confirmPassword && 
                  <FieldLabel htmlFor="confirmPassword" className="text-red-500 dark:text-destructive text-xs">
                    {errors.confirmPassword.message}
                  </FieldLabel>
                }
              </Field>
              <Field>
                <Button type="submit" className="h-10 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">Recuperar</Button>
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
