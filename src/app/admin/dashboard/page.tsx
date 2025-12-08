export default function Dashboard() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      {/* Add dashboard charts and KPIs here */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded shadow p-6">Total Votes: {/* fetch and display count */}</div>
        <div className="bg-white rounded shadow p-6">Total Contestants: {/* fetch and display count */}</div>
      </div>
      {/* Example chart component: <VoteChart data={data} /> */}
    </div>
  );
}
