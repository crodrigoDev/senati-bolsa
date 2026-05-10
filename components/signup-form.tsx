import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Crear Nuevo Instructor</CardTitle>
        <CardDescription>
         Introduce la información para crear al Instructor
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Nombre</FieldLabel>
              <Input id="nombre" type="text" placeholder="Juan Jose" required />
            </Field>
            <Field>
              <FieldLabel htmlFor="name">Apellido</FieldLabel>
              <Input id="apellido" type="text" placeholder="Rivera Mendoza" required />
            </Field>
            <Field>
              <FieldLabel htmlFor="email">Correo</FieldLabel>
              <Input
                id="email"
                type="email"
                placeholder="juan@senati.com"
                required
              />
              <FieldDescription>
                Usaremos esto para ponernos en contacto contigo. No compartiremos tu correo electrónico con nadie más.
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Contraseña</FieldLabel>
              <Input id="password" type="password" required />
              <FieldDescription>
                Debe tener al menos 8 caracteres.
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="confirm-password">
                Confirmar contraseña
              </FieldLabel>
              <Input id="confirm-password" type="password" required />
              <FieldDescription>Porfavor confirma tu contraseña</FieldDescription>
            </Field>
            <FieldGroup>
              <Field>
                <Button type="submit">Crear Instructor</Button>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}
