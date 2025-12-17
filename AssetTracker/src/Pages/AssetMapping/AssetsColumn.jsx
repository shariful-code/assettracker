// AssetsColumn.jsx
import AssetItem from "../AssetMapping/AssetItem";
const AssetsColumn = ({ assets }) => {
  return (
    <div className="column do-it-column">
      <p>Assets</p>

      {assets
        .filter((a) => a.employeeId === null)
        .map((asset) => (
          <AssetItem key={asset.id} asset={asset} />
        ))}
    </div>
  );
};

export default AssetsColumn;
