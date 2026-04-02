import Logo from "@/components/shared/Logo";

const Loading = () => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="flex flex-col gap-3">
        <div className="animate-bounce">
          <Logo className="h-28" />
        </div>
      </div>
    </div>
  );
};

export default Loading;
