import { CenteredLoadingOrb } from "@/components/LoadingOrb";

export default function PageLoader() {
  return (
    <CenteredLoadingOrb
      state="connecting"
      label="Loading page"
      className="bg-[hsl(210_25%_96%)]"
      minHeightClassName="min-h-[50vh]"
    />
  );
}
