export function Poster() {
  return (
    <div className="absolute inset-0 grid place-items-center">
      <div className="relative size-[78%]">
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-coral via-pink to-violet opacity-70 blur-3xl" />
        <div className="absolute inset-[8%] rounded-full bg-gradient-to-tr from-violet via-pink to-coral opacity-95" />
        <div className="absolute inset-[30%] rounded-full bg-cream/25 blur-md" />
      </div>
    </div>
  );
}
