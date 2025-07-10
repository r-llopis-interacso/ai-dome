# Configuración de Bitbucket

# Configurar SSH Bitbucket by Terminal

1. Abre el terminal y escribe el siguiente comando:

```bash
ssh-keygen -t rsa -b 4096 -C "nombre.apellido@interacso.com"
```

1. Define el nombre del archivo: 

```bash
# Nota: Cuidado con id_rsa, si ya tenías otra configuración,
#       para evitar perder las credenciales.
#
/Users/username/.ssh/id_rsa_interacso # Es dónde se guardará (path+name)
```

1. Defines “Passphrase” (opcional) otherwise Enter, Enter.
2. Escribe el siguiente comando: (Si se ven dichos archivos, todo es correcto)

```bash
ls ~/.ssh/id_rsa_interacso*
```

1. Asegúrate que el agente SSH está en segundo plano:

```bash
eval "$(ssh-agent -s)"
```

1. **Agrega tu clave SSH al agente:**

```bash
ssh-add -K ~/.ssh/id_rsa_interacso
```

1. **Copia tu clave SSH pública al portapapeles:**

```bash
pbcopy < ~/.ssh/id_rsa_interacso.pub
```

1. **Añadir la clave SSH a Bitbucket:**
    1. Ve a [Bitbucket](https://bitbucket.org) y inicia sesión en tu cuenta de interacso (nombre.apellido@interacso.com)
    2. Haz clic en tu avatar en la esquina inferior izquierda y selecciona "Configuración personal".
    3. En el menú de la izquierda, haz clic en "Claves SSH" bajo "Configuración de seguridad".
    4. Haz clic en el botón "Agregar clave".
    5. Pega la clave SSH que copiaste al portapapeles en el campo "Key" y dale un título descriptivo.
    6.   Finalmente, haz clic en el botón "Agregar clave" para guardarla.
2. **Verifica tu conexión:**

```bash
ssh -T git@bitbucket.org

# Nota: Deberías recibir un mensaje indicando que has sido autenticado,
#       pero Bitbucket no proporciona acceso shell.
# Si ves ese mensaje, significa que todo está configurado correctamente.
#
# Ahora ya puedes hacer clone, push, pull ..., sin tener que ingresar la contraseña cada vez.
```

# Configuración del autor

Todos los commits realizados en repositorios de Interacso deben ir firmados con los siguientes datos de configuración en Git:

```bash
# Nota: ves al directorio del "proyecto de interacso" donde está .git,
#       después del clone or create repo...
#       git clone -b name_branch url_repo --depth 1

git config user.name "Nombre Apellido"
git config user.email "nombre.apellido@interacso.com"

# Nota: Cuando hagas una nueva rama o branch, defínelo por costubre.
#       Para que en primer commit ya esté bien identificado.
```

# Activar Git Source Control on VSCode

```bash
# Nota: Para hacer push, pull... desde VSCode
```

1. Abre VSCode
2. Presiona “cmd + shift + p”
3. Escribe y Selecciona “View: Show Source Control”

# Activar Git Code Viewer on VSCode

```bash
# Nota: Esto es para cuando quieres hacer un compare o rebase en git...
#       y quieres que utilice vscode en vez vim.
```

1. Abre VSCode
2. Presiona “cmd + shift + p”
3. Escribe y Selecciona “Shell Command: install code command in PATH”
4. Escribe el siguiente comando en el terminal: (decirle a git cuál debe utilizar)

```bash
git config --global core.editor "code --wait"
```