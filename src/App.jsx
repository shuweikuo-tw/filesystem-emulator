import { useState } from "react";
import CommandInput from "./components/CommandInput";
import DirectoryTree from "./components/DirectoryTree";
import { createDirectory, moveDirectory, deleteDirectory, listDirectories } from "./utils/directoryUtils";
import "./App.css"; // Import CSS for layout styling

const App = () => {
  const [structure, setStructure] = useState({});
  const [output, setOutput] = useState([]);

  const executeCommand = (command) => {
    // 把頭尾的空白字元去掉再用空白字元分割字串。
    const parts = command.trim().split(/\s+/);
    if (parts.length < 1) return;

    // parts陣列的index 0 是指令(變數action)，`toLowerCase` 允許指令不分大小寫，其餘是參數。
    const action = parts[0].toLowerCase();
    const path = parts.slice(1).join(" ");

    // 這個newStructure是sturcture的shallow copy，藉此確保不會被structure的變更影響。
    let newStructure = { ...structure };
    let newOutput = [];

    // 根據action來執行個別的動作，
    switch (action) {
      case "create":
        newStructure = createDirectory(newStructure, path);
        newOutput.push(`CREATE ${path}`);
        break;
      case "move": {
        {
          // `move` 有兩個參數要處理，因此需要把`path`再一次分割。
          const [src, dest] = path.split(" ");
          if (!src || !dest) {
            newOutput.push("Invalid MOVE syntax. Use MOVE <source> <destination>");
            break;
          }
          newStructure = moveDirectory(newStructure, src, dest);
          newOutput.push(`MOVE ${src} ${dest}`);
        }
        break;
      }
      case "delete": {
        const result = deleteDirectory(newStructure, path);
        if (result.error) {
          //newOutput.push(`DELETE ${path}`);
          newOutput.push(result.error);
        } else {
          newStructure = result.structure;
          newOutput.push(`DELETE ${path}`);
        }
        break;
      }
      case "list":
        newOutput.push("LIST");
        newOutput.push(listDirectories(newStructure));
        break;
      default:
        newOutput.push("Unknown command. Supported commands are:");
        newOutput.push("CREATE <dir> - Create a directory (e.g., CREATE fruits)");
        newOutput.push("MOVE <source> <dest> - Move a directory (e.g., MOVE fruits apples)");
        newOutput.push("DELETE <dir> - Delete a directory (e.g., DELETE fruits/apples)");
        newOutput.push("LIST - Show the directory structure");
    }

    setStructure(newStructure);
    setOutput((prev) => [...prev, `/$ ${command}`, ...newOutput]);
  };

  return (
    <div className="app-container">
      <div className="left-panel">
        <DirectoryTree structure={structure} />
      </div>
      <div className="right-panel">
        <div className="output-section">
          <h3>Supported Commands:</h3>
          <ul style={{ fontSize: "14px", lineHeight: "1.5" }}>
            <li><strong>CREATE &lt;dir&gt;</strong> - Create a directory (e.g., <code>CREATE fruits</code>)</li>
            <li><strong>MOVE &lt;source&gt; &lt;dest&gt;</strong> - Move a directory (e.g., <code>MOVE fruits apples</code>)</li>
            <li><strong>DELETE &lt;dir&gt;</strong> - Delete a directory (e.g., <code>DELETE fruits/apples</code>)</li>
            <li><strong>LIST</strong> - Show the directory structure</li>
          </ul>
          {/* 這邊用`pre`呈現資料結構的上下階層 */}
          <pre>{output.join("\n")}</pre>
          <CommandInput executeCommand={executeCommand} />
        </div>
      </div>
    </div>
  );
};

export default App;