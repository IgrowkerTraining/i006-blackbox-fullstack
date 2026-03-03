enum TypeInspection {
  ARRIVAL = "ARRIVAL",
  DEPARTURE = "DEPARTURE",
}

export type CreateInspectionDto = {
  vehicleId: string;
  driverId: string;
  typeInspection: TypeInspection;
  documentationVerified: boolean;
  lightsBrakesOk: boolean;
  safetyElementsOk: boolean;
  eSignature: string;
  isConfirmed: boolean;
};
