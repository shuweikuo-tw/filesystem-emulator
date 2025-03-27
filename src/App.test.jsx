import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, expect, test } from "vitest";
import App from "./App";

describe("App", () => {

  //Execute each command from the array in order, and validate the output.
  test("inOrder", () => {
    render(<App />);

    // 找尋輸入框為placeholder為"Enter command..."的element.
    const input = screen.getByPlaceholderText("Enter command...");

    // 使用輸入的參數來模擬textarea內容改變、按下Enter鍵的事件
    const executeCommand = (command) => {
      fireEvent.change(input, { target: { value: command } });
      fireEvent.keyDown(input, { key: "Enter", code: "Enter" });
    };

    // get the pre element.
    const preElement = document.getElementsByTagName("pre")[0];
    // sequence of commands to be executed.
    const commandList = [
      "CREATE fruits",
      "CREATE vegetables",
      "CREATE grains",
      "CREATE fruits/apples",
      "CREATE fruits/apples/fuji",
      // "LIST",
      "CREATE grains/squash",
      "MOVE grains/squash vegetables",
      "CREATE foods",
      "MOVE grains foods",
      "MOVE fruits foods",
      "MOVE vegetables foods",
      // "LIST",
      "DELETE fruits/apples",
      "DELETE foods/fruits/apples",
      // "LIST"
    ];
    const responseList = [
      "CREATE fruits",
      "CREATE vegetables",
      "CREATE grains",
      "CREATE fruits/apples",
      "CREATE fruits/apples/fuji",
      "CREATE grains/squash",
      "MOVE grains/squash vegetables",
      "CREATE foods",
      "MOVE grains foods",
      "MOVE fruits foods",
      "MOVE vegetables foods",
      // "fruits",
      // "vegetables",
      // "grains",
      // "foods",
      "Cannot delete fruits/apples - fruits does not exist",
      "DELETE foods/fruits/apples",
    ];

    // preText 表示預期的結果，還沒執行前為空字串
    let preText = "";
    commandList.forEach((command, index) => {
      executeCommand(command);
      // 每次執行完command後，preText會加上responseList[index]的內容
      preText += index === 0? `${responseList[index]}`: ` ${responseList[index]}`;

      // 每次執行完command後，preElement的內容應該要是preText
      expect(preElement).toHaveTextContent(`${preText}`);
    });
  });
});