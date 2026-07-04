import WorkspaceLayout from "./components/layout/AppLayout";

function App() {
  return (
    <WorkspaceLayout>
      <div className="text-white">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p>TaskFlow is rendering 🎉</p>
      </div>
    </WorkspaceLayout>
  );
}

export default App;