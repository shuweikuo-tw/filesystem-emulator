const DirectoryTree = ({ structure }) => {
  const renderTree = (node, path = "") => {
    return Object.keys(node).map((key) => {
      const currentPath = path ? `${path}/${key}` : key;
      return (
        <div key={currentPath} style={{ marginLeft: "20px" }}>
          {key}
          {Object.keys(node[key]).length > 0 && renderTree(node[key], currentPath)}
        </div>
      );
    });
  };

  return <div>{renderTree(structure)}</div>;
};

export default DirectoryTree;