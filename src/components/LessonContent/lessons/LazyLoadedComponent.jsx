function LazyLoadedComponent() {
  return (
    <div className="mt-4 p-4 bg-green-50 rounded border-2 border-green-300">
      <h3 className="font-semibold text-green-900 mb-2">✅ Lazy Component Loaded!</h3>
      <p className="text-sm text-green-800">
        This component was loaded on demand using React.lazy()
      </p>
    </div>
  );
}

export default LazyLoadedComponent;

