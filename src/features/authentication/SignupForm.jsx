import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useRegister } from "./useRegister"
import { useForm } from "react-hook-form";
import SpinnerMini from "../../ui/SpinnerMini";

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const { registerUser, isLoading } = useRegister();
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
    reset,
  } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      passwordConfirm: "",
    },
  });

  const onSubmit = (data) => {
    const { email, password, fullName } = data;
    registerUser({ email, password, fullName }, {
      onSuccess: () => reset()
    });
  };


  return (
    <Form
      className="text-[14px] py-[24px] px-10 bg-white dark:bg-black border border-gray-100 dark:border-gray-800 rounded-md"
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormRow
        label="Nombre de usuario"
        error={errors?.fullName?.message}
        id="fullName"
      >
        <Input
          type="text"
          id="fullName"
          disabled={isLoading}
          {...register("fullName", { required: "Este campo es requerido" })}
        />
      </FormRow>

      <FormRow label="Correo electronico" error={errors?.email?.message} id="email">
        <Input
          type="email"
          id="email"
          disabled={isLoading}
          {...register("email", {
            required: "Este campo es requerido",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Por favor ingrese un correo valido",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Contraseña (min 8 caracteres)"
        error={errors?.password?.message}
        id="password"
      >
        <Input
          type="password"
          id="password"
          disabled={isLoading}
          {...register("password", {
            required: "Este campo es requerido",
            minLength: {
              value: 8,
              message: "La contraseña debe tener al menos 8 caracteres",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Repita la contraseña"
        error={errors?.passwordConfirm?.message}
        id="passwordConfirm"
      >
        <Input
          type="password"
          id="passwordConfirm"
          disabled={isLoading}
          {...register("passwordConfirm", {
            required: "Este campo es requerido",
            validate: (value) =>
              value === getValues().password || "Las contraseñas no coinciden",
          })}
        />
      </FormRow>

      <FormRow hasButton>
        <Button
          variant="secondary"
          type="reset"
          disabled={isLoading}
          onClick={() => reset()}
        >
          Cancelar
        </Button>
        <Button type="submit" disabled={isLoading} className="flex gap-2 items-center">
          {isLoading && <SpinnerMini />}
          Crear usuario
        </Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
