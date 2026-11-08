import BeforeAfter from "@/components/fx/BeforeAfter";
import { H2 } from "@/components/ui";

export default function BeforeAfterSection() {
  return (
    <section id="before-after" className="mx-auto box-border flex min-h-screen w-full max-w-[1280px] flex-col items-center justify-center gap-7 px-6 pt-24 pb-10">
      <div className="flex flex-col items-center gap-3 text-center">
        <H2 className="max-w-[20ch] !leading-[1.08]">
          From AI template to a site people <span className="text-brand">remember.</span>
        </H2>
        <p className="m-0 text-[15px] leading-normal text-mute">
          Keep scrolling: the copy-paste AI look every competitor already has turns into the same content, designed with intent.
        </p>
      </div>
      <div className="w-full max-w-[1120px]">
        <BeforeAfter defaultPosition={50} />
      </div>
    </section>
  );
}
