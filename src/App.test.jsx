import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { expect, test } from "vitest";
import App from "./App";

//測試一
// test("簡易測試", () => {
//   render(<App />);

//   const input = screen.getByPlaceholderText("Enter command...");

//   // 使用輸入的參數來模擬textarea內容改變、按下Enter鍵的事件
//   const executeCommand = (command) => {
//     fireEvent.change(input, { target: { value: command } });
//     fireEvent.keyDown(input, { key: "Enter", code: "Enter" });
//   };

//   // 按照順序執行指令
//   executeCommand("CREATE fruits");
//   executeCommand("CREATE vegetables");
//   executeCommand("CREATE grains");
//   executeCommand("CREATE fruits/apples");
//   executeCommand("CREATE fruits/apples/fuji");
//   executeCommand("LIST");

//   // 確認輸出結果中有指定的文字
//   expect(screen.getByText("fruits")).toBeInTheDocument();
//   expect(screen.getByText("vegetables")).toBeInTheDocument();
//   expect(screen.getByText("grains")).toBeInTheDocument();
//   expect(screen.getByText("apples")).toBeInTheDocument();
//   expect(screen.getByText("fuji")).toBeInTheDocument();

//   // Capture and verify multi-line response
//   const output = screen.getByText(/LIST/).textContent;
//   const lines = output.split("\n");
//   expect(lines).toContain("fruits");
//   expect(lines).toContain("vegetables");
//   expect(lines).toContain("grains");
//   expect(lines).toContain("fruits/apples");
//   expect(lines).toContain("fruits/apples/fuji");
// });

//測試pdf文件指令範例
test("測試pdf文件指令範例", () => {
  render(<App />);

  const input = screen.getByPlaceholderText("Enter command...");

  const executeCommand = (command) => {
    fireEvent.change(input, { target: { value: command } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });
  };

  // 按照順序執行指令
  executeCommand("CREATE fruits");
  executeCommand("CREATE vegetables");
  executeCommand("CREATE grains");
  executeCommand("CREATE fruits/apples");
  executeCommand("CREATE fruits/apples/fuji");
  executeCommand("LIST");
  executeCommand("CREATE grains/squash");
  executeCommand("MOVE grains/squash vegetables");
  executeCommand("CREATE foods");
  executeCommand("MOVE grains foods");
  executeCommand("MOVE fruits foods");
  executeCommand("MOVE vegetables foods");
  executeCommand("LIST");
  executeCommand("DELETE fruits/apples");
  executeCommand("DELETE foods/fruits/apples");
  executeCommand("LIST");

  // 確認輸出結果中有指定的文字
  expect(screen.getByText("CREATE fruits")).toBeInTheDocument();
  expect(screen.getByText("CREATE vegetables")).toBeInTheDocument();
  expect(screen.getByText("CREATE grains")).toBeInTheDocument();
  expect(screen.getByText("CREATE fruits/apples")).toBeInTheDocument();
  expect(screen.getByText("CREATE fruits/apples/fuji")).toBeInTheDocument();
  // LIST
  expect(screen.getByText("CREATE grains/squash")).toBeInTheDocument();
  expect(screen.getByText("MOVE grains/squash vegetables")).toBeInTheDocument();
  expect(screen.getByText("CREATE foods")).toBeInTheDocument();
  expect(screen.getByText("MOVE grains foods")).toBeInTheDocument();
  expect(screen.getByText("MOVE fruits foods")).toBeInTheDocument();
  expect(screen.getByText("MOVE vegetables foods")).toBeInTheDocument();
  // LIST
  expect(screen.getByText("DELETE fruits/apples")).toBeInTheDocument();
  expect(screen.getByText("Cannot delete fruits/apples - fruits does not exist")).toBeInTheDocument();
  expect(screen.getByText("DELETE foods/fruits/apples")).toBeInTheDocument();
  // LIST
  

  // Capture and verify multi-line response
  const output = screen.getByText(/LIST/).textContent;
  const lines = output.split("\n");
  expect(lines).toContain("fruits");
  expect(lines).toContain("vegetables");
  expect(lines).toContain("grains");
  expect(lines).toContain("foods");
  expect(lines).not.toContain("apples");
  expect(lines).not.toContain("fuji");
  expect(lines).not.toContain("squash");
});

