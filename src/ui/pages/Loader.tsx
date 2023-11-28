function Loader() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-6">
      <div className="inline-block h-36 w-36 animate-spin rounded-full border-r-4 border-t-4 border-solid border-r-white border-t-black"></div>
      <h3 className="text-3xl font-medium">League Client</h3>
    </div>
  );
}

export default Loader;
