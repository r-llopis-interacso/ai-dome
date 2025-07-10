# Estado distribuido

<aside>
💡 Los componentes deberían ser relativamente agnósticos a si el estado compartido está distribuído o heredado

</aside>

<aside>
👉 Limitar el estado distribuido a lo estrictamente necesario

</aside>

# Cuando usarlo

Las opciones habituales para usar un estado distribuido suelen ser las siguientes:

- Estado que debe persistir entre rutas
- Estado entre ramas distintas del árbol de componentes
- Estado entre componentes muy alejados en una misma rama del árbol de componentes

# Sólo cuando sea necesario

Usar éste tipo de estado aumenta la complejidad de la aplicación y conecta partes

Por lo tanto, antes de usar éste tipo de estado debemos preguntarnos si se puede plantear la solución con un estado más sencillo y sólo optar por distribuirlo cuando sea realmente necesario o aporte valor suficiente.

# Encapsular en hooks

Los componentes que usen estado no tienen porque saber cuál es su alcance ni cómo está implementado. Por ello la gestión de ese estado la encapsulamos en hooks que ocultan su implementación a los componentes.

De esa forma podemos cambiar la implementación, el origen del estado o incluso la librería usada sin que los componentes que lo usen se vean afectados.

# Usar contextos y proveedores

La opción por defecto que usamos para implementar estados distribuidos es el API de React Context.

Para aplicar la pauta anterior, tanto el contexto como el proveedor los incluimos dentro del módulo de su hook.

# Estructura para este tipo de hooks

La estructura es similar a la del resto de los hooks añadiendo dos tipos de ficheros, para el contexto y el proveedor.

Suponiendo un hook `useSession`, ésta sería la estructura típica de su carpeta:

- `use-session`
    - `context.ts`: creación del contexto con sus estado inicial
    - `index.mdx`: documentación del hook si fuera necesaria
    - `index.ts`: implementación del hook que usarán los componentes
    - `provider.tsx`: proveedor del contexto que permitirá distribuir el estado
    - `specs.tsx`: especificaciones del hook en forma de pruebas unitarias
    - `types.ts`: tipos usados por el contexto, componente, etc.

# Ejemplo de hook

```tsx
import { createContext } from 'react'

import type { UseSession } from './types'

const SessionContext = createContext<UseSession>({
		session: undefined,
		setSession: () => undefined,
})

export default SessionContext
```

```tsx
import { useContext, useEffect } from 'react'

import type { UseSession } from './types'
import { SessionContext } from './context'

export default function useSession(): UseSession {
		const { session, setSession } = useContext(SessionContext)

		// ...
	
		useEffect(() => {
				// ...
		}, [session])
	
		return { session, setSession, /* ... */ }
}
```

```tsx
import { PropsWithChildren, useState } from 'react'

import type { Session } from 'src/types'

import { SessionContext } from './context'

export default function SessionProvider({	children }: PropsWithChildren) {
	const [session, setSession] = useState<Session | undefined>()

	return (
			<SessionContext.Provider value={{ session, setSession }}>
					{children}
			</SessionContext.Provider>
	)
}
```