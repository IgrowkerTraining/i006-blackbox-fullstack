import React, { useState } from "react";
import { Input } from "../components/common/Input";
import {
  PageDataContainer,
  DataTable,
  Pagination,
  useDataPage,
} from "../components/dataPage";

interface ChoferRow extends Record<string, unknown> {
  unidadAsignada: string;
  idChofer: string;
  nombre: string;
  licencia: string;
  estadoOperativo: string;
}

const MOCK_CHOFERES: ChoferRow[] = [
  { unidadAsignada: "U505", idChofer: "CH205", nombre: "Emiliano Cerati", licencia: "TX-99281", estadoOperativo: "Autorizado" },
  { unidadAsignada: "U601", idChofer: "CH207", nombre: "Josué Maradona", licencia: "TX-99282", estadoOperativo: "Autorizado" },
  { unidadAsignada: "U789", idChofer: "CH104", nombre: "Amanda Miguel", licencia: "TX-99283", estadoOperativo: "Autorizado" },
  { unidadAsignada: "Sin asignar", idChofer: "CH097", nombre: "Elvis Crespo", licencia: "TX-99284", estadoOperativo: "Vacaciones/Descanso" },
  { unidadAsignada: "Sin asignar", idChofer: "CH063", nombre: "Natanael Cano", licencia: "TX-99289", estadoOperativo: "Licencia vencida" },
  { unidadAsignada: "U502", idChofer: "CH201", nombre: "Luis Fonsi", licencia: "TX-99285", estadoOperativo: "Autorizado" },
  { unidadAsignada: "U603", idChofer: "CH088", nombre: "Shakira Rodríguez", licencia: "TX-99286", estadoOperativo: "Autorizado" },
  { unidadAsignada: "U790", idChofer: "CH312", nombre: "Carlos Vives", licencia: "TX-99287", estadoOperativo: "Vacaciones/Descanso" },
  { unidadAsignada: "U506", idChofer: "CH115", nombre: "Ricardo Arjona", licencia: "TX-99290", estadoOperativo: "Autorizado" },
  { unidadAsignada: "Sin asignar", idChofer: "CH102", nombre: "Juanes García", licencia: "TX-99291", estadoOperativo: "Licencia vencida" },
  { unidadAsignada: "U602", idChofer: "CH210", nombre: "Alejandro Sanz", licencia: "TX-99292", estadoOperativo: "Autorizado" },
  { unidadAsignada: "U791", idChofer: "CH118", nombre: "Laura Pausini", licencia: "TX-99293", estadoOperativo: "Autorizado" },
  { unidadAsignada: "U507", idChofer: "CH099", nombre: "Miguel Bosé", licencia: "TX-99294", estadoOperativo: "Vacaciones/Descanso" },
  { unidadAsignada: "U604", idChofer: "CH220", nombre: "Thalía Fernández", licencia: "TX-99295", estadoOperativo: "Autorizado" },
  { unidadAsignada: "U792", idChofer: "CH125", nombre: "Ricky Martin", licencia: "TX-99296", estadoOperativo: "Autorizado" },
  { unidadAsignada: "Sin asignar", idChofer: "CH108", nombre: "Paulina Rubio", licencia: "TX-99297", estadoOperativo: "Licencia vencida" },
  { unidadAsignada: "U508", idChofer: "CH230", nombre: "Enrique Iglesias", licencia: "TX-99298", estadoOperativo: "Autorizado" },
  { unidadAsignada: "U605", idChofer: "CH130", nombre: "Gloria Estefan", licencia: "TX-99299", estadoOperativo: "Autorizado" },
  { unidadAsignada: "U793", idChofer: "CH135", nombre: "Marc Anthony", licencia: "TX-99300", estadoOperativo: "Vacaciones/Descanso" },
  { unidadAsignada: "U509", idChofer: "CH240", nombre: "Jennifer López", licencia: "TX-99301", estadoOperativo: "Autorizado" },
  { unidadAsignada: "U606", idChofer: "CH140", nombre: "Chayanne", licencia: "TX-99302", estadoOperativo: "Autorizado" },
  { unidadAsignada: "Sin asignar", idChofer: "CH145", nombre: "Luis Miguel", licencia: "TX-99303", estadoOperativo: "Licencia vencida" },
  { unidadAsignada: "U794", idChofer: "CH250", nombre: "Juan Luis Guerra", licencia: "TX-99304", estadoOperativo: "Autorizado" },
  { unidadAsignada: "U510", idChofer: "CH150", nombre: "Vicente Fernández", licencia: "TX-99305", estadoOperativo: "Autorizado" },
  { unidadAsignada: "U607", idChofer: "CH260", nombre: "Alejandra Guzmán", licencia: "TX-99306", estadoOperativo: "Vacaciones/Descanso" },
  { unidadAsignada: "U795", idChofer: "CH155", nombre: "Franco de Vita", licencia: "TX-99307", estadoOperativo: "Autorizado" },
  { unidadAsignada: "U511", idChofer: "CH270", nombre: "Cristian Castro", licencia: "TX-99308", estadoOperativo: "Autorizado" },
  { unidadAsignada: "Sin asignar", idChofer: "CH160", nombre: "Yuri", licencia: "TX-99309", estadoOperativo: "Licencia vencida" },
  { unidadAsignada: "U608", idChofer: "CH280", nombre: "Marco Antonio Solís", licencia: "TX-99310", estadoOperativo: "Autorizado" },
  { unidadAsignada: "U796", idChofer: "CH165", nombre: "Ana Gabriel", licencia: "TX-99311", estadoOperativo: "Autorizado" },
  { unidadAsignada: "U512", idChofer: "CH290", nombre: "Pepe Aguilar", licencia: "TX-99312", estadoOperativo: "Vacaciones/Descanso" },
  { unidadAsignada: "U609", idChofer: "CH170", nombre: "Belinda", licencia: "TX-99313", estadoOperativo: "Autorizado" },
  { unidadAsignada: "U797", idChofer: "CH300", nombre: "Reik", licencia: "TX-99314", estadoOperativo: "Autorizado" },
  { unidadAsignada: "Sin asignar", idChofer: "CH175", nombre: "Ha-Ash", licencia: "TX-99315", estadoOperativo: "Licencia vencida" },
  { unidadAsignada: "U513", idChofer: "CH310", nombre: "Camilo", licencia: "TX-99316", estadoOperativo: "Autorizado" },
  { unidadAsignada: "U610", idChofer: "CH180", nombre: "Bad Bunny", licencia: "TX-99317", estadoOperativo: "Autorizado" },
  { unidadAsignada: "U798", idChofer: "CH185", nombre: "J Balvin", licencia: "TX-99318", estadoOperativo: "Vacaciones/Descanso" },
  { unidadAsignada: "U514", idChofer: "CH320", nombre: "Daddy Yankee", licencia: "TX-99319", estadoOperativo: "Autorizado" },
  { unidadAsignada: "U611", idChofer: "CH190", nombre: "Ozuna", licencia: "TX-99320", estadoOperativo: "Autorizado" },
  { unidadAsignada: "U799", idChofer: "CH195", nombre: "Karol G", licencia: "TX-99321", estadoOperativo: "Autorizado" },
  { unidadAsignada: "Sin asignar", idChofer: "CH200", nombre: "Maluma", licencia: "TX-99322", estadoOperativo: "Licencia vencida" },
  { unidadAsignada: "U515", idChofer: "CH330", nombre: "Sebastian Yatra", licencia: "TX-99323", estadoOperativo: "Autorizado" },
  { unidadAsignada: "U612", idChofer: "CH340", nombre: "Rauw Alejandro", licencia: "TX-99324", estadoOperativo: "Autorizado" },
  { unidadAsignada: "U800", idChofer: "CH350", nombre: "Feid", licencia: "TX-99325", estadoOperativo: "Vacaciones/Descanso" },
  { unidadAsignada: "U516", idChofer: "CH360", nombre: "Peso Pluma", licencia: "TX-99326", estadoOperativo: "Autorizado" },
  { unidadAsignada: "U613", idChofer: "CH370", nombre: "Grupo Frontera", licencia: "TX-99327", estadoOperativo: "Autorizado" },
  { unidadAsignada: "U801", idChofer: "CH380", nombre: "Eslabon Armado", licencia: "TX-99328", estadoOperativo: "Autorizado" },
  { unidadAsignada: "Sin asignar", idChofer: "CH390", nombre: "Fuerza Regida", licencia: "TX-99329", estadoOperativo: "Licencia vencida" },
  { unidadAsignada: "U517", idChofer: "CH400", nombre: "Carin León", licencia: "TX-99330", estadoOperativo: "Autorizado" },
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
      id: "unidadAsignada",
      label: "Unidad asignada",
      sortable: false,
      accessor: "unidadAsignada" as keyof ChoferRow,
    },
    {
      id: "idChofer",
      label: "ID Chofer",
      sortable: true,
      accessor: "idChofer" as keyof ChoferRow,
    },
    {
      id: "nombre",
      label: "Nombre",
      sortable: true,
      accessor: "nombre" as keyof ChoferRow,
    },
    {
      id: "licencia",
      label: "Licencia",
      sortable: true,
      accessor: "licencia" as keyof ChoferRow,
    },
    {
      id: "estadoOperativo",
      label: "Estado operativo",
      sortable: true,
      accessor: "estadoOperativo" as keyof ChoferRow,
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
            iconPosition="right"
            className="min-w-[380px] max-w-md py-2 rounded bg-surface-subtle border-slate-400 text-slate-900 placeholder:text-slate-500"
          />
        }
        pagination={
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            maxVisiblePages={10}
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
              href={`#/choferes/${row.idChofer}/ficha`}
              className="text-menu-active hover:opacity-90 font-medium transition-colors"
            >
              Ver ficha
            </a>
          )}
        />
        <p className="mt-4 text-xs text-slate-700">
          Nota: El estado operativo se actualiza en tiempo real basado en el registro de horas de servicio y la vigencia de la documentación cargada en el sistema.
        </p>
      </PageDataContainer>
    </div>
  );
};

export default ChoferesPage;
