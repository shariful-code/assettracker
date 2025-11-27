import React from "react";
import { TextInput, PasswordInput, Button, Paper, Title, Stack } from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { notifications } from '@mantine/notifications';
import axios from 'axios';

// -------------------- Validation Schema --------------------
const schema = Yup.object().shape({
  first_name: Yup.string().required("First name is required"),
  last_name: Yup.string().required("Last name is required"),
  phone: Yup.string()
    .required("Phone number is required")
    .matches(/^01\d{9}$/, "Enter a valid Bangladeshi phone number"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .matches(/[A-Z]/, "At least one uppercase letter required")
    .matches(/[a-z]/, "At least one lowercase letter required")
    .matches(/[0-9]/, "At least one number required")
    .matches(/[@$!%*?&]/, "At least one special character required")
    .min(8, "Password must be at least 8 characters")
    .max(16, "Password cannot exceed 16 characters"),
});

const Signup = () => {
  const form = useForm({
    initialValues: {
      first_name: "",
      last_name: "",
      phone: "",
      email: "",
      password: "",
    },
    validate: yupResolver(schema),
  });

  const signupMutation = useMutation({
    mutationFn: async (formData) => {
      const res = await axios.post("http://localhost:3000/api/v1/auth/signup", formData);
      return res.data;
    },
    onSuccess: (data) => {
      notifications.show({
        title: 'Success',
        message: data.message,
        color: 'green',
        autoClose: 3000,
      });
      form.reset();
    },
    onError: (err) => {
      notifications.show({
        title: 'Error',
        message: err.response?.data?.error || 'Signup failed. Try again!',
        color: 'red',
        autoClose: 3000,
      });
    }
  });

  const handleSubmit = () => {
    signupMutation.mutate(form.values);
  };

  return (
    <div style={{ width: "100%", display: "flex", justifyContent: "center", marginTop: 40 }}>
      <Paper shadow="md" radius="md" p="xl" withBorder style={{ width: 400 }}>
        <Title order={2} ta="center" mb="lg">
          Create an Account
        </Title>

        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            <TextInput
              label="First Name"
              placeholder="Enter first name"
              required
              {...form.getInputProps("first_name")}
            />
            <TextInput
              label="Last Name"
              placeholder="Enter last name"
              required
              {...form.getInputProps("last_name")}
            />
            <TextInput
              label="Phone Number"
              placeholder="01xxxxxxxxx"
              required
              {...form.getInputProps("phone")}
            />
            <TextInput
              label="Email Address"
              placeholder="example@gmail.com"
              required
              {...form.getInputProps("email")}
            />
            <PasswordInput
              label="Password"
              placeholder="Enter password"
              required
              {...form.getInputProps("password")}
            />
            <Button type="submit" fullWidth size="md" mt="md">
              Sign Up
            </Button>
          </Stack>
        </form>
      </Paper>
    </div>
  );
};

export default Signup;
