'use client';
import { Input } from '@heroui/input';
import { Button } from '@heroui/button';
import Link from 'next/link';
import { Divider } from '@heroui/react';
import { Field, Form, Formik } from 'formik';
import { api } from '@/_lib/axios';
import { useRouter } from 'next/navigation';

type SignupFields = {
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  password: string;
  passwordConfirmation: string;
};

export default function SignUpPage() {
  const router = useRouter();

  const submitHandler = async (values: SignupFields) => {
    console.log('values :::', values);
    try {
      const { status } = await api.post('/api/auth/signup', values);

      if (status === 201) {
        router.push('/login');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="flex w-screen h-screen items-center justify-center">
      <Formik<SignupFields>
        initialValues={{
          email: '',
          firstName: '',
          lastName: '',
          password: '',
          passwordConfirmation: '',
          username: '',
        }}
        onSubmit={submitHandler}
      >
        {({ values }) => (
          <Form className="flex flex-col gap-4 max-w-screen-md w-full">
            <h2>Create your account below</h2>

            <Field
              as={Input}
              name="firstName"
              label="First name"
              autoComplete="off"
              autoCapitalize="off"
            />
            <Field
              as={Input}
              name="lastName"
              label="Last name"
              autoComplete="off"
              autoCapitalize="off"
            />
            <Field
              as={Input}
              name="username"
              label="Username"
              autoComplete="off"
              autoCapitalize="off"
            />

            <Field
              as={Input}
              name="email"
              type="email"
              label="Email"
              autoComplete="off"
              autoCapitalize="off"
            />
            <Field
              as={Input}
              name="password"
              type="text"
              label="Password"
              autoComplete="off"
              autoCapitalize="off"
            />
            <Field
              as={Input}
              name="passwordConfirmation"
              type="text"
              label="Confirm the password"
              autoComplete="off"
              autoCapitalize="off"
            />

            <Button type="submit" color="primary" variant="flat">
              Sign in
            </Button>

            <Divider orientation="horizontal" />
            <Button href="/login" color="primary" as={Link}>
              Log in to your account
            </Button>
          </Form>
        )}
      </Formik>
    </main>
  );
}
