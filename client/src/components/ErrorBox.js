const ErrorBox = ({ error }) => {
  if (!error) return null;

  return (
    <div className="rounded-md bg-red-50 border border-red-200 p-4 text-red-700">
      <p className="font-medium">Something went wrong</p>
      <p className="text-sm mt-1">
        {error?.response?.data?.message || error.message || 'Unknown error'}
      </p>
    </div>
  );
};

export default ErrorBox;
