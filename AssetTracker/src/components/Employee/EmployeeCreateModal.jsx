import React from "react";
import { Modal, Button, TextInput, Select, Stack } from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import * as Yup from "yup";
import { notifications } from "@mantine/notifications";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { createEmployeeApi } from "../../services/employee.js";
import { getAllDepartmentsApi } from "../../services/department.js";

// Yup validation
const schema = Yup.object().shape({
  fullName: Yup.string().required("Full name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string(),
  designation: Yup.string(),
  status: Yup.string().required("Status is required"),
  departmentId: Yup.string().nullable(),
});

const EmployeeCreateModal = ({ opened, onClose, onSuccess }) => {
  const queryClient = useQueryClient();

  // ✓ Correct React Query v5 usage
  const { data, isLoading } = useQuery({
    queryKey: ["departments", 1, ""],
    queryFn: () =>
      getAllDepartmentsApi({
        page: 1,
        pageSize: 1000,
        search: "",
      }),
  });

  // ✓ Correct extraction
  const departments = data?.data?.departments || [];

  const form = useForm({
    initialValues: {
      fullName: "",
      email: "",
      phone: "",
      designation: "",
      status: "active",
      departmentId: null,
    },
    validate: yupResolver(schema),
  });

  const mutation = useMutation({
    mutationFn: (values) => createEmployeeApi(values),
    onSuccess: (res) => {
      if (res?.success) {
        notifications.show({
          title: "Success",
          message: res.message || "Employee created successfully",
          position: "top-center",
        });

        form.reset();
        onClose();
        queryClient.invalidateQueries(["employees"]);
        if (onSuccess) onSuccess();
      } else {
        notifications.show({
          title: "Failed",
          message: res.message || "Employee already exists",
          position: "top-center",
        });
      }
    },
    onError: (error) => {
      notifications.show({
        title: "Error",
        message: error?.message || "Something went wrong",
        position: "top-center",
      });
    },
  });

  const handleSubmit = (values) => {
    mutation.mutate(values);
  };

  return (
    <Modal opened={opened} onClose={onClose} title="Create Employee" centered>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <TextInput label="Full Name" {...form.getInputProps("fullName")} />
          <TextInput label="Email" {...form.getInputProps("email")} />
          <TextInput label="Phone" {...form.getInputProps("phone")} />
          <TextInput
            label="Designation"
            {...form.getInputProps("designation")}
          />

          <Select
            label="Department"
            placeholder="Select Department"
            data={departments.map((d) => ({
              value: d.id.toString(),
              label: d.name,
            }))}
            {...form.getInputProps("departmentId")}
          />

          <Button type="submit" loading={mutation.isPending}>
            {mutation.isPending ? "Creating..." : "Update"}
          </Button>
        </Stack>
      </form>
    </Modal>
  );
};

export default EmployeeCreateModal;
