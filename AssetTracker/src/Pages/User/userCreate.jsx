import React, { useState } from "react";
import { Box, Text, TextInput, Button, Stack, Paper } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserCreate = () => {
  const navigate = useNavigate();
const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
const createUserMutation = useMutation({
  mutationFn: (newUser) =>
    axios.post("http://localhost:3000/api/v1/auth/signup", {
      first_name: newUser.firstName,
      last_name: newUser.lastName,
      phone: newUser.phone,
      email: newUser.email,
      password: newUser.password,
    }),

  onSuccess: () => {
        queryClient.invalidateQueries(['users']); 
    notifications.show({
      title: "Success",
      message: "User created successfully!",
      color: "green",
    });
    navigate("/user");
  },

  onError: (error) => {
    notifications.show({
      title: "Error",
      message: error.response?.data?.error || "Something went wrong",
      color: "red",
    });
  },
});


  const handleSubmit = (e) => {
    e.preventDefault();
    createUserMutation.mutate(formData);
  };

  return (
    <Box style={{ maxWidth: 600, margin: "50px auto" }}>
      {" "}
      <Paper padding="xl" shadow="sm" radius="md">
        {" "}
        <Text size="xl" weight={700} mb="md">
          Create New User{" "}
        </Text>
        <form onSubmit={handleSubmit}>
          <Stack spacing="md">
            <TextInput
              label="First Name"
              name="firstName"
              placeholder="Enter first name"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            <TextInput
              label="Last Name"
              name="lastName"
              placeholder="Enter last name"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
            <TextInput
              label="Email"
              name="email"
              placeholder="Enter email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <TextInput
              label="Phone"
              name="phone"
              placeholder="Enter phone number"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
            />
            <TextInput
              label="Password"
              name="password"
              placeholder="Enter password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <Button
              type="submit"
              size="md"
              color="green"
              loading={createUserMutation.isLoading}
            >
              Create
            </Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
};

export default UserCreate;
