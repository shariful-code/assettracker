// src/pages/User.jsx
import React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Table,
  ScrollArea,
  Loader,
  Center,
  Button,
  Group,
  Text,
  Flex,
  Box,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { deleteUserApi, GetUserApi } from "../../services/user";

const User = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Mutation for deleting user
  const mutation = useMutation({
    mutationFn: (id) => deleteUserApi(id),
    onSuccess: () => queryClient.invalidateQueries(["users"]),
    onError: (err) => console.error(err),
  });

  // Fetch users
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["users"],
    queryFn: GetUserApi,
    staleTime: 1000 * 60,
  });

  if (isLoading) {
    return (
      <Center style={{ height: "100vh" }}>
        <Loader variant="dots" />
      </Center>
    );
  }

  if (isError) {
    return <Text color="red">{error.message}</Text>;
  }

  const rows = data?.map((user) => (
    <tr key={user.id} style={{ border: "1px solid #e0e0e0" }}>
      <td style={{ padding: "12px 16px" }}>{user.id}</td>
      <td style={{ padding: "12px 16px" }}>{`${user.firstName} ${user.lastName}`}</td>
      <td style={{ padding: "12px 16px" }}>{user.email}</td>
      <td style={{ padding: "12px 16px" }}>{user.phone || "N/A"}</td>
      <td style={{ padding: "12px 16px" }}>
        <Group spacing="xs" position="center">
          <Button
            size="xs"
            onClick={() => navigate(`/user/edit/${user.id}`, { state: user })}
            style={{
              backgroundColor: "#3b82f6",
              color: "#ffffff",
              borderRadius: 8,
              padding: "6px 12px",
              fontWeight: 500,
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#2563eb")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#3b82f6")}
          >
            Edit
          </Button>

          <Button
            size="xs"
            onClick={() => mutation.mutate(user.id)}
            style={{
              backgroundColor: "#ef4444",
              color: "#ffffff",
              borderRadius: 8,
              padding: "6px 12px",
              fontWeight: 500,
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#dc2626")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#ef4444")}
          >
            Delete
          </Button>
        </Group>
      </td>
    </tr>
  ));

 return (
  <Box p="md" style={{ backgroundColor: "#a08686ff",  }}>
    {/* Header */}
    <Flex justify="space-between" mb="md">
      <Text fw={700} size="xl" color="#0f4794ff">
        Users
      </Text>
      <Button
        color="#0f4794ff"
        onClick={() => navigate("/user/create")}
        variant="filled"
      >
        Create User
      </Button>
    </Flex>

    {/* Full-width table */}
    <Box w="100%">
     
        <Table w="100%" style={{ width: "100%" }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
         <tbody>{rows}</tbody>
        </Table>
      
    </Box>
  </Box>
);

};

export default User;
