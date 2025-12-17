// EmployeeColumn.jsx
import { useDrop } from "react-dnd";
const EmployeeColumn = ({
  selectedEmployee,
  setSelectedEmployee,
  onAssign,
}) => {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: "ASSET",
    canDrop: () => !!selectedEmployee,
    drop: (item) => {
      onAssign(item.assetId, selectedEmployee);
    },
  });

  return (
    <div
      ref={drop}
      className="column in-progress-column"
      style={{
        backgroundColor: isOver
          ? canDrop
            ? "rgb(188,251,255)"
            : "rgb(255,188,188)"
          : "",
      }}
    >
      <p>Employee</p>

      <select onChange={(e) => setSelectedEmployee(e.target.value)}>
        <option value="">Select employee</option>
        <option value="e1">Rahim</option>
        <option value="e2">Karim</option>
      </select>
    </div>
  );
};

export default EmployeeColumn;
