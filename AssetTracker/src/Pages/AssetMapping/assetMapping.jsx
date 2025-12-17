import React, { useRef, useState, useEffect } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getAllEmployeesApi } from "../../services/employee.js";
import { getAllAssetsApi } from "../../services/asset.js";
import { COLUMN_NAMES } from "./data.js";
import { Paper, Text, Select, Stack, Group, Button } from "@mantine/core";
import "../AssetMapping/assetMapping.css";
import { assignAssetsToEmployeeApi } from "../../services/assetMapping.js";
import { notifications } from "@mantine/notifications";
const ITEM_TYPE = "TASK";

/* ================= Employee Header ================= */
const EmployeeHeader = ({
  employees,
  selectedEmployeeId,
  setSelectedEmployeeId,
}) => (
  <Select
    data={employees.map((e) => ({ value: String(e.id), label: e.fullName }))}
    value={selectedEmployeeId}
    onChange={setSelectedEmployeeId}
    placeholder="Select Employee"
    searchable
    nothingFound="No employees"
  />
);

/* ================= Movable Item ================= */
const MovableItem = ({ id, name, index, column, moveCardHandler }) => {
  const ref = useRef(null);

  const [{ isOverCurrent }, drop] = useDrop({
    accept: ITEM_TYPE,
    collect: (monitor) => ({
      isOverCurrent: monitor.isOver({ shallow: true }),
    }),
    hover(item, monitor) {
      if (!ref.current || item.id === id) return;

      const dragIndex = item.index;
      const hoverIndex = index;
      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

      moveCardHandler(dragIndex, hoverIndex, item.column);
      item.index = hoverIndex;
      item.column = column;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ITEM_TYPE,
    item: { id, index, column },
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
  });

  drag(drop(ref));

  return (
    <Paper
      ref={ref}
      p="md"
      mb="sm"
      shadow="md"
      radius="md"
      withBorder
      className={`movable-item ${isOverCurrent ? "glow" : ""}`}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: "grab",
        backgroundColor: column === COLUMN_NAMES.ASSET ? "#d0ebff" : "#ffe3e3",
        textAlign: "center",
        transition: "all 0.2s",
      }}
    >
      {name}
    </Paper>
  );
};

/* ================= Column ================= */
const Column = ({ title, children, onDropItem, isActive }) => {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: ITEM_TYPE,
    drop: (item) => onDropItem(item, title),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const getBackground = () => {
    if (isOver) return canDrop ? "#b2f2bb" : "#ff8787";
    return isActive ? "#ffd8a8" : "#f8f9fa";
  };

  return (
    <Paper
      ref={drop}
      p="lg"
      shadow="xl"
      radius="md"
      withBorder
      style={{
        width: 350,
        height: 600, // fixed height
        backgroundColor: getBackground(),
        transition: "all 0.3s",
        overflowY: "auto", // enable vertical scroll
      }}
    >
      <Text weight={700} align="center" mb="md" size="lg">
        {title}
      </Text>
      {children}
    </Paper>
  );
};

