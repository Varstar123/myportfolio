/**
 * Decorative, non-interactive background layer: faint grid + drifting
 * gradient orbs. Pure CSS animation so it can stay a server component.
 */
export default function AnimatedBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* Faint blueprint grid, faded toward the edges */}
      <div className="absolute inset-0 bg-grid-fade bg-[size:64px_64px] opacity-50 [mask-image:radial-gradient(ellipse_at_center,#000_25%,transparent_72%)]" />

      {/* Drifting color orbs */}
      <div className="absolute -top-40 right-[-10%] h-[34rem] w-[34rem] animate-float-slow rounded-full bg-brand-600/20 blur-[120px]" />
      <div className="absolute left-[-15%] top-1/3 h-[30rem] w-[30rem] animate-float rounded-full bg-accent-cyan/10 blur-[120px]" />
      <div className="absolute bottom-[-12%] left-1/3 h-[28rem] w-[28rem] animate-float-slow rounded-full bg-accent-violet/12 blur-[130px]" />

      {/* Subtle top vignette so the navbar always has contrast */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-background to-transparent" />
    </div>
  );
}
