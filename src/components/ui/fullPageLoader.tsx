export const FullPageLoader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/70">
      <div
        className="w-12.5 aspect-square p-2 rounded-full bg-gray-400 animate-[l3_1s_linear_infinite]"
        style={{
          WebkitMask:
            "conic-gradient(#0000 10%, #000), linear-gradient(#000 0 0) content-box",
          mask: "conic-gradient(#0000 10%, #000), linear-gradient(#000 0 0) content-box",
          WebkitMaskComposite: "source-out",
          maskComposite: "subtract",
        }}
      />
    </div>
  );
};
