export const getStatusBadge = (status: string | null) => {
  if (!status) {
    return null;
  }
  switch (status.toLowerCase()) {
    case "new":
      return (
        <span className="px-2 py-1 text-xs rounded bg-blue-100 text-blue-600">
          New
        </span>
      );
    case "in process":
      return (
        <span className="px-2 py-1 text-xs rounded bg-yellow-100 text-yellow-600">
          In Process
        </span>
      );
    case "hold":
      return (
        <span className="px-2 py-1 text-xs rounded bg-orange-100 text-orange-600">
          Hold
        </span>
      );
    case "resolved":
      return (
        <span className="px-2 py-1 text-xs rounded bg-green-100 text-green-600">
          Resolved
        </span>
      );
    default:
      return (
        <span className="px-2 py-1 text-xs rounded bg-gray-100 text-gray-600">
          {status}
        </span>
      );
  }
};