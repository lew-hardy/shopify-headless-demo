export default function Label({
  title,
  amount,
  currencyCode,
}: {
  title: string;
  amount: string;
  currencyCode: string;
}) {
  return (
    <div className="absolute bottom-0 left-0 w-full bg-white/90 p-3 text-sm dark:bg-black/80">
      <div className="flex items-center justify-between">
        <span className="truncate">{title}</span>
        <span className="ml-2 font-medium">
          {new Intl.NumberFormat("en-GB", {
            style: "currency",
            currency: currencyCode,
          }).format(Number(amount))}
        </span>
      </div>
    </div>
  );
}
