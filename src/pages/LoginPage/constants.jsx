export const loginForm = (values) => [
  {
    name: "email",
    label: "Teléfono / correo electrónico",
    type: "input",
    defaultValue: values.email,
    required: true,
    rules: (value) => {
      const regex = /^[^\s@]+@[^\s@]+\.\w{1,}[^\s@]$/;
      return regex.test(value);
    },
    errorText: "Ingrese un correo válido.",
    size: { xs: 12 },
  },
  {
    name: "password",
    label: "Contraseña",
    type: "password",
    defaultValue: values.password,
    required: true,
    rules: (value) => {
      const regex = value.length >= 8;
      const regex1 = /^(?=.*[a-z])(?=.*[A-Z]).*$/gm.test(value);
      const regex2 = /.*[0-9].*/gm.test(value);
      const regex3 = /^(?=.*[`~!@#$%^&*()_°¬|+\-=?;:'",.<>{}[\]\\/]).*$/gm.test(
        value
      );
      return regex && regex1 && regex2 && regex3;
    },
    errorText: "Ingrese una contraseña válida.",
    size: { xs: 12 },
  },
];
