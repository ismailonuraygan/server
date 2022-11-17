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
import { loginUser } from "../../api";
import { useRouter } from "next/router";

function LoginPage() {
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
    Parameters<typeof loginUser>["0"]
  >(loginUser, {
    onSuccess: () => {
      router.push("/");
    },
  });

  return (
    <div>
      <Head>
        <title>Login</title>
      </Head>
      <Container>
        <Title>Login</Title>
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <form onSubmit={form.onSubmit((values) => mutation.mutate(values))}>
            <Stack>
              <TextInput
                label="Email"
                placeholder="jane@example.com"
                required
                {...form.getInputProps("email")}
              ></TextInput>
              <PasswordInput
                label="Password"
                placeholder="Your password"
                required
                {...form.getInputProps("password")}
              ></PasswordInput>
              <Button type="submit">Login</Button>
            </Stack>
          </form>
        </Paper>
      </Container>
    </div>
  );
}

export default LoginPage;
