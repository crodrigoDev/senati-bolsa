import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function DialogDemo() {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button className="ml-245 bg-white" > + Nuevo instructor</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Nuevo Instuctor</DialogTitle>
            <DialogDescription>
              Realiza cambios en el perfil aquí. Haz clic en guardar cuando hayas terminado.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="name">Nombres</Label>
              <Input id="name-1" name="name" placeholder="Alvaro " />
            </Field>
            <Field>
              <Label htmlFor="name">Apellido Paterno</Label>
              <Input id="name-1" name="name" placeholder="Alvaro " />
            </Field>
            <Field>
              <Label htmlFor="name">Apellido Materno</Label>
              <Input id="name-1" name="name" placeholder="Alvaro " />
            </Field>
            <Field>
              <Label htmlFor="email">Correo Institucional</Label>
              <Input id="email" name="username" placeholder="alvaro@senati.pe" />
            </Field>
            
            <Field>
              <Label htmlFor="">Correo Personal</Label>
              <Input id="emailpersonal" name="emailpersonal" placeholder="alvaro@gmail.com " />
            </Field>
             <Field>
              <Label htmlFor="telefono">Telefono</Label>
              <Input id="name-1" name="name" placeholder="000 000 000 " />
            </Field>
             <Field>
              <Label htmlFor="name">DNI</Label>
              <Input id="name-1" name="dni" placeholder="00000000" />
            </Field>

          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DialogClose>
            <Button type="submit">Guardar</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}
