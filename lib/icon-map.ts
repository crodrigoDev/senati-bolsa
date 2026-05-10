

import { Building2, Presentation, User, BookCheck, ChartArea } from 'lucide-react'
import { type ComponentType } from 'react'

type icon = ComponentType<{className?: string, strokeWitdh?: number}>

export const IconsSidebar: Record<string, icon> = {
    Building2,
    Presentation,
    User,
    BookCheck,
    ChartArea
}