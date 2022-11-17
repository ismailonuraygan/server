import {
  Container,
  Title,
  Paper,
  Button,
  TextInput,
  PasswordInput,
  Stack,
} from "@mantine/core";
import Head from "next/head";
import { useForm } from "@mantine/hooks";
import { AxiosError } from "axios";
import { useMutation } from "react-query";
import { registerUser } from "../../api";
import { showNotification, updateNotification } from "@mantine/notifications";
import { useRouter } from "next/router";

function RegisterPage() {

  const router = useRouter();

  const form = useForm({
    initialValues: {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
  });
  const mutation = useMutation<
    string,
    AxiosError,
    Parameters<typeof registerUser>["0"]
  >(registerUser, {
    onMutate: () => {
      showNotification({
        id: "register",
        title: "Creating account",
        message: "Please wait...",
        loading: true,
      });
    },
    onSuccess: () => {
      updateNotification({
        id: "register",
        title: "Success",
        message: "Successfuly created account",
      });
      router.push("/auth/login");
    } ,
    onError: () => {
      updateNotification({
        id: "register",
        title: "Error",
        message: "Could not create account",
      });
    },
  });

  return (
    <div>
      <Head>
        <title>Register User</title>
      </Head>
      <Container>
        <Title>Register</Title>
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <form onSubmit={form.onSubmit((values) => mutation.mutate(values))}>
            <Stack>
              <TextInput
                label="Email"
                placeholder="jane@example.com"
                required
                {...form.getInputProps("email")}
              ></TextInput>
              <TextInput
                label="Username"
                placeholder="jane"
                required
                {...form.getInputProps("username")}
              ></TextInput>
              <PasswordInput
                label="Password"
                placeholder="Your password"
                required
                {...form.getInputProps("password")}
              ></PasswordInput>
              <PasswordInput
                label="Confirm password"
                placeholder="Your password"
                required
                {...form.getInputProps("confirmPassword")}
              ></PasswordInput>
              <Button type="submit">Register</Button>
            </Stack>
          </form>
        </Paper>
      </Container>
    </div>
  );
}

export default RegisterPage;

