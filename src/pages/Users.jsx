import Heading from "../ui/Heading";
import SignupForm from "../features/authentication/SignupForm";

function NewUsers() {
  return <>
  <Heading as="h1">Crear usuario</Heading>
  <SignupForm />
  </>
}

export default NewUsers;
