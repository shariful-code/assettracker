// src/pages/UserEdit.jsx
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { TextInput, Button, Box, Stack } from '@mantine/core';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateUserApi } from '../../services/user';

const userEdit = () => {
  const navigate = useNavigate();
  const { state } = useLocation(); // get user data from navigation state
  const { id } = useParams();
  const queryClient = useQueryClient(); // ← define it here

  // Initialize form fields with state data or empty
  const [firstName, setFirstName] = useState(state?.firstName || '');
  const [lastName, setLastName] = useState(state?.lastName || '');
  const [email, setEmail] = useState(state?.email || '');
  const [phone, setPhone] = useState(state?.phone || '');

 
  // TanStack Mutation
const mutation = useMutation({
  mutationFn: (userData) => updateUserApi({ id, data: userData }),
  onSuccess: () => {
    // Refetch / invalidate the users query
    queryClient.invalidateQueries(['users']); 
    navigate('/user'); // go back to user list
  },
  onError: (error) => {
    console.error('Failed to update user:', error);
  },
});

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({ firstName, lastName, email, phone });
  };
  return (
    <Box mx="auto" mt="md" style={{ maxWidth: 500 }}>
      <form onSubmit={handleSubmit}>
        <Stack>
          <TextInput
            label="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <TextInput
            label="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          <TextInput
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextInput
            label="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <Button type="submit" color="green">
            Update User
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default userEdit;
