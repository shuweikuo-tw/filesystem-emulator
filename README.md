# 銀色大門工程師面試居家挑戰項目

以單頁應用程式（Single Page App）、命令列腳本（Command Line Script）或可執行檔的形式提交您的解決方案。

在此挑戰中，您將實作指令，讓使用者能夠建立、移動和刪除目錄。成功的解決方案應能處理以下輸入：
<details>
  <summary>點擊toggle測試指令範例</summary>

  ```plaintext
  CREATE fruits
  CREATE vegetables
  CREATE grains
  CREATE fruits/apples
  CREATE fruits/apples/fuji
  LIST
  CREATE grains/squash
  MOVE grains/squash vegetables
  CREATE foods
  MOVE grains foods
  MOVE fruits foods
  MOVE vegetables foods
  LIST
  DELETE fruits/apples
  DELETE foods/fruits/apples
  LIST
  ```
</details>

期望的輸出如下:
<details>
  <summary>點擊toggle測試範例期望輸出</summary>

  ```plaintext
  CREATE fruits
  CREATE vegetables
  CREATE grains
  CREATE fruits/apples
  CREATE fruits/apples/fuji
  LIST
  fruits
    apples
      fuji
  grains
  vegetables
  CREATE grains/squash
  MOVE grains/squash vegetables
  CREATE foods
  MOVE grains foods
  MOVE fruits foods
  MOVE vegetables foods
  LIST
  foods
    fruits
      apples
        fuji
    grains
    vegetables
      squash
  DELETE fruits/apples
  Cannot delete fruits/apples - fruits does not exist
  DELETE foods/fruits/apples
  LIST
  foods
    fruits
    grains
    vegetables
      squash
  ```
</details>

## 如何開始

1. 安裝模組：
   ```bash
   npm install
   ```
   跑開發用伺服器：
   ```bash
   npm run dev
   ```
2. 打包專案：
   ```bash
   npm run build
   ```
3. 預覽打包結果：
   ```bash
   npm run preview
   ```

## 測試指令

使用vitest測試pdf指令範例

- 執行測試：
  ```bash
  npm run test
  ```
- 監聽模式下執行測試：
  ```bash
  npm run test:watch
  ```
- 產生測試覆蓋率報告：
  ```bash
  npm run test:coverage
  ```

## 注意事項

- 如果你需要自訂 ESLint 規則，可以修改 `eslint.config.js`。
- 本專案已經設定 `.gitignore`，確保不會將不必要的檔案提交到版本控制系統。

希望你能享受使用這個範本開發 React 應用程式的過程！如果有任何問題，歡迎提出建議或回饋。
