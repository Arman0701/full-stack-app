'use client';
import { Input } from '@heroui/input';
import { Button } from '@heroui/button';
import Link from 'next/link';
import { Divider } from '@heroui/react';
import { Field, Form, Formik } from 'formik';
import { api } from '@/_lib/axios';
import { useRouter } from 'next/navigation';

type SigninFields = {
  username: string;
  password: string;
};

export default function SignInPage() {
  const router = useRouter();

  const submitHandler = async (values: SigninFields) => {
    console.log('values :::', values);
    try {
      const { status, data } = await api.post('/api/auth/signin', values);

      localStorage.setItem('authToken', data.accessToken);
      router.push('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="flex w-screen h-screen items-center justify-center">
      <Formik<SigninFields> initialValues={{ username: '', password: '' }} onSubmit={submitHandler}>
        {({ values }) => (
          <Form className="flex flex-col gap-4 max-w-screen-md w-full">
            <h2>Login to your account</h2>

            <Field
              as={Input}
              name="username"
              label="Username"
              autoComplete="off"
              autoCapitalize="off"
            />
            <Field
              as={Input}
              name="password"
              type="text" // password
              label="Password"
              autoComplete="off"
              autoCapitalize="off"
            />

            <Button type="submit" color="primary" variant="flat">
              Login
            </Button>

            <Divider orientation="horizontal" />
            <Button href="/sign-in" color="primary" as={Link}>
              Create a new account!
            </Button>
          </Form>
        )}
      </Formik>
    </main>
  );
}
