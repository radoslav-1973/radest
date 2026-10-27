import { useEffect, useRef } from "react";

type ValidationWarningsModalProps = {
  warnings: string[];
};

export default function ValidationWarningsModal({
  warnings,
}: ValidationWarningsModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) return;

    if (warnings.length > 0 && !dialog.open) {
      dialog.showModal();
    }
  }, [warnings]);

  function closeModal() {
    dialogRef.current?.close();
  }

  if (warnings.length === 0) {
    return null;
  }

  return (
    <dialog
  ref={dialogRef}
  aria-labelledby="validation-warnings-title"
  className="fixed inset-0 m-auto h-fit w-[calc(100%-2rem)] max-w-lg rounded-2xl border border-amber-200 bg-white p-0 text-slate-900 shadow-2xl backdrop:bg-slate-900/50 dark:border-amber-500/30 dark:bg-slate-900 dark:text-slate-100"
>
      <div className="p-6">
        <h2 className="text-lg font-semibold text-amber-700 dark:text-amber-400">
  		Some students grades were adjusted
	</h2>

        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
  		One or more values in the students grades JSON data were outside the
  		allowed range.
	</p>

        <ul className="mt-4 max-h-56 list-disc space-y-1 overflow-y-auto pl-5 text-sm text-slate-700 dark:text-slate-300">
          {warnings.map((warning) => (
            <li key={warning}>{warning}</li>
          ))}
        </ul>

        <div className="mt-6 flex justify-end">
  <button
    type="button"
    autoFocus
    onClick={closeModal}
    className="rounded-lg bg-amber-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-amber-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 dark:bg-amber-500 dark:text-slate-950 dark:hover:bg-amber-400 dark:focus-visible:ring-amber-400 dark:focus-visible:ring-offset-slate-900"
  >
    OK
  </button>
</div>
      </div>
    </dialog>
  );
}
