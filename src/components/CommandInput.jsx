import { useState } from "react";

const CommandInput = ({ executeCommand }) => {
  const [command, setCommand] = useState("");

  const handleExecute = () => {
    const commandInput = document.getElementById("command-input");
    // 用`focus`讓每一次送出指令後都可以馬上輸入下一個指令。
    commandInput.focus();

    // 去掉頭尾的空白字元後如果還有指令，就執行指令。
    // 執行完指令後清空指令欄。
    if (command.trim()) {
      executeCommand(command);
      setCommand("");
    }
  };

  return (
    <div className="command-input">
      <div>/&#36; </div>
      <textarea
        id="command-input"
        type="text"
        value={command}
        placeholder="Enter command..."
        rows={1}
        onChange={(e) => setCommand(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleExecute()}
        autoFocus
      />
    </div>
  );
};

export default CommandInput;