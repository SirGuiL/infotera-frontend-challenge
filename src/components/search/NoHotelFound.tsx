export function NoHotelFound() {
  return (
    <div className="flex flex-col items-center justify-center gap-1 py-10">
      <span className="text-default-text text-2xl font-semibold">
        Nenhum hotel encontrado
      </span>

      <span className="text-caption text-sm">
        Mude os filtros e tente uma nova busca
      </span>
    </div>
  );
}
