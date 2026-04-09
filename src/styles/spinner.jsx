const Spinner = () => {
  return (
    <div className="inline-flex items-end gap-[6px] h-[90px]">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="w-[14px] h-full bg-blue-500 animate-bar rounded-md bg-gradient-to-t from-blue-400 to-blue-600"
          style={{
            animationDelay: `${-1.1 + i * 0.1}s`,
          }}
        />
      ))}
    </div>
  );
};

export default Spinner;
