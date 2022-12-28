import ReactFilterBar, { FilterType } from "react-filter-bar";

function App() {
  return (
    <div className="App">
      <ReactFilterBar
        filterSetting={[{
          key: "user.id",
          text: "Id",
          type: FilterType.inputEq,
        }, {
          key: "user.name",
          text: "名稱",
        }, {
          key: "user.email",
          text: "email",
        }, {
          key: "user.status",
          text: "狀態",
          type: FilterType.dropdown,
          options: [
            { text: '正常', value: 1 },
            { text: '凍結', value: -1 },
            { text: '刪除', value: -99 }
          ]
        }]}
        onFilterUpdate={() => { }}
      />
    </div>
  );
}

export default App;
