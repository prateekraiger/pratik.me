import { FloatingPathsBackground } from "@/components/ui/floating-paths";

export default function FloatingPathsBackgroundExample() {
  return (
    <FloatingPathsBackground
      className="aspect-16/9 flex items-center justify-center"
      position={-1}
    >
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-4">
          Floating Paths Demo
        </h2>
        <p className="text-gray-300">Beautiful animated background paths</p>
      </div>
    </FloatingPathsBackground>
  );
}
