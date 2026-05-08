"use client"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { Eye, EyeOff } from "lucide-react"
import { useState } from "react"
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { InputGroup, InputGroupButton, InputGroupInput } from "@/components/ui/input-group"
import { useForm, Controller } from "react-hook-form"
import { loginSchema, type UsuarioLogin } from "@/utils/validators/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()
  const {register, handleSubmit, control, formState: {errors}} = useForm({
    defaultValues: {
      username: '',
      password: '',
      isRecovered: false
    },
    resolver: zodResolver(loginSchema),
    mode: "onSubmit",
    reValidateMode: "onBlur"
  })

  const onSubmit = (data: UsuarioLogin) => {
    console.log(data)
    router.push('/dashboard')
  }
  return (
      <Card className=" px-2 py-10">
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="username">Nombre de usuario</FieldLabel>
                <Input
                  id="username"
                  type="text"
                  placeholder="1, 2, 3, 4, 5, 6"
                  className={`h-10 ${errors.username ? 'border-red-500 dark:border-destructive' : ''}`}
                  {...register('username')}
                />
                  {errors.username && 
                    <FieldLabel htmlFor="username" className="text-red-500 dark:text-destructive text-xs">
                      {errors.username.message}
                    </FieldLabel>
                  }
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Contraseña</FieldLabel>
                  <Link
                    href="/forgot-password"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    ¿Olvidaste tu contraseña?
                  </Link>
                </div>
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
                <div className="flex items-center gap-2">
                  <Controller
                    name="isRecovered"
                    control={control}
                    render={({field}) => (
                      <Checkbox  id="remember" checked={field.value} onCheckedChange={field.onChange}/>
                    )}
                  />
                  <FieldLabel className="text-sm" htmlFor="remember">
                    Recordarme
                  </FieldLabel>
                </div>
              </Field>
              <Field>
                <Button type="submit" className="h-10 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors" >Iniciar Sesión</Button>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
  )
}
