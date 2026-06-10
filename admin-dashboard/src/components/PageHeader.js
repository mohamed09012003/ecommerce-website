export default function PageHeader({ title, description, buttonText }) {
  return (
    <section className="rounded-3xl bg-white/90 p-6 shadow-sm shadow-slate-800/5 backdrop-blur sm:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
            {title}
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
            {description}
          </p>
        </div>
        <button className="inline-flex h-12 items-center justify-center rounded-2xl bg-slate-950 px-5 text-sm font-semibold text-white transition hover:bg-slate-800 whitespace-nowrap">
          {buttonText}
        </button>
      </div>
    </section>
  );
}