/* ================= Main Component ================= */
const AssetMapping = () => {
  // ✅ Hooks always top-level
  const [items, setItems] = useState([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState("");

  const { data: empData, isLoading: empLoading } = useQuery({
    queryKey: ["employees"],
    queryFn: () => getAllEmployeesApi({ page: 1, perpage: 100, search: "" }),
  });

  const { data: assetData, isLoading: assetLoading } = useQuery({
    queryKey: ["assets"],
    queryFn: () => getAllAssetsApi({ page: 1, pageSize: 100, search: "" }),
  });

  const mutation = useMutation({
    mutationFn: ({ employeeId, assetIds }) =>
      assignAssetsToEmployeeApi({ employeeId, assetIds }),
    onSuccess: () => {
      notifications.show({
        title: "Assign to Employee",
        message: "Asset assign successfully!",
        position: "top-center",
      });
    },
    onError: (error) => {
      notifications.show({
        title: "Assign to Employee",
        message: error.message,
        position: "top-center",
      });
    },
  });

  // Computed variables
  const employees = empData?.data?.employees || [];
  const assets = assetData?.data?.assets || [];
  const selectedEmployee = employees.find(
    (e) => String(e.id) === String(selectedEmployeeId)
  );

  // Populate items from assets
  useEffect(() => {
    if (assets.length) {
      const formattedAssets = assets.map((a) => ({
        id: a.id,
        name: a.name || a.title || `Asset ${a.id}`,
        column: a.employeeId ? COLUMN_NAMES.EMPLOYEE : COLUMN_NAMES.ASSET,
        employeeId: a.employeeId || null,
      }));
      setItems(formattedAssets);
    }
  }, [assets]);

  // Conditional render after hooks
  if (empLoading || assetLoading) return <div>Loading...</div>;

  /* reorder within a column */
  const moveCardHandler = (fromIndex, toIndex, column) => {
    setItems((prev) => {
      const columnItems = prev.filter((i) => i.column === column);
      const dragItem = columnItems[fromIndex];
      if (!dragItem) return prev;

      const updatedColumnItems = [...columnItems];
      updatedColumnItems.splice(fromIndex, 1);
      updatedColumnItems.splice(toIndex, 0, dragItem);

      return prev.map((i) =>
        i.column === column ? updatedColumnItems.shift() || i : i
      );
    });
  };

  /* change column */
  const changeItemColumn = (itemId, newColumn, employeeId = null) => {
    setItems((prev) =>
      prev.map((i) =>
        i.id === itemId ? { ...i, column: newColumn, employeeId } : i
      )
    );
  };

  const handleDropToColumn = (item, columnTitle) => {
    if (columnTitle === COLUMN_NAMES.EMPLOYEE) {
      if (!selectedEmployeeId) {
        notifications.show({
          title: "Alert",
          message: "Select Employee First",
          position: "top-center",
        });
        return;
      }
      changeItemColumn(item.id, COLUMN_NAMES.EMPLOYEE, selectedEmployeeId);
    } else {
      changeItemColumn(item.id, COLUMN_NAMES.ASSET, null);
    }
  };

  const renderItems = (column) =>
    items
      .filter((i) => i.column === column)
      .map((item, index) => (
        <MovableItem
          key={item.id}
          id={item.id}
          name={item.name}
          index={index}
          column={column}
          moveCardHandler={moveCardHandler}
        />
      ));

  const employeeHasAssets = items.some(
    (i) => i.column === COLUMN_NAMES.EMPLOYEE
  );

  const handleAssignClick = () => {
    if (!selectedEmployeeId) {
      notifications.show({
        title: "Alert",
        message: "Select Employee First",
        position: "top-center",
      });
      return;
    }
    const assetIds = items
      .filter((i) => i.column === COLUMN_NAMES.EMPLOYEE)
      .map((i) => i.id);
    if (!assetIds.length) {
      notifications.show({
        title: "Alert",
        message: "No asset assign to Emoloyee",
        position: "top-center",
      });
      return;
    }
    mutation.mutate({ employeeId: Number(selectedEmployeeId), assetIds });
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Group align="flex-start" spacing="xl" position="center" mt="xl">
        <Column title={COLUMN_NAMES.ASSET} onDropItem={handleDropToColumn}>
          {renderItems(COLUMN_NAMES.ASSET)}
        </Column>

        <Column
          title={COLUMN_NAMES.EMPLOYEE}
          onDropItem={handleDropToColumn}
          isActive={employeeHasAssets}
        >
          <Stack mb="sm">
            <Text weight={700} align="center">
              Employee
            </Text>
            <EmployeeHeader
              employees={employees}
              selectedEmployeeId={selectedEmployeeId}
              setSelectedEmployeeId={setSelectedEmployeeId}
            />
            {selectedEmployee && (
              <Text size="sm" color="dimmed" align="center">
                Assigned to: <b>{selectedEmployee.fullName}</b>
              </Text>
            )}

            <Button
              fullWidth
              mt="sm"
              color="blue"
              onClick={handleAssignClick}
              loading={mutation.isLoading}
            >
              Assign Assets
            </Button>
          </Stack>

          {renderItems(COLUMN_NAMES.EMPLOYEE)}
        </Column>
      </Group>
    </DndProvider>
  );
};

export default AssetMapping;
