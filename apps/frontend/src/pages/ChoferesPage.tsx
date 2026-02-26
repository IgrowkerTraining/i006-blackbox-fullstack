import React, { useState } from "react";
import { Input } from "../components/common/Input";
import {
  PageDataContainer,
  DataTable,
  Pagination,
  useDataPage,
} from "../components/dataPage";

interface ChoferRow extends Record<string, unknown> {
  idChofer: string;
  chofer: string;
  empresaEmpleadora: string;
}

const MOCK_CHOFERES: ChoferRow[] = [
  { idChofer: "CH205", chofer: "Emiliano Cerati", empresaEmpleadora: "RutaSegura Express" },
  { idChofer: "CH207", chofer: "Josué Maradona", empresaEmpleadora: "LogiCarga Solutions" },
  { idChofer: "CH104", chofer: "Amanda Miguel", empresaEmpleadora: "Velocidad Logística" },
  { idChofer: "CH097", chofer: "Elvis Crespo", empresaEmpleadora: "LogiCarga Solutions" },
  { idChofer: "CH115", chofer: "Natanael Cano", empresaEmpleadora: "TransMerc Global" },
  { idChofer: "CH201", chofer: "Luis Fonsi", empresaEmpleadora: "RutaSegura Express" },
  { idChofer: "CH088", chofer: "Shakira Rodríguez", empresaEmpleadora: "Velocidad Logística" },
  { idChofer: "CH312", chofer: "Carlos Vives", empresaEmpleadora: "TransMerc Global" },
];

const PAGE_SIZE = 5;

const SearchIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
    className="w-5 h-5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
    />
  </svg>
);

const ChoferesPage: React.FC = () => {
  const [searchId, setSearchId] = useState("");

  const {
    paginatedData,
    totalPages,
    currentPage,
    setCurrentPage,
    sortColumn,
    sortDirection,
    handleSort,
  } = useDataPage<ChoferRow, string>({
    data: MOCK_CHOFERES,
    pageSize: PAGE_SIZE,
    filterState: searchId,
    filterFn: (data, term) => {
      if (!term.trim()) return data;
      const lower = term.trim().toLowerCase();
      return data.filter((row) => row.idChofer.toLowerCase().includes(lower));
    },
    initialSortColumn: "idChofer",
    initialSortDirection: "asc",
  });

  const columns = [
    {
      id: "idChofer",
      label: "ID CHOFER",
      sortable: true,
      accessor: "idChofer" as keyof ChoferRow,
    },
    {
      id: "chofer",
      label: "CHOFER",
      sortable: true,
      accessor: "chofer" as keyof ChoferRow,
    },
    {
      id: "empresaEmpleadora",
      label: "EMPRESA EMPLEADORA",
      sortable: true,
      accessor: "empresaEmpleadora" as keyof ChoferRow,
    },
  ];

  return (
    <div className="max-w-5xl mx-auto w-full">
      <PageDataContainer
        title="Información de Choferes"
        filters={
          <Input
            placeholder="Buscar por ID chofer"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            icon={<SearchIcon />}
            className="min-w-[200px] max-w-xs"
          />
        }
        pagination={
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            maxVisiblePages={5}
          />
        }
      >
        <DataTable<ChoferRow>
          columns={columns}
          data={paginatedData}
          sortColumn={sortColumn}
          sortDirection={sortDirection}
          onSort={handleSort}
          renderAction={(row) => (
            <a
              href={`#/choferes/${row.idChofer}/historial`}
              className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
            >
              Ver historial
            </a>
          )}
        />
      </PageDataContainer>
    </div>
  );
};

export default ChoferesPage;
