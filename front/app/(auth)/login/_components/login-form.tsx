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
import { useAuth } from "@/context/authContext"
import { Spinner } from "@/components/ui/spinner"

export function LoginForm() {
  const {login} = useAuth();
  const [authError, setAuthError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()
  const {register, handleSubmit, control, formState: {errors}} = useForm({
    defaultValues: {
      email: '',
      password: '',
      isRecovered: false
    },
    resolver: zodResolver(loginSchema),
    mode: "onSubmit",
    reValidateMode: "onBlur"
  })

  const onSubmit = async (data: UsuarioLogin) => {
    setAuthError("")
    setIsLoading(true)
    try{
      await login(data);
      router.push("/instructor-seguimiento/dashboard")
    } catch(error: unknown){
      setIsLoading(false)
      if(error instanceof Error)
        setAuthError(error.message)
      else
        setAuthError("Credenciales incorrectas");
    }
  }
  return (
      <Card className=" px-2 py-10">
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              {authError && 
                <Field>
                    <FieldLabel className="w-full bg-destructive/10 text-destructive focus-visible:ring-destructive/20 dark:bg-destructive/20 p-2 rounded-sm text-xs">
                      {authError}
                    </FieldLabel> 
                </Field>
              }
              <Field>
                <FieldLabel htmlFor="email">Correo electrónico</FieldLabel>
                <Input
                  id="email"
                  type="text"
                  placeholder="example@email.com"
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
                <Button type="submit" className={`h-10 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors`} disabled={isLoading}>{isLoading ? <Spinner/> : "Iniciar sesion"}</Button>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
  )
}
