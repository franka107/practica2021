export const registerForm = (classes, values, phoneRegister = false, handleAction, setPassword) => {
  const register = [
    {
      name: 'firstName',
      label: 'Nombre',
      type: 'input',
      required: true,
      defaultValue: values.firstName,
      size: {sm: 6, xs: 12},
    },
    {
      name: 'lastName',
      label: 'Apellido',
      type: 'input',
      defaultValue: values.lastName,
      required: true,
      size: {sm: 6, xs: 12},
    },
    {
      name: 'action',
      action: true,
      label: !phoneRegister ? 'Registrarse con número de teléfono' : 'Registrarse con correo electrónico',
      onClick: () => handleAction(),
      size: {xs: 12},
    },
  ];
  const terms = [
    {
      name: 'password',
      label: 'Contraseña',
      defaultValue: values.password,
      type: 'password',
      required: true,
      rules: (value) => {
        const regex = value.length >= 8;
        const regex1 = /^(?=.*[a-z])(?=.*[A-Z]).*$/gm.test(value);
        const regex2 = /.*[0-9].*/gm.test(value);
        const regex3 = /^(?=.*[`~!@#$%^&*()_°¬|+\-=?;:'",.<>{}[\]\\/]).*$/gm.test(value);

        return (regex && regex1 && regex2 && regex3);
      },
      errorText: 'Ingrese una contraseña válida.',
      onChange: (value) => setPassword(value),
      size: {xs: 12},
    }
  ];

  if (!phoneRegister) {
    register.push({
      name: 'email',
      label: 'Email',
      type: 'input',
      defaultValue: values.email,
      required: true,
      rules: (value) => {
        const regex = /^[^\s@]+@[^\s@]+\.\w{1,}[^\s@]$/;
        return (regex.test(value));
      },
      errorText: 'Ingrese un correo válido.',
      size: {xs: 12},
    })
  } else {
    register.push({
      name: 'phoneNumber',
      label: 'Teléfono',
      type: 'phoneNumber',
      defaultValue: '',
      required: true,
      rules: (value) => {
        if (value) {
          const regex = /^\+?\d{9,20}$/;
          return (regex.test(value));
        }
        return true
      },
      errorText: 'Ingrese 9 dígitos.',
      classes: classes.phoneInput,
      size: {xs: 12},
    })
    register.push({
      name: 'code',
      label: 'Introduce el código de 4 dígitos',
      type: 'input',
      required: true,
      defaultValue: values.code,
      size: {xs: 12},
    })
  }

  return [...register, ...terms];
};
