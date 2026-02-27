import { z } from "zod";
import type { Prisma } from "../../../generated/prisma/client";

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////

/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum([
  "ReadUncommitted",
  "ReadCommitted",
  "RepeatableRead",
  "Serializable",
]);

export const CompanyScalarFieldEnumSchema = z.enum([
  "id",
  "name",
  "usdotNumber",
  "state",
  "createdAt",
  "updatedAt",
]);

export const VehicleScalarFieldEnumSchema = z.enum([
  "id",
  "companyId",
  "driverId",
  "unit_number",
  "plate",
  "is_active",
  "createdAt",
  "updatedAt",
]);

export const DriverScalarFieldEnumSchema = z.enum([
  "id",
  "companyId",
  "name",
  "license_number",
  "is_active",
  "created_at",
  "updated_at",
]);

export const UserScalarFieldEnumSchema = z.enum([
  "id",
  "companyId",
  "name",
  "email",
  "passwordHash",
  "role",
  "isActive",
  "createdAt",
]);

export const OperationalEventScalarFieldEnumSchema = z.enum([
  "id",
  "company_id",
  "vehicle_id",
  "driver_id",
  "event_type",
  "event_datetime",
  "location",
  "context",
  "general_result",
  "e_signature",
  "final_observations",
  "is_confirmed",
  "created_by_user_id",
  "created_at",
  "updated_at",
]);

export const SortOrderSchema = z.enum(["asc", "desc"]);

export const QueryModeSchema = z.enum(["default", "insensitive"]);

export const NullsOrderSchema = z.enum(["first", "last"]);

export const EventTypeSchema = z.enum([
  "UNKNOWN",
  "ACCIDENT",
  "MAINTENANCE",
  "INSPECTION",
  "OTHER",
]);

export type EventTypeType = `${z.infer<typeof EventTypeSchema>}`;

export const LocationTypeSchema = z.enum(["UNKNOWN", "GPS", "ADDRESS"]);

export type LocationTypeType = `${z.infer<typeof LocationTypeSchema>}`;

export const ContextTypeSchema = z.enum([
  "UNKNOWN",
  "MANUAL",
  "AUTOMATIC",
  "SENSOR",
]);

export type ContextTypeType = `${z.infer<typeof ContextTypeSchema>}`;

export const GeneralResultSchema = z.enum(["WITH_OBS", "WITHOUT_OBS"]);

export type GeneralResultType = `${z.infer<typeof GeneralResultSchema>}`;

export const UserRoleSchema = z.enum(["ADMIN", "OPERATOR", "COMPLIANCE"]);

export type UserRoleType = `${z.infer<typeof UserRoleSchema>}`;

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// COMPANY SCHEMA
/////////////////////////////////////////

export const CompanySchema = z.object({
  id: z.uuid(),
  name: z.string(),
  usdotNumber: z.string(),
  state: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type Company = z.infer<typeof CompanySchema>;

/////////////////////////////////////////
// VEHICLE SCHEMA
/////////////////////////////////////////

export const VehicleSchema = z.object({
  id: z.uuid(),
  companyId: z.string(),
  driverId: z.string().nullable(),
  unit_number: z.string().nullable(),
  plate: z.string().nullable(),
  is_active: z.boolean(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type Vehicle = z.infer<typeof VehicleSchema>;

/////////////////////////////////////////
// DRIVER SCHEMA
/////////////////////////////////////////

export const DriverSchema = z.object({
  id: z.uuid(),
  companyId: z.string(),
  name: z.string(),
  license_number: z.string(),
  is_active: z.boolean(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
});

export type Driver = z.infer<typeof DriverSchema>;

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  role: UserRoleSchema,
  id: z.uuid(),
  companyId: z.string(),
  name: z.string(),
  email: z.string(),
  passwordHash: z.string(),
  isActive: z.boolean(),
  createdAt: z.coerce.date(),
});

export type User = z.infer<typeof UserSchema>;

/////////////////////////////////////////
// OPERATIONAL EVENT SCHEMA
/////////////////////////////////////////

export const OperationalEventSchema = z.object({
  event_type: EventTypeSchema,
  location: LocationTypeSchema.nullable(),
  context: ContextTypeSchema.nullable(),
  general_result: GeneralResultSchema.nullable(),
  id: z.uuid(),
  company_id: z.string(),
  vehicle_id: z.string().nullable(),
  driver_id: z.string().nullable(),
  event_datetime: z.coerce.date(),
  e_signature: z.string().nullable(),
  final_observations: z.string().nullable(),
  is_confirmed: z.boolean().nullable(),
  created_by_user_id: z.string(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
});

export type OperationalEvent = z.infer<typeof OperationalEventSchema>;

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// COMPANY
//------------------------------------------------------

export const CompanyIncludeSchema: z.ZodType<Prisma.CompanyInclude> = z
  .object({
    vehicles: z
      .union([z.boolean(), z.lazy(() => VehicleFindManyArgsSchema)])
      .optional(),
    drivers: z
      .union([z.boolean(), z.lazy(() => DriverFindManyArgsSchema)])
      .optional(),
    users: z
      .union([z.boolean(), z.lazy(() => UserFindManyArgsSchema)])
      .optional(),
    operational_events: z
      .union([z.boolean(), z.lazy(() => OperationalEventFindManyArgsSchema)])
      .optional(),
    _count: z
      .union([z.boolean(), z.lazy(() => CompanyCountOutputTypeArgsSchema)])
      .optional(),
  })
  .strict();

export const CompanyArgsSchema: z.ZodType<Prisma.CompanyDefaultArgs> = z
  .object({
    select: z.lazy(() => CompanySelectSchema).optional(),
    include: z.lazy(() => CompanyIncludeSchema).optional(),
  })
  .strict();

export const CompanyCountOutputTypeArgsSchema: z.ZodType<Prisma.CompanyCountOutputTypeDefaultArgs> =
  z
    .object({
      select: z.lazy(() => CompanyCountOutputTypeSelectSchema).nullish(),
    })
    .strict();

export const CompanyCountOutputTypeSelectSchema: z.ZodType<Prisma.CompanyCountOutputTypeSelect> =
  z
    .object({
      vehicles: z.boolean().optional(),
      drivers: z.boolean().optional(),
      users: z.boolean().optional(),
      operational_events: z.boolean().optional(),
    })
    .strict();

export const CompanySelectSchema: z.ZodType<Prisma.CompanySelect> = z
  .object({
    id: z.boolean().optional(),
    name: z.boolean().optional(),
    usdotNumber: z.boolean().optional(),
    state: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    vehicles: z
      .union([z.boolean(), z.lazy(() => VehicleFindManyArgsSchema)])
      .optional(),
    drivers: z
      .union([z.boolean(), z.lazy(() => DriverFindManyArgsSchema)])
      .optional(),
    users: z
      .union([z.boolean(), z.lazy(() => UserFindManyArgsSchema)])
      .optional(),
    operational_events: z
      .union([z.boolean(), z.lazy(() => OperationalEventFindManyArgsSchema)])
      .optional(),
    _count: z
      .union([z.boolean(), z.lazy(() => CompanyCountOutputTypeArgsSchema)])
      .optional(),
  })
  .strict();

// VEHICLE
//------------------------------------------------------

export const VehicleIncludeSchema: z.ZodType<Prisma.VehicleInclude> = z
  .object({
    company: z.union([z.boolean(), z.lazy(() => CompanyArgsSchema)]).optional(),
    driver: z.union([z.boolean(), z.lazy(() => DriverArgsSchema)]).optional(),
    operational_events: z
      .union([z.boolean(), z.lazy(() => OperationalEventFindManyArgsSchema)])
      .optional(),
    _count: z
      .union([z.boolean(), z.lazy(() => VehicleCountOutputTypeArgsSchema)])
      .optional(),
  })
  .strict();

export const VehicleArgsSchema: z.ZodType<Prisma.VehicleDefaultArgs> = z
  .object({
    select: z.lazy(() => VehicleSelectSchema).optional(),
    include: z.lazy(() => VehicleIncludeSchema).optional(),
  })
  .strict();

export const VehicleCountOutputTypeArgsSchema: z.ZodType<Prisma.VehicleCountOutputTypeDefaultArgs> =
  z
    .object({
      select: z.lazy(() => VehicleCountOutputTypeSelectSchema).nullish(),
    })
    .strict();

export const VehicleCountOutputTypeSelectSchema: z.ZodType<Prisma.VehicleCountOutputTypeSelect> =
  z
    .object({
      operational_events: z.boolean().optional(),
    })
    .strict();

export const VehicleSelectSchema: z.ZodType<Prisma.VehicleSelect> = z
  .object({
    id: z.boolean().optional(),
    companyId: z.boolean().optional(),
    driverId: z.boolean().optional(),
    unit_number: z.boolean().optional(),
    plate: z.boolean().optional(),
    is_active: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    company: z.union([z.boolean(), z.lazy(() => CompanyArgsSchema)]).optional(),
    driver: z.union([z.boolean(), z.lazy(() => DriverArgsSchema)]).optional(),
    operational_events: z
      .union([z.boolean(), z.lazy(() => OperationalEventFindManyArgsSchema)])
      .optional(),
    _count: z
      .union([z.boolean(), z.lazy(() => VehicleCountOutputTypeArgsSchema)])
      .optional(),
  })
  .strict();

// DRIVER
//------------------------------------------------------

export const DriverIncludeSchema: z.ZodType<Prisma.DriverInclude> = z
  .object({
    company: z.union([z.boolean(), z.lazy(() => CompanyArgsSchema)]).optional(),
    vehicle: z.union([z.boolean(), z.lazy(() => VehicleArgsSchema)]).optional(),
    operational_events: z
      .union([z.boolean(), z.lazy(() => OperationalEventFindManyArgsSchema)])
      .optional(),
    _count: z
      .union([z.boolean(), z.lazy(() => DriverCountOutputTypeArgsSchema)])
      .optional(),
  })
  .strict();

export const DriverArgsSchema: z.ZodType<Prisma.DriverDefaultArgs> = z
  .object({
    select: z.lazy(() => DriverSelectSchema).optional(),
    include: z.lazy(() => DriverIncludeSchema).optional(),
  })
  .strict();

export const DriverCountOutputTypeArgsSchema: z.ZodType<Prisma.DriverCountOutputTypeDefaultArgs> =
  z
    .object({
      select: z.lazy(() => DriverCountOutputTypeSelectSchema).nullish(),
    })
    .strict();

export const DriverCountOutputTypeSelectSchema: z.ZodType<Prisma.DriverCountOutputTypeSelect> =
  z
    .object({
      operational_events: z.boolean().optional(),
    })
    .strict();

export const DriverSelectSchema: z.ZodType<Prisma.DriverSelect> = z
  .object({
    id: z.boolean().optional(),
    companyId: z.boolean().optional(),
    name: z.boolean().optional(),
    license_number: z.boolean().optional(),
    is_active: z.boolean().optional(),
    created_at: z.boolean().optional(),
    updated_at: z.boolean().optional(),
    company: z.union([z.boolean(), z.lazy(() => CompanyArgsSchema)]).optional(),
    vehicle: z.union([z.boolean(), z.lazy(() => VehicleArgsSchema)]).optional(),
    operational_events: z
      .union([z.boolean(), z.lazy(() => OperationalEventFindManyArgsSchema)])
      .optional(),
    _count: z
      .union([z.boolean(), z.lazy(() => DriverCountOutputTypeArgsSchema)])
      .optional(),
  })
  .strict();

// USER
//------------------------------------------------------

export const UserIncludeSchema: z.ZodType<Prisma.UserInclude> = z
  .object({
    company: z.union([z.boolean(), z.lazy(() => CompanyArgsSchema)]).optional(),
    operational_events: z
      .union([z.boolean(), z.lazy(() => OperationalEventFindManyArgsSchema)])
      .optional(),
    _count: z
      .union([z.boolean(), z.lazy(() => UserCountOutputTypeArgsSchema)])
      .optional(),
  })
  .strict();

export const UserArgsSchema: z.ZodType<Prisma.UserDefaultArgs> = z
  .object({
    select: z.lazy(() => UserSelectSchema).optional(),
    include: z.lazy(() => UserIncludeSchema).optional(),
  })
  .strict();

export const UserCountOutputTypeArgsSchema: z.ZodType<Prisma.UserCountOutputTypeDefaultArgs> =
  z
    .object({
      select: z.lazy(() => UserCountOutputTypeSelectSchema).nullish(),
    })
    .strict();

export const UserCountOutputTypeSelectSchema: z.ZodType<Prisma.UserCountOutputTypeSelect> =
  z
    .object({
      operational_events: z.boolean().optional(),
    })
    .strict();

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z
  .object({
    id: z.boolean().optional(),
    companyId: z.boolean().optional(),
    name: z.boolean().optional(),
    email: z.boolean().optional(),
    passwordHash: z.boolean().optional(),
    role: z.boolean().optional(),
    isActive: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    company: z.union([z.boolean(), z.lazy(() => CompanyArgsSchema)]).optional(),
    operational_events: z
      .union([z.boolean(), z.lazy(() => OperationalEventFindManyArgsSchema)])
      .optional(),
    _count: z
      .union([z.boolean(), z.lazy(() => UserCountOutputTypeArgsSchema)])
      .optional(),
  })
  .strict();

// OPERATIONAL EVENT
//------------------------------------------------------

export const OperationalEventIncludeSchema: z.ZodType<Prisma.OperationalEventInclude> =
  z
    .object({
      company: z
        .union([z.boolean(), z.lazy(() => CompanyArgsSchema)])
        .optional(),
      vehicle: z
        .union([z.boolean(), z.lazy(() => VehicleArgsSchema)])
        .optional(),
      driver: z.union([z.boolean(), z.lazy(() => DriverArgsSchema)]).optional(),
      createdBy: z
        .union([z.boolean(), z.lazy(() => UserArgsSchema)])
        .optional(),
    })
    .strict();

export const OperationalEventArgsSchema: z.ZodType<Prisma.OperationalEventDefaultArgs> =
  z
    .object({
      select: z.lazy(() => OperationalEventSelectSchema).optional(),
      include: z.lazy(() => OperationalEventIncludeSchema).optional(),
    })
    .strict();

export const OperationalEventSelectSchema: z.ZodType<Prisma.OperationalEventSelect> =
  z
    .object({
      id: z.boolean().optional(),
      company_id: z.boolean().optional(),
      vehicle_id: z.boolean().optional(),
      driver_id: z.boolean().optional(),
      event_type: z.boolean().optional(),
      event_datetime: z.boolean().optional(),
      location: z.boolean().optional(),
      context: z.boolean().optional(),
      general_result: z.boolean().optional(),
      e_signature: z.boolean().optional(),
      final_observations: z.boolean().optional(),
      is_confirmed: z.boolean().optional(),
      created_by_user_id: z.boolean().optional(),
      created_at: z.boolean().optional(),
      updated_at: z.boolean().optional(),
      company: z
        .union([z.boolean(), z.lazy(() => CompanyArgsSchema)])
        .optional(),
      vehicle: z
        .union([z.boolean(), z.lazy(() => VehicleArgsSchema)])
        .optional(),
      driver: z.union([z.boolean(), z.lazy(() => DriverArgsSchema)]).optional(),
      createdBy: z
        .union([z.boolean(), z.lazy(() => UserArgsSchema)])
        .optional(),
    })
    .strict();

/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const CompanyWhereInputSchema: z.ZodType<Prisma.CompanyWhereInput> =
  z.strictObject({
    AND: z
      .union([
        z.lazy(() => CompanyWhereInputSchema),
        z.lazy(() => CompanyWhereInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => CompanyWhereInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => CompanyWhereInputSchema),
        z.lazy(() => CompanyWhereInputSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    name: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    usdotNumber: z
      .union([z.lazy(() => StringFilterSchema), z.string()])
      .optional(),
    state: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    createdAt: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
    updatedAt: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
    vehicles: z.lazy(() => VehicleListRelationFilterSchema).optional(),
    drivers: z.lazy(() => DriverListRelationFilterSchema).optional(),
    users: z.lazy(() => UserListRelationFilterSchema).optional(),
    operational_events: z
      .lazy(() => OperationalEventListRelationFilterSchema)
      .optional(),
  });

export const CompanyOrderByWithRelationInputSchema: z.ZodType<Prisma.CompanyOrderByWithRelationInput> =
  z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    name: z.lazy(() => SortOrderSchema).optional(),
    usdotNumber: z.lazy(() => SortOrderSchema).optional(),
    state: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
    vehicles: z
      .lazy(() => VehicleOrderByRelationAggregateInputSchema)
      .optional(),
    drivers: z.lazy(() => DriverOrderByRelationAggregateInputSchema).optional(),
    users: z.lazy(() => UserOrderByRelationAggregateInputSchema).optional(),
    operational_events: z
      .lazy(() => OperationalEventOrderByRelationAggregateInputSchema)
      .optional(),
  });

export const CompanyWhereUniqueInputSchema: z.ZodType<Prisma.CompanyWhereUniqueInput> =
  z
    .object({
      id: z.uuid(),
    })
    .and(
      z.strictObject({
        id: z.uuid().optional(),
        AND: z
          .union([
            z.lazy(() => CompanyWhereInputSchema),
            z.lazy(() => CompanyWhereInputSchema).array(),
          ])
          .optional(),
        OR: z
          .lazy(() => CompanyWhereInputSchema)
          .array()
          .optional(),
        NOT: z
          .union([
            z.lazy(() => CompanyWhereInputSchema),
            z.lazy(() => CompanyWhereInputSchema).array(),
          ])
          .optional(),
        name: z
          .union([z.lazy(() => StringFilterSchema), z.string()])
          .optional(),
        usdotNumber: z
          .union([z.lazy(() => StringFilterSchema), z.string()])
          .optional(),
        state: z
          .union([z.lazy(() => StringFilterSchema), z.string()])
          .optional(),
        createdAt: z
          .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
          .optional(),
        updatedAt: z
          .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
          .optional(),
        vehicles: z.lazy(() => VehicleListRelationFilterSchema).optional(),
        drivers: z.lazy(() => DriverListRelationFilterSchema).optional(),
        users: z.lazy(() => UserListRelationFilterSchema).optional(),
        operational_events: z
          .lazy(() => OperationalEventListRelationFilterSchema)
          .optional(),
      }),
    );

export const CompanyOrderByWithAggregationInputSchema: z.ZodType<Prisma.CompanyOrderByWithAggregationInput> =
  z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    name: z.lazy(() => SortOrderSchema).optional(),
    usdotNumber: z.lazy(() => SortOrderSchema).optional(),
    state: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
    _count: z.lazy(() => CompanyCountOrderByAggregateInputSchema).optional(),
    _max: z.lazy(() => CompanyMaxOrderByAggregateInputSchema).optional(),
    _min: z.lazy(() => CompanyMinOrderByAggregateInputSchema).optional(),
  });

export const CompanyScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.CompanyScalarWhereWithAggregatesInput> =
  z.strictObject({
    AND: z
      .union([
        z.lazy(() => CompanyScalarWhereWithAggregatesInputSchema),
        z.lazy(() => CompanyScalarWhereWithAggregatesInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => CompanyScalarWhereWithAggregatesInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => CompanyScalarWhereWithAggregatesInputSchema),
        z.lazy(() => CompanyScalarWhereWithAggregatesInputSchema).array(),
      ])
      .optional(),
    id: z
      .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
      .optional(),
    name: z
      .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
      .optional(),
    usdotNumber: z
      .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
      .optional(),
    state: z
      .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
      .optional(),
    createdAt: z
      .union([
        z.lazy(() => DateTimeWithAggregatesFilterSchema),
        z.coerce.date(),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.lazy(() => DateTimeWithAggregatesFilterSchema),
        z.coerce.date(),
      ])
      .optional(),
  });

export const VehicleWhereInputSchema: z.ZodType<Prisma.VehicleWhereInput> =
  z.strictObject({
    AND: z
      .union([
        z.lazy(() => VehicleWhereInputSchema),
        z.lazy(() => VehicleWhereInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => VehicleWhereInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => VehicleWhereInputSchema),
        z.lazy(() => VehicleWhereInputSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    companyId: z
      .union([z.lazy(() => StringFilterSchema), z.string()])
      .optional(),
    driverId: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    unit_number: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    plate: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    is_active: z
      .union([z.lazy(() => BoolFilterSchema), z.boolean()])
      .optional(),
    createdAt: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
    updatedAt: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
    company: z
      .union([
        z.lazy(() => CompanyScalarRelationFilterSchema),
        z.lazy(() => CompanyWhereInputSchema),
      ])
      .optional(),
    driver: z
      .union([
        z.lazy(() => DriverNullableScalarRelationFilterSchema),
        z.lazy(() => DriverWhereInputSchema),
      ])
      .optional()
      .nullable(),
    operational_events: z
      .lazy(() => OperationalEventListRelationFilterSchema)
      .optional(),
  });

export const VehicleOrderByWithRelationInputSchema: z.ZodType<Prisma.VehicleOrderByWithRelationInput> =
  z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    companyId: z.lazy(() => SortOrderSchema).optional(),
    driverId: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputSchema),
      ])
      .optional(),
    unit_number: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputSchema),
      ])
      .optional(),
    plate: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputSchema),
      ])
      .optional(),
    is_active: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
    company: z.lazy(() => CompanyOrderByWithRelationInputSchema).optional(),
    driver: z.lazy(() => DriverOrderByWithRelationInputSchema).optional(),
    operational_events: z
      .lazy(() => OperationalEventOrderByRelationAggregateInputSchema)
      .optional(),
  });

export const VehicleWhereUniqueInputSchema: z.ZodType<Prisma.VehicleWhereUniqueInput> =
  z
    .union([
      z.object({
        id: z.uuid(),
        driverId: z.string(),
      }),
      z.object({
        id: z.uuid(),
      }),
      z.object({
        driverId: z.string(),
      }),
    ])
    .and(
      z.strictObject({
        id: z.uuid().optional(),
        driverId: z.string().optional(),
        AND: z
          .union([
            z.lazy(() => VehicleWhereInputSchema),
            z.lazy(() => VehicleWhereInputSchema).array(),
          ])
          .optional(),
        OR: z
          .lazy(() => VehicleWhereInputSchema)
          .array()
          .optional(),
        NOT: z
          .union([
            z.lazy(() => VehicleWhereInputSchema),
            z.lazy(() => VehicleWhereInputSchema).array(),
          ])
          .optional(),
        companyId: z
          .union([z.lazy(() => StringFilterSchema), z.string()])
          .optional(),
        unit_number: z
          .union([z.lazy(() => StringNullableFilterSchema), z.string()])
          .optional()
          .nullable(),
        plate: z
          .union([z.lazy(() => StringNullableFilterSchema), z.string()])
          .optional()
          .nullable(),
        is_active: z
          .union([z.lazy(() => BoolFilterSchema), z.boolean()])
          .optional(),
        createdAt: z
          .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
          .optional(),
        updatedAt: z
          .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
          .optional(),
        company: z
          .union([
            z.lazy(() => CompanyScalarRelationFilterSchema),
            z.lazy(() => CompanyWhereInputSchema),
          ])
          .optional(),
        driver: z
          .union([
            z.lazy(() => DriverNullableScalarRelationFilterSchema),
            z.lazy(() => DriverWhereInputSchema),
          ])
          .optional()
          .nullable(),
        operational_events: z
          .lazy(() => OperationalEventListRelationFilterSchema)
          .optional(),
      }),
    );

export const VehicleOrderByWithAggregationInputSchema: z.ZodType<Prisma.VehicleOrderByWithAggregationInput> =
  z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    companyId: z.lazy(() => SortOrderSchema).optional(),
    driverId: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputSchema),
      ])
      .optional(),
    unit_number: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputSchema),
      ])
      .optional(),
    plate: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputSchema),
      ])
      .optional(),
    is_active: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
    _count: z.lazy(() => VehicleCountOrderByAggregateInputSchema).optional(),
    _max: z.lazy(() => VehicleMaxOrderByAggregateInputSchema).optional(),
    _min: z.lazy(() => VehicleMinOrderByAggregateInputSchema).optional(),
  });

export const VehicleScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.VehicleScalarWhereWithAggregatesInput> =
  z.strictObject({
    AND: z
      .union([
        z.lazy(() => VehicleScalarWhereWithAggregatesInputSchema),
        z.lazy(() => VehicleScalarWhereWithAggregatesInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => VehicleScalarWhereWithAggregatesInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => VehicleScalarWhereWithAggregatesInputSchema),
        z.lazy(() => VehicleScalarWhereWithAggregatesInputSchema).array(),
      ])
      .optional(),
    id: z
      .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
      .optional(),
    companyId: z
      .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
      .optional(),
    driverId: z
      .union([
        z.lazy(() => StringNullableWithAggregatesFilterSchema),
        z.string(),
      ])
      .optional()
      .nullable(),
    unit_number: z
      .union([
        z.lazy(() => StringNullableWithAggregatesFilterSchema),
        z.string(),
      ])
      .optional()
      .nullable(),
    plate: z
      .union([
        z.lazy(() => StringNullableWithAggregatesFilterSchema),
        z.string(),
      ])
      .optional()
      .nullable(),
    is_active: z
      .union([z.lazy(() => BoolWithAggregatesFilterSchema), z.boolean()])
      .optional(),
    createdAt: z
      .union([
        z.lazy(() => DateTimeWithAggregatesFilterSchema),
        z.coerce.date(),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.lazy(() => DateTimeWithAggregatesFilterSchema),
        z.coerce.date(),
      ])
      .optional(),
  });

export const DriverWhereInputSchema: z.ZodType<Prisma.DriverWhereInput> =
  z.strictObject({
    AND: z
      .union([
        z.lazy(() => DriverWhereInputSchema),
        z.lazy(() => DriverWhereInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => DriverWhereInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => DriverWhereInputSchema),
        z.lazy(() => DriverWhereInputSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    companyId: z
      .union([z.lazy(() => StringFilterSchema), z.string()])
      .optional(),
    name: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    license_number: z
      .union([z.lazy(() => StringFilterSchema), z.string()])
      .optional(),
    is_active: z
      .union([z.lazy(() => BoolFilterSchema), z.boolean()])
      .optional(),
    created_at: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
    updated_at: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
    company: z
      .union([
        z.lazy(() => CompanyScalarRelationFilterSchema),
        z.lazy(() => CompanyWhereInputSchema),
      ])
      .optional(),
    vehicle: z
      .union([
        z.lazy(() => VehicleNullableScalarRelationFilterSchema),
        z.lazy(() => VehicleWhereInputSchema),
      ])
      .optional()
      .nullable(),
    operational_events: z
      .lazy(() => OperationalEventListRelationFilterSchema)
      .optional(),
  });

export const DriverOrderByWithRelationInputSchema: z.ZodType<Prisma.DriverOrderByWithRelationInput> =
  z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    companyId: z.lazy(() => SortOrderSchema).optional(),
    name: z.lazy(() => SortOrderSchema).optional(),
    license_number: z.lazy(() => SortOrderSchema).optional(),
    is_active: z.lazy(() => SortOrderSchema).optional(),
    created_at: z.lazy(() => SortOrderSchema).optional(),
    updated_at: z.lazy(() => SortOrderSchema).optional(),
    company: z.lazy(() => CompanyOrderByWithRelationInputSchema).optional(),
    vehicle: z.lazy(() => VehicleOrderByWithRelationInputSchema).optional(),
    operational_events: z
      .lazy(() => OperationalEventOrderByRelationAggregateInputSchema)
      .optional(),
  });

export const DriverWhereUniqueInputSchema: z.ZodType<Prisma.DriverWhereUniqueInput> =
  z
    .object({
      id: z.uuid(),
    })
    .and(
      z.strictObject({
        id: z.uuid().optional(),
        AND: z
          .union([
            z.lazy(() => DriverWhereInputSchema),
            z.lazy(() => DriverWhereInputSchema).array(),
          ])
          .optional(),
        OR: z
          .lazy(() => DriverWhereInputSchema)
          .array()
          .optional(),
        NOT: z
          .union([
            z.lazy(() => DriverWhereInputSchema),
            z.lazy(() => DriverWhereInputSchema).array(),
          ])
          .optional(),
        companyId: z
          .union([z.lazy(() => StringFilterSchema), z.string()])
          .optional(),
        name: z
          .union([z.lazy(() => StringFilterSchema), z.string()])
          .optional(),
        license_number: z
          .union([z.lazy(() => StringFilterSchema), z.string()])
          .optional(),
        is_active: z
          .union([z.lazy(() => BoolFilterSchema), z.boolean()])
          .optional(),
        created_at: z
          .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
          .optional(),
        updated_at: z
          .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
          .optional(),
        company: z
          .union([
            z.lazy(() => CompanyScalarRelationFilterSchema),
            z.lazy(() => CompanyWhereInputSchema),
          ])
          .optional(),
        vehicle: z
          .union([
            z.lazy(() => VehicleNullableScalarRelationFilterSchema),
            z.lazy(() => VehicleWhereInputSchema),
          ])
          .optional()
          .nullable(),
        operational_events: z
          .lazy(() => OperationalEventListRelationFilterSchema)
          .optional(),
      }),
    );

export const DriverOrderByWithAggregationInputSchema: z.ZodType<Prisma.DriverOrderByWithAggregationInput> =
  z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    companyId: z.lazy(() => SortOrderSchema).optional(),
    name: z.lazy(() => SortOrderSchema).optional(),
    license_number: z.lazy(() => SortOrderSchema).optional(),
    is_active: z.lazy(() => SortOrderSchema).optional(),
    created_at: z.lazy(() => SortOrderSchema).optional(),
    updated_at: z.lazy(() => SortOrderSchema).optional(),
    _count: z.lazy(() => DriverCountOrderByAggregateInputSchema).optional(),
    _max: z.lazy(() => DriverMaxOrderByAggregateInputSchema).optional(),
    _min: z.lazy(() => DriverMinOrderByAggregateInputSchema).optional(),
  });

export const DriverScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.DriverScalarWhereWithAggregatesInput> =
  z.strictObject({
    AND: z
      .union([
        z.lazy(() => DriverScalarWhereWithAggregatesInputSchema),
        z.lazy(() => DriverScalarWhereWithAggregatesInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => DriverScalarWhereWithAggregatesInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => DriverScalarWhereWithAggregatesInputSchema),
        z.lazy(() => DriverScalarWhereWithAggregatesInputSchema).array(),
      ])
      .optional(),
    id: z
      .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
      .optional(),
    companyId: z
      .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
      .optional(),
    name: z
      .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
      .optional(),
    license_number: z
      .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
      .optional(),
    is_active: z
      .union([z.lazy(() => BoolWithAggregatesFilterSchema), z.boolean()])
      .optional(),
    created_at: z
      .union([
        z.lazy(() => DateTimeWithAggregatesFilterSchema),
        z.coerce.date(),
      ])
      .optional(),
    updated_at: z
      .union([
        z.lazy(() => DateTimeWithAggregatesFilterSchema),
        z.coerce.date(),
      ])
      .optional(),
  });

export const UserWhereInputSchema: z.ZodType<Prisma.UserWhereInput> =
  z.strictObject({
    AND: z
      .union([
        z.lazy(() => UserWhereInputSchema),
        z.lazy(() => UserWhereInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => UserWhereInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => UserWhereInputSchema),
        z.lazy(() => UserWhereInputSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    companyId: z
      .union([z.lazy(() => StringFilterSchema), z.string()])
      .optional(),
    name: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    email: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    passwordHash: z
      .union([z.lazy(() => StringFilterSchema), z.string()])
      .optional(),
    role: z
      .union([
        z.lazy(() => EnumUserRoleFilterSchema),
        z.lazy(() => UserRoleSchema),
      ])
      .optional(),
    isActive: z.union([z.lazy(() => BoolFilterSchema), z.boolean()]).optional(),
    createdAt: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
    company: z
      .union([
        z.lazy(() => CompanyScalarRelationFilterSchema),
        z.lazy(() => CompanyWhereInputSchema),
      ])
      .optional(),
    operational_events: z
      .lazy(() => OperationalEventListRelationFilterSchema)
      .optional(),
  });

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> =
  z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    companyId: z.lazy(() => SortOrderSchema).optional(),
    name: z.lazy(() => SortOrderSchema).optional(),
    email: z.lazy(() => SortOrderSchema).optional(),
    passwordHash: z.lazy(() => SortOrderSchema).optional(),
    role: z.lazy(() => SortOrderSchema).optional(),
    isActive: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    company: z.lazy(() => CompanyOrderByWithRelationInputSchema).optional(),
    operational_events: z
      .lazy(() => OperationalEventOrderByRelationAggregateInputSchema)
      .optional(),
  });

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> =
  z
    .union([
      z.object({
        id: z.uuid(),
        email: z.string(),
        id_companyId: z.lazy(() => UserIdCompanyIdCompoundUniqueInputSchema),
      }),
      z.object({
        id: z.uuid(),
        email: z.string(),
      }),
      z.object({
        id: z.uuid(),
        id_companyId: z.lazy(() => UserIdCompanyIdCompoundUniqueInputSchema),
      }),
      z.object({
        id: z.uuid(),
      }),
      z.object({
        email: z.string(),
        id_companyId: z.lazy(() => UserIdCompanyIdCompoundUniqueInputSchema),
      }),
      z.object({
        email: z.string(),
      }),
      z.object({
        id_companyId: z.lazy(() => UserIdCompanyIdCompoundUniqueInputSchema),
      }),
    ])
    .and(
      z.strictObject({
        id: z.uuid().optional(),
        email: z.string().optional(),
        id_companyId: z
          .lazy(() => UserIdCompanyIdCompoundUniqueInputSchema)
          .optional(),
        AND: z
          .union([
            z.lazy(() => UserWhereInputSchema),
            z.lazy(() => UserWhereInputSchema).array(),
          ])
          .optional(),
        OR: z
          .lazy(() => UserWhereInputSchema)
          .array()
          .optional(),
        NOT: z
          .union([
            z.lazy(() => UserWhereInputSchema),
            z.lazy(() => UserWhereInputSchema).array(),
          ])
          .optional(),
        companyId: z
          .union([z.lazy(() => StringFilterSchema), z.string()])
          .optional(),
        name: z
          .union([z.lazy(() => StringFilterSchema), z.string()])
          .optional(),
        passwordHash: z
          .union([z.lazy(() => StringFilterSchema), z.string()])
          .optional(),
        role: z
          .union([
            z.lazy(() => EnumUserRoleFilterSchema),
            z.lazy(() => UserRoleSchema),
          ])
          .optional(),
        isActive: z
          .union([z.lazy(() => BoolFilterSchema), z.boolean()])
          .optional(),
        createdAt: z
          .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
          .optional(),
        company: z
          .union([
            z.lazy(() => CompanyScalarRelationFilterSchema),
            z.lazy(() => CompanyWhereInputSchema),
          ])
          .optional(),
        operational_events: z
          .lazy(() => OperationalEventListRelationFilterSchema)
          .optional(),
      }),
    );

export const UserOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> =
  z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    companyId: z.lazy(() => SortOrderSchema).optional(),
    name: z.lazy(() => SortOrderSchema).optional(),
    email: z.lazy(() => SortOrderSchema).optional(),
    passwordHash: z.lazy(() => SortOrderSchema).optional(),
    role: z.lazy(() => SortOrderSchema).optional(),
    isActive: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    _count: z.lazy(() => UserCountOrderByAggregateInputSchema).optional(),
    _max: z.lazy(() => UserMaxOrderByAggregateInputSchema).optional(),
    _min: z.lazy(() => UserMinOrderByAggregateInputSchema).optional(),
  });

export const UserScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserScalarWhereWithAggregatesInput> =
  z.strictObject({
    AND: z
      .union([
        z.lazy(() => UserScalarWhereWithAggregatesInputSchema),
        z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => UserScalarWhereWithAggregatesInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => UserScalarWhereWithAggregatesInputSchema),
        z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array(),
      ])
      .optional(),
    id: z
      .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
      .optional(),
    companyId: z
      .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
      .optional(),
    name: z
      .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
      .optional(),
    email: z
      .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
      .optional(),
    passwordHash: z
      .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
      .optional(),
    role: z
      .union([
        z.lazy(() => EnumUserRoleWithAggregatesFilterSchema),
        z.lazy(() => UserRoleSchema),
      ])
      .optional(),
    isActive: z
      .union([z.lazy(() => BoolWithAggregatesFilterSchema), z.boolean()])
      .optional(),
    createdAt: z
      .union([
        z.lazy(() => DateTimeWithAggregatesFilterSchema),
        z.coerce.date(),
      ])
      .optional(),
  });

export const OperationalEventWhereInputSchema: z.ZodType<Prisma.OperationalEventWhereInput> =
  z.strictObject({
    AND: z
      .union([
        z.lazy(() => OperationalEventWhereInputSchema),
        z.lazy(() => OperationalEventWhereInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => OperationalEventWhereInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => OperationalEventWhereInputSchema),
        z.lazy(() => OperationalEventWhereInputSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    company_id: z
      .union([z.lazy(() => StringFilterSchema), z.string()])
      .optional(),
    vehicle_id: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    driver_id: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    event_type: z
      .union([
        z.lazy(() => EnumEventTypeFilterSchema),
        z.lazy(() => EventTypeSchema),
      ])
      .optional(),
    event_datetime: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
    location: z
      .union([
        z.lazy(() => EnumLocationTypeNullableFilterSchema),
        z.lazy(() => LocationTypeSchema),
      ])
      .optional()
      .nullable(),
    context: z
      .union([
        z.lazy(() => EnumContextTypeNullableFilterSchema),
        z.lazy(() => ContextTypeSchema),
      ])
      .optional()
      .nullable(),
    general_result: z
      .union([
        z.lazy(() => EnumGeneralResultNullableFilterSchema),
        z.lazy(() => GeneralResultSchema),
      ])
      .optional()
      .nullable(),
    e_signature: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    final_observations: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    is_confirmed: z
      .union([z.lazy(() => BoolNullableFilterSchema), z.boolean()])
      .optional()
      .nullable(),
    created_by_user_id: z
      .union([z.lazy(() => StringFilterSchema), z.string()])
      .optional(),
    created_at: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
    updated_at: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
    company: z
      .union([
        z.lazy(() => CompanyScalarRelationFilterSchema),
        z.lazy(() => CompanyWhereInputSchema),
      ])
      .optional(),
    vehicle: z
      .union([
        z.lazy(() => VehicleNullableScalarRelationFilterSchema),
        z.lazy(() => VehicleWhereInputSchema),
      ])
      .optional()
      .nullable(),
    driver: z
      .union([
        z.lazy(() => DriverNullableScalarRelationFilterSchema),
        z.lazy(() => DriverWhereInputSchema),
      ])
      .optional()
      .nullable(),
    createdBy: z
      .union([
        z.lazy(() => UserScalarRelationFilterSchema),
        z.lazy(() => UserWhereInputSchema),
      ])
      .optional(),
  });

export const OperationalEventOrderByWithRelationInputSchema: z.ZodType<Prisma.OperationalEventOrderByWithRelationInput> =
  z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    company_id: z.lazy(() => SortOrderSchema).optional(),
    vehicle_id: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputSchema),
      ])
      .optional(),
    driver_id: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputSchema),
      ])
      .optional(),
    event_type: z.lazy(() => SortOrderSchema).optional(),
    event_datetime: z.lazy(() => SortOrderSchema).optional(),
    location: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputSchema),
      ])
      .optional(),
    context: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputSchema),
      ])
      .optional(),
    general_result: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputSchema),
      ])
      .optional(),
    e_signature: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputSchema),
      ])
      .optional(),
    final_observations: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputSchema),
      ])
      .optional(),
    is_confirmed: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputSchema),
      ])
      .optional(),
    created_by_user_id: z.lazy(() => SortOrderSchema).optional(),
    created_at: z.lazy(() => SortOrderSchema).optional(),
    updated_at: z.lazy(() => SortOrderSchema).optional(),
    company: z.lazy(() => CompanyOrderByWithRelationInputSchema).optional(),
    vehicle: z.lazy(() => VehicleOrderByWithRelationInputSchema).optional(),
    driver: z.lazy(() => DriverOrderByWithRelationInputSchema).optional(),
    createdBy: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  });

export const OperationalEventWhereUniqueInputSchema: z.ZodType<Prisma.OperationalEventWhereUniqueInput> =
  z
    .object({
      id: z.uuid(),
    })
    .and(
      z.strictObject({
        id: z.uuid().optional(),
        AND: z
          .union([
            z.lazy(() => OperationalEventWhereInputSchema),
            z.lazy(() => OperationalEventWhereInputSchema).array(),
          ])
          .optional(),
        OR: z
          .lazy(() => OperationalEventWhereInputSchema)
          .array()
          .optional(),
        NOT: z
          .union([
            z.lazy(() => OperationalEventWhereInputSchema),
            z.lazy(() => OperationalEventWhereInputSchema).array(),
          ])
          .optional(),
        company_id: z
          .union([z.lazy(() => StringFilterSchema), z.string()])
          .optional(),
        vehicle_id: z
          .union([z.lazy(() => StringNullableFilterSchema), z.string()])
          .optional()
          .nullable(),
        driver_id: z
          .union([z.lazy(() => StringNullableFilterSchema), z.string()])
          .optional()
          .nullable(),
        event_type: z
          .union([
            z.lazy(() => EnumEventTypeFilterSchema),
            z.lazy(() => EventTypeSchema),
          ])
          .optional(),
        event_datetime: z
          .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
          .optional(),
        location: z
          .union([
            z.lazy(() => EnumLocationTypeNullableFilterSchema),
            z.lazy(() => LocationTypeSchema),
          ])
          .optional()
          .nullable(),
        context: z
          .union([
            z.lazy(() => EnumContextTypeNullableFilterSchema),
            z.lazy(() => ContextTypeSchema),
          ])
          .optional()
          .nullable(),
        general_result: z
          .union([
            z.lazy(() => EnumGeneralResultNullableFilterSchema),
            z.lazy(() => GeneralResultSchema),
          ])
          .optional()
          .nullable(),
        e_signature: z
          .union([z.lazy(() => StringNullableFilterSchema), z.string()])
          .optional()
          .nullable(),
        final_observations: z
          .union([z.lazy(() => StringNullableFilterSchema), z.string()])
          .optional()
          .nullable(),
        is_confirmed: z
          .union([z.lazy(() => BoolNullableFilterSchema), z.boolean()])
          .optional()
          .nullable(),
        created_by_user_id: z
          .union([z.lazy(() => StringFilterSchema), z.string()])
          .optional(),
        created_at: z
          .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
          .optional(),
        updated_at: z
          .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
          .optional(),
        company: z
          .union([
            z.lazy(() => CompanyScalarRelationFilterSchema),
            z.lazy(() => CompanyWhereInputSchema),
          ])
          .optional(),
        vehicle: z
          .union([
            z.lazy(() => VehicleNullableScalarRelationFilterSchema),
            z.lazy(() => VehicleWhereInputSchema),
          ])
          .optional()
          .nullable(),
        driver: z
          .union([
            z.lazy(() => DriverNullableScalarRelationFilterSchema),
            z.lazy(() => DriverWhereInputSchema),
          ])
          .optional()
          .nullable(),
        createdBy: z
          .union([
            z.lazy(() => UserScalarRelationFilterSchema),
            z.lazy(() => UserWhereInputSchema),
          ])
          .optional(),
      }),
    );

export const OperationalEventOrderByWithAggregationInputSchema: z.ZodType<Prisma.OperationalEventOrderByWithAggregationInput> =
  z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    company_id: z.lazy(() => SortOrderSchema).optional(),
    vehicle_id: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputSchema),
      ])
      .optional(),
    driver_id: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputSchema),
      ])
      .optional(),
    event_type: z.lazy(() => SortOrderSchema).optional(),
    event_datetime: z.lazy(() => SortOrderSchema).optional(),
    location: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputSchema),
      ])
      .optional(),
    context: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputSchema),
      ])
      .optional(),
    general_result: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputSchema),
      ])
      .optional(),
    e_signature: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputSchema),
      ])
      .optional(),
    final_observations: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputSchema),
      ])
      .optional(),
    is_confirmed: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputSchema),
      ])
      .optional(),
    created_by_user_id: z.lazy(() => SortOrderSchema).optional(),
    created_at: z.lazy(() => SortOrderSchema).optional(),
    updated_at: z.lazy(() => SortOrderSchema).optional(),
    _count: z
      .lazy(() => OperationalEventCountOrderByAggregateInputSchema)
      .optional(),
    _max: z
      .lazy(() => OperationalEventMaxOrderByAggregateInputSchema)
      .optional(),
    _min: z
      .lazy(() => OperationalEventMinOrderByAggregateInputSchema)
      .optional(),
  });

export const OperationalEventScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.OperationalEventScalarWhereWithAggregatesInput> =
  z.strictObject({
    AND: z
      .union([
        z.lazy(() => OperationalEventScalarWhereWithAggregatesInputSchema),
        z
          .lazy(() => OperationalEventScalarWhereWithAggregatesInputSchema)
          .array(),
      ])
      .optional(),
    OR: z
      .lazy(() => OperationalEventScalarWhereWithAggregatesInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => OperationalEventScalarWhereWithAggregatesInputSchema),
        z
          .lazy(() => OperationalEventScalarWhereWithAggregatesInputSchema)
          .array(),
      ])
      .optional(),
    id: z
      .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
      .optional(),
    company_id: z
      .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
      .optional(),
    vehicle_id: z
      .union([
        z.lazy(() => StringNullableWithAggregatesFilterSchema),
        z.string(),
      ])
      .optional()
      .nullable(),
    driver_id: z
      .union([
        z.lazy(() => StringNullableWithAggregatesFilterSchema),
        z.string(),
      ])
      .optional()
      .nullable(),
    event_type: z
      .union([
        z.lazy(() => EnumEventTypeWithAggregatesFilterSchema),
        z.lazy(() => EventTypeSchema),
      ])
      .optional(),
    event_datetime: z
      .union([
        z.lazy(() => DateTimeWithAggregatesFilterSchema),
        z.coerce.date(),
      ])
      .optional(),
    location: z
      .union([
        z.lazy(() => EnumLocationTypeNullableWithAggregatesFilterSchema),
        z.lazy(() => LocationTypeSchema),
      ])
      .optional()
      .nullable(),
    context: z
      .union([
        z.lazy(() => EnumContextTypeNullableWithAggregatesFilterSchema),
        z.lazy(() => ContextTypeSchema),
      ])
      .optional()
      .nullable(),
    general_result: z
      .union([
        z.lazy(() => EnumGeneralResultNullableWithAggregatesFilterSchema),
        z.lazy(() => GeneralResultSchema),
      ])
      .optional()
      .nullable(),
    e_signature: z
      .union([
        z.lazy(() => StringNullableWithAggregatesFilterSchema),
        z.string(),
      ])
      .optional()
      .nullable(),
    final_observations: z
      .union([
        z.lazy(() => StringNullableWithAggregatesFilterSchema),
        z.string(),
      ])
      .optional()
      .nullable(),
    is_confirmed: z
      .union([
        z.lazy(() => BoolNullableWithAggregatesFilterSchema),
        z.boolean(),
      ])
      .optional()
      .nullable(),
    created_by_user_id: z
      .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
      .optional(),
    created_at: z
      .union([
        z.lazy(() => DateTimeWithAggregatesFilterSchema),
        z.coerce.date(),
      ])
      .optional(),
    updated_at: z
      .union([
        z.lazy(() => DateTimeWithAggregatesFilterSchema),
        z.coerce.date(),
      ])
      .optional(),
  });

export const CompanyCreateInputSchema: z.ZodType<Prisma.CompanyCreateInput> =
  z.strictObject({
    id: z.uuid().optional(),
    name: z.string(),
    usdotNumber: z.string(),
    state: z.string(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    vehicles: z
      .lazy(() => VehicleCreateNestedManyWithoutCompanyInputSchema)
      .optional(),
    drivers: z
      .lazy(() => DriverCreateNestedManyWithoutCompanyInputSchema)
      .optional(),
    users: z
      .lazy(() => UserCreateNestedManyWithoutCompanyInputSchema)
      .optional(),
    operational_events: z
      .lazy(() => OperationalEventCreateNestedManyWithoutCompanyInputSchema)
      .optional(),
  });

export const CompanyUncheckedCreateInputSchema: z.ZodType<Prisma.CompanyUncheckedCreateInput> =
  z.strictObject({
    id: z.uuid().optional(),
    name: z.string(),
    usdotNumber: z.string(),
    state: z.string(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    vehicles: z
      .lazy(() => VehicleUncheckedCreateNestedManyWithoutCompanyInputSchema)
      .optional(),
    drivers: z
      .lazy(() => DriverUncheckedCreateNestedManyWithoutCompanyInputSchema)
      .optional(),
    users: z
      .lazy(() => UserUncheckedCreateNestedManyWithoutCompanyInputSchema)
      .optional(),
    operational_events: z
      .lazy(
        () =>
          OperationalEventUncheckedCreateNestedManyWithoutCompanyInputSchema,
      )
      .optional(),
  });

export const CompanyUpdateInputSchema: z.ZodType<Prisma.CompanyUpdateInput> =
  z.strictObject({
    id: z
      .union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    name: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    usdotNumber: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    state: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    vehicles: z
      .lazy(() => VehicleUpdateManyWithoutCompanyNestedInputSchema)
      .optional(),
    drivers: z
      .lazy(() => DriverUpdateManyWithoutCompanyNestedInputSchema)
      .optional(),
    users: z
      .lazy(() => UserUpdateManyWithoutCompanyNestedInputSchema)
      .optional(),
    operational_events: z
      .lazy(() => OperationalEventUpdateManyWithoutCompanyNestedInputSchema)
      .optional(),
  });

export const CompanyUncheckedUpdateInputSchema: z.ZodType<Prisma.CompanyUncheckedUpdateInput> =
  z.strictObject({
    id: z
      .union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    name: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    usdotNumber: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    state: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    vehicles: z
      .lazy(() => VehicleUncheckedUpdateManyWithoutCompanyNestedInputSchema)
      .optional(),
    drivers: z
      .lazy(() => DriverUncheckedUpdateManyWithoutCompanyNestedInputSchema)
      .optional(),
    users: z
      .lazy(() => UserUncheckedUpdateManyWithoutCompanyNestedInputSchema)
      .optional(),
    operational_events: z
      .lazy(
        () =>
          OperationalEventUncheckedUpdateManyWithoutCompanyNestedInputSchema,
      )
      .optional(),
  });

export const CompanyCreateManyInputSchema: z.ZodType<Prisma.CompanyCreateManyInput> =
  z.strictObject({
    id: z.uuid().optional(),
    name: z.string(),
    usdotNumber: z.string(),
    state: z.string(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
  });

export const CompanyUpdateManyMutationInputSchema: z.ZodType<Prisma.CompanyUpdateManyMutationInput> =
  z.strictObject({
    id: z
      .union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    name: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    usdotNumber: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    state: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
  });

export const CompanyUncheckedUpdateManyInputSchema: z.ZodType<Prisma.CompanyUncheckedUpdateManyInput> =
  z.strictObject({
    id: z
      .union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    name: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    usdotNumber: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    state: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
  });

export const VehicleCreateInputSchema: z.ZodType<Prisma.VehicleCreateInput> =
  z.strictObject({
    id: z.uuid().optional(),
    unit_number: z.string().optional().nullable(),
    plate: z.string().optional().nullable(),
    is_active: z.boolean().optional(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    company: z.lazy(() => CompanyCreateNestedOneWithoutVehiclesInputSchema),
    driver: z
      .lazy(() => DriverCreateNestedOneWithoutVehicleInputSchema)
      .optional(),
    operational_events: z
      .lazy(() => OperationalEventCreateNestedManyWithoutVehicleInputSchema)
      .optional(),
  });

export const VehicleUncheckedCreateInputSchema: z.ZodType<Prisma.VehicleUncheckedCreateInput> =
  z.strictObject({
    id: z.uuid().optional(),
    companyId: z.string(),
    driverId: z.string().optional().nullable(),
    unit_number: z.string().optional().nullable(),
    plate: z.string().optional().nullable(),
    is_active: z.boolean().optional(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    operational_events: z
      .lazy(
        () =>
          OperationalEventUncheckedCreateNestedManyWithoutVehicleInputSchema,
      )
      .optional(),
  });

export const VehicleUpdateInputSchema: z.ZodType<Prisma.VehicleUpdateInput> =
  z.strictObject({
    id: z
      .union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    unit_number: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    plate: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    is_active: z
      .union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)])
      .optional(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    company: z
      .lazy(() => CompanyUpdateOneRequiredWithoutVehiclesNestedInputSchema)
      .optional(),
    driver: z
      .lazy(() => DriverUpdateOneWithoutVehicleNestedInputSchema)
      .optional(),
    operational_events: z
      .lazy(() => OperationalEventUpdateManyWithoutVehicleNestedInputSchema)
      .optional(),
  });

export const VehicleUncheckedUpdateInputSchema: z.ZodType<Prisma.VehicleUncheckedUpdateInput> =
  z.strictObject({
    id: z
      .union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    companyId: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    driverId: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    unit_number: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    plate: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    is_active: z
      .union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)])
      .optional(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    operational_events: z
      .lazy(
        () =>
          OperationalEventUncheckedUpdateManyWithoutVehicleNestedInputSchema,
      )
      .optional(),
  });

export const VehicleCreateManyInputSchema: z.ZodType<Prisma.VehicleCreateManyInput> =
  z.strictObject({
    id: z.uuid().optional(),
    companyId: z.string(),
    driverId: z.string().optional().nullable(),
    unit_number: z.string().optional().nullable(),
    plate: z.string().optional().nullable(),
    is_active: z.boolean().optional(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
  });

export const VehicleUpdateManyMutationInputSchema: z.ZodType<Prisma.VehicleUpdateManyMutationInput> =
  z.strictObject({
    id: z
      .union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    unit_number: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    plate: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    is_active: z
      .union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)])
      .optional(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
  });

export const VehicleUncheckedUpdateManyInputSchema: z.ZodType<Prisma.VehicleUncheckedUpdateManyInput> =
  z.strictObject({
    id: z
      .union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    companyId: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    driverId: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    unit_number: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    plate: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    is_active: z
      .union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)])
      .optional(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
  });

export const DriverCreateInputSchema: z.ZodType<Prisma.DriverCreateInput> =
  z.strictObject({
    id: z.uuid().optional(),
    name: z.string(),
    license_number: z.string(),
    is_active: z.boolean().optional(),
    created_at: z.coerce.date().optional(),
    updated_at: z.coerce.date().optional(),
    company: z.lazy(() => CompanyCreateNestedOneWithoutDriversInputSchema),
    vehicle: z
      .lazy(() => VehicleCreateNestedOneWithoutDriverInputSchema)
      .optional(),
    operational_events: z
      .lazy(() => OperationalEventCreateNestedManyWithoutDriverInputSchema)
      .optional(),
  });

export const DriverUncheckedCreateInputSchema: z.ZodType<Prisma.DriverUncheckedCreateInput> =
  z.strictObject({
    id: z.uuid().optional(),
    companyId: z.string(),
    name: z.string(),
    license_number: z.string(),
    is_active: z.boolean().optional(),
    created_at: z.coerce.date().optional(),
    updated_at: z.coerce.date().optional(),
    vehicle: z
      .lazy(() => VehicleUncheckedCreateNestedOneWithoutDriverInputSchema)
      .optional(),
    operational_events: z
      .lazy(
        () => OperationalEventUncheckedCreateNestedManyWithoutDriverInputSchema,
      )
      .optional(),
  });

export const DriverUpdateInputSchema: z.ZodType<Prisma.DriverUpdateInput> =
  z.strictObject({
    id: z
      .union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    name: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    license_number: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    is_active: z
      .union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)])
      .optional(),
    created_at: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updated_at: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    company: z
      .lazy(() => CompanyUpdateOneRequiredWithoutDriversNestedInputSchema)
      .optional(),
    vehicle: z
      .lazy(() => VehicleUpdateOneWithoutDriverNestedInputSchema)
      .optional(),
    operational_events: z
      .lazy(() => OperationalEventUpdateManyWithoutDriverNestedInputSchema)
      .optional(),
  });

export const DriverUncheckedUpdateInputSchema: z.ZodType<Prisma.DriverUncheckedUpdateInput> =
  z.strictObject({
    id: z
      .union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    companyId: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    name: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    license_number: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    is_active: z
      .union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)])
      .optional(),
    created_at: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updated_at: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    vehicle: z
      .lazy(() => VehicleUncheckedUpdateOneWithoutDriverNestedInputSchema)
      .optional(),
    operational_events: z
      .lazy(
        () => OperationalEventUncheckedUpdateManyWithoutDriverNestedInputSchema,
      )
      .optional(),
  });

export const DriverCreateManyInputSchema: z.ZodType<Prisma.DriverCreateManyInput> =
  z.strictObject({
    id: z.uuid().optional(),
    companyId: z.string(),
    name: z.string(),
    license_number: z.string(),
    is_active: z.boolean().optional(),
    created_at: z.coerce.date().optional(),
    updated_at: z.coerce.date().optional(),
  });

export const DriverUpdateManyMutationInputSchema: z.ZodType<Prisma.DriverUpdateManyMutationInput> =
  z.strictObject({
    id: z
      .union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    name: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    license_number: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    is_active: z
      .union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)])
      .optional(),
    created_at: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updated_at: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
  });

export const DriverUncheckedUpdateManyInputSchema: z.ZodType<Prisma.DriverUncheckedUpdateManyInput> =
  z.strictObject({
    id: z
      .union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    companyId: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    name: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    license_number: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    is_active: z
      .union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)])
      .optional(),
    created_at: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updated_at: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
  });

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> =
  z.strictObject({
    id: z.uuid().optional(),
    name: z.string(),
    email: z.string(),
    passwordHash: z.string(),
    role: z.lazy(() => UserRoleSchema).optional(),
    isActive: z.boolean().optional(),
    createdAt: z.coerce.date().optional(),
    company: z.lazy(() => CompanyCreateNestedOneWithoutUsersInputSchema),
    operational_events: z
      .lazy(() => OperationalEventCreateNestedManyWithoutCreatedByInputSchema)
      .optional(),
  });

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> =
  z.strictObject({
    id: z.uuid().optional(),
    companyId: z.string(),
    name: z.string(),
    email: z.string(),
    passwordHash: z.string(),
    role: z.lazy(() => UserRoleSchema).optional(),
    isActive: z.boolean().optional(),
    createdAt: z.coerce.date().optional(),
    operational_events: z
      .lazy(
        () =>
          OperationalEventUncheckedCreateNestedManyWithoutCreatedByInputSchema,
      )
      .optional(),
  });

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> =
  z.strictObject({
    id: z
      .union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    name: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    email: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    passwordHash: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    role: z
      .union([
        z.lazy(() => UserRoleSchema),
        z.lazy(() => EnumUserRoleFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    isActive: z
      .union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)])
      .optional(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    company: z
      .lazy(() => CompanyUpdateOneRequiredWithoutUsersNestedInputSchema)
      .optional(),
    operational_events: z
      .lazy(() => OperationalEventUpdateManyWithoutCreatedByNestedInputSchema)
      .optional(),
  });

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> =
  z.strictObject({
    id: z
      .union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    companyId: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    name: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    email: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    passwordHash: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    role: z
      .union([
        z.lazy(() => UserRoleSchema),
        z.lazy(() => EnumUserRoleFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    isActive: z
      .union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)])
      .optional(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    operational_events: z
      .lazy(
        () =>
          OperationalEventUncheckedUpdateManyWithoutCreatedByNestedInputSchema,
      )
      .optional(),
  });

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> =
  z.strictObject({
    id: z.uuid().optional(),
    companyId: z.string(),
    name: z.string(),
    email: z.string(),
    passwordHash: z.string(),
    role: z.lazy(() => UserRoleSchema).optional(),
    isActive: z.boolean().optional(),
    createdAt: z.coerce.date().optional(),
  });

export const UserUpdateManyMutationInputSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> =
  z.strictObject({
    id: z
      .union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    name: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    email: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    passwordHash: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    role: z
      .union([
        z.lazy(() => UserRoleSchema),
        z.lazy(() => EnumUserRoleFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    isActive: z
      .union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)])
      .optional(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
  });

export const UserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> =
  z.strictObject({
    id: z
      .union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    companyId: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    name: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    email: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    passwordHash: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    role: z
      .union([
        z.lazy(() => UserRoleSchema),
        z.lazy(() => EnumUserRoleFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    isActive: z
      .union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)])
      .optional(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
  });

export const OperationalEventCreateInputSchema: z.ZodType<Prisma.OperationalEventCreateInput> =
  z.strictObject({
    id: z.uuid().optional(),
    event_type: z.lazy(() => EventTypeSchema),
    event_datetime: z.coerce.date(),
    location: z
      .lazy(() => LocationTypeSchema)
      .optional()
      .nullable(),
    context: z
      .lazy(() => ContextTypeSchema)
      .optional()
      .nullable(),
    general_result: z
      .lazy(() => GeneralResultSchema)
      .optional()
      .nullable(),
    e_signature: z.string().optional().nullable(),
    final_observations: z.string().optional().nullable(),
    is_confirmed: z.boolean().optional().nullable(),
    created_at: z.coerce.date().optional(),
    updated_at: z.coerce.date().optional(),
    company: z.lazy(
      () => CompanyCreateNestedOneWithoutOperational_eventsInputSchema,
    ),
    vehicle: z
      .lazy(() => VehicleCreateNestedOneWithoutOperational_eventsInputSchema)
      .optional(),
    driver: z
      .lazy(() => DriverCreateNestedOneWithoutOperational_eventsInputSchema)
      .optional(),
    createdBy: z.lazy(
      () => UserCreateNestedOneWithoutOperational_eventsInputSchema,
    ),
  });

export const OperationalEventUncheckedCreateInputSchema: z.ZodType<Prisma.OperationalEventUncheckedCreateInput> =
  z.strictObject({
    id: z.uuid().optional(),
    company_id: z.string(),
    vehicle_id: z.string().optional().nullable(),
    driver_id: z.string().optional().nullable(),
    event_type: z.lazy(() => EventTypeSchema),
    event_datetime: z.coerce.date(),
    location: z
      .lazy(() => LocationTypeSchema)
      .optional()
      .nullable(),
    context: z
      .lazy(() => ContextTypeSchema)
      .optional()
      .nullable(),
    general_result: z
      .lazy(() => GeneralResultSchema)
      .optional()
      .nullable(),
    e_signature: z.string().optional().nullable(),
    final_observations: z.string().optional().nullable(),
    is_confirmed: z.boolean().optional().nullable(),
    created_by_user_id: z.string(),
    created_at: z.coerce.date().optional(),
    updated_at: z.coerce.date().optional(),
  });

export const OperationalEventUpdateInputSchema: z.ZodType<Prisma.OperationalEventUpdateInput> =
  z.strictObject({
    id: z
      .union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    event_type: z
      .union([
        z.lazy(() => EventTypeSchema),
        z.lazy(() => EnumEventTypeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    event_datetime: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    location: z
      .union([
        z.lazy(() => LocationTypeSchema),
        z.lazy(() => NullableEnumLocationTypeFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    context: z
      .union([
        z.lazy(() => ContextTypeSchema),
        z.lazy(() => NullableEnumContextTypeFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    general_result: z
      .union([
        z.lazy(() => GeneralResultSchema),
        z.lazy(() => NullableEnumGeneralResultFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    e_signature: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    final_observations: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    is_confirmed: z
      .union([
        z.boolean(),
        z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    created_at: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updated_at: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    company: z
      .lazy(
        () =>
          CompanyUpdateOneRequiredWithoutOperational_eventsNestedInputSchema,
      )
      .optional(),
    vehicle: z
      .lazy(() => VehicleUpdateOneWithoutOperational_eventsNestedInputSchema)
      .optional(),
    driver: z
      .lazy(() => DriverUpdateOneWithoutOperational_eventsNestedInputSchema)
      .optional(),
    createdBy: z
      .lazy(
        () => UserUpdateOneRequiredWithoutOperational_eventsNestedInputSchema,
      )
      .optional(),
  });

export const OperationalEventUncheckedUpdateInputSchema: z.ZodType<Prisma.OperationalEventUncheckedUpdateInput> =
  z.strictObject({
    id: z
      .union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    company_id: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    vehicle_id: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    driver_id: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    event_type: z
      .union([
        z.lazy(() => EventTypeSchema),
        z.lazy(() => EnumEventTypeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    event_datetime: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    location: z
      .union([
        z.lazy(() => LocationTypeSchema),
        z.lazy(() => NullableEnumLocationTypeFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    context: z
      .union([
        z.lazy(() => ContextTypeSchema),
        z.lazy(() => NullableEnumContextTypeFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    general_result: z
      .union([
        z.lazy(() => GeneralResultSchema),
        z.lazy(() => NullableEnumGeneralResultFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    e_signature: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    final_observations: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    is_confirmed: z
      .union([
        z.boolean(),
        z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    created_by_user_id: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    created_at: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updated_at: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
  });

export const OperationalEventCreateManyInputSchema: z.ZodType<Prisma.OperationalEventCreateManyInput> =
  z.strictObject({
    id: z.uuid().optional(),
    company_id: z.string(),
    vehicle_id: z.string().optional().nullable(),
    driver_id: z.string().optional().nullable(),
    event_type: z.lazy(() => EventTypeSchema),
    event_datetime: z.coerce.date(),
    location: z
      .lazy(() => LocationTypeSchema)
      .optional()
      .nullable(),
    context: z
      .lazy(() => ContextTypeSchema)
      .optional()
      .nullable(),
    general_result: z
      .lazy(() => GeneralResultSchema)
      .optional()
      .nullable(),
    e_signature: z.string().optional().nullable(),
    final_observations: z.string().optional().nullable(),
    is_confirmed: z.boolean().optional().nullable(),
    created_by_user_id: z.string(),
    created_at: z.coerce.date().optional(),
    updated_at: z.coerce.date().optional(),
  });

export const OperationalEventUpdateManyMutationInputSchema: z.ZodType<Prisma.OperationalEventUpdateManyMutationInput> =
  z.strictObject({
    id: z
      .union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    event_type: z
      .union([
        z.lazy(() => EventTypeSchema),
        z.lazy(() => EnumEventTypeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    event_datetime: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    location: z
      .union([
        z.lazy(() => LocationTypeSchema),
        z.lazy(() => NullableEnumLocationTypeFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    context: z
      .union([
        z.lazy(() => ContextTypeSchema),
        z.lazy(() => NullableEnumContextTypeFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    general_result: z
      .union([
        z.lazy(() => GeneralResultSchema),
        z.lazy(() => NullableEnumGeneralResultFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    e_signature: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    final_observations: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    is_confirmed: z
      .union([
        z.boolean(),
        z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    created_at: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updated_at: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
  });

export const OperationalEventUncheckedUpdateManyInputSchema: z.ZodType<Prisma.OperationalEventUncheckedUpdateManyInput> =
  z.strictObject({
    id: z
      .union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    company_id: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    vehicle_id: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    driver_id: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    event_type: z
      .union([
        z.lazy(() => EventTypeSchema),
        z.lazy(() => EnumEventTypeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    event_datetime: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    location: z
      .union([
        z.lazy(() => LocationTypeSchema),
        z.lazy(() => NullableEnumLocationTypeFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    context: z
      .union([
        z.lazy(() => ContextTypeSchema),
        z.lazy(() => NullableEnumContextTypeFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    general_result: z
      .union([
        z.lazy(() => GeneralResultSchema),
        z.lazy(() => NullableEnumGeneralResultFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    e_signature: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    final_observations: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    is_confirmed: z
      .union([
        z.boolean(),
        z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    created_by_user_id: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    created_at: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updated_at: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
  });

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> =
  z.strictObject({
    equals: z.string().optional(),
    in: z.string().array().optional(),
    notIn: z.string().array().optional(),
    lt: z.string().optional(),
    lte: z.string().optional(),
    gt: z.string().optional(),
    gte: z.string().optional(),
    contains: z.string().optional(),
    startsWith: z.string().optional(),
    endsWith: z.string().optional(),
    mode: z.lazy(() => QueryModeSchema).optional(),
    not: z
      .union([z.string(), z.lazy(() => NestedStringFilterSchema)])
      .optional(),
  });

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> =
  z.strictObject({
    equals: z.coerce.date().optional(),
    in: z.coerce.date().array().optional(),
    notIn: z.coerce.date().array().optional(),
    lt: z.coerce.date().optional(),
    lte: z.coerce.date().optional(),
    gt: z.coerce.date().optional(),
    gte: z.coerce.date().optional(),
    not: z
      .union([z.coerce.date(), z.lazy(() => NestedDateTimeFilterSchema)])
      .optional(),
  });

export const VehicleListRelationFilterSchema: z.ZodType<Prisma.VehicleListRelationFilter> =
  z.strictObject({
    every: z.lazy(() => VehicleWhereInputSchema).optional(),
    some: z.lazy(() => VehicleWhereInputSchema).optional(),
    none: z.lazy(() => VehicleWhereInputSchema).optional(),
  });

export const DriverListRelationFilterSchema: z.ZodType<Prisma.DriverListRelationFilter> =
  z.strictObject({
    every: z.lazy(() => DriverWhereInputSchema).optional(),
    some: z.lazy(() => DriverWhereInputSchema).optional(),
    none: z.lazy(() => DriverWhereInputSchema).optional(),
  });

export const UserListRelationFilterSchema: z.ZodType<Prisma.UserListRelationFilter> =
  z.strictObject({
    every: z.lazy(() => UserWhereInputSchema).optional(),
    some: z.lazy(() => UserWhereInputSchema).optional(),
    none: z.lazy(() => UserWhereInputSchema).optional(),
  });

export const OperationalEventListRelationFilterSchema: z.ZodType<Prisma.OperationalEventListRelationFilter> =
  z.strictObject({
    every: z.lazy(() => OperationalEventWhereInputSchema).optional(),
    some: z.lazy(() => OperationalEventWhereInputSchema).optional(),
    none: z.lazy(() => OperationalEventWhereInputSchema).optional(),
  });

export const VehicleOrderByRelationAggregateInputSchema: z.ZodType<Prisma.VehicleOrderByRelationAggregateInput> =
  z.strictObject({
    _count: z.lazy(() => SortOrderSchema).optional(),
  });

export const DriverOrderByRelationAggregateInputSchema: z.ZodType<Prisma.DriverOrderByRelationAggregateInput> =
  z.strictObject({
    _count: z.lazy(() => SortOrderSchema).optional(),
  });

export const UserOrderByRelationAggregateInputSchema: z.ZodType<Prisma.UserOrderByRelationAggregateInput> =
  z.strictObject({
    _count: z.lazy(() => SortOrderSchema).optional(),
  });

export const OperationalEventOrderByRelationAggregateInputSchema: z.ZodType<Prisma.OperationalEventOrderByRelationAggregateInput> =
  z.strictObject({
    _count: z.lazy(() => SortOrderSchema).optional(),
  });

export const CompanyCountOrderByAggregateInputSchema: z.ZodType<Prisma.CompanyCountOrderByAggregateInput> =
  z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    name: z.lazy(() => SortOrderSchema).optional(),
    usdotNumber: z.lazy(() => SortOrderSchema).optional(),
    state: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
  });

export const CompanyMaxOrderByAggregateInputSchema: z.ZodType<Prisma.CompanyMaxOrderByAggregateInput> =
  z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    name: z.lazy(() => SortOrderSchema).optional(),
    usdotNumber: z.lazy(() => SortOrderSchema).optional(),
    state: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
  });

export const CompanyMinOrderByAggregateInputSchema: z.ZodType<Prisma.CompanyMinOrderByAggregateInput> =
  z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    name: z.lazy(() => SortOrderSchema).optional(),
    usdotNumber: z.lazy(() => SortOrderSchema).optional(),
    state: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
  });

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> =
  z.strictObject({
    equals: z.string().optional(),
    in: z.string().array().optional(),
    notIn: z.string().array().optional(),
    lt: z.string().optional(),
    lte: z.string().optional(),
    gt: z.string().optional(),
    gte: z.string().optional(),
    contains: z.string().optional(),
    startsWith: z.string().optional(),
    endsWith: z.string().optional(),
    mode: z.lazy(() => QueryModeSchema).optional(),
    not: z
      .union([z.string(), z.lazy(() => NestedStringWithAggregatesFilterSchema)])
      .optional(),
    _count: z.lazy(() => NestedIntFilterSchema).optional(),
    _min: z.lazy(() => NestedStringFilterSchema).optional(),
    _max: z.lazy(() => NestedStringFilterSchema).optional(),
  });

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> =
  z.strictObject({
    equals: z.coerce.date().optional(),
    in: z.coerce.date().array().optional(),
    notIn: z.coerce.date().array().optional(),
    lt: z.coerce.date().optional(),
    lte: z.coerce.date().optional(),
    gt: z.coerce.date().optional(),
    gte: z.coerce.date().optional(),
    not: z
      .union([
        z.coerce.date(),
        z.lazy(() => NestedDateTimeWithAggregatesFilterSchema),
      ])
      .optional(),
    _count: z.lazy(() => NestedIntFilterSchema).optional(),
    _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
    _max: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  });

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> =
  z.strictObject({
    equals: z.string().optional().nullable(),
    in: z.string().array().optional().nullable(),
    notIn: z.string().array().optional().nullable(),
    lt: z.string().optional(),
    lte: z.string().optional(),
    gt: z.string().optional(),
    gte: z.string().optional(),
    contains: z.string().optional(),
    startsWith: z.string().optional(),
    endsWith: z.string().optional(),
    mode: z.lazy(() => QueryModeSchema).optional(),
    not: z
      .union([z.string(), z.lazy(() => NestedStringNullableFilterSchema)])
      .optional()
      .nullable(),
  });

export const BoolFilterSchema: z.ZodType<Prisma.BoolFilter> = z.strictObject({
  equals: z.boolean().optional(),
  not: z.union([z.boolean(), z.lazy(() => NestedBoolFilterSchema)]).optional(),
});

export const CompanyScalarRelationFilterSchema: z.ZodType<Prisma.CompanyScalarRelationFilter> =
  z.strictObject({
    is: z.lazy(() => CompanyWhereInputSchema).optional(),
    isNot: z.lazy(() => CompanyWhereInputSchema).optional(),
  });

export const DriverNullableScalarRelationFilterSchema: z.ZodType<Prisma.DriverNullableScalarRelationFilter> =
  z.strictObject({
    is: z
      .lazy(() => DriverWhereInputSchema)
      .optional()
      .nullable(),
    isNot: z
      .lazy(() => DriverWhereInputSchema)
      .optional()
      .nullable(),
  });

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> =
  z.strictObject({
    sort: z.lazy(() => SortOrderSchema),
    nulls: z.lazy(() => NullsOrderSchema).optional(),
  });

export const VehicleCountOrderByAggregateInputSchema: z.ZodType<Prisma.VehicleCountOrderByAggregateInput> =
  z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    companyId: z.lazy(() => SortOrderSchema).optional(),
    driverId: z.lazy(() => SortOrderSchema).optional(),
    unit_number: z.lazy(() => SortOrderSchema).optional(),
    plate: z.lazy(() => SortOrderSchema).optional(),
    is_active: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
  });

export const VehicleMaxOrderByAggregateInputSchema: z.ZodType<Prisma.VehicleMaxOrderByAggregateInput> =
  z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    companyId: z.lazy(() => SortOrderSchema).optional(),
    driverId: z.lazy(() => SortOrderSchema).optional(),
    unit_number: z.lazy(() => SortOrderSchema).optional(),
    plate: z.lazy(() => SortOrderSchema).optional(),
    is_active: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
  });

export const VehicleMinOrderByAggregateInputSchema: z.ZodType<Prisma.VehicleMinOrderByAggregateInput> =
  z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    companyId: z.lazy(() => SortOrderSchema).optional(),
    driverId: z.lazy(() => SortOrderSchema).optional(),
    unit_number: z.lazy(() => SortOrderSchema).optional(),
    plate: z.lazy(() => SortOrderSchema).optional(),
    is_active: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
  });

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> =
  z.strictObject({
    equals: z.string().optional().nullable(),
    in: z.string().array().optional().nullable(),
    notIn: z.string().array().optional().nullable(),
    lt: z.string().optional(),
    lte: z.string().optional(),
    gt: z.string().optional(),
    gte: z.string().optional(),
    contains: z.string().optional(),
    startsWith: z.string().optional(),
    endsWith: z.string().optional(),
    mode: z.lazy(() => QueryModeSchema).optional(),
    not: z
      .union([
        z.string(),
        z.lazy(() => NestedStringNullableWithAggregatesFilterSchema),
      ])
      .optional()
      .nullable(),
    _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
    _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
    _max: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  });

export const BoolWithAggregatesFilterSchema: z.ZodType<Prisma.BoolWithAggregatesFilter> =
  z.strictObject({
    equals: z.boolean().optional(),
    not: z
      .union([z.boolean(), z.lazy(() => NestedBoolWithAggregatesFilterSchema)])
      .optional(),
    _count: z.lazy(() => NestedIntFilterSchema).optional(),
    _min: z.lazy(() => NestedBoolFilterSchema).optional(),
    _max: z.lazy(() => NestedBoolFilterSchema).optional(),
  });

export const VehicleNullableScalarRelationFilterSchema: z.ZodType<Prisma.VehicleNullableScalarRelationFilter> =
  z.strictObject({
    is: z
      .lazy(() => VehicleWhereInputSchema)
      .optional()
      .nullable(),
    isNot: z
      .lazy(() => VehicleWhereInputSchema)
      .optional()
      .nullable(),
  });

export const DriverCountOrderByAggregateInputSchema: z.ZodType<Prisma.DriverCountOrderByAggregateInput> =
  z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    companyId: z.lazy(() => SortOrderSchema).optional(),
    name: z.lazy(() => SortOrderSchema).optional(),
    license_number: z.lazy(() => SortOrderSchema).optional(),
    is_active: z.lazy(() => SortOrderSchema).optional(),
    created_at: z.lazy(() => SortOrderSchema).optional(),
    updated_at: z.lazy(() => SortOrderSchema).optional(),
  });

export const DriverMaxOrderByAggregateInputSchema: z.ZodType<Prisma.DriverMaxOrderByAggregateInput> =
  z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    companyId: z.lazy(() => SortOrderSchema).optional(),
    name: z.lazy(() => SortOrderSchema).optional(),
    license_number: z.lazy(() => SortOrderSchema).optional(),
    is_active: z.lazy(() => SortOrderSchema).optional(),
    created_at: z.lazy(() => SortOrderSchema).optional(),
    updated_at: z.lazy(() => SortOrderSchema).optional(),
  });

export const DriverMinOrderByAggregateInputSchema: z.ZodType<Prisma.DriverMinOrderByAggregateInput> =
  z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    companyId: z.lazy(() => SortOrderSchema).optional(),
    name: z.lazy(() => SortOrderSchema).optional(),
    license_number: z.lazy(() => SortOrderSchema).optional(),
    is_active: z.lazy(() => SortOrderSchema).optional(),
    created_at: z.lazy(() => SortOrderSchema).optional(),
    updated_at: z.lazy(() => SortOrderSchema).optional(),
  });

export const EnumUserRoleFilterSchema: z.ZodType<Prisma.EnumUserRoleFilter> =
  z.strictObject({
    equals: z.lazy(() => UserRoleSchema).optional(),
    in: z
      .lazy(() => UserRoleSchema)
      .array()
      .optional(),
    notIn: z
      .lazy(() => UserRoleSchema)
      .array()
      .optional(),
    not: z
      .union([
        z.lazy(() => UserRoleSchema),
        z.lazy(() => NestedEnumUserRoleFilterSchema),
      ])
      .optional(),
  });

export const UserIdCompanyIdCompoundUniqueInputSchema: z.ZodType<Prisma.UserIdCompanyIdCompoundUniqueInput> =
  z.strictObject({
    id: z.string(),
    companyId: z.string(),
  });

export const UserCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> =
  z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    companyId: z.lazy(() => SortOrderSchema).optional(),
    name: z.lazy(() => SortOrderSchema).optional(),
    email: z.lazy(() => SortOrderSchema).optional(),
    passwordHash: z.lazy(() => SortOrderSchema).optional(),
    role: z.lazy(() => SortOrderSchema).optional(),
    isActive: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
  });

export const UserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> =
  z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    companyId: z.lazy(() => SortOrderSchema).optional(),
    name: z.lazy(() => SortOrderSchema).optional(),
    email: z.lazy(() => SortOrderSchema).optional(),
    passwordHash: z.lazy(() => SortOrderSchema).optional(),
    role: z.lazy(() => SortOrderSchema).optional(),
    isActive: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
  });

export const UserMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> =
  z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    companyId: z.lazy(() => SortOrderSchema).optional(),
    name: z.lazy(() => SortOrderSchema).optional(),
    email: z.lazy(() => SortOrderSchema).optional(),
    passwordHash: z.lazy(() => SortOrderSchema).optional(),
    role: z.lazy(() => SortOrderSchema).optional(),
    isActive: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
  });

export const EnumUserRoleWithAggregatesFilterSchema: z.ZodType<Prisma.EnumUserRoleWithAggregatesFilter> =
  z.strictObject({
    equals: z.lazy(() => UserRoleSchema).optional(),
    in: z
      .lazy(() => UserRoleSchema)
      .array()
      .optional(),
    notIn: z
      .lazy(() => UserRoleSchema)
      .array()
      .optional(),
    not: z
      .union([
        z.lazy(() => UserRoleSchema),
        z.lazy(() => NestedEnumUserRoleWithAggregatesFilterSchema),
      ])
      .optional(),
    _count: z.lazy(() => NestedIntFilterSchema).optional(),
    _min: z.lazy(() => NestedEnumUserRoleFilterSchema).optional(),
    _max: z.lazy(() => NestedEnumUserRoleFilterSchema).optional(),
  });

export const EnumEventTypeFilterSchema: z.ZodType<Prisma.EnumEventTypeFilter> =
  z.strictObject({
    equals: z.lazy(() => EventTypeSchema).optional(),
    in: z
      .lazy(() => EventTypeSchema)
      .array()
      .optional(),
    notIn: z
      .lazy(() => EventTypeSchema)
      .array()
      .optional(),
    not: z
      .union([
        z.lazy(() => EventTypeSchema),
        z.lazy(() => NestedEnumEventTypeFilterSchema),
      ])
      .optional(),
  });

export const EnumLocationTypeNullableFilterSchema: z.ZodType<Prisma.EnumLocationTypeNullableFilter> =
  z.strictObject({
    equals: z
      .lazy(() => LocationTypeSchema)
      .optional()
      .nullable(),
    in: z
      .lazy(() => LocationTypeSchema)
      .array()
      .optional()
      .nullable(),
    notIn: z
      .lazy(() => LocationTypeSchema)
      .array()
      .optional()
      .nullable(),
    not: z
      .union([
        z.lazy(() => LocationTypeSchema),
        z.lazy(() => NestedEnumLocationTypeNullableFilterSchema),
      ])
      .optional()
      .nullable(),
  });

export const EnumContextTypeNullableFilterSchema: z.ZodType<Prisma.EnumContextTypeNullableFilter> =
  z.strictObject({
    equals: z
      .lazy(() => ContextTypeSchema)
      .optional()
      .nullable(),
    in: z
      .lazy(() => ContextTypeSchema)
      .array()
      .optional()
      .nullable(),
    notIn: z
      .lazy(() => ContextTypeSchema)
      .array()
      .optional()
      .nullable(),
    not: z
      .union([
        z.lazy(() => ContextTypeSchema),
        z.lazy(() => NestedEnumContextTypeNullableFilterSchema),
      ])
      .optional()
      .nullable(),
  });

export const EnumGeneralResultNullableFilterSchema: z.ZodType<Prisma.EnumGeneralResultNullableFilter> =
  z.strictObject({
    equals: z
      .lazy(() => GeneralResultSchema)
      .optional()
      .nullable(),
    in: z
      .lazy(() => GeneralResultSchema)
      .array()
      .optional()
      .nullable(),
    notIn: z
      .lazy(() => GeneralResultSchema)
      .array()
      .optional()
      .nullable(),
    not: z
      .union([
        z.lazy(() => GeneralResultSchema),
        z.lazy(() => NestedEnumGeneralResultNullableFilterSchema),
      ])
      .optional()
      .nullable(),
  });

export const BoolNullableFilterSchema: z.ZodType<Prisma.BoolNullableFilter> =
  z.strictObject({
    equals: z.boolean().optional().nullable(),
    not: z
      .union([z.boolean(), z.lazy(() => NestedBoolNullableFilterSchema)])
      .optional()
      .nullable(),
  });

export const UserScalarRelationFilterSchema: z.ZodType<Prisma.UserScalarRelationFilter> =
  z.strictObject({
    is: z.lazy(() => UserWhereInputSchema).optional(),
    isNot: z.lazy(() => UserWhereInputSchema).optional(),
  });

export const OperationalEventCountOrderByAggregateInputSchema: z.ZodType<Prisma.OperationalEventCountOrderByAggregateInput> =
  z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    company_id: z.lazy(() => SortOrderSchema).optional(),
    vehicle_id: z.lazy(() => SortOrderSchema).optional(),
    driver_id: z.lazy(() => SortOrderSchema).optional(),
    event_type: z.lazy(() => SortOrderSchema).optional(),
    event_datetime: z.lazy(() => SortOrderSchema).optional(),
    location: z.lazy(() => SortOrderSchema).optional(),
    context: z.lazy(() => SortOrderSchema).optional(),
    general_result: z.lazy(() => SortOrderSchema).optional(),
    e_signature: z.lazy(() => SortOrderSchema).optional(),
    final_observations: z.lazy(() => SortOrderSchema).optional(),
    is_confirmed: z.lazy(() => SortOrderSchema).optional(),
    created_by_user_id: z.lazy(() => SortOrderSchema).optional(),
    created_at: z.lazy(() => SortOrderSchema).optional(),
    updated_at: z.lazy(() => SortOrderSchema).optional(),
  });

export const OperationalEventMaxOrderByAggregateInputSchema: z.ZodType<Prisma.OperationalEventMaxOrderByAggregateInput> =
  z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    company_id: z.lazy(() => SortOrderSchema).optional(),
    vehicle_id: z.lazy(() => SortOrderSchema).optional(),
    driver_id: z.lazy(() => SortOrderSchema).optional(),
    event_type: z.lazy(() => SortOrderSchema).optional(),
    event_datetime: z.lazy(() => SortOrderSchema).optional(),
    location: z.lazy(() => SortOrderSchema).optional(),
    context: z.lazy(() => SortOrderSchema).optional(),
    general_result: z.lazy(() => SortOrderSchema).optional(),
    e_signature: z.lazy(() => SortOrderSchema).optional(),
    final_observations: z.lazy(() => SortOrderSchema).optional(),
    is_confirmed: z.lazy(() => SortOrderSchema).optional(),
    created_by_user_id: z.lazy(() => SortOrderSchema).optional(),
    created_at: z.lazy(() => SortOrderSchema).optional(),
    updated_at: z.lazy(() => SortOrderSchema).optional(),
  });

export const OperationalEventMinOrderByAggregateInputSchema: z.ZodType<Prisma.OperationalEventMinOrderByAggregateInput> =
  z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    company_id: z.lazy(() => SortOrderSchema).optional(),
    vehicle_id: z.lazy(() => SortOrderSchema).optional(),
    driver_id: z.lazy(() => SortOrderSchema).optional(),
    event_type: z.lazy(() => SortOrderSchema).optional(),
    event_datetime: z.lazy(() => SortOrderSchema).optional(),
    location: z.lazy(() => SortOrderSchema).optional(),
    context: z.lazy(() => SortOrderSchema).optional(),
    general_result: z.lazy(() => SortOrderSchema).optional(),
    e_signature: z.lazy(() => SortOrderSchema).optional(),
    final_observations: z.lazy(() => SortOrderSchema).optional(),
    is_confirmed: z.lazy(() => SortOrderSchema).optional(),
    created_by_user_id: z.lazy(() => SortOrderSchema).optional(),
    created_at: z.lazy(() => SortOrderSchema).optional(),
    updated_at: z.lazy(() => SortOrderSchema).optional(),
  });

export const EnumEventTypeWithAggregatesFilterSchema: z.ZodType<Prisma.EnumEventTypeWithAggregatesFilter> =
  z.strictObject({
    equals: z.lazy(() => EventTypeSchema).optional(),
    in: z
      .lazy(() => EventTypeSchema)
      .array()
      .optional(),
    notIn: z
      .lazy(() => EventTypeSchema)
      .array()
      .optional(),
    not: z
      .union([
        z.lazy(() => EventTypeSchema),
        z.lazy(() => NestedEnumEventTypeWithAggregatesFilterSchema),
      ])
      .optional(),
    _count: z.lazy(() => NestedIntFilterSchema).optional(),
    _min: z.lazy(() => NestedEnumEventTypeFilterSchema).optional(),
    _max: z.lazy(() => NestedEnumEventTypeFilterSchema).optional(),
  });

export const EnumLocationTypeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.EnumLocationTypeNullableWithAggregatesFilter> =
  z.strictObject({
    equals: z
      .lazy(() => LocationTypeSchema)
      .optional()
      .nullable(),
    in: z
      .lazy(() => LocationTypeSchema)
      .array()
      .optional()
      .nullable(),
    notIn: z
      .lazy(() => LocationTypeSchema)
      .array()
      .optional()
      .nullable(),
    not: z
      .union([
        z.lazy(() => LocationTypeSchema),
        z.lazy(() => NestedEnumLocationTypeNullableWithAggregatesFilterSchema),
      ])
      .optional()
      .nullable(),
    _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
    _min: z.lazy(() => NestedEnumLocationTypeNullableFilterSchema).optional(),
    _max: z.lazy(() => NestedEnumLocationTypeNullableFilterSchema).optional(),
  });

export const EnumContextTypeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.EnumContextTypeNullableWithAggregatesFilter> =
  z.strictObject({
    equals: z
      .lazy(() => ContextTypeSchema)
      .optional()
      .nullable(),
    in: z
      .lazy(() => ContextTypeSchema)
      .array()
      .optional()
      .nullable(),
    notIn: z
      .lazy(() => ContextTypeSchema)
      .array()
      .optional()
      .nullable(),
    not: z
      .union([
        z.lazy(() => ContextTypeSchema),
        z.lazy(() => NestedEnumContextTypeNullableWithAggregatesFilterSchema),
      ])
      .optional()
      .nullable(),
    _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
    _min: z.lazy(() => NestedEnumContextTypeNullableFilterSchema).optional(),
    _max: z.lazy(() => NestedEnumContextTypeNullableFilterSchema).optional(),
  });

export const EnumGeneralResultNullableWithAggregatesFilterSchema: z.ZodType<Prisma.EnumGeneralResultNullableWithAggregatesFilter> =
  z.strictObject({
    equals: z
      .lazy(() => GeneralResultSchema)
      .optional()
      .nullable(),
    in: z
      .lazy(() => GeneralResultSchema)
      .array()
      .optional()
      .nullable(),
    notIn: z
      .lazy(() => GeneralResultSchema)
      .array()
      .optional()
      .nullable(),
    not: z
      .union([
        z.lazy(() => GeneralResultSchema),
        z.lazy(() => NestedEnumGeneralResultNullableWithAggregatesFilterSchema),
      ])
      .optional()
      .nullable(),
    _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
    _min: z.lazy(() => NestedEnumGeneralResultNullableFilterSchema).optional(),
    _max: z.lazy(() => NestedEnumGeneralResultNullableFilterSchema).optional(),
  });

export const BoolNullableWithAggregatesFilterSchema: z.ZodType<Prisma.BoolNullableWithAggregatesFilter> =
  z.strictObject({
    equals: z.boolean().optional().nullable(),
    not: z
      .union([
        z.boolean(),
        z.lazy(() => NestedBoolNullableWithAggregatesFilterSchema),
      ])
      .optional()
      .nullable(),
    _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
    _min: z.lazy(() => NestedBoolNullableFilterSchema).optional(),
    _max: z.lazy(() => NestedBoolNullableFilterSchema).optional(),
  });

export const VehicleCreateNestedManyWithoutCompanyInputSchema: z.ZodType<Prisma.VehicleCreateNestedManyWithoutCompanyInput> =
  z.strictObject({
    create: z
      .union([
        z.lazy(() => VehicleCreateWithoutCompanyInputSchema),
        z.lazy(() => VehicleCreateWithoutCompanyInputSchema).array(),
        z.lazy(() => VehicleUncheckedCreateWithoutCompanyInputSchema),
        z.lazy(() => VehicleUncheckedCreateWithoutCompanyInputSchema).array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => VehicleCreateOrConnectWithoutCompanyInputSchema),
        z.lazy(() => VehicleCreateOrConnectWithoutCompanyInputSchema).array(),
      ])
      .optional(),
    createMany: z
      .lazy(() => VehicleCreateManyCompanyInputEnvelopeSchema)
      .optional(),
    connect: z
      .union([
        z.lazy(() => VehicleWhereUniqueInputSchema),
        z.lazy(() => VehicleWhereUniqueInputSchema).array(),
      ])
      .optional(),
  });

export const DriverCreateNestedManyWithoutCompanyInputSchema: z.ZodType<Prisma.DriverCreateNestedManyWithoutCompanyInput> =
  z.strictObject({
    create: z
      .union([
        z.lazy(() => DriverCreateWithoutCompanyInputSchema),
        z.lazy(() => DriverCreateWithoutCompanyInputSchema).array(),
        z.lazy(() => DriverUncheckedCreateWithoutCompanyInputSchema),
        z.lazy(() => DriverUncheckedCreateWithoutCompanyInputSchema).array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => DriverCreateOrConnectWithoutCompanyInputSchema),
        z.lazy(() => DriverCreateOrConnectWithoutCompanyInputSchema).array(),
      ])
      .optional(),
    createMany: z
      .lazy(() => DriverCreateManyCompanyInputEnvelopeSchema)
      .optional(),
    connect: z
      .union([
        z.lazy(() => DriverWhereUniqueInputSchema),
        z.lazy(() => DriverWhereUniqueInputSchema).array(),
      ])
      .optional(),
  });

export const UserCreateNestedManyWithoutCompanyInputSchema: z.ZodType<Prisma.UserCreateNestedManyWithoutCompanyInput> =
  z.strictObject({
    create: z
      .union([
        z.lazy(() => UserCreateWithoutCompanyInputSchema),
        z.lazy(() => UserCreateWithoutCompanyInputSchema).array(),
        z.lazy(() => UserUncheckedCreateWithoutCompanyInputSchema),
        z.lazy(() => UserUncheckedCreateWithoutCompanyInputSchema).array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => UserCreateOrConnectWithoutCompanyInputSchema),
        z.lazy(() => UserCreateOrConnectWithoutCompanyInputSchema).array(),
      ])
      .optional(),
    createMany: z
      .lazy(() => UserCreateManyCompanyInputEnvelopeSchema)
      .optional(),
    connect: z
      .union([
        z.lazy(() => UserWhereUniqueInputSchema),
        z.lazy(() => UserWhereUniqueInputSchema).array(),
      ])
      .optional(),
  });

export const OperationalEventCreateNestedManyWithoutCompanyInputSchema: z.ZodType<Prisma.OperationalEventCreateNestedManyWithoutCompanyInput> =
  z.strictObject({
    create: z
      .union([
        z.lazy(() => OperationalEventCreateWithoutCompanyInputSchema),
        z.lazy(() => OperationalEventCreateWithoutCompanyInputSchema).array(),
        z.lazy(() => OperationalEventUncheckedCreateWithoutCompanyInputSchema),
        z
          .lazy(() => OperationalEventUncheckedCreateWithoutCompanyInputSchema)
          .array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => OperationalEventCreateOrConnectWithoutCompanyInputSchema),
        z
          .lazy(() => OperationalEventCreateOrConnectWithoutCompanyInputSchema)
          .array(),
      ])
      .optional(),
    createMany: z
      .lazy(() => OperationalEventCreateManyCompanyInputEnvelopeSchema)
      .optional(),
    connect: z
      .union([
        z.lazy(() => OperationalEventWhereUniqueInputSchema),
        z.lazy(() => OperationalEventWhereUniqueInputSchema).array(),
      ])
      .optional(),
  });

export const VehicleUncheckedCreateNestedManyWithoutCompanyInputSchema: z.ZodType<Prisma.VehicleUncheckedCreateNestedManyWithoutCompanyInput> =
  z.strictObject({
    create: z
      .union([
        z.lazy(() => VehicleCreateWithoutCompanyInputSchema),
        z.lazy(() => VehicleCreateWithoutCompanyInputSchema).array(),
        z.lazy(() => VehicleUncheckedCreateWithoutCompanyInputSchema),
        z.lazy(() => VehicleUncheckedCreateWithoutCompanyInputSchema).array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => VehicleCreateOrConnectWithoutCompanyInputSchema),
        z.lazy(() => VehicleCreateOrConnectWithoutCompanyInputSchema).array(),
      ])
      .optional(),
    createMany: z
      .lazy(() => VehicleCreateManyCompanyInputEnvelopeSchema)
      .optional(),
    connect: z
      .union([
        z.lazy(() => VehicleWhereUniqueInputSchema),
        z.lazy(() => VehicleWhereUniqueInputSchema).array(),
      ])
      .optional(),
  });

export const DriverUncheckedCreateNestedManyWithoutCompanyInputSchema: z.ZodType<Prisma.DriverUncheckedCreateNestedManyWithoutCompanyInput> =
  z.strictObject({
    create: z
      .union([
        z.lazy(() => DriverCreateWithoutCompanyInputSchema),
        z.lazy(() => DriverCreateWithoutCompanyInputSchema).array(),
        z.lazy(() => DriverUncheckedCreateWithoutCompanyInputSchema),
        z.lazy(() => DriverUncheckedCreateWithoutCompanyInputSchema).array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => DriverCreateOrConnectWithoutCompanyInputSchema),
        z.lazy(() => DriverCreateOrConnectWithoutCompanyInputSchema).array(),
      ])
      .optional(),
    createMany: z
      .lazy(() => DriverCreateManyCompanyInputEnvelopeSchema)
      .optional(),
    connect: z
      .union([
        z.lazy(() => DriverWhereUniqueInputSchema),
        z.lazy(() => DriverWhereUniqueInputSchema).array(),
      ])
      .optional(),
  });

export const UserUncheckedCreateNestedManyWithoutCompanyInputSchema: z.ZodType<Prisma.UserUncheckedCreateNestedManyWithoutCompanyInput> =
  z.strictObject({
    create: z
      .union([
        z.lazy(() => UserCreateWithoutCompanyInputSchema),
        z.lazy(() => UserCreateWithoutCompanyInputSchema).array(),
        z.lazy(() => UserUncheckedCreateWithoutCompanyInputSchema),
        z.lazy(() => UserUncheckedCreateWithoutCompanyInputSchema).array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => UserCreateOrConnectWithoutCompanyInputSchema),
        z.lazy(() => UserCreateOrConnectWithoutCompanyInputSchema).array(),
      ])
      .optional(),
    createMany: z
      .lazy(() => UserCreateManyCompanyInputEnvelopeSchema)
      .optional(),
    connect: z
      .union([
        z.lazy(() => UserWhereUniqueInputSchema),
        z.lazy(() => UserWhereUniqueInputSchema).array(),
      ])
      .optional(),
  });

export const OperationalEventUncheckedCreateNestedManyWithoutCompanyInputSchema: z.ZodType<Prisma.OperationalEventUncheckedCreateNestedManyWithoutCompanyInput> =
  z.strictObject({
    create: z
      .union([
        z.lazy(() => OperationalEventCreateWithoutCompanyInputSchema),
        z.lazy(() => OperationalEventCreateWithoutCompanyInputSchema).array(),
        z.lazy(() => OperationalEventUncheckedCreateWithoutCompanyInputSchema),
        z
          .lazy(() => OperationalEventUncheckedCreateWithoutCompanyInputSchema)
          .array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => OperationalEventCreateOrConnectWithoutCompanyInputSchema),
        z
          .lazy(() => OperationalEventCreateOrConnectWithoutCompanyInputSchema)
          .array(),
      ])
      .optional(),
    createMany: z
      .lazy(() => OperationalEventCreateManyCompanyInputEnvelopeSchema)
      .optional(),
    connect: z
      .union([
        z.lazy(() => OperationalEventWhereUniqueInputSchema),
        z.lazy(() => OperationalEventWhereUniqueInputSchema).array(),
      ])
      .optional(),
  });

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> =
  z.strictObject({
    set: z.string().optional(),
  });

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> =
  z.strictObject({
    set: z.coerce.date().optional(),
  });

export const VehicleUpdateManyWithoutCompanyNestedInputSchema: z.ZodType<Prisma.VehicleUpdateManyWithoutCompanyNestedInput> =
  z.strictObject({
    create: z
      .union([
        z.lazy(() => VehicleCreateWithoutCompanyInputSchema),
        z.lazy(() => VehicleCreateWithoutCompanyInputSchema).array(),
        z.lazy(() => VehicleUncheckedCreateWithoutCompanyInputSchema),
        z.lazy(() => VehicleUncheckedCreateWithoutCompanyInputSchema).array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => VehicleCreateOrConnectWithoutCompanyInputSchema),
        z.lazy(() => VehicleCreateOrConnectWithoutCompanyInputSchema).array(),
      ])
      .optional(),
    upsert: z
      .union([
        z.lazy(() => VehicleUpsertWithWhereUniqueWithoutCompanyInputSchema),
        z
          .lazy(() => VehicleUpsertWithWhereUniqueWithoutCompanyInputSchema)
          .array(),
      ])
      .optional(),
    createMany: z
      .lazy(() => VehicleCreateManyCompanyInputEnvelopeSchema)
      .optional(),
    set: z
      .union([
        z.lazy(() => VehicleWhereUniqueInputSchema),
        z.lazy(() => VehicleWhereUniqueInputSchema).array(),
      ])
      .optional(),
    disconnect: z
      .union([
        z.lazy(() => VehicleWhereUniqueInputSchema),
        z.lazy(() => VehicleWhereUniqueInputSchema).array(),
      ])
      .optional(),
    delete: z
      .union([
        z.lazy(() => VehicleWhereUniqueInputSchema),
        z.lazy(() => VehicleWhereUniqueInputSchema).array(),
      ])
      .optional(),
    connect: z
      .union([
        z.lazy(() => VehicleWhereUniqueInputSchema),
        z.lazy(() => VehicleWhereUniqueInputSchema).array(),
      ])
      .optional(),
    update: z
      .union([
        z.lazy(() => VehicleUpdateWithWhereUniqueWithoutCompanyInputSchema),
        z
          .lazy(() => VehicleUpdateWithWhereUniqueWithoutCompanyInputSchema)
          .array(),
      ])
      .optional(),
    updateMany: z
      .union([
        z.lazy(() => VehicleUpdateManyWithWhereWithoutCompanyInputSchema),
        z
          .lazy(() => VehicleUpdateManyWithWhereWithoutCompanyInputSchema)
          .array(),
      ])
      .optional(),
    deleteMany: z
      .union([
        z.lazy(() => VehicleScalarWhereInputSchema),
        z.lazy(() => VehicleScalarWhereInputSchema).array(),
      ])
      .optional(),
  });

export const DriverUpdateManyWithoutCompanyNestedInputSchema: z.ZodType<Prisma.DriverUpdateManyWithoutCompanyNestedInput> =
  z.strictObject({
    create: z
      .union([
        z.lazy(() => DriverCreateWithoutCompanyInputSchema),
        z.lazy(() => DriverCreateWithoutCompanyInputSchema).array(),
        z.lazy(() => DriverUncheckedCreateWithoutCompanyInputSchema),
        z.lazy(() => DriverUncheckedCreateWithoutCompanyInputSchema).array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => DriverCreateOrConnectWithoutCompanyInputSchema),
        z.lazy(() => DriverCreateOrConnectWithoutCompanyInputSchema).array(),
      ])
      .optional(),
    upsert: z
      .union([
        z.lazy(() => DriverUpsertWithWhereUniqueWithoutCompanyInputSchema),
        z
          .lazy(() => DriverUpsertWithWhereUniqueWithoutCompanyInputSchema)
          .array(),
      ])
      .optional(),
    createMany: z
      .lazy(() => DriverCreateManyCompanyInputEnvelopeSchema)
      .optional(),
    set: z
      .union([
        z.lazy(() => DriverWhereUniqueInputSchema),
        z.lazy(() => DriverWhereUniqueInputSchema).array(),
      ])
      .optional(),
    disconnect: z
      .union([
        z.lazy(() => DriverWhereUniqueInputSchema),
        z.lazy(() => DriverWhereUniqueInputSchema).array(),
      ])
      .optional(),
    delete: z
      .union([
        z.lazy(() => DriverWhereUniqueInputSchema),
        z.lazy(() => DriverWhereUniqueInputSchema).array(),
      ])
      .optional(),
    connect: z
      .union([
        z.lazy(() => DriverWhereUniqueInputSchema),
        z.lazy(() => DriverWhereUniqueInputSchema).array(),
      ])
      .optional(),
    update: z
      .union([
        z.lazy(() => DriverUpdateWithWhereUniqueWithoutCompanyInputSchema),
        z
          .lazy(() => DriverUpdateWithWhereUniqueWithoutCompanyInputSchema)
          .array(),
      ])
      .optional(),
    updateMany: z
      .union([
        z.lazy(() => DriverUpdateManyWithWhereWithoutCompanyInputSchema),
        z
          .lazy(() => DriverUpdateManyWithWhereWithoutCompanyInputSchema)
          .array(),
      ])
      .optional(),
    deleteMany: z
      .union([
        z.lazy(() => DriverScalarWhereInputSchema),
        z.lazy(() => DriverScalarWhereInputSchema).array(),
      ])
      .optional(),
  });

export const UserUpdateManyWithoutCompanyNestedInputSchema: z.ZodType<Prisma.UserUpdateManyWithoutCompanyNestedInput> =
  z.strictObject({
    create: z
      .union([
        z.lazy(() => UserCreateWithoutCompanyInputSchema),
        z.lazy(() => UserCreateWithoutCompanyInputSchema).array(),
        z.lazy(() => UserUncheckedCreateWithoutCompanyInputSchema),
        z.lazy(() => UserUncheckedCreateWithoutCompanyInputSchema).array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => UserCreateOrConnectWithoutCompanyInputSchema),
        z.lazy(() => UserCreateOrConnectWithoutCompanyInputSchema).array(),
      ])
      .optional(),
    upsert: z
      .union([
        z.lazy(() => UserUpsertWithWhereUniqueWithoutCompanyInputSchema),
        z
          .lazy(() => UserUpsertWithWhereUniqueWithoutCompanyInputSchema)
          .array(),
      ])
      .optional(),
    createMany: z
      .lazy(() => UserCreateManyCompanyInputEnvelopeSchema)
      .optional(),
    set: z
      .union([
        z.lazy(() => UserWhereUniqueInputSchema),
        z.lazy(() => UserWhereUniqueInputSchema).array(),
      ])
      .optional(),
    disconnect: z
      .union([
        z.lazy(() => UserWhereUniqueInputSchema),
        z.lazy(() => UserWhereUniqueInputSchema).array(),
      ])
      .optional(),
    delete: z
      .union([
        z.lazy(() => UserWhereUniqueInputSchema),
        z.lazy(() => UserWhereUniqueInputSchema).array(),
      ])
      .optional(),
    connect: z
      .union([
        z.lazy(() => UserWhereUniqueInputSchema),
        z.lazy(() => UserWhereUniqueInputSchema).array(),
      ])
      .optional(),
    update: z
      .union([
        z.lazy(() => UserUpdateWithWhereUniqueWithoutCompanyInputSchema),
        z
          .lazy(() => UserUpdateWithWhereUniqueWithoutCompanyInputSchema)
          .array(),
      ])
      .optional(),
    updateMany: z
      .union([
        z.lazy(() => UserUpdateManyWithWhereWithoutCompanyInputSchema),
        z.lazy(() => UserUpdateManyWithWhereWithoutCompanyInputSchema).array(),
      ])
      .optional(),
    deleteMany: z
      .union([
        z.lazy(() => UserScalarWhereInputSchema),
        z.lazy(() => UserScalarWhereInputSchema).array(),
      ])
      .optional(),
  });

export const OperationalEventUpdateManyWithoutCompanyNestedInputSchema: z.ZodType<Prisma.OperationalEventUpdateManyWithoutCompanyNestedInput> =
  z.strictObject({
    create: z
      .union([
        z.lazy(() => OperationalEventCreateWithoutCompanyInputSchema),
        z.lazy(() => OperationalEventCreateWithoutCompanyInputSchema).array(),
        z.lazy(() => OperationalEventUncheckedCreateWithoutCompanyInputSchema),
        z
          .lazy(() => OperationalEventUncheckedCreateWithoutCompanyInputSchema)
          .array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => OperationalEventCreateOrConnectWithoutCompanyInputSchema),
        z
          .lazy(() => OperationalEventCreateOrConnectWithoutCompanyInputSchema)
          .array(),
      ])
      .optional(),
    upsert: z
      .union([
        z.lazy(
          () => OperationalEventUpsertWithWhereUniqueWithoutCompanyInputSchema,
        ),
        z
          .lazy(
            () =>
              OperationalEventUpsertWithWhereUniqueWithoutCompanyInputSchema,
          )
          .array(),
      ])
      .optional(),
    createMany: z
      .lazy(() => OperationalEventCreateManyCompanyInputEnvelopeSchema)
      .optional(),
    set: z
      .union([
        z.lazy(() => OperationalEventWhereUniqueInputSchema),
        z.lazy(() => OperationalEventWhereUniqueInputSchema).array(),
      ])
      .optional(),
    disconnect: z
      .union([
        z.lazy(() => OperationalEventWhereUniqueInputSchema),
        z.lazy(() => OperationalEventWhereUniqueInputSchema).array(),
      ])
      .optional(),
    delete: z
      .union([
        z.lazy(() => OperationalEventWhereUniqueInputSchema),
        z.lazy(() => OperationalEventWhereUniqueInputSchema).array(),
      ])
      .optional(),
    connect: z
      .union([
        z.lazy(() => OperationalEventWhereUniqueInputSchema),
        z.lazy(() => OperationalEventWhereUniqueInputSchema).array(),
      ])
      .optional(),
    update: z
      .union([
        z.lazy(
          () => OperationalEventUpdateWithWhereUniqueWithoutCompanyInputSchema,
        ),
        z
          .lazy(
            () =>
              OperationalEventUpdateWithWhereUniqueWithoutCompanyInputSchema,
          )
          .array(),
      ])
      .optional(),
    updateMany: z
      .union([
        z.lazy(
          () => OperationalEventUpdateManyWithWhereWithoutCompanyInputSchema,
        ),
        z
          .lazy(
            () => OperationalEventUpdateManyWithWhereWithoutCompanyInputSchema,
          )
          .array(),
      ])
      .optional(),
    deleteMany: z
      .union([
        z.lazy(() => OperationalEventScalarWhereInputSchema),
        z.lazy(() => OperationalEventScalarWhereInputSchema).array(),
      ])
      .optional(),
  });

export const VehicleUncheckedUpdateManyWithoutCompanyNestedInputSchema: z.ZodType<Prisma.VehicleUncheckedUpdateManyWithoutCompanyNestedInput> =
  z.strictObject({
    create: z
      .union([
        z.lazy(() => VehicleCreateWithoutCompanyInputSchema),
        z.lazy(() => VehicleCreateWithoutCompanyInputSchema).array(),
        z.lazy(() => VehicleUncheckedCreateWithoutCompanyInputSchema),
        z.lazy(() => VehicleUncheckedCreateWithoutCompanyInputSchema).array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => VehicleCreateOrConnectWithoutCompanyInputSchema),
        z.lazy(() => VehicleCreateOrConnectWithoutCompanyInputSchema).array(),
      ])
      .optional(),
    upsert: z
      .union([
        z.lazy(() => VehicleUpsertWithWhereUniqueWithoutCompanyInputSchema),
        z
          .lazy(() => VehicleUpsertWithWhereUniqueWithoutCompanyInputSchema)
          .array(),
      ])
      .optional(),
    createMany: z
      .lazy(() => VehicleCreateManyCompanyInputEnvelopeSchema)
      .optional(),
    set: z
      .union([
        z.lazy(() => VehicleWhereUniqueInputSchema),
        z.lazy(() => VehicleWhereUniqueInputSchema).array(),
      ])
      .optional(),
    disconnect: z
      .union([
        z.lazy(() => VehicleWhereUniqueInputSchema),
        z.lazy(() => VehicleWhereUniqueInputSchema).array(),
      ])
      .optional(),
    delete: z
      .union([
        z.lazy(() => VehicleWhereUniqueInputSchema),
        z.lazy(() => VehicleWhereUniqueInputSchema).array(),
      ])
      .optional(),
    connect: z
      .union([
        z.lazy(() => VehicleWhereUniqueInputSchema),
        z.lazy(() => VehicleWhereUniqueInputSchema).array(),
      ])
      .optional(),
    update: z
      .union([
        z.lazy(() => VehicleUpdateWithWhereUniqueWithoutCompanyInputSchema),
        z
          .lazy(() => VehicleUpdateWithWhereUniqueWithoutCompanyInputSchema)
          .array(),
      ])
      .optional(),
    updateMany: z
      .union([
        z.lazy(() => VehicleUpdateManyWithWhereWithoutCompanyInputSchema),
        z
          .lazy(() => VehicleUpdateManyWithWhereWithoutCompanyInputSchema)
          .array(),
      ])
      .optional(),
    deleteMany: z
      .union([
        z.lazy(() => VehicleScalarWhereInputSchema),
        z.lazy(() => VehicleScalarWhereInputSchema).array(),
      ])
      .optional(),
  });

export const DriverUncheckedUpdateManyWithoutCompanyNestedInputSchema: z.ZodType<Prisma.DriverUncheckedUpdateManyWithoutCompanyNestedInput> =
  z.strictObject({
    create: z
      .union([
        z.lazy(() => DriverCreateWithoutCompanyInputSchema),
        z.lazy(() => DriverCreateWithoutCompanyInputSchema).array(),
        z.lazy(() => DriverUncheckedCreateWithoutCompanyInputSchema),
        z.lazy(() => DriverUncheckedCreateWithoutCompanyInputSchema).array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => DriverCreateOrConnectWithoutCompanyInputSchema),
        z.lazy(() => DriverCreateOrConnectWithoutCompanyInputSchema).array(),
      ])
      .optional(),
    upsert: z
      .union([
        z.lazy(() => DriverUpsertWithWhereUniqueWithoutCompanyInputSchema),
        z
          .lazy(() => DriverUpsertWithWhereUniqueWithoutCompanyInputSchema)
          .array(),
      ])
      .optional(),
    createMany: z
      .lazy(() => DriverCreateManyCompanyInputEnvelopeSchema)
      .optional(),
    set: z
      .union([
        z.lazy(() => DriverWhereUniqueInputSchema),
        z.lazy(() => DriverWhereUniqueInputSchema).array(),
      ])
      .optional(),
    disconnect: z
      .union([
        z.lazy(() => DriverWhereUniqueInputSchema),
        z.lazy(() => DriverWhereUniqueInputSchema).array(),
      ])
      .optional(),
    delete: z
      .union([
        z.lazy(() => DriverWhereUniqueInputSchema),
        z.lazy(() => DriverWhereUniqueInputSchema).array(),
      ])
      .optional(),
    connect: z
      .union([
        z.lazy(() => DriverWhereUniqueInputSchema),
        z.lazy(() => DriverWhereUniqueInputSchema).array(),
      ])
      .optional(),
    update: z
      .union([
        z.lazy(() => DriverUpdateWithWhereUniqueWithoutCompanyInputSchema),
        z
          .lazy(() => DriverUpdateWithWhereUniqueWithoutCompanyInputSchema)
          .array(),
      ])
      .optional(),
    updateMany: z
      .union([
        z.lazy(() => DriverUpdateManyWithWhereWithoutCompanyInputSchema),
        z
          .lazy(() => DriverUpdateManyWithWhereWithoutCompanyInputSchema)
          .array(),
      ])
      .optional(),
    deleteMany: z
      .union([
        z.lazy(() => DriverScalarWhereInputSchema),
        z.lazy(() => DriverScalarWhereInputSchema).array(),
      ])
      .optional(),
  });

export const UserUncheckedUpdateManyWithoutCompanyNestedInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyWithoutCompanyNestedInput> =
  z.strictObject({
    create: z
      .union([
        z.lazy(() => UserCreateWithoutCompanyInputSchema),
        z.lazy(() => UserCreateWithoutCompanyInputSchema).array(),
        z.lazy(() => UserUncheckedCreateWithoutCompanyInputSchema),
        z.lazy(() => UserUncheckedCreateWithoutCompanyInputSchema).array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => UserCreateOrConnectWithoutCompanyInputSchema),
        z.lazy(() => UserCreateOrConnectWithoutCompanyInputSchema).array(),
      ])
      .optional(),
    upsert: z
      .union([
        z.lazy(() => UserUpsertWithWhereUniqueWithoutCompanyInputSchema),
        z
          .lazy(() => UserUpsertWithWhereUniqueWithoutCompanyInputSchema)
          .array(),
      ])
      .optional(),
    createMany: z
      .lazy(() => UserCreateManyCompanyInputEnvelopeSchema)
      .optional(),
    set: z
      .union([
        z.lazy(() => UserWhereUniqueInputSchema),
        z.lazy(() => UserWhereUniqueInputSchema).array(),
      ])
      .optional(),
    disconnect: z
      .union([
        z.lazy(() => UserWhereUniqueInputSchema),
        z.lazy(() => UserWhereUniqueInputSchema).array(),
      ])
      .optional(),
    delete: z
      .union([
        z.lazy(() => UserWhereUniqueInputSchema),
        z.lazy(() => UserWhereUniqueInputSchema).array(),
      ])
      .optional(),
    connect: z
      .union([
        z.lazy(() => UserWhereUniqueInputSchema),
        z.lazy(() => UserWhereUniqueInputSchema).array(),
      ])
      .optional(),
    update: z
      .union([
        z.lazy(() => UserUpdateWithWhereUniqueWithoutCompanyInputSchema),
        z
          .lazy(() => UserUpdateWithWhereUniqueWithoutCompanyInputSchema)
          .array(),
      ])
      .optional(),
    updateMany: z
      .union([
        z.lazy(() => UserUpdateManyWithWhereWithoutCompanyInputSchema),
        z.lazy(() => UserUpdateManyWithWhereWithoutCompanyInputSchema).array(),
      ])
      .optional(),
    deleteMany: z
      .union([
        z.lazy(() => UserScalarWhereInputSchema),
        z.lazy(() => UserScalarWhereInputSchema).array(),
      ])
      .optional(),
  });

export const OperationalEventUncheckedUpdateManyWithoutCompanyNestedInputSchema: z.ZodType<Prisma.OperationalEventUncheckedUpdateManyWithoutCompanyNestedInput> =
  z.strictObject({
    create: z
      .union([
        z.lazy(() => OperationalEventCreateWithoutCompanyInputSchema),
        z.lazy(() => OperationalEventCreateWithoutCompanyInputSchema).array(),
        z.lazy(() => OperationalEventUncheckedCreateWithoutCompanyInputSchema),
        z
          .lazy(() => OperationalEventUncheckedCreateWithoutCompanyInputSchema)
          .array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => OperationalEventCreateOrConnectWithoutCompanyInputSchema),
        z
          .lazy(() => OperationalEventCreateOrConnectWithoutCompanyInputSchema)
          .array(),
      ])
      .optional(),
    upsert: z
      .union([
        z.lazy(
          () => OperationalEventUpsertWithWhereUniqueWithoutCompanyInputSchema,
        ),
        z
          .lazy(
            () =>
              OperationalEventUpsertWithWhereUniqueWithoutCompanyInputSchema,
          )
          .array(),
      ])
      .optional(),
    createMany: z
      .lazy(() => OperationalEventCreateManyCompanyInputEnvelopeSchema)
      .optional(),
    set: z
      .union([
        z.lazy(() => OperationalEventWhereUniqueInputSchema),
        z.lazy(() => OperationalEventWhereUniqueInputSchema).array(),
      ])
      .optional(),
    disconnect: z
      .union([
        z.lazy(() => OperationalEventWhereUniqueInputSchema),
        z.lazy(() => OperationalEventWhereUniqueInputSchema).array(),
      ])
      .optional(),
    delete: z
      .union([
        z.lazy(() => OperationalEventWhereUniqueInputSchema),
        z.lazy(() => OperationalEventWhereUniqueInputSchema).array(),
      ])
      .optional(),
    connect: z
      .union([
        z.lazy(() => OperationalEventWhereUniqueInputSchema),
        z.lazy(() => OperationalEventWhereUniqueInputSchema).array(),
      ])
      .optional(),
    update: z
      .union([
        z.lazy(
          () => OperationalEventUpdateWithWhereUniqueWithoutCompanyInputSchema,
        ),
        z
          .lazy(
            () =>
              OperationalEventUpdateWithWhereUniqueWithoutCompanyInputSchema,
          )
          .array(),
      ])
      .optional(),
    updateMany: z
      .union([
        z.lazy(
          () => OperationalEventUpdateManyWithWhereWithoutCompanyInputSchema,
        ),
        z
          .lazy(
            () => OperationalEventUpdateManyWithWhereWithoutCompanyInputSchema,
          )
          .array(),
      ])
      .optional(),
    deleteMany: z
      .union([
        z.lazy(() => OperationalEventScalarWhereInputSchema),
        z.lazy(() => OperationalEventScalarWhereInputSchema).array(),
      ])
      .optional(),
  });

export const CompanyCreateNestedOneWithoutVehiclesInputSchema: z.ZodType<Prisma.CompanyCreateNestedOneWithoutVehiclesInput> =
  z.strictObject({
    create: z
      .union([
        z.lazy(() => CompanyCreateWithoutVehiclesInputSchema),
        z.lazy(() => CompanyUncheckedCreateWithoutVehiclesInputSchema),
      ])
      .optional(),
    connectOrCreate: z
      .lazy(() => CompanyCreateOrConnectWithoutVehiclesInputSchema)
      .optional(),
    connect: z.lazy(() => CompanyWhereUniqueInputSchema).optional(),
  });

export const DriverCreateNestedOneWithoutVehicleInputSchema: z.ZodType<Prisma.DriverCreateNestedOneWithoutVehicleInput> =
  z.strictObject({
    create: z
      .union([
        z.lazy(() => DriverCreateWithoutVehicleInputSchema),
        z.lazy(() => DriverUncheckedCreateWithoutVehicleInputSchema),
      ])
      .optional(),
    connectOrCreate: z
      .lazy(() => DriverCreateOrConnectWithoutVehicleInputSchema)
      .optional(),
    connect: z.lazy(() => DriverWhereUniqueInputSchema).optional(),
  });

export const OperationalEventCreateNestedManyWithoutVehicleInputSchema: z.ZodType<Prisma.OperationalEventCreateNestedManyWithoutVehicleInput> =
  z.strictObject({
    create: z
      .union([
        z.lazy(() => OperationalEventCreateWithoutVehicleInputSchema),
        z.lazy(() => OperationalEventCreateWithoutVehicleInputSchema).array(),
        z.lazy(() => OperationalEventUncheckedCreateWithoutVehicleInputSchema),
        z
          .lazy(() => OperationalEventUncheckedCreateWithoutVehicleInputSchema)
          .array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => OperationalEventCreateOrConnectWithoutVehicleInputSchema),
        z
          .lazy(() => OperationalEventCreateOrConnectWithoutVehicleInputSchema)
          .array(),
      ])
      .optional(),
    createMany: z
      .lazy(() => OperationalEventCreateManyVehicleInputEnvelopeSchema)
      .optional(),
    connect: z
      .union([
        z.lazy(() => OperationalEventWhereUniqueInputSchema),
        z.lazy(() => OperationalEventWhereUniqueInputSchema).array(),
      ])
      .optional(),
  });

export const OperationalEventUncheckedCreateNestedManyWithoutVehicleInputSchema: z.ZodType<Prisma.OperationalEventUncheckedCreateNestedManyWithoutVehicleInput> =
  z.strictObject({
    create: z
      .union([
        z.lazy(() => OperationalEventCreateWithoutVehicleInputSchema),
        z.lazy(() => OperationalEventCreateWithoutVehicleInputSchema).array(),
        z.lazy(() => OperationalEventUncheckedCreateWithoutVehicleInputSchema),
        z
          .lazy(() => OperationalEventUncheckedCreateWithoutVehicleInputSchema)
          .array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => OperationalEventCreateOrConnectWithoutVehicleInputSchema),
        z
          .lazy(() => OperationalEventCreateOrConnectWithoutVehicleInputSchema)
          .array(),
      ])
      .optional(),
    createMany: z
      .lazy(() => OperationalEventCreateManyVehicleInputEnvelopeSchema)
      .optional(),
    connect: z
      .union([
        z.lazy(() => OperationalEventWhereUniqueInputSchema),
        z.lazy(() => OperationalEventWhereUniqueInputSchema).array(),
      ])
      .optional(),
  });

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> =
  z.strictObject({
    set: z.string().optional().nullable(),
  });

export const BoolFieldUpdateOperationsInputSchema: z.ZodType<Prisma.BoolFieldUpdateOperationsInput> =
  z.strictObject({
    set: z.boolean().optional(),
  });

export const CompanyUpdateOneRequiredWithoutVehiclesNestedInputSchema: z.ZodType<Prisma.CompanyUpdateOneRequiredWithoutVehiclesNestedInput> =
  z.strictObject({
    create: z
      .union([
        z.lazy(() => CompanyCreateWithoutVehiclesInputSchema),
        z.lazy(() => CompanyUncheckedCreateWithoutVehiclesInputSchema),
      ])
      .optional(),
    connectOrCreate: z
      .lazy(() => CompanyCreateOrConnectWithoutVehiclesInputSchema)
      .optional(),
    upsert: z.lazy(() => CompanyUpsertWithoutVehiclesInputSchema).optional(),
    connect: z.lazy(() => CompanyWhereUniqueInputSchema).optional(),
    update: z
      .union([
        z.lazy(() => CompanyUpdateToOneWithWhereWithoutVehiclesInputSchema),
        z.lazy(() => CompanyUpdateWithoutVehiclesInputSchema),
        z.lazy(() => CompanyUncheckedUpdateWithoutVehiclesInputSchema),
      ])
      .optional(),
  });

export const DriverUpdateOneWithoutVehicleNestedInputSchema: z.ZodType<Prisma.DriverUpdateOneWithoutVehicleNestedInput> =
  z.strictObject({
    create: z
      .union([
        z.lazy(() => DriverCreateWithoutVehicleInputSchema),
        z.lazy(() => DriverUncheckedCreateWithoutVehicleInputSchema),
      ])
      .optional(),
    connectOrCreate: z
      .lazy(() => DriverCreateOrConnectWithoutVehicleInputSchema)
      .optional(),
    upsert: z.lazy(() => DriverUpsertWithoutVehicleInputSchema).optional(),
    disconnect: z
      .union([z.boolean(), z.lazy(() => DriverWhereInputSchema)])
      .optional(),
    delete: z
      .union([z.boolean(), z.lazy(() => DriverWhereInputSchema)])
      .optional(),
    connect: z.lazy(() => DriverWhereUniqueInputSchema).optional(),
    update: z
      .union([
        z.lazy(() => DriverUpdateToOneWithWhereWithoutVehicleInputSchema),
        z.lazy(() => DriverUpdateWithoutVehicleInputSchema),
        z.lazy(() => DriverUncheckedUpdateWithoutVehicleInputSchema),
      ])
      .optional(),
  });

export const OperationalEventUpdateManyWithoutVehicleNestedInputSchema: z.ZodType<Prisma.OperationalEventUpdateManyWithoutVehicleNestedInput> =
  z.strictObject({
    create: z
      .union([
        z.lazy(() => OperationalEventCreateWithoutVehicleInputSchema),
        z.lazy(() => OperationalEventCreateWithoutVehicleInputSchema).array(),
        z.lazy(() => OperationalEventUncheckedCreateWithoutVehicleInputSchema),
        z
          .lazy(() => OperationalEventUncheckedCreateWithoutVehicleInputSchema)
          .array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => OperationalEventCreateOrConnectWithoutVehicleInputSchema),
        z
          .lazy(() => OperationalEventCreateOrConnectWithoutVehicleInputSchema)
          .array(),
      ])
      .optional(),
    upsert: z
      .union([
        z.lazy(
          () => OperationalEventUpsertWithWhereUniqueWithoutVehicleInputSchema,
        ),
        z
          .lazy(
            () =>
              OperationalEventUpsertWithWhereUniqueWithoutVehicleInputSchema,
          )
          .array(),
      ])
      .optional(),
    createMany: z
      .lazy(() => OperationalEventCreateManyVehicleInputEnvelopeSchema)
      .optional(),
    set: z
      .union([
        z.lazy(() => OperationalEventWhereUniqueInputSchema),
        z.lazy(() => OperationalEventWhereUniqueInputSchema).array(),
      ])
      .optional(),
    disconnect: z
      .union([
        z.lazy(() => OperationalEventWhereUniqueInputSchema),
        z.lazy(() => OperationalEventWhereUniqueInputSchema).array(),
      ])
      .optional(),
    delete: z
      .union([
        z.lazy(() => OperationalEventWhereUniqueInputSchema),
        z.lazy(() => OperationalEventWhereUniqueInputSchema).array(),
      ])
      .optional(),
    connect: z
      .union([
        z.lazy(() => OperationalEventWhereUniqueInputSchema),
        z.lazy(() => OperationalEventWhereUniqueInputSchema).array(),
      ])
      .optional(),
    update: z
      .union([
        z.lazy(
          () => OperationalEventUpdateWithWhereUniqueWithoutVehicleInputSchema,
        ),
        z
          .lazy(
            () =>
              OperationalEventUpdateWithWhereUniqueWithoutVehicleInputSchema,
          )
          .array(),
      ])
      .optional(),
    updateMany: z
      .union([
        z.lazy(
          () => OperationalEventUpdateManyWithWhereWithoutVehicleInputSchema,
        ),
        z
          .lazy(
            () => OperationalEventUpdateManyWithWhereWithoutVehicleInputSchema,
          )
          .array(),
      ])
      .optional(),
    deleteMany: z
      .union([
        z.lazy(() => OperationalEventScalarWhereInputSchema),
        z.lazy(() => OperationalEventScalarWhereInputSchema).array(),
      ])
      .optional(),
  });

export const OperationalEventUncheckedUpdateManyWithoutVehicleNestedInputSchema: z.ZodType<Prisma.OperationalEventUncheckedUpdateManyWithoutVehicleNestedInput> =
  z.strictObject({
    create: z
      .union([
        z.lazy(() => OperationalEventCreateWithoutVehicleInputSchema),
        z.lazy(() => OperationalEventCreateWithoutVehicleInputSchema).array(),
        z.lazy(() => OperationalEventUncheckedCreateWithoutVehicleInputSchema),
        z
          .lazy(() => OperationalEventUncheckedCreateWithoutVehicleInputSchema)
          .array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => OperationalEventCreateOrConnectWithoutVehicleInputSchema),
        z
          .lazy(() => OperationalEventCreateOrConnectWithoutVehicleInputSchema)
          .array(),
      ])
      .optional(),
    upsert: z
      .union([
        z.lazy(
          () => OperationalEventUpsertWithWhereUniqueWithoutVehicleInputSchema,
        ),
        z
          .lazy(
            () =>
              OperationalEventUpsertWithWhereUniqueWithoutVehicleInputSchema,
          )
          .array(),
      ])
      .optional(),
    createMany: z
      .lazy(() => OperationalEventCreateManyVehicleInputEnvelopeSchema)
      .optional(),
    set: z
      .union([
        z.lazy(() => OperationalEventWhereUniqueInputSchema),
        z.lazy(() => OperationalEventWhereUniqueInputSchema).array(),
      ])
      .optional(),
    disconnect: z
      .union([
        z.lazy(() => OperationalEventWhereUniqueInputSchema),
        z.lazy(() => OperationalEventWhereUniqueInputSchema).array(),
      ])
      .optional(),
    delete: z
      .union([
        z.lazy(() => OperationalEventWhereUniqueInputSchema),
        z.lazy(() => OperationalEventWhereUniqueInputSchema).array(),
      ])
      .optional(),
    connect: z
      .union([
        z.lazy(() => OperationalEventWhereUniqueInputSchema),
        z.lazy(() => OperationalEventWhereUniqueInputSchema).array(),
      ])
      .optional(),
    update: z
      .union([
        z.lazy(
          () => OperationalEventUpdateWithWhereUniqueWithoutVehicleInputSchema,
        ),
        z
          .lazy(
            () =>
              OperationalEventUpdateWithWhereUniqueWithoutVehicleInputSchema,
          )
          .array(),
      ])
      .optional(),
    updateMany: z
      .union([
        z.lazy(
          () => OperationalEventUpdateManyWithWhereWithoutVehicleInputSchema,
        ),
        z
          .lazy(
            () => OperationalEventUpdateManyWithWhereWithoutVehicleInputSchema,
          )
          .array(),
      ])
      .optional(),
    deleteMany: z
      .union([
        z.lazy(() => OperationalEventScalarWhereInputSchema),
        z.lazy(() => OperationalEventScalarWhereInputSchema).array(),
      ])
      .optional(),
  });

export const CompanyCreateNestedOneWithoutDriversInputSchema: z.ZodType<Prisma.CompanyCreateNestedOneWithoutDriversInput> =
  z.strictObject({
    create: z
      .union([
        z.lazy(() => CompanyCreateWithoutDriversInputSchema),
        z.lazy(() => CompanyUncheckedCreateWithoutDriversInputSchema),
      ])
      .optional(),
    connectOrCreate: z
      .lazy(() => CompanyCreateOrConnectWithoutDriversInputSchema)
      .optional(),
    connect: z.lazy(() => CompanyWhereUniqueInputSchema).optional(),
  });

export const VehicleCreateNestedOneWithoutDriverInputSchema: z.ZodType<Prisma.VehicleCreateNestedOneWithoutDriverInput> =
  z.strictObject({
    create: z
      .union([
        z.lazy(() => VehicleCreateWithoutDriverInputSchema),
        z.lazy(() => VehicleUncheckedCreateWithoutDriverInputSchema),
      ])
      .optional(),
    connectOrCreate: z
      .lazy(() => VehicleCreateOrConnectWithoutDriverInputSchema)
      .optional(),
    connect: z.lazy(() => VehicleWhereUniqueInputSchema).optional(),
  });

export const OperationalEventCreateNestedManyWithoutDriverInputSchema: z.ZodType<Prisma.OperationalEventCreateNestedManyWithoutDriverInput> =
  z.strictObject({
    create: z
      .union([
        z.lazy(() => OperationalEventCreateWithoutDriverInputSchema),
        z.lazy(() => OperationalEventCreateWithoutDriverInputSchema).array(),
        z.lazy(() => OperationalEventUncheckedCreateWithoutDriverInputSchema),
        z
          .lazy(() => OperationalEventUncheckedCreateWithoutDriverInputSchema)
          .array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => OperationalEventCreateOrConnectWithoutDriverInputSchema),
        z
          .lazy(() => OperationalEventCreateOrConnectWithoutDriverInputSchema)
          .array(),
      ])
      .optional(),
    createMany: z
      .lazy(() => OperationalEventCreateManyDriverInputEnvelopeSchema)
      .optional(),
    connect: z
      .union([
        z.lazy(() => OperationalEventWhereUniqueInputSchema),
        z.lazy(() => OperationalEventWhereUniqueInputSchema).array(),
      ])
      .optional(),
  });

export const VehicleUncheckedCreateNestedOneWithoutDriverInputSchema: z.ZodType<Prisma.VehicleUncheckedCreateNestedOneWithoutDriverInput> =
  z.strictObject({
    create: z
      .union([
        z.lazy(() => VehicleCreateWithoutDriverInputSchema),
        z.lazy(() => VehicleUncheckedCreateWithoutDriverInputSchema),
      ])
      .optional(),
    connectOrCreate: z
      .lazy(() => VehicleCreateOrConnectWithoutDriverInputSchema)
      .optional(),
    connect: z.lazy(() => VehicleWhereUniqueInputSchema).optional(),
  });

export const OperationalEventUncheckedCreateNestedManyWithoutDriverInputSchema: z.ZodType<Prisma.OperationalEventUncheckedCreateNestedManyWithoutDriverInput> =
  z.strictObject({
    create: z
      .union([
        z.lazy(() => OperationalEventCreateWithoutDriverInputSchema),
        z.lazy(() => OperationalEventCreateWithoutDriverInputSchema).array(),
        z.lazy(() => OperationalEventUncheckedCreateWithoutDriverInputSchema),
        z
          .lazy(() => OperationalEventUncheckedCreateWithoutDriverInputSchema)
          .array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => OperationalEventCreateOrConnectWithoutDriverInputSchema),
        z
          .lazy(() => OperationalEventCreateOrConnectWithoutDriverInputSchema)
          .array(),
      ])
      .optional(),
    createMany: z
      .lazy(() => OperationalEventCreateManyDriverInputEnvelopeSchema)
      .optional(),
    connect: z
      .union([
        z.lazy(() => OperationalEventWhereUniqueInputSchema),
        z.lazy(() => OperationalEventWhereUniqueInputSchema).array(),
      ])
      .optional(),
  });

export const CompanyUpdateOneRequiredWithoutDriversNestedInputSchema: z.ZodType<Prisma.CompanyUpdateOneRequiredWithoutDriversNestedInput> =
  z.strictObject({
    create: z
      .union([
        z.lazy(() => CompanyCreateWithoutDriversInputSchema),
        z.lazy(() => CompanyUncheckedCreateWithoutDriversInputSchema),
      ])
      .optional(),
    connectOrCreate: z
      .lazy(() => CompanyCreateOrConnectWithoutDriversInputSchema)
      .optional(),
    upsert: z.lazy(() => CompanyUpsertWithoutDriversInputSchema).optional(),
    connect: z.lazy(() => CompanyWhereUniqueInputSchema).optional(),
    update: z
      .union([
        z.lazy(() => CompanyUpdateToOneWithWhereWithoutDriversInputSchema),
        z.lazy(() => CompanyUpdateWithoutDriversInputSchema),
        z.lazy(() => CompanyUncheckedUpdateWithoutDriversInputSchema),
      ])
      .optional(),
  });

export const VehicleUpdateOneWithoutDriverNestedInputSchema: z.ZodType<Prisma.VehicleUpdateOneWithoutDriverNestedInput> =
  z.strictObject({
    create: z
      .union([
        z.lazy(() => VehicleCreateWithoutDriverInputSchema),
        z.lazy(() => VehicleUncheckedCreateWithoutDriverInputSchema),
      ])
      .optional(),
    connectOrCreate: z
      .lazy(() => VehicleCreateOrConnectWithoutDriverInputSchema)
      .optional(),
    upsert: z.lazy(() => VehicleUpsertWithoutDriverInputSchema).optional(),
    disconnect: z
      .union([z.boolean(), z.lazy(() => VehicleWhereInputSchema)])
      .optional(),
    delete: z
      .union([z.boolean(), z.lazy(() => VehicleWhereInputSchema)])
      .optional(),
    connect: z.lazy(() => VehicleWhereUniqueInputSchema).optional(),
    update: z
      .union([
        z.lazy(() => VehicleUpdateToOneWithWhereWithoutDriverInputSchema),
        z.lazy(() => VehicleUpdateWithoutDriverInputSchema),
        z.lazy(() => VehicleUncheckedUpdateWithoutDriverInputSchema),
      ])
      .optional(),
  });

export const OperationalEventUpdateManyWithoutDriverNestedInputSchema: z.ZodType<Prisma.OperationalEventUpdateManyWithoutDriverNestedInput> =
  z.strictObject({
    create: z
      .union([
        z.lazy(() => OperationalEventCreateWithoutDriverInputSchema),
        z.lazy(() => OperationalEventCreateWithoutDriverInputSchema).array(),
        z.lazy(() => OperationalEventUncheckedCreateWithoutDriverInputSchema),
        z
          .lazy(() => OperationalEventUncheckedCreateWithoutDriverInputSchema)
          .array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => OperationalEventCreateOrConnectWithoutDriverInputSchema),
        z
          .lazy(() => OperationalEventCreateOrConnectWithoutDriverInputSchema)
          .array(),
      ])
      .optional(),
    upsert: z
      .union([
        z.lazy(
          () => OperationalEventUpsertWithWhereUniqueWithoutDriverInputSchema,
        ),
        z
          .lazy(
            () => OperationalEventUpsertWithWhereUniqueWithoutDriverInputSchema,
          )
          .array(),
      ])
      .optional(),
    createMany: z
      .lazy(() => OperationalEventCreateManyDriverInputEnvelopeSchema)
      .optional(),
    set: z
      .union([
        z.lazy(() => OperationalEventWhereUniqueInputSchema),
        z.lazy(() => OperationalEventWhereUniqueInputSchema).array(),
      ])
      .optional(),
    disconnect: z
      .union([
        z.lazy(() => OperationalEventWhereUniqueInputSchema),
        z.lazy(() => OperationalEventWhereUniqueInputSchema).array(),
      ])
      .optional(),
    delete: z
      .union([
        z.lazy(() => OperationalEventWhereUniqueInputSchema),
        z.lazy(() => OperationalEventWhereUniqueInputSchema).array(),
      ])
      .optional(),
    connect: z
      .union([
        z.lazy(() => OperationalEventWhereUniqueInputSchema),
        z.lazy(() => OperationalEventWhereUniqueInputSchema).array(),
      ])
      .optional(),
    update: z
      .union([
        z.lazy(
          () => OperationalEventUpdateWithWhereUniqueWithoutDriverInputSchema,
        ),
        z
          .lazy(
            () => OperationalEventUpdateWithWhereUniqueWithoutDriverInputSchema,
          )
          .array(),
      ])
      .optional(),
    updateMany: z
      .union([
        z.lazy(
          () => OperationalEventUpdateManyWithWhereWithoutDriverInputSchema,
        ),
        z
          .lazy(
            () => OperationalEventUpdateManyWithWhereWithoutDriverInputSchema,
          )
          .array(),
      ])
      .optional(),
    deleteMany: z
      .union([
        z.lazy(() => OperationalEventScalarWhereInputSchema),
        z.lazy(() => OperationalEventScalarWhereInputSchema).array(),
      ])
      .optional(),
  });

export const VehicleUncheckedUpdateOneWithoutDriverNestedInputSchema: z.ZodType<Prisma.VehicleUncheckedUpdateOneWithoutDriverNestedInput> =
  z.strictObject({
    create: z
      .union([
        z.lazy(() => VehicleCreateWithoutDriverInputSchema),
        z.lazy(() => VehicleUncheckedCreateWithoutDriverInputSchema),
      ])
      .optional(),
    connectOrCreate: z
      .lazy(() => VehicleCreateOrConnectWithoutDriverInputSchema)
      .optional(),
    upsert: z.lazy(() => VehicleUpsertWithoutDriverInputSchema).optional(),
    disconnect: z
      .union([z.boolean(), z.lazy(() => VehicleWhereInputSchema)])
      .optional(),
    delete: z
      .union([z.boolean(), z.lazy(() => VehicleWhereInputSchema)])
      .optional(),
    connect: z.lazy(() => VehicleWhereUniqueInputSchema).optional(),
    update: z
      .union([
        z.lazy(() => VehicleUpdateToOneWithWhereWithoutDriverInputSchema),
        z.lazy(() => VehicleUpdateWithoutDriverInputSchema),
        z.lazy(() => VehicleUncheckedUpdateWithoutDriverInputSchema),
      ])
      .optional(),
  });

export const OperationalEventUncheckedUpdateManyWithoutDriverNestedInputSchema: z.ZodType<Prisma.OperationalEventUncheckedUpdateManyWithoutDriverNestedInput> =
  z.strictObject({
    create: z
      .union([
        z.lazy(() => OperationalEventCreateWithoutDriverInputSchema),
        z.lazy(() => OperationalEventCreateWithoutDriverInputSchema).array(),
        z.lazy(() => OperationalEventUncheckedCreateWithoutDriverInputSchema),
        z
          .lazy(() => OperationalEventUncheckedCreateWithoutDriverInputSchema)
          .array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => OperationalEventCreateOrConnectWithoutDriverInputSchema),
        z
          .lazy(() => OperationalEventCreateOrConnectWithoutDriverInputSchema)
          .array(),
      ])
      .optional(),
    upsert: z
      .union([
        z.lazy(
          () => OperationalEventUpsertWithWhereUniqueWithoutDriverInputSchema,
        ),
        z
          .lazy(
            () => OperationalEventUpsertWithWhereUniqueWithoutDriverInputSchema,
          )
          .array(),
      ])
      .optional(),
    createMany: z
      .lazy(() => OperationalEventCreateManyDriverInputEnvelopeSchema)
      .optional(),
    set: z
      .union([
        z.lazy(() => OperationalEventWhereUniqueInputSchema),
        z.lazy(() => OperationalEventWhereUniqueInputSchema).array(),
      ])
      .optional(),
    disconnect: z
      .union([
        z.lazy(() => OperationalEventWhereUniqueInputSchema),
        z.lazy(() => OperationalEventWhereUniqueInputSchema).array(),
      ])
      .optional(),
    delete: z
      .union([
        z.lazy(() => OperationalEventWhereUniqueInputSchema),
        z.lazy(() => OperationalEventWhereUniqueInputSchema).array(),
      ])
      .optional(),
    connect: z
      .union([
        z.lazy(() => OperationalEventWhereUniqueInputSchema),
        z.lazy(() => OperationalEventWhereUniqueInputSchema).array(),
      ])
      .optional(),
    update: z
      .union([
        z.lazy(
          () => OperationalEventUpdateWithWhereUniqueWithoutDriverInputSchema,
        ),
        z
          .lazy(
            () => OperationalEventUpdateWithWhereUniqueWithoutDriverInputSchema,
          )
          .array(),
      ])
      .optional(),
    updateMany: z
      .union([
        z.lazy(
          () => OperationalEventUpdateManyWithWhereWithoutDriverInputSchema,
        ),
        z
          .lazy(
            () => OperationalEventUpdateManyWithWhereWithoutDriverInputSchema,
          )
          .array(),
      ])
      .optional(),
    deleteMany: z
      .union([
        z.lazy(() => OperationalEventScalarWhereInputSchema),
        z.lazy(() => OperationalEventScalarWhereInputSchema).array(),
      ])
      .optional(),
  });

export const CompanyCreateNestedOneWithoutUsersInputSchema: z.ZodType<Prisma.CompanyCreateNestedOneWithoutUsersInput> =
  z.strictObject({
    create: z
      .union([
        z.lazy(() => CompanyCreateWithoutUsersInputSchema),
        z.lazy(() => CompanyUncheckedCreateWithoutUsersInputSchema),
      ])
      .optional(),
    connectOrCreate: z
      .lazy(() => CompanyCreateOrConnectWithoutUsersInputSchema)
      .optional(),
    connect: z.lazy(() => CompanyWhereUniqueInputSchema).optional(),
  });

export const OperationalEventCreateNestedManyWithoutCreatedByInputSchema: z.ZodType<Prisma.OperationalEventCreateNestedManyWithoutCreatedByInput> =
  z.strictObject({
    create: z
      .union([
        z.lazy(() => OperationalEventCreateWithoutCreatedByInputSchema),
        z.lazy(() => OperationalEventCreateWithoutCreatedByInputSchema).array(),
        z.lazy(
          () => OperationalEventUncheckedCreateWithoutCreatedByInputSchema,
        ),
        z
          .lazy(
            () => OperationalEventUncheckedCreateWithoutCreatedByInputSchema,
          )
          .array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(
          () => OperationalEventCreateOrConnectWithoutCreatedByInputSchema,
        ),
        z
          .lazy(
            () => OperationalEventCreateOrConnectWithoutCreatedByInputSchema,
          )
          .array(),
      ])
      .optional(),
    createMany: z
      .lazy(() => OperationalEventCreateManyCreatedByInputEnvelopeSchema)
      .optional(),
    connect: z
      .union([
        z.lazy(() => OperationalEventWhereUniqueInputSchema),
        z.lazy(() => OperationalEventWhereUniqueInputSchema).array(),
      ])
      .optional(),
  });

export const OperationalEventUncheckedCreateNestedManyWithoutCreatedByInputSchema: z.ZodType<Prisma.OperationalEventUncheckedCreateNestedManyWithoutCreatedByInput> =
  z.strictObject({
    create: z
      .union([
        z.lazy(() => OperationalEventCreateWithoutCreatedByInputSchema),
        z.lazy(() => OperationalEventCreateWithoutCreatedByInputSchema).array(),
        z.lazy(
          () => OperationalEventUncheckedCreateWithoutCreatedByInputSchema,
        ),
        z
          .lazy(
            () => OperationalEventUncheckedCreateWithoutCreatedByInputSchema,
          )
          .array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(
          () => OperationalEventCreateOrConnectWithoutCreatedByInputSchema,
        ),
        z
          .lazy(
            () => OperationalEventCreateOrConnectWithoutCreatedByInputSchema,
          )
          .array(),
      ])
      .optional(),
    createMany: z
      .lazy(() => OperationalEventCreateManyCreatedByInputEnvelopeSchema)
      .optional(),
    connect: z
      .union([
        z.lazy(() => OperationalEventWhereUniqueInputSchema),
        z.lazy(() => OperationalEventWhereUniqueInputSchema).array(),
      ])
      .optional(),
  });

export const EnumUserRoleFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumUserRoleFieldUpdateOperationsInput> =
  z.strictObject({
    set: z.lazy(() => UserRoleSchema).optional(),
  });

export const CompanyUpdateOneRequiredWithoutUsersNestedInputSchema: z.ZodType<Prisma.CompanyUpdateOneRequiredWithoutUsersNestedInput> =
  z.strictObject({
    create: z
      .union([
        z.lazy(() => CompanyCreateWithoutUsersInputSchema),
        z.lazy(() => CompanyUncheckedCreateWithoutUsersInputSchema),
      ])
      .optional(),
    connectOrCreate: z
      .lazy(() => CompanyCreateOrConnectWithoutUsersInputSchema)
      .optional(),
    upsert: z.lazy(() => CompanyUpsertWithoutUsersInputSchema).optional(),
    connect: z.lazy(() => CompanyWhereUniqueInputSchema).optional(),
    update: z
      .union([
        z.lazy(() => CompanyUpdateToOneWithWhereWithoutUsersInputSchema),
        z.lazy(() => CompanyUpdateWithoutUsersInputSchema),
        z.lazy(() => CompanyUncheckedUpdateWithoutUsersInputSchema),
      ])
      .optional(),
  });

export const OperationalEventUpdateManyWithoutCreatedByNestedInputSchema: z.ZodType<Prisma.OperationalEventUpdateManyWithoutCreatedByNestedInput> =
  z.strictObject({
    create: z
      .union([
        z.lazy(() => OperationalEventCreateWithoutCreatedByInputSchema),
        z.lazy(() => OperationalEventCreateWithoutCreatedByInputSchema).array(),
        z.lazy(
          () => OperationalEventUncheckedCreateWithoutCreatedByInputSchema,
        ),
        z
          .lazy(
            () => OperationalEventUncheckedCreateWithoutCreatedByInputSchema,
          )
          .array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(
          () => OperationalEventCreateOrConnectWithoutCreatedByInputSchema,
        ),
        z
          .lazy(
            () => OperationalEventCreateOrConnectWithoutCreatedByInputSchema,
          )
          .array(),
      ])
      .optional(),
    upsert: z
      .union([
        z.lazy(
          () =>
            OperationalEventUpsertWithWhereUniqueWithoutCreatedByInputSchema,
        ),
        z
          .lazy(
            () =>
              OperationalEventUpsertWithWhereUniqueWithoutCreatedByInputSchema,
          )
          .array(),
      ])
      .optional(),
    createMany: z
      .lazy(() => OperationalEventCreateManyCreatedByInputEnvelopeSchema)
      .optional(),
    set: z
      .union([
        z.lazy(() => OperationalEventWhereUniqueInputSchema),
        z.lazy(() => OperationalEventWhereUniqueInputSchema).array(),
      ])
      .optional(),
    disconnect: z
      .union([
        z.lazy(() => OperationalEventWhereUniqueInputSchema),
        z.lazy(() => OperationalEventWhereUniqueInputSchema).array(),
      ])
      .optional(),
    delete: z
      .union([
        z.lazy(() => OperationalEventWhereUniqueInputSchema),
        z.lazy(() => OperationalEventWhereUniqueInputSchema).array(),
      ])
      .optional(),
    connect: z
      .union([
        z.lazy(() => OperationalEventWhereUniqueInputSchema),
        z.lazy(() => OperationalEventWhereUniqueInputSchema).array(),
      ])
      .optional(),
    update: z
      .union([
        z.lazy(
          () =>
            OperationalEventUpdateWithWhereUniqueWithoutCreatedByInputSchema,
        ),
        z
          .lazy(
            () =>
              OperationalEventUpdateWithWhereUniqueWithoutCreatedByInputSchema,
          )
          .array(),
      ])
      .optional(),
    updateMany: z
      .union([
        z.lazy(
          () => OperationalEventUpdateManyWithWhereWithoutCreatedByInputSchema,
        ),
        z
          .lazy(
            () =>
              OperationalEventUpdateManyWithWhereWithoutCreatedByInputSchema,
          )
          .array(),
      ])
      .optional(),
    deleteMany: z
      .union([
        z.lazy(() => OperationalEventScalarWhereInputSchema),
        z.lazy(() => OperationalEventScalarWhereInputSchema).array(),
      ])
      .optional(),
  });

export const OperationalEventUncheckedUpdateManyWithoutCreatedByNestedInputSchema: z.ZodType<Prisma.OperationalEventUncheckedUpdateManyWithoutCreatedByNestedInput> =
  z.strictObject({
    create: z
      .union([
        z.lazy(() => OperationalEventCreateWithoutCreatedByInputSchema),
        z.lazy(() => OperationalEventCreateWithoutCreatedByInputSchema).array(),
        z.lazy(
          () => OperationalEventUncheckedCreateWithoutCreatedByInputSchema,
        ),
        z
          .lazy(
            () => OperationalEventUncheckedCreateWithoutCreatedByInputSchema,
          )
          .array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(
          () => OperationalEventCreateOrConnectWithoutCreatedByInputSchema,
        ),
        z
          .lazy(
            () => OperationalEventCreateOrConnectWithoutCreatedByInputSchema,
          )
          .array(),
      ])
      .optional(),
    upsert: z
      .union([
        z.lazy(
          () =>
            OperationalEventUpsertWithWhereUniqueWithoutCreatedByInputSchema,
        ),
        z
          .lazy(
            () =>
              OperationalEventUpsertWithWhereUniqueWithoutCreatedByInputSchema,
          )
          .array(),
      ])
      .optional(),
    createMany: z
      .lazy(() => OperationalEventCreateManyCreatedByInputEnvelopeSchema)
      .optional(),
    set: z
      .union([
        z.lazy(() => OperationalEventWhereUniqueInputSchema),
        z.lazy(() => OperationalEventWhereUniqueInputSchema).array(),
      ])
      .optional(),
    disconnect: z
      .union([
        z.lazy(() => OperationalEventWhereUniqueInputSchema),
        z.lazy(() => OperationalEventWhereUniqueInputSchema).array(),
      ])
      .optional(),
    delete: z
      .union([
        z.lazy(() => OperationalEventWhereUniqueInputSchema),
        z.lazy(() => OperationalEventWhereUniqueInputSchema).array(),
      ])
      .optional(),
    connect: z
      .union([
        z.lazy(() => OperationalEventWhereUniqueInputSchema),
        z.lazy(() => OperationalEventWhereUniqueInputSchema).array(),
      ])
      .optional(),
    update: z
      .union([
        z.lazy(
          () =>
            OperationalEventUpdateWithWhereUniqueWithoutCreatedByInputSchema,
        ),
        z
          .lazy(
            () =>
              OperationalEventUpdateWithWhereUniqueWithoutCreatedByInputSchema,
          )
          .array(),
      ])
      .optional(),
    updateMany: z
      .union([
        z.lazy(
          () => OperationalEventUpdateManyWithWhereWithoutCreatedByInputSchema,
        ),
        z
          .lazy(
            () =>
              OperationalEventUpdateManyWithWhereWithoutCreatedByInputSchema,
          )
          .array(),
      ])
      .optional(),
    deleteMany: z
      .union([
        z.lazy(() => OperationalEventScalarWhereInputSchema),
        z.lazy(() => OperationalEventScalarWhereInputSchema).array(),
      ])
      .optional(),
  });

export const CompanyCreateNestedOneWithoutOperational_eventsInputSchema: z.ZodType<Prisma.CompanyCreateNestedOneWithoutOperational_eventsInput> =
  z.strictObject({
    create: z
      .union([
        z.lazy(() => CompanyCreateWithoutOperational_eventsInputSchema),
        z.lazy(
          () => CompanyUncheckedCreateWithoutOperational_eventsInputSchema,
        ),
      ])
      .optional(),
    connectOrCreate: z
      .lazy(() => CompanyCreateOrConnectWithoutOperational_eventsInputSchema)
      .optional(),
    connect: z.lazy(() => CompanyWhereUniqueInputSchema).optional(),
  });

export const VehicleCreateNestedOneWithoutOperational_eventsInputSchema: z.ZodType<Prisma.VehicleCreateNestedOneWithoutOperational_eventsInput> =
  z.strictObject({
    create: z
      .union([
        z.lazy(() => VehicleCreateWithoutOperational_eventsInputSchema),
        z.lazy(
          () => VehicleUncheckedCreateWithoutOperational_eventsInputSchema,
        ),
      ])
      .optional(),
    connectOrCreate: z
      .lazy(() => VehicleCreateOrConnectWithoutOperational_eventsInputSchema)
      .optional(),
    connect: z.lazy(() => VehicleWhereUniqueInputSchema).optional(),
  });

export const DriverCreateNestedOneWithoutOperational_eventsInputSchema: z.ZodType<Prisma.DriverCreateNestedOneWithoutOperational_eventsInput> =
  z.strictObject({
    create: z
      .union([
        z.lazy(() => DriverCreateWithoutOperational_eventsInputSchema),
        z.lazy(() => DriverUncheckedCreateWithoutOperational_eventsInputSchema),
      ])
      .optional(),
    connectOrCreate: z
      .lazy(() => DriverCreateOrConnectWithoutOperational_eventsInputSchema)
      .optional(),
    connect: z.lazy(() => DriverWhereUniqueInputSchema).optional(),
  });

export const UserCreateNestedOneWithoutOperational_eventsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutOperational_eventsInput> =
  z.strictObject({
    create: z
      .union([
        z.lazy(() => UserCreateWithoutOperational_eventsInputSchema),
        z.lazy(() => UserUncheckedCreateWithoutOperational_eventsInputSchema),
      ])
      .optional(),
    connectOrCreate: z
      .lazy(() => UserCreateOrConnectWithoutOperational_eventsInputSchema)
      .optional(),
    connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  });

export const EnumEventTypeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumEventTypeFieldUpdateOperationsInput> =
  z.strictObject({
    set: z.lazy(() => EventTypeSchema).optional(),
  });

export const NullableEnumLocationTypeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableEnumLocationTypeFieldUpdateOperationsInput> =
  z.strictObject({
    set: z
      .lazy(() => LocationTypeSchema)
      .optional()
      .nullable(),
  });

export const NullableEnumContextTypeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableEnumContextTypeFieldUpdateOperationsInput> =
  z.strictObject({
    set: z
      .lazy(() => ContextTypeSchema)
      .optional()
      .nullable(),
  });

export const NullableEnumGeneralResultFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableEnumGeneralResultFieldUpdateOperationsInput> =
  z.strictObject({
    set: z
      .lazy(() => GeneralResultSchema)
      .optional()
      .nullable(),
  });

export const NullableBoolFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableBoolFieldUpdateOperationsInput> =
  z.strictObject({
    set: z.boolean().optional().nullable(),
  });

export const CompanyUpdateOneRequiredWithoutOperational_eventsNestedInputSchema: z.ZodType<Prisma.CompanyUpdateOneRequiredWithoutOperational_eventsNestedInput> =
  z.strictObject({
    create: z
      .union([
        z.lazy(() => CompanyCreateWithoutOperational_eventsInputSchema),
        z.lazy(
          () => CompanyUncheckedCreateWithoutOperational_eventsInputSchema,
        ),
      ])
      .optional(),
    connectOrCreate: z
      .lazy(() => CompanyCreateOrConnectWithoutOperational_eventsInputSchema)
      .optional(),
    upsert: z
      .lazy(() => CompanyUpsertWithoutOperational_eventsInputSchema)
      .optional(),
    connect: z.lazy(() => CompanyWhereUniqueInputSchema).optional(),
    update: z
      .union([
        z.lazy(
          () => CompanyUpdateToOneWithWhereWithoutOperational_eventsInputSchema,
        ),
        z.lazy(() => CompanyUpdateWithoutOperational_eventsInputSchema),
        z.lazy(
          () => CompanyUncheckedUpdateWithoutOperational_eventsInputSchema,
        ),
      ])
      .optional(),
  });

export const VehicleUpdateOneWithoutOperational_eventsNestedInputSchema: z.ZodType<Prisma.VehicleUpdateOneWithoutOperational_eventsNestedInput> =
  z.strictObject({
    create: z
      .union([
        z.lazy(() => VehicleCreateWithoutOperational_eventsInputSchema),
        z.lazy(
          () => VehicleUncheckedCreateWithoutOperational_eventsInputSchema,
        ),
      ])
      .optional(),
    connectOrCreate: z
      .lazy(() => VehicleCreateOrConnectWithoutOperational_eventsInputSchema)
      .optional(),
    upsert: z
      .lazy(() => VehicleUpsertWithoutOperational_eventsInputSchema)
      .optional(),
    disconnect: z
      .union([z.boolean(), z.lazy(() => VehicleWhereInputSchema)])
      .optional(),
    delete: z
      .union([z.boolean(), z.lazy(() => VehicleWhereInputSchema)])
      .optional(),
    connect: z.lazy(() => VehicleWhereUniqueInputSchema).optional(),
    update: z
      .union([
        z.lazy(
          () => VehicleUpdateToOneWithWhereWithoutOperational_eventsInputSchema,
        ),
        z.lazy(() => VehicleUpdateWithoutOperational_eventsInputSchema),
        z.lazy(
          () => VehicleUncheckedUpdateWithoutOperational_eventsInputSchema,
        ),
      ])
      .optional(),
  });

export const DriverUpdateOneWithoutOperational_eventsNestedInputSchema: z.ZodType<Prisma.DriverUpdateOneWithoutOperational_eventsNestedInput> =
  z.strictObject({
    create: z
      .union([
        z.lazy(() => DriverCreateWithoutOperational_eventsInputSchema),
        z.lazy(() => DriverUncheckedCreateWithoutOperational_eventsInputSchema),
      ])
      .optional(),
    connectOrCreate: z
      .lazy(() => DriverCreateOrConnectWithoutOperational_eventsInputSchema)
      .optional(),
    upsert: z
      .lazy(() => DriverUpsertWithoutOperational_eventsInputSchema)
      .optional(),
    disconnect: z
      .union([z.boolean(), z.lazy(() => DriverWhereInputSchema)])
      .optional(),
    delete: z
      .union([z.boolean(), z.lazy(() => DriverWhereInputSchema)])
      .optional(),
    connect: z.lazy(() => DriverWhereUniqueInputSchema).optional(),
    update: z
      .union([
        z.lazy(
          () => DriverUpdateToOneWithWhereWithoutOperational_eventsInputSchema,
        ),
        z.lazy(() => DriverUpdateWithoutOperational_eventsInputSchema),
        z.lazy(() => DriverUncheckedUpdateWithoutOperational_eventsInputSchema),
      ])
      .optional(),
  });

export const UserUpdateOneRequiredWithoutOperational_eventsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutOperational_eventsNestedInput> =
  z.strictObject({
    create: z
      .union([
        z.lazy(() => UserCreateWithoutOperational_eventsInputSchema),
        z.lazy(() => UserUncheckedCreateWithoutOperational_eventsInputSchema),
      ])
      .optional(),
    connectOrCreate: z
      .lazy(() => UserCreateOrConnectWithoutOperational_eventsInputSchema)
      .optional(),
    upsert: z
      .lazy(() => UserUpsertWithoutOperational_eventsInputSchema)
      .optional(),
    connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
    update: z
      .union([
        z.lazy(
          () => UserUpdateToOneWithWhereWithoutOperational_eventsInputSchema,
        ),
        z.lazy(() => UserUpdateWithoutOperational_eventsInputSchema),
        z.lazy(() => UserUncheckedUpdateWithoutOperational_eventsInputSchema),
      ])
      .optional(),
  });

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> =
  z.strictObject({
    equals: z.string().optional(),
    in: z.string().array().optional(),
    notIn: z.string().array().optional(),
    lt: z.string().optional(),
    lte: z.string().optional(),
    gt: z.string().optional(),
    gte: z.string().optional(),
    contains: z.string().optional(),
    startsWith: z.string().optional(),
    endsWith: z.string().optional(),
    not: z
      .union([z.string(), z.lazy(() => NestedStringFilterSchema)])
      .optional(),
  });

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> =
  z.strictObject({
    equals: z.coerce.date().optional(),
    in: z.coerce.date().array().optional(),
    notIn: z.coerce.date().array().optional(),
    lt: z.coerce.date().optional(),
    lte: z.coerce.date().optional(),
    gt: z.coerce.date().optional(),
    gte: z.coerce.date().optional(),
    not: z
      .union([z.coerce.date(), z.lazy(() => NestedDateTimeFilterSchema)])
      .optional(),
  });

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> =
  z.strictObject({
    equals: z.string().optional(),
    in: z.string().array().optional(),
    notIn: z.string().array().optional(),
    lt: z.string().optional(),
    lte: z.string().optional(),
    gt: z.string().optional(),
    gte: z.string().optional(),
    contains: z.string().optional(),
    startsWith: z.string().optional(),
    endsWith: z.string().optional(),
    not: z
      .union([z.string(), z.lazy(() => NestedStringWithAggregatesFilterSchema)])
      .optional(),
    _count: z.lazy(() => NestedIntFilterSchema).optional(),
    _min: z.lazy(() => NestedStringFilterSchema).optional(),
    _max: z.lazy(() => NestedStringFilterSchema).optional(),
  });

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> =
  z.strictObject({
    equals: z.number().optional(),
    in: z.number().array().optional(),
    notIn: z.number().array().optional(),
    lt: z.number().optional(),
    lte: z.number().optional(),
    gt: z.number().optional(),
    gte: z.number().optional(),
    not: z.union([z.number(), z.lazy(() => NestedIntFilterSchema)]).optional(),
  });

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> =
  z.strictObject({
    equals: z.coerce.date().optional(),
    in: z.coerce.date().array().optional(),
    notIn: z.coerce.date().array().optional(),
    lt: z.coerce.date().optional(),
    lte: z.coerce.date().optional(),
    gt: z.coerce.date().optional(),
    gte: z.coerce.date().optional(),
    not: z
      .union([
        z.coerce.date(),
        z.lazy(() => NestedDateTimeWithAggregatesFilterSchema),
      ])
      .optional(),
    _count: z.lazy(() => NestedIntFilterSchema).optional(),
    _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
    _max: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  });

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> =
  z.strictObject({
    equals: z.string().optional().nullable(),
    in: z.string().array().optional().nullable(),
    notIn: z.string().array().optional().nullable(),
    lt: z.string().optional(),
    lte: z.string().optional(),
    gt: z.string().optional(),
    gte: z.string().optional(),
    contains: z.string().optional(),
    startsWith: z.string().optional(),
    endsWith: z.string().optional(),
    not: z
      .union([z.string(), z.lazy(() => NestedStringNullableFilterSchema)])
      .optional()
      .nullable(),
  });

export const NestedBoolFilterSchema: z.ZodType<Prisma.NestedBoolFilter> =
  z.strictObject({
    equals: z.boolean().optional(),
    not: z
      .union([z.boolean(), z.lazy(() => NestedBoolFilterSchema)])
      .optional(),
  });

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> =
  z.strictObject({
    equals: z.string().optional().nullable(),
    in: z.string().array().optional().nullable(),
    notIn: z.string().array().optional().nullable(),
    lt: z.string().optional(),
    lte: z.string().optional(),
    gt: z.string().optional(),
    gte: z.string().optional(),
    contains: z.string().optional(),
    startsWith: z.string().optional(),
    endsWith: z.string().optional(),
    not: z
      .union([
        z.string(),
        z.lazy(() => NestedStringNullableWithAggregatesFilterSchema),
      ])
      .optional()
      .nullable(),
    _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
    _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
    _max: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  });

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> =
  z.strictObject({
    equals: z.number().optional().nullable(),
    in: z.number().array().optional().nullable(),
    notIn: z.number().array().optional().nullable(),
    lt: z.number().optional(),
    lte: z.number().optional(),
    gt: z.number().optional(),
    gte: z.number().optional(),
    not: z
      .union([z.number(), z.lazy(() => NestedIntNullableFilterSchema)])
      .optional()
      .nullable(),
  });

export const NestedBoolWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBoolWithAggregatesFilter> =
  z.strictObject({
    equals: z.boolean().optional(),
    not: z
      .union([z.boolean(), z.lazy(() => NestedBoolWithAggregatesFilterSchema)])
      .optional(),
    _count: z.lazy(() => NestedIntFilterSchema).optional(),
    _min: z.lazy(() => NestedBoolFilterSchema).optional(),
    _max: z.lazy(() => NestedBoolFilterSchema).optional(),
  });

export const NestedEnumUserRoleFilterSchema: z.ZodType<Prisma.NestedEnumUserRoleFilter> =
  z.strictObject({
    equals: z.lazy(() => UserRoleSchema).optional(),
    in: z
      .lazy(() => UserRoleSchema)
      .array()
      .optional(),
    notIn: z
      .lazy(() => UserRoleSchema)
      .array()
      .optional(),
    not: z
      .union([
        z.lazy(() => UserRoleSchema),
        z.lazy(() => NestedEnumUserRoleFilterSchema),
      ])
      .optional(),
  });

export const NestedEnumUserRoleWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumUserRoleWithAggregatesFilter> =
  z.strictObject({
    equals: z.lazy(() => UserRoleSchema).optional(),
    in: z
      .lazy(() => UserRoleSchema)
      .array()
      .optional(),
    notIn: z
      .lazy(() => UserRoleSchema)
      .array()
      .optional(),
    not: z
      .union([
        z.lazy(() => UserRoleSchema),
        z.lazy(() => NestedEnumUserRoleWithAggregatesFilterSchema),
      ])
      .optional(),
    _count: z.lazy(() => NestedIntFilterSchema).optional(),
    _min: z.lazy(() => NestedEnumUserRoleFilterSchema).optional(),
    _max: z.lazy(() => NestedEnumUserRoleFilterSchema).optional(),
  });

export const NestedEnumEventTypeFilterSchema: z.ZodType<Prisma.NestedEnumEventTypeFilter> =
  z.strictObject({
    equals: z.lazy(() => EventTypeSchema).optional(),
    in: z
      .lazy(() => EventTypeSchema)
      .array()
      .optional(),
    notIn: z
      .lazy(() => EventTypeSchema)
      .array()
      .optional(),
    not: z
      .union([
        z.lazy(() => EventTypeSchema),
        z.lazy(() => NestedEnumEventTypeFilterSchema),
      ])
      .optional(),
  });

export const NestedEnumLocationTypeNullableFilterSchema: z.ZodType<Prisma.NestedEnumLocationTypeNullableFilter> =
  z.strictObject({
    equals: z
      .lazy(() => LocationTypeSchema)
      .optional()
      .nullable(),
    in: z
      .lazy(() => LocationTypeSchema)
      .array()
      .optional()
      .nullable(),
    notIn: z
      .lazy(() => LocationTypeSchema)
      .array()
      .optional()
      .nullable(),
    not: z
      .union([
        z.lazy(() => LocationTypeSchema),
        z.lazy(() => NestedEnumLocationTypeNullableFilterSchema),
      ])
      .optional()
      .nullable(),
  });

export const NestedEnumContextTypeNullableFilterSchema: z.ZodType<Prisma.NestedEnumContextTypeNullableFilter> =
  z.strictObject({
    equals: z
      .lazy(() => ContextTypeSchema)
      .optional()
      .nullable(),
    in: z
      .lazy(() => ContextTypeSchema)
      .array()
      .optional()
      .nullable(),
    notIn: z
      .lazy(() => ContextTypeSchema)
      .array()
      .optional()
      .nullable(),
    not: z
      .union([
        z.lazy(() => ContextTypeSchema),
        z.lazy(() => NestedEnumContextTypeNullableFilterSchema),
      ])
      .optional()
      .nullable(),
  });

export const NestedEnumGeneralResultNullableFilterSchema: z.ZodType<Prisma.NestedEnumGeneralResultNullableFilter> =
  z.strictObject({
    equals: z
      .lazy(() => GeneralResultSchema)
      .optional()
      .nullable(),
    in: z
      .lazy(() => GeneralResultSchema)
      .array()
      .optional()
      .nullable(),
    notIn: z
      .lazy(() => GeneralResultSchema)
      .array()
      .optional()
      .nullable(),
    not: z
      .union([
        z.lazy(() => GeneralResultSchema),
        z.lazy(() => NestedEnumGeneralResultNullableFilterSchema),
      ])
      .optional()
      .nullable(),
  });

export const NestedBoolNullableFilterSchema: z.ZodType<Prisma.NestedBoolNullableFilter> =
  z.strictObject({
    equals: z.boolean().optional().nullable(),
    not: z
      .union([z.boolean(), z.lazy(() => NestedBoolNullableFilterSchema)])
      .optional()
      .nullable(),
  });

export const NestedEnumEventTypeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumEventTypeWithAggregatesFilter> =
  z.strictObject({
    equals: z.lazy(() => EventTypeSchema).optional(),
    in: z
      .lazy(() => EventTypeSchema)
      .array()
      .optional(),
    notIn: z
      .lazy(() => EventTypeSchema)
      .array()
      .optional(),
    not: z
      .union([
        z.lazy(() => EventTypeSchema),
        z.lazy(() => NestedEnumEventTypeWithAggregatesFilterSchema),
      ])
      .optional(),
    _count: z.lazy(() => NestedIntFilterSchema).optional(),
    _min: z.lazy(() => NestedEnumEventTypeFilterSchema).optional(),
    _max: z.lazy(() => NestedEnumEventTypeFilterSchema).optional(),
  });

export const NestedEnumLocationTypeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumLocationTypeNullableWithAggregatesFilter> =
  z.strictObject({
    equals: z
      .lazy(() => LocationTypeSchema)
      .optional()
      .nullable(),
    in: z
      .lazy(() => LocationTypeSchema)
      .array()
      .optional()
      .nullable(),
    notIn: z
      .lazy(() => LocationTypeSchema)
      .array()
      .optional()
      .nullable(),
    not: z
      .union([
        z.lazy(() => LocationTypeSchema),
        z.lazy(() => NestedEnumLocationTypeNullableWithAggregatesFilterSchema),
      ])
      .optional()
      .nullable(),
    _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
    _min: z.lazy(() => NestedEnumLocationTypeNullableFilterSchema).optional(),
    _max: z.lazy(() => NestedEnumLocationTypeNullableFilterSchema).optional(),
  });

export const NestedEnumContextTypeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumContextTypeNullableWithAggregatesFilter> =
  z.strictObject({
    equals: z
      .lazy(() => ContextTypeSchema)
      .optional()
      .nullable(),
    in: z
      .lazy(() => ContextTypeSchema)
      .array()
      .optional()
      .nullable(),
    notIn: z
      .lazy(() => ContextTypeSchema)
      .array()
      .optional()
      .nullable(),
    not: z
      .union([
        z.lazy(() => ContextTypeSchema),
        z.lazy(() => NestedEnumContextTypeNullableWithAggregatesFilterSchema),
      ])
      .optional()
      .nullable(),
    _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
    _min: z.lazy(() => NestedEnumContextTypeNullableFilterSchema).optional(),
    _max: z.lazy(() => NestedEnumContextTypeNullableFilterSchema).optional(),
  });

export const NestedEnumGeneralResultNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumGeneralResultNullableWithAggregatesFilter> =
  z.strictObject({
    equals: z
      .lazy(() => GeneralResultSchema)
      .optional()
      .nullable(),
    in: z
      .lazy(() => GeneralResultSchema)
      .array()
      .optional()
      .nullable(),
    notIn: z
      .lazy(() => GeneralResultSchema)
      .array()
      .optional()
      .nullable(),
    not: z
      .union([
        z.lazy(() => GeneralResultSchema),
        z.lazy(() => NestedEnumGeneralResultNullableWithAggregatesFilterSchema),
      ])
      .optional()
      .nullable(),
    _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
    _min: z.lazy(() => NestedEnumGeneralResultNullableFilterSchema).optional(),
    _max: z.lazy(() => NestedEnumGeneralResultNullableFilterSchema).optional(),
  });

export const NestedBoolNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBoolNullableWithAggregatesFilter> =
  z.strictObject({
    equals: z.boolean().optional().nullable(),
    not: z
      .union([
        z.boolean(),
        z.lazy(() => NestedBoolNullableWithAggregatesFilterSchema),
      ])
      .optional()
      .nullable(),
    _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
    _min: z.lazy(() => NestedBoolNullableFilterSchema).optional(),
    _max: z.lazy(() => NestedBoolNullableFilterSchema).optional(),
  });

export const VehicleCreateWithoutCompanyInputSchema: z.ZodType<Prisma.VehicleCreateWithoutCompanyInput> =
  z.strictObject({
    id: z.uuid().optional(),
    unit_number: z.string().optional().nullable(),
    plate: z.string().optional().nullable(),
    is_active: z.boolean().optional(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    driver: z
      .lazy(() => DriverCreateNestedOneWithoutVehicleInputSchema)
      .optional(),
    operational_events: z
      .lazy(() => OperationalEventCreateNestedManyWithoutVehicleInputSchema)
      .optional(),
  });

export const VehicleUncheckedCreateWithoutCompanyInputSchema: z.ZodType<Prisma.VehicleUncheckedCreateWithoutCompanyInput> =
  z.strictObject({
    id: z.uuid().optional(),
    driverId: z.string().optional().nullable(),
    unit_number: z.string().optional().nullable(),
    plate: z.string().optional().nullable(),
    is_active: z.boolean().optional(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    operational_events: z
      .lazy(
        () =>
          OperationalEventUncheckedCreateNestedManyWithoutVehicleInputSchema,
      )
      .optional(),
  });

export const VehicleCreateOrConnectWithoutCompanyInputSchema: z.ZodType<Prisma.VehicleCreateOrConnectWithoutCompanyInput> =
  z.strictObject({
    where: z.lazy(() => VehicleWhereUniqueInputSchema),
    create: z.union([
      z.lazy(() => VehicleCreateWithoutCompanyInputSchema),
      z.lazy(() => VehicleUncheckedCreateWithoutCompanyInputSchema),
    ]),
  });

export const VehicleCreateManyCompanyInputEnvelopeSchema: z.ZodType<Prisma.VehicleCreateManyCompanyInputEnvelope> =
  z.strictObject({
    data: z.union([
      z.lazy(() => VehicleCreateManyCompanyInputSchema),
      z.lazy(() => VehicleCreateManyCompanyInputSchema).array(),
    ]),
    skipDuplicates: z.boolean().optional(),
  });

export const DriverCreateWithoutCompanyInputSchema: z.ZodType<Prisma.DriverCreateWithoutCompanyInput> =
  z.strictObject({
    id: z.uuid().optional(),
    name: z.string(),
    license_number: z.string(),
    is_active: z.boolean().optional(),
    created_at: z.coerce.date().optional(),
    updated_at: z.coerce.date().optional(),
    vehicle: z
      .lazy(() => VehicleCreateNestedOneWithoutDriverInputSchema)
      .optional(),
    operational_events: z
      .lazy(() => OperationalEventCreateNestedManyWithoutDriverInputSchema)
      .optional(),
  });

export const DriverUncheckedCreateWithoutCompanyInputSchema: z.ZodType<Prisma.DriverUncheckedCreateWithoutCompanyInput> =
  z.strictObject({
    id: z.uuid().optional(),
    name: z.string(),
    license_number: z.string(),
    is_active: z.boolean().optional(),
    created_at: z.coerce.date().optional(),
    updated_at: z.coerce.date().optional(),
    vehicle: z
      .lazy(() => VehicleUncheckedCreateNestedOneWithoutDriverInputSchema)
      .optional(),
    operational_events: z
      .lazy(
        () => OperationalEventUncheckedCreateNestedManyWithoutDriverInputSchema,
      )
      .optional(),
  });

export const DriverCreateOrConnectWithoutCompanyInputSchema: z.ZodType<Prisma.DriverCreateOrConnectWithoutCompanyInput> =
  z.strictObject({
    where: z.lazy(() => DriverWhereUniqueInputSchema),
    create: z.union([
      z.lazy(() => DriverCreateWithoutCompanyInputSchema),
      z.lazy(() => DriverUncheckedCreateWithoutCompanyInputSchema),
    ]),
  });

export const DriverCreateManyCompanyInputEnvelopeSchema: z.ZodType<Prisma.DriverCreateManyCompanyInputEnvelope> =
  z.strictObject({
    data: z.union([
      z.lazy(() => DriverCreateManyCompanyInputSchema),
      z.lazy(() => DriverCreateManyCompanyInputSchema).array(),
    ]),
    skipDuplicates: z.boolean().optional(),
  });

export const UserCreateWithoutCompanyInputSchema: z.ZodType<Prisma.UserCreateWithoutCompanyInput> =
  z.strictObject({
    id: z.uuid().optional(),
    name: z.string(),
    email: z.string(),
    passwordHash: z.string(),
    role: z.lazy(() => UserRoleSchema).optional(),
    isActive: z.boolean().optional(),
    createdAt: z.coerce.date().optional(),
    operational_events: z
      .lazy(() => OperationalEventCreateNestedManyWithoutCreatedByInputSchema)
      .optional(),
  });

export const UserUncheckedCreateWithoutCompanyInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutCompanyInput> =
  z.strictObject({
    id: z.uuid().optional(),
    name: z.string(),
    email: z.string(),
    passwordHash: z.string(),
    role: z.lazy(() => UserRoleSchema).optional(),
    isActive: z.boolean().optional(),
    createdAt: z.coerce.date().optional(),
    operational_events: z
      .lazy(
        () =>
          OperationalEventUncheckedCreateNestedManyWithoutCreatedByInputSchema,
      )
      .optional(),
  });

export const UserCreateOrConnectWithoutCompanyInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutCompanyInput> =
  z.strictObject({
    where: z.lazy(() => UserWhereUniqueInputSchema),
    create: z.union([
      z.lazy(() => UserCreateWithoutCompanyInputSchema),
      z.lazy(() => UserUncheckedCreateWithoutCompanyInputSchema),
    ]),
  });

export const UserCreateManyCompanyInputEnvelopeSchema: z.ZodType<Prisma.UserCreateManyCompanyInputEnvelope> =
  z.strictObject({
    data: z.union([
      z.lazy(() => UserCreateManyCompanyInputSchema),
      z.lazy(() => UserCreateManyCompanyInputSchema).array(),
    ]),
    skipDuplicates: z.boolean().optional(),
  });

export const OperationalEventCreateWithoutCompanyInputSchema: z.ZodType<Prisma.OperationalEventCreateWithoutCompanyInput> =
  z.strictObject({
    id: z.uuid().optional(),
    event_type: z.lazy(() => EventTypeSchema),
    event_datetime: z.coerce.date(),
    location: z
      .lazy(() => LocationTypeSchema)
      .optional()
      .nullable(),
    context: z
      .lazy(() => ContextTypeSchema)
      .optional()
      .nullable(),
    general_result: z
      .lazy(() => GeneralResultSchema)
      .optional()
      .nullable(),
    e_signature: z.string().optional().nullable(),
    final_observations: z.string().optional().nullable(),
    is_confirmed: z.boolean().optional().nullable(),
    created_at: z.coerce.date().optional(),
    updated_at: z.coerce.date().optional(),
    vehicle: z
      .lazy(() => VehicleCreateNestedOneWithoutOperational_eventsInputSchema)
      .optional(),
    driver: z
      .lazy(() => DriverCreateNestedOneWithoutOperational_eventsInputSchema)
      .optional(),
    createdBy: z.lazy(
      () => UserCreateNestedOneWithoutOperational_eventsInputSchema,
    ),
  });

export const OperationalEventUncheckedCreateWithoutCompanyInputSchema: z.ZodType<Prisma.OperationalEventUncheckedCreateWithoutCompanyInput> =
  z.strictObject({
    id: z.uuid().optional(),
    vehicle_id: z.string().optional().nullable(),
    driver_id: z.string().optional().nullable(),
    event_type: z.lazy(() => EventTypeSchema),
    event_datetime: z.coerce.date(),
    location: z
      .lazy(() => LocationTypeSchema)
      .optional()
      .nullable(),
    context: z
      .lazy(() => ContextTypeSchema)
      .optional()
      .nullable(),
    general_result: z
      .lazy(() => GeneralResultSchema)
      .optional()
      .nullable(),
    e_signature: z.string().optional().nullable(),
    final_observations: z.string().optional().nullable(),
    is_confirmed: z.boolean().optional().nullable(),
    created_by_user_id: z.string(),
    created_at: z.coerce.date().optional(),
    updated_at: z.coerce.date().optional(),
  });

export const OperationalEventCreateOrConnectWithoutCompanyInputSchema: z.ZodType<Prisma.OperationalEventCreateOrConnectWithoutCompanyInput> =
  z.strictObject({
    where: z.lazy(() => OperationalEventWhereUniqueInputSchema),
    create: z.union([
      z.lazy(() => OperationalEventCreateWithoutCompanyInputSchema),
      z.lazy(() => OperationalEventUncheckedCreateWithoutCompanyInputSchema),
    ]),
  });

export const OperationalEventCreateManyCompanyInputEnvelopeSchema: z.ZodType<Prisma.OperationalEventCreateManyCompanyInputEnvelope> =
  z.strictObject({
    data: z.union([
      z.lazy(() => OperationalEventCreateManyCompanyInputSchema),
      z.lazy(() => OperationalEventCreateManyCompanyInputSchema).array(),
    ]),
    skipDuplicates: z.boolean().optional(),
  });

export const VehicleUpsertWithWhereUniqueWithoutCompanyInputSchema: z.ZodType<Prisma.VehicleUpsertWithWhereUniqueWithoutCompanyInput> =
  z.strictObject({
    where: z.lazy(() => VehicleWhereUniqueInputSchema),
    update: z.union([
      z.lazy(() => VehicleUpdateWithoutCompanyInputSchema),
      z.lazy(() => VehicleUncheckedUpdateWithoutCompanyInputSchema),
    ]),
    create: z.union([
      z.lazy(() => VehicleCreateWithoutCompanyInputSchema),
      z.lazy(() => VehicleUncheckedCreateWithoutCompanyInputSchema),
    ]),
  });

export const VehicleUpdateWithWhereUniqueWithoutCompanyInputSchema: z.ZodType<Prisma.VehicleUpdateWithWhereUniqueWithoutCompanyInput> =
  z.strictObject({
    where: z.lazy(() => VehicleWhereUniqueInputSchema),
    data: z.union([
      z.lazy(() => VehicleUpdateWithoutCompanyInputSchema),
      z.lazy(() => VehicleUncheckedUpdateWithoutCompanyInputSchema),
    ]),
  });

export const VehicleUpdateManyWithWhereWithoutCompanyInputSchema: z.ZodType<Prisma.VehicleUpdateManyWithWhereWithoutCompanyInput> =
  z.strictObject({
    where: z.lazy(() => VehicleScalarWhereInputSchema),
    data: z.union([
      z.lazy(() => VehicleUpdateManyMutationInputSchema),
      z.lazy(() => VehicleUncheckedUpdateManyWithoutCompanyInputSchema),
    ]),
  });

export const VehicleScalarWhereInputSchema: z.ZodType<Prisma.VehicleScalarWhereInput> =
  z.strictObject({
    AND: z
      .union([
        z.lazy(() => VehicleScalarWhereInputSchema),
        z.lazy(() => VehicleScalarWhereInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => VehicleScalarWhereInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => VehicleScalarWhereInputSchema),
        z.lazy(() => VehicleScalarWhereInputSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    companyId: z
      .union([z.lazy(() => StringFilterSchema), z.string()])
      .optional(),
    driverId: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    unit_number: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    plate: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    is_active: z
      .union([z.lazy(() => BoolFilterSchema), z.boolean()])
      .optional(),
    createdAt: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
    updatedAt: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
  });

export const DriverUpsertWithWhereUniqueWithoutCompanyInputSchema: z.ZodType<Prisma.DriverUpsertWithWhereUniqueWithoutCompanyInput> =
  z.strictObject({
    where: z.lazy(() => DriverWhereUniqueInputSchema),
    update: z.union([
      z.lazy(() => DriverUpdateWithoutCompanyInputSchema),
      z.lazy(() => DriverUncheckedUpdateWithoutCompanyInputSchema),
    ]),
    create: z.union([
      z.lazy(() => DriverCreateWithoutCompanyInputSchema),
      z.lazy(() => DriverUncheckedCreateWithoutCompanyInputSchema),
    ]),
  });

export const DriverUpdateWithWhereUniqueWithoutCompanyInputSchema: z.ZodType<Prisma.DriverUpdateWithWhereUniqueWithoutCompanyInput> =
  z.strictObject({
    where: z.lazy(() => DriverWhereUniqueInputSchema),
    data: z.union([
      z.lazy(() => DriverUpdateWithoutCompanyInputSchema),
      z.lazy(() => DriverUncheckedUpdateWithoutCompanyInputSchema),
    ]),
  });

export const DriverUpdateManyWithWhereWithoutCompanyInputSchema: z.ZodType<Prisma.DriverUpdateManyWithWhereWithoutCompanyInput> =
  z.strictObject({
    where: z.lazy(() => DriverScalarWhereInputSchema),
    data: z.union([
      z.lazy(() => DriverUpdateManyMutationInputSchema),
      z.lazy(() => DriverUncheckedUpdateManyWithoutCompanyInputSchema),
    ]),
  });

export const DriverScalarWhereInputSchema: z.ZodType<Prisma.DriverScalarWhereInput> =
  z.strictObject({
    AND: z
      .union([
        z.lazy(() => DriverScalarWhereInputSchema),
        z.lazy(() => DriverScalarWhereInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => DriverScalarWhereInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => DriverScalarWhereInputSchema),
        z.lazy(() => DriverScalarWhereInputSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    companyId: z
      .union([z.lazy(() => StringFilterSchema), z.string()])
      .optional(),
    name: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    license_number: z
      .union([z.lazy(() => StringFilterSchema), z.string()])
      .optional(),
    is_active: z
      .union([z.lazy(() => BoolFilterSchema), z.boolean()])
      .optional(),
    created_at: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
    updated_at: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
  });

export const UserUpsertWithWhereUniqueWithoutCompanyInputSchema: z.ZodType<Prisma.UserUpsertWithWhereUniqueWithoutCompanyInput> =
  z.strictObject({
    where: z.lazy(() => UserWhereUniqueInputSchema),
    update: z.union([
      z.lazy(() => UserUpdateWithoutCompanyInputSchema),
      z.lazy(() => UserUncheckedUpdateWithoutCompanyInputSchema),
    ]),
    create: z.union([
      z.lazy(() => UserCreateWithoutCompanyInputSchema),
      z.lazy(() => UserUncheckedCreateWithoutCompanyInputSchema),
    ]),
  });

export const UserUpdateWithWhereUniqueWithoutCompanyInputSchema: z.ZodType<Prisma.UserUpdateWithWhereUniqueWithoutCompanyInput> =
  z.strictObject({
    where: z.lazy(() => UserWhereUniqueInputSchema),
    data: z.union([
      z.lazy(() => UserUpdateWithoutCompanyInputSchema),
      z.lazy(() => UserUncheckedUpdateWithoutCompanyInputSchema),
    ]),
  });

export const UserUpdateManyWithWhereWithoutCompanyInputSchema: z.ZodType<Prisma.UserUpdateManyWithWhereWithoutCompanyInput> =
  z.strictObject({
    where: z.lazy(() => UserScalarWhereInputSchema),
    data: z.union([
      z.lazy(() => UserUpdateManyMutationInputSchema),
      z.lazy(() => UserUncheckedUpdateManyWithoutCompanyInputSchema),
    ]),
  });

export const UserScalarWhereInputSchema: z.ZodType<Prisma.UserScalarWhereInput> =
  z.strictObject({
    AND: z
      .union([
        z.lazy(() => UserScalarWhereInputSchema),
        z.lazy(() => UserScalarWhereInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => UserScalarWhereInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => UserScalarWhereInputSchema),
        z.lazy(() => UserScalarWhereInputSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    companyId: z
      .union([z.lazy(() => StringFilterSchema), z.string()])
      .optional(),
    name: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    email: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    passwordHash: z
      .union([z.lazy(() => StringFilterSchema), z.string()])
      .optional(),
    role: z
      .union([
        z.lazy(() => EnumUserRoleFilterSchema),
        z.lazy(() => UserRoleSchema),
      ])
      .optional(),
    isActive: z.union([z.lazy(() => BoolFilterSchema), z.boolean()]).optional(),
    createdAt: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
  });

export const OperationalEventUpsertWithWhereUniqueWithoutCompanyInputSchema: z.ZodType<Prisma.OperationalEventUpsertWithWhereUniqueWithoutCompanyInput> =
  z.strictObject({
    where: z.lazy(() => OperationalEventWhereUniqueInputSchema),
    update: z.union([
      z.lazy(() => OperationalEventUpdateWithoutCompanyInputSchema),
      z.lazy(() => OperationalEventUncheckedUpdateWithoutCompanyInputSchema),
    ]),
    create: z.union([
      z.lazy(() => OperationalEventCreateWithoutCompanyInputSchema),
      z.lazy(() => OperationalEventUncheckedCreateWithoutCompanyInputSchema),
    ]),
  });

export const OperationalEventUpdateWithWhereUniqueWithoutCompanyInputSchema: z.ZodType<Prisma.OperationalEventUpdateWithWhereUniqueWithoutCompanyInput> =
  z.strictObject({
    where: z.lazy(() => OperationalEventWhereUniqueInputSchema),
    data: z.union([
      z.lazy(() => OperationalEventUpdateWithoutCompanyInputSchema),
      z.lazy(() => OperationalEventUncheckedUpdateWithoutCompanyInputSchema),
    ]),
  });

export const OperationalEventUpdateManyWithWhereWithoutCompanyInputSchema: z.ZodType<Prisma.OperationalEventUpdateManyWithWhereWithoutCompanyInput> =
  z.strictObject({
    where: z.lazy(() => OperationalEventScalarWhereInputSchema),
    data: z.union([
      z.lazy(() => OperationalEventUpdateManyMutationInputSchema),
      z.lazy(
        () => OperationalEventUncheckedUpdateManyWithoutCompanyInputSchema,
      ),
    ]),
  });

export const OperationalEventScalarWhereInputSchema: z.ZodType<Prisma.OperationalEventScalarWhereInput> =
  z.strictObject({
    AND: z
      .union([
        z.lazy(() => OperationalEventScalarWhereInputSchema),
        z.lazy(() => OperationalEventScalarWhereInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => OperationalEventScalarWhereInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => OperationalEventScalarWhereInputSchema),
        z.lazy(() => OperationalEventScalarWhereInputSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    company_id: z
      .union([z.lazy(() => StringFilterSchema), z.string()])
      .optional(),
    vehicle_id: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    driver_id: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    event_type: z
      .union([
        z.lazy(() => EnumEventTypeFilterSchema),
        z.lazy(() => EventTypeSchema),
      ])
      .optional(),
    event_datetime: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
    location: z
      .union([
        z.lazy(() => EnumLocationTypeNullableFilterSchema),
        z.lazy(() => LocationTypeSchema),
      ])
      .optional()
      .nullable(),
    context: z
      .union([
        z.lazy(() => EnumContextTypeNullableFilterSchema),
        z.lazy(() => ContextTypeSchema),
      ])
      .optional()
      .nullable(),
    general_result: z
      .union([
        z.lazy(() => EnumGeneralResultNullableFilterSchema),
        z.lazy(() => GeneralResultSchema),
      ])
      .optional()
      .nullable(),
    e_signature: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    final_observations: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    is_confirmed: z
      .union([z.lazy(() => BoolNullableFilterSchema), z.boolean()])
      .optional()
      .nullable(),
    created_by_user_id: z
      .union([z.lazy(() => StringFilterSchema), z.string()])
      .optional(),
    created_at: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
    updated_at: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
  });

export const CompanyCreateWithoutVehiclesInputSchema: z.ZodType<Prisma.CompanyCreateWithoutVehiclesInput> =
  z.strictObject({
    id: z.uuid().optional(),
    name: z.string(),
    usdotNumber: z.string(),
    state: z.string(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    drivers: z
      .lazy(() => DriverCreateNestedManyWithoutCompanyInputSchema)
      .optional(),
    users: z
      .lazy(() => UserCreateNestedManyWithoutCompanyInputSchema)
      .optional(),
    operational_events: z
      .lazy(() => OperationalEventCreateNestedManyWithoutCompanyInputSchema)
      .optional(),
  });

export const CompanyUncheckedCreateWithoutVehiclesInputSchema: z.ZodType<Prisma.CompanyUncheckedCreateWithoutVehiclesInput> =
  z.strictObject({
    id: z.uuid().optional(),
    name: z.string(),
    usdotNumber: z.string(),
    state: z.string(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    drivers: z
      .lazy(() => DriverUncheckedCreateNestedManyWithoutCompanyInputSchema)
      .optional(),
    users: z
      .lazy(() => UserUncheckedCreateNestedManyWithoutCompanyInputSchema)
      .optional(),
    operational_events: z
      .lazy(
        () =>
          OperationalEventUncheckedCreateNestedManyWithoutCompanyInputSchema,
      )
      .optional(),
  });

export const CompanyCreateOrConnectWithoutVehiclesInputSchema: z.ZodType<Prisma.CompanyCreateOrConnectWithoutVehiclesInput> =
  z.strictObject({
    where: z.lazy(() => CompanyWhereUniqueInputSchema),
    create: z.union([
      z.lazy(() => CompanyCreateWithoutVehiclesInputSchema),
      z.lazy(() => CompanyUncheckedCreateWithoutVehiclesInputSchema),
    ]),
  });

export const DriverCreateWithoutVehicleInputSchema: z.ZodType<Prisma.DriverCreateWithoutVehicleInput> =
  z.strictObject({
    id: z.uuid().optional(),
    name: z.string(),
    license_number: z.string(),
    is_active: z.boolean().optional(),
    created_at: z.coerce.date().optional(),
    updated_at: z.coerce.date().optional(),
    company: z.lazy(() => CompanyCreateNestedOneWithoutDriversInputSchema),
    operational_events: z
      .lazy(() => OperationalEventCreateNestedManyWithoutDriverInputSchema)
      .optional(),
  });

export const DriverUncheckedCreateWithoutVehicleInputSchema: z.ZodType<Prisma.DriverUncheckedCreateWithoutVehicleInput> =
  z.strictObject({
    id: z.uuid().optional(),
    companyId: z.string(),
    name: z.string(),
    license_number: z.string(),
    is_active: z.boolean().optional(),
    created_at: z.coerce.date().optional(),
    updated_at: z.coerce.date().optional(),
    operational_events: z
      .lazy(
        () => OperationalEventUncheckedCreateNestedManyWithoutDriverInputSchema,
      )
      .optional(),
  });

export const DriverCreateOrConnectWithoutVehicleInputSchema: z.ZodType<Prisma.DriverCreateOrConnectWithoutVehicleInput> =
  z.strictObject({
    where: z.lazy(() => DriverWhereUniqueInputSchema),
    create: z.union([
      z.lazy(() => DriverCreateWithoutVehicleInputSchema),
      z.lazy(() => DriverUncheckedCreateWithoutVehicleInputSchema),
    ]),
  });

export const OperationalEventCreateWithoutVehicleInputSchema: z.ZodType<Prisma.OperationalEventCreateWithoutVehicleInput> =
  z.strictObject({
    id: z.uuid().optional(),
    event_type: z.lazy(() => EventTypeSchema),
    event_datetime: z.coerce.date(),
    location: z
      .lazy(() => LocationTypeSchema)
      .optional()
      .nullable(),
    context: z
      .lazy(() => ContextTypeSchema)
      .optional()
      .nullable(),
    general_result: z
      .lazy(() => GeneralResultSchema)
      .optional()
      .nullable(),
    e_signature: z.string().optional().nullable(),
    final_observations: z.string().optional().nullable(),
    is_confirmed: z.boolean().optional().nullable(),
    created_at: z.coerce.date().optional(),
    updated_at: z.coerce.date().optional(),
    company: z.lazy(
      () => CompanyCreateNestedOneWithoutOperational_eventsInputSchema,
    ),
    driver: z
      .lazy(() => DriverCreateNestedOneWithoutOperational_eventsInputSchema)
      .optional(),
    createdBy: z.lazy(
      () => UserCreateNestedOneWithoutOperational_eventsInputSchema,
    ),
  });

export const OperationalEventUncheckedCreateWithoutVehicleInputSchema: z.ZodType<Prisma.OperationalEventUncheckedCreateWithoutVehicleInput> =
  z.strictObject({
    id: z.uuid().optional(),
    company_id: z.string(),
    driver_id: z.string().optional().nullable(),
    event_type: z.lazy(() => EventTypeSchema),
    event_datetime: z.coerce.date(),
    location: z
      .lazy(() => LocationTypeSchema)
      .optional()
      .nullable(),
    context: z
      .lazy(() => ContextTypeSchema)
      .optional()
      .nullable(),
    general_result: z
      .lazy(() => GeneralResultSchema)
      .optional()
      .nullable(),
    e_signature: z.string().optional().nullable(),
    final_observations: z.string().optional().nullable(),
    is_confirmed: z.boolean().optional().nullable(),
    created_by_user_id: z.string(),
    created_at: z.coerce.date().optional(),
    updated_at: z.coerce.date().optional(),
  });

export const OperationalEventCreateOrConnectWithoutVehicleInputSchema: z.ZodType<Prisma.OperationalEventCreateOrConnectWithoutVehicleInput> =
  z.strictObject({
    where: z.lazy(() => OperationalEventWhereUniqueInputSchema),
    create: z.union([
      z.lazy(() => OperationalEventCreateWithoutVehicleInputSchema),
      z.lazy(() => OperationalEventUncheckedCreateWithoutVehicleInputSchema),
    ]),
  });

export const OperationalEventCreateManyVehicleInputEnvelopeSchema: z.ZodType<Prisma.OperationalEventCreateManyVehicleInputEnvelope> =
  z.strictObject({
    data: z.union([
      z.lazy(() => OperationalEventCreateManyVehicleInputSchema),
      z.lazy(() => OperationalEventCreateManyVehicleInputSchema).array(),
    ]),
    skipDuplicates: z.boolean().optional(),
  });

export const CompanyUpsertWithoutVehiclesInputSchema: z.ZodType<Prisma.CompanyUpsertWithoutVehiclesInput> =
  z.strictObject({
    update: z.union([
      z.lazy(() => CompanyUpdateWithoutVehiclesInputSchema),
      z.lazy(() => CompanyUncheckedUpdateWithoutVehiclesInputSchema),
    ]),
    create: z.union([
      z.lazy(() => CompanyCreateWithoutVehiclesInputSchema),
      z.lazy(() => CompanyUncheckedCreateWithoutVehiclesInputSchema),
    ]),
    where: z.lazy(() => CompanyWhereInputSchema).optional(),
  });

export const CompanyUpdateToOneWithWhereWithoutVehiclesInputSchema: z.ZodType<Prisma.CompanyUpdateToOneWithWhereWithoutVehiclesInput> =
  z.strictObject({
    where: z.lazy(() => CompanyWhereInputSchema).optional(),
    data: z.union([
      z.lazy(() => CompanyUpdateWithoutVehiclesInputSchema),
      z.lazy(() => CompanyUncheckedUpdateWithoutVehiclesInputSchema),
    ]),
  });

export const CompanyUpdateWithoutVehiclesInputSchema: z.ZodType<Prisma.CompanyUpdateWithoutVehiclesInput> =
  z.strictObject({
    id: z
      .union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    name: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    usdotNumber: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    state: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    drivers: z
      .lazy(() => DriverUpdateManyWithoutCompanyNestedInputSchema)
      .optional(),
    users: z
      .lazy(() => UserUpdateManyWithoutCompanyNestedInputSchema)
      .optional(),
    operational_events: z
      .lazy(() => OperationalEventUpdateManyWithoutCompanyNestedInputSchema)
      .optional(),
  });

export const CompanyUncheckedUpdateWithoutVehiclesInputSchema: z.ZodType<Prisma.CompanyUncheckedUpdateWithoutVehiclesInput> =
  z.strictObject({
    id: z
      .union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    name: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    usdotNumber: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    state: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    drivers: z
      .lazy(() => DriverUncheckedUpdateManyWithoutCompanyNestedInputSchema)
      .optional(),
    users: z
      .lazy(() => UserUncheckedUpdateManyWithoutCompanyNestedInputSchema)
      .optional(),
    operational_events: z
      .lazy(
        () =>
          OperationalEventUncheckedUpdateManyWithoutCompanyNestedInputSchema,
      )
      .optional(),
  });

export const DriverUpsertWithoutVehicleInputSchema: z.ZodType<Prisma.DriverUpsertWithoutVehicleInput> =
  z.strictObject({
    update: z.union([
      z.lazy(() => DriverUpdateWithoutVehicleInputSchema),
      z.lazy(() => DriverUncheckedUpdateWithoutVehicleInputSchema),
    ]),
    create: z.union([
      z.lazy(() => DriverCreateWithoutVehicleInputSchema),
      z.lazy(() => DriverUncheckedCreateWithoutVehicleInputSchema),
    ]),
    where: z.lazy(() => DriverWhereInputSchema).optional(),
  });

export const DriverUpdateToOneWithWhereWithoutVehicleInputSchema: z.ZodType<Prisma.DriverUpdateToOneWithWhereWithoutVehicleInput> =
  z.strictObject({
    where: z.lazy(() => DriverWhereInputSchema).optional(),
    data: z.union([
      z.lazy(() => DriverUpdateWithoutVehicleInputSchema),
      z.lazy(() => DriverUncheckedUpdateWithoutVehicleInputSchema),
    ]),
  });

export const DriverUpdateWithoutVehicleInputSchema: z.ZodType<Prisma.DriverUpdateWithoutVehicleInput> =
  z.strictObject({
    id: z
      .union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    name: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    license_number: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    is_active: z
      .union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)])
      .optional(),
    created_at: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updated_at: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    company: z
      .lazy(() => CompanyUpdateOneRequiredWithoutDriversNestedInputSchema)
      .optional(),
    operational_events: z
      .lazy(() => OperationalEventUpdateManyWithoutDriverNestedInputSchema)
      .optional(),
  });

export const DriverUncheckedUpdateWithoutVehicleInputSchema: z.ZodType<Prisma.DriverUncheckedUpdateWithoutVehicleInput> =
  z.strictObject({
    id: z
      .union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    companyId: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    name: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    license_number: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    is_active: z
      .union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)])
      .optional(),
    created_at: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updated_at: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    operational_events: z
      .lazy(
        () => OperationalEventUncheckedUpdateManyWithoutDriverNestedInputSchema,
      )
      .optional(),
  });

export const OperationalEventUpsertWithWhereUniqueWithoutVehicleInputSchema: z.ZodType<Prisma.OperationalEventUpsertWithWhereUniqueWithoutVehicleInput> =
  z.strictObject({
    where: z.lazy(() => OperationalEventWhereUniqueInputSchema),
    update: z.union([
      z.lazy(() => OperationalEventUpdateWithoutVehicleInputSchema),
      z.lazy(() => OperationalEventUncheckedUpdateWithoutVehicleInputSchema),
    ]),
    create: z.union([
      z.lazy(() => OperationalEventCreateWithoutVehicleInputSchema),
      z.lazy(() => OperationalEventUncheckedCreateWithoutVehicleInputSchema),
    ]),
  });

export const OperationalEventUpdateWithWhereUniqueWithoutVehicleInputSchema: z.ZodType<Prisma.OperationalEventUpdateWithWhereUniqueWithoutVehicleInput> =
  z.strictObject({
    where: z.lazy(() => OperationalEventWhereUniqueInputSchema),
    data: z.union([
      z.lazy(() => OperationalEventUpdateWithoutVehicleInputSchema),
      z.lazy(() => OperationalEventUncheckedUpdateWithoutVehicleInputSchema),
    ]),
  });

export const OperationalEventUpdateManyWithWhereWithoutVehicleInputSchema: z.ZodType<Prisma.OperationalEventUpdateManyWithWhereWithoutVehicleInput> =
  z.strictObject({
    where: z.lazy(() => OperationalEventScalarWhereInputSchema),
    data: z.union([
      z.lazy(() => OperationalEventUpdateManyMutationInputSchema),
      z.lazy(
        () => OperationalEventUncheckedUpdateManyWithoutVehicleInputSchema,
      ),
    ]),
  });

export const CompanyCreateWithoutDriversInputSchema: z.ZodType<Prisma.CompanyCreateWithoutDriversInput> =
  z.strictObject({
    id: z.uuid().optional(),
    name: z.string(),
    usdotNumber: z.string(),
    state: z.string(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    vehicles: z
      .lazy(() => VehicleCreateNestedManyWithoutCompanyInputSchema)
      .optional(),
    users: z
      .lazy(() => UserCreateNestedManyWithoutCompanyInputSchema)
      .optional(),
    operational_events: z
      .lazy(() => OperationalEventCreateNestedManyWithoutCompanyInputSchema)
      .optional(),
  });

export const CompanyUncheckedCreateWithoutDriversInputSchema: z.ZodType<Prisma.CompanyUncheckedCreateWithoutDriversInput> =
  z.strictObject({
    id: z.uuid().optional(),
    name: z.string(),
    usdotNumber: z.string(),
    state: z.string(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    vehicles: z
      .lazy(() => VehicleUncheckedCreateNestedManyWithoutCompanyInputSchema)
      .optional(),
    users: z
      .lazy(() => UserUncheckedCreateNestedManyWithoutCompanyInputSchema)
      .optional(),
    operational_events: z
      .lazy(
        () =>
          OperationalEventUncheckedCreateNestedManyWithoutCompanyInputSchema,
      )
      .optional(),
  });

export const CompanyCreateOrConnectWithoutDriversInputSchema: z.ZodType<Prisma.CompanyCreateOrConnectWithoutDriversInput> =
  z.strictObject({
    where: z.lazy(() => CompanyWhereUniqueInputSchema),
    create: z.union([
      z.lazy(() => CompanyCreateWithoutDriversInputSchema),
      z.lazy(() => CompanyUncheckedCreateWithoutDriversInputSchema),
    ]),
  });

export const VehicleCreateWithoutDriverInputSchema: z.ZodType<Prisma.VehicleCreateWithoutDriverInput> =
  z.strictObject({
    id: z.uuid().optional(),
    unit_number: z.string().optional().nullable(),
    plate: z.string().optional().nullable(),
    is_active: z.boolean().optional(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    company: z.lazy(() => CompanyCreateNestedOneWithoutVehiclesInputSchema),
    operational_events: z
      .lazy(() => OperationalEventCreateNestedManyWithoutVehicleInputSchema)
      .optional(),
  });

export const VehicleUncheckedCreateWithoutDriverInputSchema: z.ZodType<Prisma.VehicleUncheckedCreateWithoutDriverInput> =
  z.strictObject({
    id: z.uuid().optional(),
    companyId: z.string(),
    unit_number: z.string().optional().nullable(),
    plate: z.string().optional().nullable(),
    is_active: z.boolean().optional(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    operational_events: z
      .lazy(
        () =>
          OperationalEventUncheckedCreateNestedManyWithoutVehicleInputSchema,
      )
      .optional(),
  });

export const VehicleCreateOrConnectWithoutDriverInputSchema: z.ZodType<Prisma.VehicleCreateOrConnectWithoutDriverInput> =
  z.strictObject({
    where: z.lazy(() => VehicleWhereUniqueInputSchema),
    create: z.union([
      z.lazy(() => VehicleCreateWithoutDriverInputSchema),
      z.lazy(() => VehicleUncheckedCreateWithoutDriverInputSchema),
    ]),
  });

export const OperationalEventCreateWithoutDriverInputSchema: z.ZodType<Prisma.OperationalEventCreateWithoutDriverInput> =
  z.strictObject({
    id: z.uuid().optional(),
    event_type: z.lazy(() => EventTypeSchema),
    event_datetime: z.coerce.date(),
    location: z
      .lazy(() => LocationTypeSchema)
      .optional()
      .nullable(),
    context: z
      .lazy(() => ContextTypeSchema)
      .optional()
      .nullable(),
    general_result: z
      .lazy(() => GeneralResultSchema)
      .optional()
      .nullable(),
    e_signature: z.string().optional().nullable(),
    final_observations: z.string().optional().nullable(),
    is_confirmed: z.boolean().optional().nullable(),
    created_at: z.coerce.date().optional(),
    updated_at: z.coerce.date().optional(),
    company: z.lazy(
      () => CompanyCreateNestedOneWithoutOperational_eventsInputSchema,
    ),
    vehicle: z
      .lazy(() => VehicleCreateNestedOneWithoutOperational_eventsInputSchema)
      .optional(),
    createdBy: z.lazy(
      () => UserCreateNestedOneWithoutOperational_eventsInputSchema,
    ),
  });

export const OperationalEventUncheckedCreateWithoutDriverInputSchema: z.ZodType<Prisma.OperationalEventUncheckedCreateWithoutDriverInput> =
  z.strictObject({
    id: z.uuid().optional(),
    company_id: z.string(),
    vehicle_id: z.string().optional().nullable(),
    event_type: z.lazy(() => EventTypeSchema),
    event_datetime: z.coerce.date(),
    location: z
      .lazy(() => LocationTypeSchema)
      .optional()
      .nullable(),
    context: z
      .lazy(() => ContextTypeSchema)
      .optional()
      .nullable(),
    general_result: z
      .lazy(() => GeneralResultSchema)
      .optional()
      .nullable(),
    e_signature: z.string().optional().nullable(),
    final_observations: z.string().optional().nullable(),
    is_confirmed: z.boolean().optional().nullable(),
    created_by_user_id: z.string(),
    created_at: z.coerce.date().optional(),
    updated_at: z.coerce.date().optional(),
  });

export const OperationalEventCreateOrConnectWithoutDriverInputSchema: z.ZodType<Prisma.OperationalEventCreateOrConnectWithoutDriverInput> =
  z.strictObject({
    where: z.lazy(() => OperationalEventWhereUniqueInputSchema),
    create: z.union([
      z.lazy(() => OperationalEventCreateWithoutDriverInputSchema),
      z.lazy(() => OperationalEventUncheckedCreateWithoutDriverInputSchema),
    ]),
  });

export const OperationalEventCreateManyDriverInputEnvelopeSchema: z.ZodType<Prisma.OperationalEventCreateManyDriverInputEnvelope> =
  z.strictObject({
    data: z.union([
      z.lazy(() => OperationalEventCreateManyDriverInputSchema),
      z.lazy(() => OperationalEventCreateManyDriverInputSchema).array(),
    ]),
    skipDuplicates: z.boolean().optional(),
  });

export const CompanyUpsertWithoutDriversInputSchema: z.ZodType<Prisma.CompanyUpsertWithoutDriversInput> =
  z.strictObject({
    update: z.union([
      z.lazy(() => CompanyUpdateWithoutDriversInputSchema),
      z.lazy(() => CompanyUncheckedUpdateWithoutDriversInputSchema),
    ]),
    create: z.union([
      z.lazy(() => CompanyCreateWithoutDriversInputSchema),
      z.lazy(() => CompanyUncheckedCreateWithoutDriversInputSchema),
    ]),
    where: z.lazy(() => CompanyWhereInputSchema).optional(),
  });

export const CompanyUpdateToOneWithWhereWithoutDriversInputSchema: z.ZodType<Prisma.CompanyUpdateToOneWithWhereWithoutDriversInput> =
  z.strictObject({
    where: z.lazy(() => CompanyWhereInputSchema).optional(),
    data: z.union([
      z.lazy(() => CompanyUpdateWithoutDriversInputSchema),
      z.lazy(() => CompanyUncheckedUpdateWithoutDriversInputSchema),
    ]),
  });

export const CompanyUpdateWithoutDriversInputSchema: z.ZodType<Prisma.CompanyUpdateWithoutDriversInput> =
  z.strictObject({
    id: z
      .union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    name: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    usdotNumber: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    state: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    vehicles: z
      .lazy(() => VehicleUpdateManyWithoutCompanyNestedInputSchema)
      .optional(),
    users: z
      .lazy(() => UserUpdateManyWithoutCompanyNestedInputSchema)
      .optional(),
    operational_events: z
      .lazy(() => OperationalEventUpdateManyWithoutCompanyNestedInputSchema)
      .optional(),
  });

export const CompanyUncheckedUpdateWithoutDriversInputSchema: z.ZodType<Prisma.CompanyUncheckedUpdateWithoutDriversInput> =
  z.strictObject({
    id: z
      .union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    name: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    usdotNumber: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    state: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    vehicles: z
      .lazy(() => VehicleUncheckedUpdateManyWithoutCompanyNestedInputSchema)
      .optional(),
    users: z
      .lazy(() => UserUncheckedUpdateManyWithoutCompanyNestedInputSchema)
      .optional(),
    operational_events: z
      .lazy(
        () =>
          OperationalEventUncheckedUpdateManyWithoutCompanyNestedInputSchema,
      )
      .optional(),
  });

export const VehicleUpsertWithoutDriverInputSchema: z.ZodType<Prisma.VehicleUpsertWithoutDriverInput> =
  z.strictObject({
    update: z.union([
      z.lazy(() => VehicleUpdateWithoutDriverInputSchema),
      z.lazy(() => VehicleUncheckedUpdateWithoutDriverInputSchema),
    ]),
    create: z.union([
      z.lazy(() => VehicleCreateWithoutDriverInputSchema),
      z.lazy(() => VehicleUncheckedCreateWithoutDriverInputSchema),
    ]),
    where: z.lazy(() => VehicleWhereInputSchema).optional(),
  });

export const VehicleUpdateToOneWithWhereWithoutDriverInputSchema: z.ZodType<Prisma.VehicleUpdateToOneWithWhereWithoutDriverInput> =
  z.strictObject({
    where: z.lazy(() => VehicleWhereInputSchema).optional(),
    data: z.union([
      z.lazy(() => VehicleUpdateWithoutDriverInputSchema),
      z.lazy(() => VehicleUncheckedUpdateWithoutDriverInputSchema),
    ]),
  });

export const VehicleUpdateWithoutDriverInputSchema: z.ZodType<Prisma.VehicleUpdateWithoutDriverInput> =
  z.strictObject({
    id: z
      .union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    unit_number: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    plate: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    is_active: z
      .union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)])
      .optional(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    company: z
      .lazy(() => CompanyUpdateOneRequiredWithoutVehiclesNestedInputSchema)
      .optional(),
    operational_events: z
      .lazy(() => OperationalEventUpdateManyWithoutVehicleNestedInputSchema)
      .optional(),
  });

export const VehicleUncheckedUpdateWithoutDriverInputSchema: z.ZodType<Prisma.VehicleUncheckedUpdateWithoutDriverInput> =
  z.strictObject({
    id: z
      .union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    companyId: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    unit_number: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    plate: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    is_active: z
      .union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)])
      .optional(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    operational_events: z
      .lazy(
        () =>
          OperationalEventUncheckedUpdateManyWithoutVehicleNestedInputSchema,
      )
      .optional(),
  });

export const OperationalEventUpsertWithWhereUniqueWithoutDriverInputSchema: z.ZodType<Prisma.OperationalEventUpsertWithWhereUniqueWithoutDriverInput> =
  z.strictObject({
    where: z.lazy(() => OperationalEventWhereUniqueInputSchema),
    update: z.union([
      z.lazy(() => OperationalEventUpdateWithoutDriverInputSchema),
      z.lazy(() => OperationalEventUncheckedUpdateWithoutDriverInputSchema),
    ]),
    create: z.union([
      z.lazy(() => OperationalEventCreateWithoutDriverInputSchema),
      z.lazy(() => OperationalEventUncheckedCreateWithoutDriverInputSchema),
    ]),
  });

export const OperationalEventUpdateWithWhereUniqueWithoutDriverInputSchema: z.ZodType<Prisma.OperationalEventUpdateWithWhereUniqueWithoutDriverInput> =
  z.strictObject({
    where: z.lazy(() => OperationalEventWhereUniqueInputSchema),
    data: z.union([
      z.lazy(() => OperationalEventUpdateWithoutDriverInputSchema),
      z.lazy(() => OperationalEventUncheckedUpdateWithoutDriverInputSchema),
    ]),
  });

export const OperationalEventUpdateManyWithWhereWithoutDriverInputSchema: z.ZodType<Prisma.OperationalEventUpdateManyWithWhereWithoutDriverInput> =
  z.strictObject({
    where: z.lazy(() => OperationalEventScalarWhereInputSchema),
    data: z.union([
      z.lazy(() => OperationalEventUpdateManyMutationInputSchema),
      z.lazy(() => OperationalEventUncheckedUpdateManyWithoutDriverInputSchema),
    ]),
  });

export const CompanyCreateWithoutUsersInputSchema: z.ZodType<Prisma.CompanyCreateWithoutUsersInput> =
  z.strictObject({
    id: z.uuid().optional(),
    name: z.string(),
    usdotNumber: z.string(),
    state: z.string(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    vehicles: z
      .lazy(() => VehicleCreateNestedManyWithoutCompanyInputSchema)
      .optional(),
    drivers: z
      .lazy(() => DriverCreateNestedManyWithoutCompanyInputSchema)
      .optional(),
    operational_events: z
      .lazy(() => OperationalEventCreateNestedManyWithoutCompanyInputSchema)
      .optional(),
  });

export const CompanyUncheckedCreateWithoutUsersInputSchema: z.ZodType<Prisma.CompanyUncheckedCreateWithoutUsersInput> =
  z.strictObject({
    id: z.uuid().optional(),
    name: z.string(),
    usdotNumber: z.string(),
    state: z.string(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    vehicles: z
      .lazy(() => VehicleUncheckedCreateNestedManyWithoutCompanyInputSchema)
      .optional(),
    drivers: z
      .lazy(() => DriverUncheckedCreateNestedManyWithoutCompanyInputSchema)
      .optional(),
    operational_events: z
      .lazy(
        () =>
          OperationalEventUncheckedCreateNestedManyWithoutCompanyInputSchema,
      )
      .optional(),
  });

export const CompanyCreateOrConnectWithoutUsersInputSchema: z.ZodType<Prisma.CompanyCreateOrConnectWithoutUsersInput> =
  z.strictObject({
    where: z.lazy(() => CompanyWhereUniqueInputSchema),
    create: z.union([
      z.lazy(() => CompanyCreateWithoutUsersInputSchema),
      z.lazy(() => CompanyUncheckedCreateWithoutUsersInputSchema),
    ]),
  });

export const OperationalEventCreateWithoutCreatedByInputSchema: z.ZodType<Prisma.OperationalEventCreateWithoutCreatedByInput> =
  z.strictObject({
    id: z.uuid().optional(),
    event_type: z.lazy(() => EventTypeSchema),
    event_datetime: z.coerce.date(),
    location: z
      .lazy(() => LocationTypeSchema)
      .optional()
      .nullable(),
    context: z
      .lazy(() => ContextTypeSchema)
      .optional()
      .nullable(),
    general_result: z
      .lazy(() => GeneralResultSchema)
      .optional()
      .nullable(),
    e_signature: z.string().optional().nullable(),
    final_observations: z.string().optional().nullable(),
    is_confirmed: z.boolean().optional().nullable(),
    created_at: z.coerce.date().optional(),
    updated_at: z.coerce.date().optional(),
    company: z.lazy(
      () => CompanyCreateNestedOneWithoutOperational_eventsInputSchema,
    ),
    vehicle: z
      .lazy(() => VehicleCreateNestedOneWithoutOperational_eventsInputSchema)
      .optional(),
    driver: z
      .lazy(() => DriverCreateNestedOneWithoutOperational_eventsInputSchema)
      .optional(),
  });

export const OperationalEventUncheckedCreateWithoutCreatedByInputSchema: z.ZodType<Prisma.OperationalEventUncheckedCreateWithoutCreatedByInput> =
  z.strictObject({
    id: z.uuid().optional(),
    company_id: z.string(),
    vehicle_id: z.string().optional().nullable(),
    driver_id: z.string().optional().nullable(),
    event_type: z.lazy(() => EventTypeSchema),
    event_datetime: z.coerce.date(),
    location: z
      .lazy(() => LocationTypeSchema)
      .optional()
      .nullable(),
    context: z
      .lazy(() => ContextTypeSchema)
      .optional()
      .nullable(),
    general_result: z
      .lazy(() => GeneralResultSchema)
      .optional()
      .nullable(),
    e_signature: z.string().optional().nullable(),
    final_observations: z.string().optional().nullable(),
    is_confirmed: z.boolean().optional().nullable(),
    created_at: z.coerce.date().optional(),
    updated_at: z.coerce.date().optional(),
  });

export const OperationalEventCreateOrConnectWithoutCreatedByInputSchema: z.ZodType<Prisma.OperationalEventCreateOrConnectWithoutCreatedByInput> =
  z.strictObject({
    where: z.lazy(() => OperationalEventWhereUniqueInputSchema),
    create: z.union([
      z.lazy(() => OperationalEventCreateWithoutCreatedByInputSchema),
      z.lazy(() => OperationalEventUncheckedCreateWithoutCreatedByInputSchema),
    ]),
  });

export const OperationalEventCreateManyCreatedByInputEnvelopeSchema: z.ZodType<Prisma.OperationalEventCreateManyCreatedByInputEnvelope> =
  z.strictObject({
    data: z.union([
      z.lazy(() => OperationalEventCreateManyCreatedByInputSchema),
      z.lazy(() => OperationalEventCreateManyCreatedByInputSchema).array(),
    ]),
    skipDuplicates: z.boolean().optional(),
  });

export const CompanyUpsertWithoutUsersInputSchema: z.ZodType<Prisma.CompanyUpsertWithoutUsersInput> =
  z.strictObject({
    update: z.union([
      z.lazy(() => CompanyUpdateWithoutUsersInputSchema),
      z.lazy(() => CompanyUncheckedUpdateWithoutUsersInputSchema),
    ]),
    create: z.union([
      z.lazy(() => CompanyCreateWithoutUsersInputSchema),
      z.lazy(() => CompanyUncheckedCreateWithoutUsersInputSchema),
    ]),
    where: z.lazy(() => CompanyWhereInputSchema).optional(),
  });

export const CompanyUpdateToOneWithWhereWithoutUsersInputSchema: z.ZodType<Prisma.CompanyUpdateToOneWithWhereWithoutUsersInput> =
  z.strictObject({
    where: z.lazy(() => CompanyWhereInputSchema).optional(),
    data: z.union([
      z.lazy(() => CompanyUpdateWithoutUsersInputSchema),
      z.lazy(() => CompanyUncheckedUpdateWithoutUsersInputSchema),
    ]),
  });

export const CompanyUpdateWithoutUsersInputSchema: z.ZodType<Prisma.CompanyUpdateWithoutUsersInput> =
  z.strictObject({
    id: z
      .union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    name: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    usdotNumber: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    state: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    vehicles: z
      .lazy(() => VehicleUpdateManyWithoutCompanyNestedInputSchema)
      .optional(),
    drivers: z
      .lazy(() => DriverUpdateManyWithoutCompanyNestedInputSchema)
      .optional(),
    operational_events: z
      .lazy(() => OperationalEventUpdateManyWithoutCompanyNestedInputSchema)
      .optional(),
  });

export const CompanyUncheckedUpdateWithoutUsersInputSchema: z.ZodType<Prisma.CompanyUncheckedUpdateWithoutUsersInput> =
  z.strictObject({
    id: z
      .union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    name: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    usdotNumber: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    state: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    vehicles: z
      .lazy(() => VehicleUncheckedUpdateManyWithoutCompanyNestedInputSchema)
      .optional(),
    drivers: z
      .lazy(() => DriverUncheckedUpdateManyWithoutCompanyNestedInputSchema)
      .optional(),
    operational_events: z
      .lazy(
        () =>
          OperationalEventUncheckedUpdateManyWithoutCompanyNestedInputSchema,
      )
      .optional(),
  });

export const OperationalEventUpsertWithWhereUniqueWithoutCreatedByInputSchema: z.ZodType<Prisma.OperationalEventUpsertWithWhereUniqueWithoutCreatedByInput> =
  z.strictObject({
    where: z.lazy(() => OperationalEventWhereUniqueInputSchema),
    update: z.union([
      z.lazy(() => OperationalEventUpdateWithoutCreatedByInputSchema),
      z.lazy(() => OperationalEventUncheckedUpdateWithoutCreatedByInputSchema),
    ]),
    create: z.union([
      z.lazy(() => OperationalEventCreateWithoutCreatedByInputSchema),
      z.lazy(() => OperationalEventUncheckedCreateWithoutCreatedByInputSchema),
    ]),
  });

export const OperationalEventUpdateWithWhereUniqueWithoutCreatedByInputSchema: z.ZodType<Prisma.OperationalEventUpdateWithWhereUniqueWithoutCreatedByInput> =
  z.strictObject({
    where: z.lazy(() => OperationalEventWhereUniqueInputSchema),
    data: z.union([
      z.lazy(() => OperationalEventUpdateWithoutCreatedByInputSchema),
      z.lazy(() => OperationalEventUncheckedUpdateWithoutCreatedByInputSchema),
    ]),
  });

export const OperationalEventUpdateManyWithWhereWithoutCreatedByInputSchema: z.ZodType<Prisma.OperationalEventUpdateManyWithWhereWithoutCreatedByInput> =
  z.strictObject({
    where: z.lazy(() => OperationalEventScalarWhereInputSchema),
    data: z.union([
      z.lazy(() => OperationalEventUpdateManyMutationInputSchema),
      z.lazy(
        () => OperationalEventUncheckedUpdateManyWithoutCreatedByInputSchema,
      ),
    ]),
  });

export const CompanyCreateWithoutOperational_eventsInputSchema: z.ZodType<Prisma.CompanyCreateWithoutOperational_eventsInput> =
  z.strictObject({
    id: z.uuid().optional(),
    name: z.string(),
    usdotNumber: z.string(),
    state: z.string(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    vehicles: z
      .lazy(() => VehicleCreateNestedManyWithoutCompanyInputSchema)
      .optional(),
    drivers: z
      .lazy(() => DriverCreateNestedManyWithoutCompanyInputSchema)
      .optional(),
    users: z
      .lazy(() => UserCreateNestedManyWithoutCompanyInputSchema)
      .optional(),
  });

export const CompanyUncheckedCreateWithoutOperational_eventsInputSchema: z.ZodType<Prisma.CompanyUncheckedCreateWithoutOperational_eventsInput> =
  z.strictObject({
    id: z.uuid().optional(),
    name: z.string(),
    usdotNumber: z.string(),
    state: z.string(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    vehicles: z
      .lazy(() => VehicleUncheckedCreateNestedManyWithoutCompanyInputSchema)
      .optional(),
    drivers: z
      .lazy(() => DriverUncheckedCreateNestedManyWithoutCompanyInputSchema)
      .optional(),
    users: z
      .lazy(() => UserUncheckedCreateNestedManyWithoutCompanyInputSchema)
      .optional(),
  });

export const CompanyCreateOrConnectWithoutOperational_eventsInputSchema: z.ZodType<Prisma.CompanyCreateOrConnectWithoutOperational_eventsInput> =
  z.strictObject({
    where: z.lazy(() => CompanyWhereUniqueInputSchema),
    create: z.union([
      z.lazy(() => CompanyCreateWithoutOperational_eventsInputSchema),
      z.lazy(() => CompanyUncheckedCreateWithoutOperational_eventsInputSchema),
    ]),
  });

export const VehicleCreateWithoutOperational_eventsInputSchema: z.ZodType<Prisma.VehicleCreateWithoutOperational_eventsInput> =
  z.strictObject({
    id: z.uuid().optional(),
    unit_number: z.string().optional().nullable(),
    plate: z.string().optional().nullable(),
    is_active: z.boolean().optional(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    company: z.lazy(() => CompanyCreateNestedOneWithoutVehiclesInputSchema),
    driver: z
      .lazy(() => DriverCreateNestedOneWithoutVehicleInputSchema)
      .optional(),
  });

export const VehicleUncheckedCreateWithoutOperational_eventsInputSchema: z.ZodType<Prisma.VehicleUncheckedCreateWithoutOperational_eventsInput> =
  z.strictObject({
    id: z.uuid().optional(),
    companyId: z.string(),
    driverId: z.string().optional().nullable(),
    unit_number: z.string().optional().nullable(),
    plate: z.string().optional().nullable(),
    is_active: z.boolean().optional(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
  });

export const VehicleCreateOrConnectWithoutOperational_eventsInputSchema: z.ZodType<Prisma.VehicleCreateOrConnectWithoutOperational_eventsInput> =
  z.strictObject({
    where: z.lazy(() => VehicleWhereUniqueInputSchema),
    create: z.union([
      z.lazy(() => VehicleCreateWithoutOperational_eventsInputSchema),
      z.lazy(() => VehicleUncheckedCreateWithoutOperational_eventsInputSchema),
    ]),
  });

export const DriverCreateWithoutOperational_eventsInputSchema: z.ZodType<Prisma.DriverCreateWithoutOperational_eventsInput> =
  z.strictObject({
    id: z.uuid().optional(),
    name: z.string(),
    license_number: z.string(),
    is_active: z.boolean().optional(),
    created_at: z.coerce.date().optional(),
    updated_at: z.coerce.date().optional(),
    company: z.lazy(() => CompanyCreateNestedOneWithoutDriversInputSchema),
    vehicle: z
      .lazy(() => VehicleCreateNestedOneWithoutDriverInputSchema)
      .optional(),
  });

export const DriverUncheckedCreateWithoutOperational_eventsInputSchema: z.ZodType<Prisma.DriverUncheckedCreateWithoutOperational_eventsInput> =
  z.strictObject({
    id: z.uuid().optional(),
    companyId: z.string(),
    name: z.string(),
    license_number: z.string(),
    is_active: z.boolean().optional(),
    created_at: z.coerce.date().optional(),
    updated_at: z.coerce.date().optional(),
    vehicle: z
      .lazy(() => VehicleUncheckedCreateNestedOneWithoutDriverInputSchema)
      .optional(),
  });

export const DriverCreateOrConnectWithoutOperational_eventsInputSchema: z.ZodType<Prisma.DriverCreateOrConnectWithoutOperational_eventsInput> =
  z.strictObject({
    where: z.lazy(() => DriverWhereUniqueInputSchema),
    create: z.union([
      z.lazy(() => DriverCreateWithoutOperational_eventsInputSchema),
      z.lazy(() => DriverUncheckedCreateWithoutOperational_eventsInputSchema),
    ]),
  });

export const UserCreateWithoutOperational_eventsInputSchema: z.ZodType<Prisma.UserCreateWithoutOperational_eventsInput> =
  z.strictObject({
    id: z.uuid().optional(),
    name: z.string(),
    email: z.string(),
    passwordHash: z.string(),
    role: z.lazy(() => UserRoleSchema).optional(),
    isActive: z.boolean().optional(),
    createdAt: z.coerce.date().optional(),
    company: z.lazy(() => CompanyCreateNestedOneWithoutUsersInputSchema),
  });

export const UserUncheckedCreateWithoutOperational_eventsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutOperational_eventsInput> =
  z.strictObject({
    id: z.uuid().optional(),
    companyId: z.string(),
    name: z.string(),
    email: z.string(),
    passwordHash: z.string(),
    role: z.lazy(() => UserRoleSchema).optional(),
    isActive: z.boolean().optional(),
    createdAt: z.coerce.date().optional(),
  });

export const UserCreateOrConnectWithoutOperational_eventsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutOperational_eventsInput> =
  z.strictObject({
    where: z.lazy(() => UserWhereUniqueInputSchema),
    create: z.union([
      z.lazy(() => UserCreateWithoutOperational_eventsInputSchema),
      z.lazy(() => UserUncheckedCreateWithoutOperational_eventsInputSchema),
    ]),
  });

export const CompanyUpsertWithoutOperational_eventsInputSchema: z.ZodType<Prisma.CompanyUpsertWithoutOperational_eventsInput> =
  z.strictObject({
    update: z.union([
      z.lazy(() => CompanyUpdateWithoutOperational_eventsInputSchema),
      z.lazy(() => CompanyUncheckedUpdateWithoutOperational_eventsInputSchema),
    ]),
    create: z.union([
      z.lazy(() => CompanyCreateWithoutOperational_eventsInputSchema),
      z.lazy(() => CompanyUncheckedCreateWithoutOperational_eventsInputSchema),
    ]),
    where: z.lazy(() => CompanyWhereInputSchema).optional(),
  });

export const CompanyUpdateToOneWithWhereWithoutOperational_eventsInputSchema: z.ZodType<Prisma.CompanyUpdateToOneWithWhereWithoutOperational_eventsInput> =
  z.strictObject({
    where: z.lazy(() => CompanyWhereInputSchema).optional(),
    data: z.union([
      z.lazy(() => CompanyUpdateWithoutOperational_eventsInputSchema),
      z.lazy(() => CompanyUncheckedUpdateWithoutOperational_eventsInputSchema),
    ]),
  });

export const CompanyUpdateWithoutOperational_eventsInputSchema: z.ZodType<Prisma.CompanyUpdateWithoutOperational_eventsInput> =
  z.strictObject({
    id: z
      .union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    name: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    usdotNumber: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    state: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    vehicles: z
      .lazy(() => VehicleUpdateManyWithoutCompanyNestedInputSchema)
      .optional(),
    drivers: z
      .lazy(() => DriverUpdateManyWithoutCompanyNestedInputSchema)
      .optional(),
    users: z
      .lazy(() => UserUpdateManyWithoutCompanyNestedInputSchema)
      .optional(),
  });

export const CompanyUncheckedUpdateWithoutOperational_eventsInputSchema: z.ZodType<Prisma.CompanyUncheckedUpdateWithoutOperational_eventsInput> =
  z.strictObject({
    id: z
      .union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    name: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    usdotNumber: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    state: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    vehicles: z
      .lazy(() => VehicleUncheckedUpdateManyWithoutCompanyNestedInputSchema)
      .optional(),
    drivers: z
      .lazy(() => DriverUncheckedUpdateManyWithoutCompanyNestedInputSchema)
      .optional(),
    users: z
      .lazy(() => UserUncheckedUpdateManyWithoutCompanyNestedInputSchema)
      .optional(),
  });

export const VehicleUpsertWithoutOperational_eventsInputSchema: z.ZodType<Prisma.VehicleUpsertWithoutOperational_eventsInput> =
  z.strictObject({
    update: z.union([
      z.lazy(() => VehicleUpdateWithoutOperational_eventsInputSchema),
      z.lazy(() => VehicleUncheckedUpdateWithoutOperational_eventsInputSchema),
    ]),
    create: z.union([
      z.lazy(() => VehicleCreateWithoutOperational_eventsInputSchema),
      z.lazy(() => VehicleUncheckedCreateWithoutOperational_eventsInputSchema),
    ]),
    where: z.lazy(() => VehicleWhereInputSchema).optional(),
  });

export const VehicleUpdateToOneWithWhereWithoutOperational_eventsInputSchema: z.ZodType<Prisma.VehicleUpdateToOneWithWhereWithoutOperational_eventsInput> =
  z.strictObject({
    where: z.lazy(() => VehicleWhereInputSchema).optional(),
    data: z.union([
      z.lazy(() => VehicleUpdateWithoutOperational_eventsInputSchema),
      z.lazy(() => VehicleUncheckedUpdateWithoutOperational_eventsInputSchema),
    ]),
  });

export const VehicleUpdateWithoutOperational_eventsInputSchema: z.ZodType<Prisma.VehicleUpdateWithoutOperational_eventsInput> =
  z.strictObject({
    id: z
      .union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    unit_number: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    plate: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    is_active: z
      .union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)])
      .optional(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    company: z
      .lazy(() => CompanyUpdateOneRequiredWithoutVehiclesNestedInputSchema)
      .optional(),
    driver: z
      .lazy(() => DriverUpdateOneWithoutVehicleNestedInputSchema)
      .optional(),
  });

export const VehicleUncheckedUpdateWithoutOperational_eventsInputSchema: z.ZodType<Prisma.VehicleUncheckedUpdateWithoutOperational_eventsInput> =
  z.strictObject({
    id: z
      .union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    companyId: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    driverId: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    unit_number: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    plate: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    is_active: z
      .union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)])
      .optional(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
  });

export const DriverUpsertWithoutOperational_eventsInputSchema: z.ZodType<Prisma.DriverUpsertWithoutOperational_eventsInput> =
  z.strictObject({
    update: z.union([
      z.lazy(() => DriverUpdateWithoutOperational_eventsInputSchema),
      z.lazy(() => DriverUncheckedUpdateWithoutOperational_eventsInputSchema),
    ]),
    create: z.union([
      z.lazy(() => DriverCreateWithoutOperational_eventsInputSchema),
      z.lazy(() => DriverUncheckedCreateWithoutOperational_eventsInputSchema),
    ]),
    where: z.lazy(() => DriverWhereInputSchema).optional(),
  });

export const DriverUpdateToOneWithWhereWithoutOperational_eventsInputSchema: z.ZodType<Prisma.DriverUpdateToOneWithWhereWithoutOperational_eventsInput> =
  z.strictObject({
    where: z.lazy(() => DriverWhereInputSchema).optional(),
    data: z.union([
      z.lazy(() => DriverUpdateWithoutOperational_eventsInputSchema),
      z.lazy(() => DriverUncheckedUpdateWithoutOperational_eventsInputSchema),
    ]),
  });

export const DriverUpdateWithoutOperational_eventsInputSchema: z.ZodType<Prisma.DriverUpdateWithoutOperational_eventsInput> =
  z.strictObject({
    id: z
      .union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    name: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    license_number: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    is_active: z
      .union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)])
      .optional(),
    created_at: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updated_at: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    company: z
      .lazy(() => CompanyUpdateOneRequiredWithoutDriversNestedInputSchema)
      .optional(),
    vehicle: z
      .lazy(() => VehicleUpdateOneWithoutDriverNestedInputSchema)
      .optional(),
  });

export const DriverUncheckedUpdateWithoutOperational_eventsInputSchema: z.ZodType<Prisma.DriverUncheckedUpdateWithoutOperational_eventsInput> =
  z.strictObject({
    id: z
      .union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    companyId: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    name: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    license_number: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    is_active: z
      .union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)])
      .optional(),
    created_at: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updated_at: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    vehicle: z
      .lazy(() => VehicleUncheckedUpdateOneWithoutDriverNestedInputSchema)
      .optional(),
  });

export const UserUpsertWithoutOperational_eventsInputSchema: z.ZodType<Prisma.UserUpsertWithoutOperational_eventsInput> =
  z.strictObject({
    update: z.union([
      z.lazy(() => UserUpdateWithoutOperational_eventsInputSchema),
      z.lazy(() => UserUncheckedUpdateWithoutOperational_eventsInputSchema),
    ]),
    create: z.union([
      z.lazy(() => UserCreateWithoutOperational_eventsInputSchema),
      z.lazy(() => UserUncheckedCreateWithoutOperational_eventsInputSchema),
    ]),
    where: z.lazy(() => UserWhereInputSchema).optional(),
  });

export const UserUpdateToOneWithWhereWithoutOperational_eventsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutOperational_eventsInput> =
  z.strictObject({
    where: z.lazy(() => UserWhereInputSchema).optional(),
    data: z.union([
      z.lazy(() => UserUpdateWithoutOperational_eventsInputSchema),
      z.lazy(() => UserUncheckedUpdateWithoutOperational_eventsInputSchema),
    ]),
  });

export const UserUpdateWithoutOperational_eventsInputSchema: z.ZodType<Prisma.UserUpdateWithoutOperational_eventsInput> =
  z.strictObject({
    id: z
      .union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    name: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    email: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    passwordHash: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    role: z
      .union([
        z.lazy(() => UserRoleSchema),
        z.lazy(() => EnumUserRoleFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    isActive: z
      .union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)])
      .optional(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    company: z
      .lazy(() => CompanyUpdateOneRequiredWithoutUsersNestedInputSchema)
      .optional(),
  });

export const UserUncheckedUpdateWithoutOperational_eventsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutOperational_eventsInput> =
  z.strictObject({
    id: z
      .union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    companyId: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    name: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    email: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    passwordHash: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    role: z
      .union([
        z.lazy(() => UserRoleSchema),
        z.lazy(() => EnumUserRoleFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    isActive: z
      .union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)])
      .optional(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
  });

export const VehicleCreateManyCompanyInputSchema: z.ZodType<Prisma.VehicleCreateManyCompanyInput> =
  z.strictObject({
    id: z.uuid().optional(),
    driverId: z.string().optional().nullable(),
    unit_number: z.string().optional().nullable(),
    plate: z.string().optional().nullable(),
    is_active: z.boolean().optional(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
  });

export const DriverCreateManyCompanyInputSchema: z.ZodType<Prisma.DriverCreateManyCompanyInput> =
  z.strictObject({
    id: z.uuid().optional(),
    name: z.string(),
    license_number: z.string(),
    is_active: z.boolean().optional(),
    created_at: z.coerce.date().optional(),
    updated_at: z.coerce.date().optional(),
  });

export const UserCreateManyCompanyInputSchema: z.ZodType<Prisma.UserCreateManyCompanyInput> =
  z.strictObject({
    id: z.uuid().optional(),
    name: z.string(),
    email: z.string(),
    passwordHash: z.string(),
    role: z.lazy(() => UserRoleSchema).optional(),
    isActive: z.boolean().optional(),
    createdAt: z.coerce.date().optional(),
  });

export const OperationalEventCreateManyCompanyInputSchema: z.ZodType<Prisma.OperationalEventCreateManyCompanyInput> =
  z.strictObject({
    id: z.uuid().optional(),
    vehicle_id: z.string().optional().nullable(),
    driver_id: z.string().optional().nullable(),
    event_type: z.lazy(() => EventTypeSchema),
    event_datetime: z.coerce.date(),
    location: z
      .lazy(() => LocationTypeSchema)
      .optional()
      .nullable(),
    context: z
      .lazy(() => ContextTypeSchema)
      .optional()
      .nullable(),
    general_result: z
      .lazy(() => GeneralResultSchema)
      .optional()
      .nullable(),
    e_signature: z.string().optional().nullable(),
    final_observations: z.string().optional().nullable(),
    is_confirmed: z.boolean().optional().nullable(),
    created_by_user_id: z.string(),
    created_at: z.coerce.date().optional(),
    updated_at: z.coerce.date().optional(),
  });

export const VehicleUpdateWithoutCompanyInputSchema: z.ZodType<Prisma.VehicleUpdateWithoutCompanyInput> =
  z.strictObject({
    id: z
      .union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    unit_number: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    plate: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    is_active: z
      .union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)])
      .optional(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    driver: z
      .lazy(() => DriverUpdateOneWithoutVehicleNestedInputSchema)
      .optional(),
    operational_events: z
      .lazy(() => OperationalEventUpdateManyWithoutVehicleNestedInputSchema)
      .optional(),
  });

export const VehicleUncheckedUpdateWithoutCompanyInputSchema: z.ZodType<Prisma.VehicleUncheckedUpdateWithoutCompanyInput> =
  z.strictObject({
    id: z
      .union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    driverId: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    unit_number: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    plate: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    is_active: z
      .union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)])
      .optional(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    operational_events: z
      .lazy(
        () =>
          OperationalEventUncheckedUpdateManyWithoutVehicleNestedInputSchema,
      )
      .optional(),
  });

export const VehicleUncheckedUpdateManyWithoutCompanyInputSchema: z.ZodType<Prisma.VehicleUncheckedUpdateManyWithoutCompanyInput> =
  z.strictObject({
    id: z
      .union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    driverId: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    unit_number: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    plate: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    is_active: z
      .union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)])
      .optional(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
  });

export const DriverUpdateWithoutCompanyInputSchema: z.ZodType<Prisma.DriverUpdateWithoutCompanyInput> =
  z.strictObject({
    id: z
      .union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    name: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    license_number: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    is_active: z
      .union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)])
      .optional(),
    created_at: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updated_at: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    vehicle: z
      .lazy(() => VehicleUpdateOneWithoutDriverNestedInputSchema)
      .optional(),
    operational_events: z
      .lazy(() => OperationalEventUpdateManyWithoutDriverNestedInputSchema)
      .optional(),
  });

export const DriverUncheckedUpdateWithoutCompanyInputSchema: z.ZodType<Prisma.DriverUncheckedUpdateWithoutCompanyInput> =
  z.strictObject({
    id: z
      .union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    name: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    license_number: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    is_active: z
      .union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)])
      .optional(),
    created_at: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updated_at: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    vehicle: z
      .lazy(() => VehicleUncheckedUpdateOneWithoutDriverNestedInputSchema)
      .optional(),
    operational_events: z
      .lazy(
        () => OperationalEventUncheckedUpdateManyWithoutDriverNestedInputSchema,
      )
      .optional(),
  });

export const DriverUncheckedUpdateManyWithoutCompanyInputSchema: z.ZodType<Prisma.DriverUncheckedUpdateManyWithoutCompanyInput> =
  z.strictObject({
    id: z
      .union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    name: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    license_number: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    is_active: z
      .union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)])
      .optional(),
    created_at: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updated_at: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
  });

export const UserUpdateWithoutCompanyInputSchema: z.ZodType<Prisma.UserUpdateWithoutCompanyInput> =
  z.strictObject({
    id: z
      .union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    name: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    email: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    passwordHash: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    role: z
      .union([
        z.lazy(() => UserRoleSchema),
        z.lazy(() => EnumUserRoleFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    isActive: z
      .union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)])
      .optional(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    operational_events: z
      .lazy(() => OperationalEventUpdateManyWithoutCreatedByNestedInputSchema)
      .optional(),
  });

export const UserUncheckedUpdateWithoutCompanyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutCompanyInput> =
  z.strictObject({
    id: z
      .union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    name: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    email: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    passwordHash: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    role: z
      .union([
        z.lazy(() => UserRoleSchema),
        z.lazy(() => EnumUserRoleFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    isActive: z
      .union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)])
      .optional(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    operational_events: z
      .lazy(
        () =>
          OperationalEventUncheckedUpdateManyWithoutCreatedByNestedInputSchema,
      )
      .optional(),
  });

export const UserUncheckedUpdateManyWithoutCompanyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyWithoutCompanyInput> =
  z.strictObject({
    id: z
      .union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    name: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    email: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    passwordHash: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    role: z
      .union([
        z.lazy(() => UserRoleSchema),
        z.lazy(() => EnumUserRoleFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    isActive: z
      .union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)])
      .optional(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
  });

export const OperationalEventUpdateWithoutCompanyInputSchema: z.ZodType<Prisma.OperationalEventUpdateWithoutCompanyInput> =
  z.strictObject({
    id: z
      .union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    event_type: z
      .union([
        z.lazy(() => EventTypeSchema),
        z.lazy(() => EnumEventTypeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    event_datetime: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    location: z
      .union([
        z.lazy(() => LocationTypeSchema),
        z.lazy(() => NullableEnumLocationTypeFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    context: z
      .union([
        z.lazy(() => ContextTypeSchema),
        z.lazy(() => NullableEnumContextTypeFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    general_result: z
      .union([
        z.lazy(() => GeneralResultSchema),
        z.lazy(() => NullableEnumGeneralResultFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    e_signature: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    final_observations: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    is_confirmed: z
      .union([
        z.boolean(),
        z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    created_at: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updated_at: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    vehicle: z
      .lazy(() => VehicleUpdateOneWithoutOperational_eventsNestedInputSchema)
      .optional(),
    driver: z
      .lazy(() => DriverUpdateOneWithoutOperational_eventsNestedInputSchema)
      .optional(),
    createdBy: z
      .lazy(
        () => UserUpdateOneRequiredWithoutOperational_eventsNestedInputSchema,
      )
      .optional(),
  });

export const OperationalEventUncheckedUpdateWithoutCompanyInputSchema: z.ZodType<Prisma.OperationalEventUncheckedUpdateWithoutCompanyInput> =
  z.strictObject({
    id: z
      .union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    vehicle_id: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    driver_id: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    event_type: z
      .union([
        z.lazy(() => EventTypeSchema),
        z.lazy(() => EnumEventTypeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    event_datetime: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    location: z
      .union([
        z.lazy(() => LocationTypeSchema),
        z.lazy(() => NullableEnumLocationTypeFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    context: z
      .union([
        z.lazy(() => ContextTypeSchema),
        z.lazy(() => NullableEnumContextTypeFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    general_result: z
      .union([
        z.lazy(() => GeneralResultSchema),
        z.lazy(() => NullableEnumGeneralResultFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    e_signature: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    final_observations: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    is_confirmed: z
      .union([
        z.boolean(),
        z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    created_by_user_id: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    created_at: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updated_at: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
  });

export const OperationalEventUncheckedUpdateManyWithoutCompanyInputSchema: z.ZodType<Prisma.OperationalEventUncheckedUpdateManyWithoutCompanyInput> =
  z.strictObject({
    id: z
      .union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    vehicle_id: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    driver_id: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    event_type: z
      .union([
        z.lazy(() => EventTypeSchema),
        z.lazy(() => EnumEventTypeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    event_datetime: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    location: z
      .union([
        z.lazy(() => LocationTypeSchema),
        z.lazy(() => NullableEnumLocationTypeFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    context: z
      .union([
        z.lazy(() => ContextTypeSchema),
        z.lazy(() => NullableEnumContextTypeFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    general_result: z
      .union([
        z.lazy(() => GeneralResultSchema),
        z.lazy(() => NullableEnumGeneralResultFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    e_signature: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    final_observations: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    is_confirmed: z
      .union([
        z.boolean(),
        z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    created_by_user_id: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    created_at: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updated_at: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
  });

export const OperationalEventCreateManyVehicleInputSchema: z.ZodType<Prisma.OperationalEventCreateManyVehicleInput> =
  z.strictObject({
    id: z.uuid().optional(),
    company_id: z.string(),
    driver_id: z.string().optional().nullable(),
    event_type: z.lazy(() => EventTypeSchema),
    event_datetime: z.coerce.date(),
    location: z
      .lazy(() => LocationTypeSchema)
      .optional()
      .nullable(),
    context: z
      .lazy(() => ContextTypeSchema)
      .optional()
      .nullable(),
    general_result: z
      .lazy(() => GeneralResultSchema)
      .optional()
      .nullable(),
    e_signature: z.string().optional().nullable(),
    final_observations: z.string().optional().nullable(),
    is_confirmed: z.boolean().optional().nullable(),
    created_by_user_id: z.string(),
    created_at: z.coerce.date().optional(),
    updated_at: z.coerce.date().optional(),
  });

export const OperationalEventUpdateWithoutVehicleInputSchema: z.ZodType<Prisma.OperationalEventUpdateWithoutVehicleInput> =
  z.strictObject({
    id: z
      .union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    event_type: z
      .union([
        z.lazy(() => EventTypeSchema),
        z.lazy(() => EnumEventTypeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    event_datetime: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    location: z
      .union([
        z.lazy(() => LocationTypeSchema),
        z.lazy(() => NullableEnumLocationTypeFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    context: z
      .union([
        z.lazy(() => ContextTypeSchema),
        z.lazy(() => NullableEnumContextTypeFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    general_result: z
      .union([
        z.lazy(() => GeneralResultSchema),
        z.lazy(() => NullableEnumGeneralResultFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    e_signature: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    final_observations: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    is_confirmed: z
      .union([
        z.boolean(),
        z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    created_at: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updated_at: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    company: z
      .lazy(
        () =>
          CompanyUpdateOneRequiredWithoutOperational_eventsNestedInputSchema,
      )
      .optional(),
    driver: z
      .lazy(() => DriverUpdateOneWithoutOperational_eventsNestedInputSchema)
      .optional(),
    createdBy: z
      .lazy(
        () => UserUpdateOneRequiredWithoutOperational_eventsNestedInputSchema,
      )
      .optional(),
  });

export const OperationalEventUncheckedUpdateWithoutVehicleInputSchema: z.ZodType<Prisma.OperationalEventUncheckedUpdateWithoutVehicleInput> =
  z.strictObject({
    id: z
      .union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    company_id: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    driver_id: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    event_type: z
      .union([
        z.lazy(() => EventTypeSchema),
        z.lazy(() => EnumEventTypeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    event_datetime: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    location: z
      .union([
        z.lazy(() => LocationTypeSchema),
        z.lazy(() => NullableEnumLocationTypeFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    context: z
      .union([
        z.lazy(() => ContextTypeSchema),
        z.lazy(() => NullableEnumContextTypeFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    general_result: z
      .union([
        z.lazy(() => GeneralResultSchema),
        z.lazy(() => NullableEnumGeneralResultFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    e_signature: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    final_observations: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    is_confirmed: z
      .union([
        z.boolean(),
        z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    created_by_user_id: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    created_at: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updated_at: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
  });

export const OperationalEventUncheckedUpdateManyWithoutVehicleInputSchema: z.ZodType<Prisma.OperationalEventUncheckedUpdateManyWithoutVehicleInput> =
  z.strictObject({
    id: z
      .union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    company_id: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    driver_id: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    event_type: z
      .union([
        z.lazy(() => EventTypeSchema),
        z.lazy(() => EnumEventTypeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    event_datetime: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    location: z
      .union([
        z.lazy(() => LocationTypeSchema),
        z.lazy(() => NullableEnumLocationTypeFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    context: z
      .union([
        z.lazy(() => ContextTypeSchema),
        z.lazy(() => NullableEnumContextTypeFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    general_result: z
      .union([
        z.lazy(() => GeneralResultSchema),
        z.lazy(() => NullableEnumGeneralResultFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    e_signature: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    final_observations: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    is_confirmed: z
      .union([
        z.boolean(),
        z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    created_by_user_id: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    created_at: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updated_at: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
  });

export const OperationalEventCreateManyDriverInputSchema: z.ZodType<Prisma.OperationalEventCreateManyDriverInput> =
  z.strictObject({
    id: z.uuid().optional(),
    company_id: z.string(),
    vehicle_id: z.string().optional().nullable(),
    event_type: z.lazy(() => EventTypeSchema),
    event_datetime: z.coerce.date(),
    location: z
      .lazy(() => LocationTypeSchema)
      .optional()
      .nullable(),
    context: z
      .lazy(() => ContextTypeSchema)
      .optional()
      .nullable(),
    general_result: z
      .lazy(() => GeneralResultSchema)
      .optional()
      .nullable(),
    e_signature: z.string().optional().nullable(),
    final_observations: z.string().optional().nullable(),
    is_confirmed: z.boolean().optional().nullable(),
    created_by_user_id: z.string(),
    created_at: z.coerce.date().optional(),
    updated_at: z.coerce.date().optional(),
  });

export const OperationalEventUpdateWithoutDriverInputSchema: z.ZodType<Prisma.OperationalEventUpdateWithoutDriverInput> =
  z.strictObject({
    id: z
      .union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    event_type: z
      .union([
        z.lazy(() => EventTypeSchema),
        z.lazy(() => EnumEventTypeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    event_datetime: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    location: z
      .union([
        z.lazy(() => LocationTypeSchema),
        z.lazy(() => NullableEnumLocationTypeFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    context: z
      .union([
        z.lazy(() => ContextTypeSchema),
        z.lazy(() => NullableEnumContextTypeFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    general_result: z
      .union([
        z.lazy(() => GeneralResultSchema),
        z.lazy(() => NullableEnumGeneralResultFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    e_signature: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    final_observations: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    is_confirmed: z
      .union([
        z.boolean(),
        z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    created_at: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updated_at: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    company: z
      .lazy(
        () =>
          CompanyUpdateOneRequiredWithoutOperational_eventsNestedInputSchema,
      )
      .optional(),
    vehicle: z
      .lazy(() => VehicleUpdateOneWithoutOperational_eventsNestedInputSchema)
      .optional(),
    createdBy: z
      .lazy(
        () => UserUpdateOneRequiredWithoutOperational_eventsNestedInputSchema,
      )
      .optional(),
  });

export const OperationalEventUncheckedUpdateWithoutDriverInputSchema: z.ZodType<Prisma.OperationalEventUncheckedUpdateWithoutDriverInput> =
  z.strictObject({
    id: z
      .union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    company_id: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    vehicle_id: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    event_type: z
      .union([
        z.lazy(() => EventTypeSchema),
        z.lazy(() => EnumEventTypeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    event_datetime: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    location: z
      .union([
        z.lazy(() => LocationTypeSchema),
        z.lazy(() => NullableEnumLocationTypeFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    context: z
      .union([
        z.lazy(() => ContextTypeSchema),
        z.lazy(() => NullableEnumContextTypeFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    general_result: z
      .union([
        z.lazy(() => GeneralResultSchema),
        z.lazy(() => NullableEnumGeneralResultFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    e_signature: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    final_observations: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    is_confirmed: z
      .union([
        z.boolean(),
        z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    created_by_user_id: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    created_at: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updated_at: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
  });

export const OperationalEventUncheckedUpdateManyWithoutDriverInputSchema: z.ZodType<Prisma.OperationalEventUncheckedUpdateManyWithoutDriverInput> =
  z.strictObject({
    id: z
      .union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    company_id: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    vehicle_id: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    event_type: z
      .union([
        z.lazy(() => EventTypeSchema),
        z.lazy(() => EnumEventTypeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    event_datetime: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    location: z
      .union([
        z.lazy(() => LocationTypeSchema),
        z.lazy(() => NullableEnumLocationTypeFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    context: z
      .union([
        z.lazy(() => ContextTypeSchema),
        z.lazy(() => NullableEnumContextTypeFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    general_result: z
      .union([
        z.lazy(() => GeneralResultSchema),
        z.lazy(() => NullableEnumGeneralResultFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    e_signature: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    final_observations: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    is_confirmed: z
      .union([
        z.boolean(),
        z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    created_by_user_id: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    created_at: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updated_at: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
  });

export const OperationalEventCreateManyCreatedByInputSchema: z.ZodType<Prisma.OperationalEventCreateManyCreatedByInput> =
  z.strictObject({
    id: z.uuid().optional(),
    company_id: z.string(),
    vehicle_id: z.string().optional().nullable(),
    driver_id: z.string().optional().nullable(),
    event_type: z.lazy(() => EventTypeSchema),
    event_datetime: z.coerce.date(),
    location: z
      .lazy(() => LocationTypeSchema)
      .optional()
      .nullable(),
    context: z
      .lazy(() => ContextTypeSchema)
      .optional()
      .nullable(),
    general_result: z
      .lazy(() => GeneralResultSchema)
      .optional()
      .nullable(),
    e_signature: z.string().optional().nullable(),
    final_observations: z.string().optional().nullable(),
    is_confirmed: z.boolean().optional().nullable(),
    created_at: z.coerce.date().optional(),
    updated_at: z.coerce.date().optional(),
  });

export const OperationalEventUpdateWithoutCreatedByInputSchema: z.ZodType<Prisma.OperationalEventUpdateWithoutCreatedByInput> =
  z.strictObject({
    id: z
      .union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    event_type: z
      .union([
        z.lazy(() => EventTypeSchema),
        z.lazy(() => EnumEventTypeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    event_datetime: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    location: z
      .union([
        z.lazy(() => LocationTypeSchema),
        z.lazy(() => NullableEnumLocationTypeFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    context: z
      .union([
        z.lazy(() => ContextTypeSchema),
        z.lazy(() => NullableEnumContextTypeFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    general_result: z
      .union([
        z.lazy(() => GeneralResultSchema),
        z.lazy(() => NullableEnumGeneralResultFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    e_signature: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    final_observations: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    is_confirmed: z
      .union([
        z.boolean(),
        z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    created_at: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updated_at: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    company: z
      .lazy(
        () =>
          CompanyUpdateOneRequiredWithoutOperational_eventsNestedInputSchema,
      )
      .optional(),
    vehicle: z
      .lazy(() => VehicleUpdateOneWithoutOperational_eventsNestedInputSchema)
      .optional(),
    driver: z
      .lazy(() => DriverUpdateOneWithoutOperational_eventsNestedInputSchema)
      .optional(),
  });

export const OperationalEventUncheckedUpdateWithoutCreatedByInputSchema: z.ZodType<Prisma.OperationalEventUncheckedUpdateWithoutCreatedByInput> =
  z.strictObject({
    id: z
      .union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    company_id: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    vehicle_id: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    driver_id: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    event_type: z
      .union([
        z.lazy(() => EventTypeSchema),
        z.lazy(() => EnumEventTypeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    event_datetime: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    location: z
      .union([
        z.lazy(() => LocationTypeSchema),
        z.lazy(() => NullableEnumLocationTypeFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    context: z
      .union([
        z.lazy(() => ContextTypeSchema),
        z.lazy(() => NullableEnumContextTypeFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    general_result: z
      .union([
        z.lazy(() => GeneralResultSchema),
        z.lazy(() => NullableEnumGeneralResultFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    e_signature: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    final_observations: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    is_confirmed: z
      .union([
        z.boolean(),
        z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    created_at: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updated_at: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
  });

export const OperationalEventUncheckedUpdateManyWithoutCreatedByInputSchema: z.ZodType<Prisma.OperationalEventUncheckedUpdateManyWithoutCreatedByInput> =
  z.strictObject({
    id: z
      .union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    company_id: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    vehicle_id: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    driver_id: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    event_type: z
      .union([
        z.lazy(() => EventTypeSchema),
        z.lazy(() => EnumEventTypeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    event_datetime: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    location: z
      .union([
        z.lazy(() => LocationTypeSchema),
        z.lazy(() => NullableEnumLocationTypeFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    context: z
      .union([
        z.lazy(() => ContextTypeSchema),
        z.lazy(() => NullableEnumContextTypeFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    general_result: z
      .union([
        z.lazy(() => GeneralResultSchema),
        z.lazy(() => NullableEnumGeneralResultFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    e_signature: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    final_observations: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    is_confirmed: z
      .union([
        z.boolean(),
        z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    created_at: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updated_at: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
  });

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const CompanyFindFirstArgsSchema: z.ZodType<Prisma.CompanyFindFirstArgs> =
  z
    .object({
      select: CompanySelectSchema.optional(),
      include: CompanyIncludeSchema.optional(),
      where: CompanyWhereInputSchema.optional(),
      orderBy: z
        .union([
          CompanyOrderByWithRelationInputSchema.array(),
          CompanyOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: CompanyWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          CompanyScalarFieldEnumSchema,
          CompanyScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const CompanyFindFirstOrThrowArgsSchema: z.ZodType<Prisma.CompanyFindFirstOrThrowArgs> =
  z
    .object({
      select: CompanySelectSchema.optional(),
      include: CompanyIncludeSchema.optional(),
      where: CompanyWhereInputSchema.optional(),
      orderBy: z
        .union([
          CompanyOrderByWithRelationInputSchema.array(),
          CompanyOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: CompanyWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          CompanyScalarFieldEnumSchema,
          CompanyScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const CompanyFindManyArgsSchema: z.ZodType<Prisma.CompanyFindManyArgs> =
  z
    .object({
      select: CompanySelectSchema.optional(),
      include: CompanyIncludeSchema.optional(),
      where: CompanyWhereInputSchema.optional(),
      orderBy: z
        .union([
          CompanyOrderByWithRelationInputSchema.array(),
          CompanyOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: CompanyWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          CompanyScalarFieldEnumSchema,
          CompanyScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const CompanyAggregateArgsSchema: z.ZodType<Prisma.CompanyAggregateArgs> =
  z
    .object({
      where: CompanyWhereInputSchema.optional(),
      orderBy: z
        .union([
          CompanyOrderByWithRelationInputSchema.array(),
          CompanyOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: CompanyWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict();

export const CompanyGroupByArgsSchema: z.ZodType<Prisma.CompanyGroupByArgs> = z
  .object({
    where: CompanyWhereInputSchema.optional(),
    orderBy: z
      .union([
        CompanyOrderByWithAggregationInputSchema.array(),
        CompanyOrderByWithAggregationInputSchema,
      ])
      .optional(),
    by: CompanyScalarFieldEnumSchema.array(),
    having: CompanyScalarWhereWithAggregatesInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict();

export const CompanyFindUniqueArgsSchema: z.ZodType<Prisma.CompanyFindUniqueArgs> =
  z
    .object({
      select: CompanySelectSchema.optional(),
      include: CompanyIncludeSchema.optional(),
      where: CompanyWhereUniqueInputSchema,
    })
    .strict();

export const CompanyFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.CompanyFindUniqueOrThrowArgs> =
  z
    .object({
      select: CompanySelectSchema.optional(),
      include: CompanyIncludeSchema.optional(),
      where: CompanyWhereUniqueInputSchema,
    })
    .strict();

export const VehicleFindFirstArgsSchema: z.ZodType<Prisma.VehicleFindFirstArgs> =
  z
    .object({
      select: VehicleSelectSchema.optional(),
      include: VehicleIncludeSchema.optional(),
      where: VehicleWhereInputSchema.optional(),
      orderBy: z
        .union([
          VehicleOrderByWithRelationInputSchema.array(),
          VehicleOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: VehicleWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          VehicleScalarFieldEnumSchema,
          VehicleScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const VehicleFindFirstOrThrowArgsSchema: z.ZodType<Prisma.VehicleFindFirstOrThrowArgs> =
  z
    .object({
      select: VehicleSelectSchema.optional(),
      include: VehicleIncludeSchema.optional(),
      where: VehicleWhereInputSchema.optional(),
      orderBy: z
        .union([
          VehicleOrderByWithRelationInputSchema.array(),
          VehicleOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: VehicleWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          VehicleScalarFieldEnumSchema,
          VehicleScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const VehicleFindManyArgsSchema: z.ZodType<Prisma.VehicleFindManyArgs> =
  z
    .object({
      select: VehicleSelectSchema.optional(),
      include: VehicleIncludeSchema.optional(),
      where: VehicleWhereInputSchema.optional(),
      orderBy: z
        .union([
          VehicleOrderByWithRelationInputSchema.array(),
          VehicleOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: VehicleWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          VehicleScalarFieldEnumSchema,
          VehicleScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const VehicleAggregateArgsSchema: z.ZodType<Prisma.VehicleAggregateArgs> =
  z
    .object({
      where: VehicleWhereInputSchema.optional(),
      orderBy: z
        .union([
          VehicleOrderByWithRelationInputSchema.array(),
          VehicleOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: VehicleWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict();

export const VehicleGroupByArgsSchema: z.ZodType<Prisma.VehicleGroupByArgs> = z
  .object({
    where: VehicleWhereInputSchema.optional(),
    orderBy: z
      .union([
        VehicleOrderByWithAggregationInputSchema.array(),
        VehicleOrderByWithAggregationInputSchema,
      ])
      .optional(),
    by: VehicleScalarFieldEnumSchema.array(),
    having: VehicleScalarWhereWithAggregatesInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict();

export const VehicleFindUniqueArgsSchema: z.ZodType<Prisma.VehicleFindUniqueArgs> =
  z
    .object({
      select: VehicleSelectSchema.optional(),
      include: VehicleIncludeSchema.optional(),
      where: VehicleWhereUniqueInputSchema,
    })
    .strict();

export const VehicleFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.VehicleFindUniqueOrThrowArgs> =
  z
    .object({
      select: VehicleSelectSchema.optional(),
      include: VehicleIncludeSchema.optional(),
      where: VehicleWhereUniqueInputSchema,
    })
    .strict();

export const DriverFindFirstArgsSchema: z.ZodType<Prisma.DriverFindFirstArgs> =
  z
    .object({
      select: DriverSelectSchema.optional(),
      include: DriverIncludeSchema.optional(),
      where: DriverWhereInputSchema.optional(),
      orderBy: z
        .union([
          DriverOrderByWithRelationInputSchema.array(),
          DriverOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: DriverWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          DriverScalarFieldEnumSchema,
          DriverScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const DriverFindFirstOrThrowArgsSchema: z.ZodType<Prisma.DriverFindFirstOrThrowArgs> =
  z
    .object({
      select: DriverSelectSchema.optional(),
      include: DriverIncludeSchema.optional(),
      where: DriverWhereInputSchema.optional(),
      orderBy: z
        .union([
          DriverOrderByWithRelationInputSchema.array(),
          DriverOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: DriverWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          DriverScalarFieldEnumSchema,
          DriverScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const DriverFindManyArgsSchema: z.ZodType<Prisma.DriverFindManyArgs> = z
  .object({
    select: DriverSelectSchema.optional(),
    include: DriverIncludeSchema.optional(),
    where: DriverWhereInputSchema.optional(),
    orderBy: z
      .union([
        DriverOrderByWithRelationInputSchema.array(),
        DriverOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: DriverWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([DriverScalarFieldEnumSchema, DriverScalarFieldEnumSchema.array()])
      .optional(),
  })
  .strict();

export const DriverAggregateArgsSchema: z.ZodType<Prisma.DriverAggregateArgs> =
  z
    .object({
      where: DriverWhereInputSchema.optional(),
      orderBy: z
        .union([
          DriverOrderByWithRelationInputSchema.array(),
          DriverOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: DriverWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict();

export const DriverGroupByArgsSchema: z.ZodType<Prisma.DriverGroupByArgs> = z
  .object({
    where: DriverWhereInputSchema.optional(),
    orderBy: z
      .union([
        DriverOrderByWithAggregationInputSchema.array(),
        DriverOrderByWithAggregationInputSchema,
      ])
      .optional(),
    by: DriverScalarFieldEnumSchema.array(),
    having: DriverScalarWhereWithAggregatesInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict();

export const DriverFindUniqueArgsSchema: z.ZodType<Prisma.DriverFindUniqueArgs> =
  z
    .object({
      select: DriverSelectSchema.optional(),
      include: DriverIncludeSchema.optional(),
      where: DriverWhereUniqueInputSchema,
    })
    .strict();

export const DriverFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.DriverFindUniqueOrThrowArgs> =
  z
    .object({
      select: DriverSelectSchema.optional(),
      include: DriverIncludeSchema.optional(),
      where: DriverWhereUniqueInputSchema,
    })
    .strict();

export const UserFindFirstArgsSchema: z.ZodType<Prisma.UserFindFirstArgs> = z
  .object({
    select: UserSelectSchema.optional(),
    include: UserIncludeSchema.optional(),
    where: UserWhereInputSchema.optional(),
    orderBy: z
      .union([
        UserOrderByWithRelationInputSchema.array(),
        UserOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: UserWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([UserScalarFieldEnumSchema, UserScalarFieldEnumSchema.array()])
      .optional(),
  })
  .strict();

export const UserFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserFindFirstOrThrowArgs> =
  z
    .object({
      select: UserSelectSchema.optional(),
      include: UserIncludeSchema.optional(),
      where: UserWhereInputSchema.optional(),
      orderBy: z
        .union([
          UserOrderByWithRelationInputSchema.array(),
          UserOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: UserWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([UserScalarFieldEnumSchema, UserScalarFieldEnumSchema.array()])
        .optional(),
    })
    .strict();

export const UserFindManyArgsSchema: z.ZodType<Prisma.UserFindManyArgs> = z
  .object({
    select: UserSelectSchema.optional(),
    include: UserIncludeSchema.optional(),
    where: UserWhereInputSchema.optional(),
    orderBy: z
      .union([
        UserOrderByWithRelationInputSchema.array(),
        UserOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: UserWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([UserScalarFieldEnumSchema, UserScalarFieldEnumSchema.array()])
      .optional(),
  })
  .strict();

export const UserAggregateArgsSchema: z.ZodType<Prisma.UserAggregateArgs> = z
  .object({
    where: UserWhereInputSchema.optional(),
    orderBy: z
      .union([
        UserOrderByWithRelationInputSchema.array(),
        UserOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: UserWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict();

export const UserGroupByArgsSchema: z.ZodType<Prisma.UserGroupByArgs> = z
  .object({
    where: UserWhereInputSchema.optional(),
    orderBy: z
      .union([
        UserOrderByWithAggregationInputSchema.array(),
        UserOrderByWithAggregationInputSchema,
      ])
      .optional(),
    by: UserScalarFieldEnumSchema.array(),
    having: UserScalarWhereWithAggregatesInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict();

export const UserFindUniqueArgsSchema: z.ZodType<Prisma.UserFindUniqueArgs> = z
  .object({
    select: UserSelectSchema.optional(),
    include: UserIncludeSchema.optional(),
    where: UserWhereUniqueInputSchema,
  })
  .strict();

export const UserFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserFindUniqueOrThrowArgs> =
  z
    .object({
      select: UserSelectSchema.optional(),
      include: UserIncludeSchema.optional(),
      where: UserWhereUniqueInputSchema,
    })
    .strict();

export const OperationalEventFindFirstArgsSchema: z.ZodType<Prisma.OperationalEventFindFirstArgs> =
  z
    .object({
      select: OperationalEventSelectSchema.optional(),
      include: OperationalEventIncludeSchema.optional(),
      where: OperationalEventWhereInputSchema.optional(),
      orderBy: z
        .union([
          OperationalEventOrderByWithRelationInputSchema.array(),
          OperationalEventOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: OperationalEventWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          OperationalEventScalarFieldEnumSchema,
          OperationalEventScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const OperationalEventFindFirstOrThrowArgsSchema: z.ZodType<Prisma.OperationalEventFindFirstOrThrowArgs> =
  z
    .object({
      select: OperationalEventSelectSchema.optional(),
      include: OperationalEventIncludeSchema.optional(),
      where: OperationalEventWhereInputSchema.optional(),
      orderBy: z
        .union([
          OperationalEventOrderByWithRelationInputSchema.array(),
          OperationalEventOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: OperationalEventWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          OperationalEventScalarFieldEnumSchema,
          OperationalEventScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const OperationalEventFindManyArgsSchema: z.ZodType<Prisma.OperationalEventFindManyArgs> =
  z
    .object({
      select: OperationalEventSelectSchema.optional(),
      include: OperationalEventIncludeSchema.optional(),
      where: OperationalEventWhereInputSchema.optional(),
      orderBy: z
        .union([
          OperationalEventOrderByWithRelationInputSchema.array(),
          OperationalEventOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: OperationalEventWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          OperationalEventScalarFieldEnumSchema,
          OperationalEventScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const OperationalEventAggregateArgsSchema: z.ZodType<Prisma.OperationalEventAggregateArgs> =
  z
    .object({
      where: OperationalEventWhereInputSchema.optional(),
      orderBy: z
        .union([
          OperationalEventOrderByWithRelationInputSchema.array(),
          OperationalEventOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: OperationalEventWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict();

export const OperationalEventGroupByArgsSchema: z.ZodType<Prisma.OperationalEventGroupByArgs> =
  z
    .object({
      where: OperationalEventWhereInputSchema.optional(),
      orderBy: z
        .union([
          OperationalEventOrderByWithAggregationInputSchema.array(),
          OperationalEventOrderByWithAggregationInputSchema,
        ])
        .optional(),
      by: OperationalEventScalarFieldEnumSchema.array(),
      having: OperationalEventScalarWhereWithAggregatesInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict();

export const OperationalEventFindUniqueArgsSchema: z.ZodType<Prisma.OperationalEventFindUniqueArgs> =
  z
    .object({
      select: OperationalEventSelectSchema.optional(),
      include: OperationalEventIncludeSchema.optional(),
      where: OperationalEventWhereUniqueInputSchema,
    })
    .strict();

export const OperationalEventFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.OperationalEventFindUniqueOrThrowArgs> =
  z
    .object({
      select: OperationalEventSelectSchema.optional(),
      include: OperationalEventIncludeSchema.optional(),
      where: OperationalEventWhereUniqueInputSchema,
    })
    .strict();

export const CompanyCreateArgsSchema: z.ZodType<Prisma.CompanyCreateArgs> = z
  .object({
    select: CompanySelectSchema.optional(),
    include: CompanyIncludeSchema.optional(),
    data: z.union([
      CompanyCreateInputSchema,
      CompanyUncheckedCreateInputSchema,
    ]),
  })
  .strict();

export const CompanyUpsertArgsSchema: z.ZodType<Prisma.CompanyUpsertArgs> = z
  .object({
    select: CompanySelectSchema.optional(),
    include: CompanyIncludeSchema.optional(),
    where: CompanyWhereUniqueInputSchema,
    create: z.union([
      CompanyCreateInputSchema,
      CompanyUncheckedCreateInputSchema,
    ]),
    update: z.union([
      CompanyUpdateInputSchema,
      CompanyUncheckedUpdateInputSchema,
    ]),
  })
  .strict();

export const CompanyCreateManyArgsSchema: z.ZodType<Prisma.CompanyCreateManyArgs> =
  z
    .object({
      data: z.union([
        CompanyCreateManyInputSchema,
        CompanyCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const CompanyCreateManyAndReturnArgsSchema: z.ZodType<Prisma.CompanyCreateManyAndReturnArgs> =
  z
    .object({
      data: z.union([
        CompanyCreateManyInputSchema,
        CompanyCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const CompanyDeleteArgsSchema: z.ZodType<Prisma.CompanyDeleteArgs> = z
  .object({
    select: CompanySelectSchema.optional(),
    include: CompanyIncludeSchema.optional(),
    where: CompanyWhereUniqueInputSchema,
  })
  .strict();

export const CompanyUpdateArgsSchema: z.ZodType<Prisma.CompanyUpdateArgs> = z
  .object({
    select: CompanySelectSchema.optional(),
    include: CompanyIncludeSchema.optional(),
    data: z.union([
      CompanyUpdateInputSchema,
      CompanyUncheckedUpdateInputSchema,
    ]),
    where: CompanyWhereUniqueInputSchema,
  })
  .strict();

export const CompanyUpdateManyArgsSchema: z.ZodType<Prisma.CompanyUpdateManyArgs> =
  z
    .object({
      data: z.union([
        CompanyUpdateManyMutationInputSchema,
        CompanyUncheckedUpdateManyInputSchema,
      ]),
      where: CompanyWhereInputSchema.optional(),
      limit: z.number().optional(),
    })
    .strict();

export const CompanyUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.CompanyUpdateManyAndReturnArgs> =
  z
    .object({
      data: z.union([
        CompanyUpdateManyMutationInputSchema,
        CompanyUncheckedUpdateManyInputSchema,
      ]),
      where: CompanyWhereInputSchema.optional(),
      limit: z.number().optional(),
    })
    .strict();

export const CompanyDeleteManyArgsSchema: z.ZodType<Prisma.CompanyDeleteManyArgs> =
  z
    .object({
      where: CompanyWhereInputSchema.optional(),
      limit: z.number().optional(),
    })
    .strict();

export const VehicleCreateArgsSchema: z.ZodType<Prisma.VehicleCreateArgs> = z
  .object({
    select: VehicleSelectSchema.optional(),
    include: VehicleIncludeSchema.optional(),
    data: z.union([
      VehicleCreateInputSchema,
      VehicleUncheckedCreateInputSchema,
    ]),
  })
  .strict();

export const VehicleUpsertArgsSchema: z.ZodType<Prisma.VehicleUpsertArgs> = z
  .object({
    select: VehicleSelectSchema.optional(),
    include: VehicleIncludeSchema.optional(),
    where: VehicleWhereUniqueInputSchema,
    create: z.union([
      VehicleCreateInputSchema,
      VehicleUncheckedCreateInputSchema,
    ]),
    update: z.union([
      VehicleUpdateInputSchema,
      VehicleUncheckedUpdateInputSchema,
    ]),
  })
  .strict();

export const VehicleCreateManyArgsSchema: z.ZodType<Prisma.VehicleCreateManyArgs> =
  z
    .object({
      data: z.union([
        VehicleCreateManyInputSchema,
        VehicleCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const VehicleCreateManyAndReturnArgsSchema: z.ZodType<Prisma.VehicleCreateManyAndReturnArgs> =
  z
    .object({
      data: z.union([
        VehicleCreateManyInputSchema,
        VehicleCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const VehicleDeleteArgsSchema: z.ZodType<Prisma.VehicleDeleteArgs> = z
  .object({
    select: VehicleSelectSchema.optional(),
    include: VehicleIncludeSchema.optional(),
    where: VehicleWhereUniqueInputSchema,
  })
  .strict();

export const VehicleUpdateArgsSchema: z.ZodType<Prisma.VehicleUpdateArgs> = z
  .object({
    select: VehicleSelectSchema.optional(),
    include: VehicleIncludeSchema.optional(),
    data: z.union([
      VehicleUpdateInputSchema,
      VehicleUncheckedUpdateInputSchema,
    ]),
    where: VehicleWhereUniqueInputSchema,
  })
  .strict();

export const VehicleUpdateManyArgsSchema: z.ZodType<Prisma.VehicleUpdateManyArgs> =
  z
    .object({
      data: z.union([
        VehicleUpdateManyMutationInputSchema,
        VehicleUncheckedUpdateManyInputSchema,
      ]),
      where: VehicleWhereInputSchema.optional(),
      limit: z.number().optional(),
    })
    .strict();

export const VehicleUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.VehicleUpdateManyAndReturnArgs> =
  z
    .object({
      data: z.union([
        VehicleUpdateManyMutationInputSchema,
        VehicleUncheckedUpdateManyInputSchema,
      ]),
      where: VehicleWhereInputSchema.optional(),
      limit: z.number().optional(),
    })
    .strict();

export const VehicleDeleteManyArgsSchema: z.ZodType<Prisma.VehicleDeleteManyArgs> =
  z
    .object({
      where: VehicleWhereInputSchema.optional(),
      limit: z.number().optional(),
    })
    .strict();

export const DriverCreateArgsSchema: z.ZodType<Prisma.DriverCreateArgs> = z
  .object({
    select: DriverSelectSchema.optional(),
    include: DriverIncludeSchema.optional(),
    data: z.union([DriverCreateInputSchema, DriverUncheckedCreateInputSchema]),
  })
  .strict();

export const DriverUpsertArgsSchema: z.ZodType<Prisma.DriverUpsertArgs> = z
  .object({
    select: DriverSelectSchema.optional(),
    include: DriverIncludeSchema.optional(),
    where: DriverWhereUniqueInputSchema,
    create: z.union([
      DriverCreateInputSchema,
      DriverUncheckedCreateInputSchema,
    ]),
    update: z.union([
      DriverUpdateInputSchema,
      DriverUncheckedUpdateInputSchema,
    ]),
  })
  .strict();

export const DriverCreateManyArgsSchema: z.ZodType<Prisma.DriverCreateManyArgs> =
  z
    .object({
      data: z.union([
        DriverCreateManyInputSchema,
        DriverCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const DriverCreateManyAndReturnArgsSchema: z.ZodType<Prisma.DriverCreateManyAndReturnArgs> =
  z
    .object({
      data: z.union([
        DriverCreateManyInputSchema,
        DriverCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const DriverDeleteArgsSchema: z.ZodType<Prisma.DriverDeleteArgs> = z
  .object({
    select: DriverSelectSchema.optional(),
    include: DriverIncludeSchema.optional(),
    where: DriverWhereUniqueInputSchema,
  })
  .strict();

export const DriverUpdateArgsSchema: z.ZodType<Prisma.DriverUpdateArgs> = z
  .object({
    select: DriverSelectSchema.optional(),
    include: DriverIncludeSchema.optional(),
    data: z.union([DriverUpdateInputSchema, DriverUncheckedUpdateInputSchema]),
    where: DriverWhereUniqueInputSchema,
  })
  .strict();

export const DriverUpdateManyArgsSchema: z.ZodType<Prisma.DriverUpdateManyArgs> =
  z
    .object({
      data: z.union([
        DriverUpdateManyMutationInputSchema,
        DriverUncheckedUpdateManyInputSchema,
      ]),
      where: DriverWhereInputSchema.optional(),
      limit: z.number().optional(),
    })
    .strict();

export const DriverUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.DriverUpdateManyAndReturnArgs> =
  z
    .object({
      data: z.union([
        DriverUpdateManyMutationInputSchema,
        DriverUncheckedUpdateManyInputSchema,
      ]),
      where: DriverWhereInputSchema.optional(),
      limit: z.number().optional(),
    })
    .strict();

export const DriverDeleteManyArgsSchema: z.ZodType<Prisma.DriverDeleteManyArgs> =
  z
    .object({
      where: DriverWhereInputSchema.optional(),
      limit: z.number().optional(),
    })
    .strict();

export const UserCreateArgsSchema: z.ZodType<Prisma.UserCreateArgs> = z
  .object({
    select: UserSelectSchema.optional(),
    include: UserIncludeSchema.optional(),
    data: z.union([UserCreateInputSchema, UserUncheckedCreateInputSchema]),
  })
  .strict();

export const UserUpsertArgsSchema: z.ZodType<Prisma.UserUpsertArgs> = z
  .object({
    select: UserSelectSchema.optional(),
    include: UserIncludeSchema.optional(),
    where: UserWhereUniqueInputSchema,
    create: z.union([UserCreateInputSchema, UserUncheckedCreateInputSchema]),
    update: z.union([UserUpdateInputSchema, UserUncheckedUpdateInputSchema]),
  })
  .strict();

export const UserCreateManyArgsSchema: z.ZodType<Prisma.UserCreateManyArgs> = z
  .object({
    data: z.union([
      UserCreateManyInputSchema,
      UserCreateManyInputSchema.array(),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict();

export const UserCreateManyAndReturnArgsSchema: z.ZodType<Prisma.UserCreateManyAndReturnArgs> =
  z
    .object({
      data: z.union([
        UserCreateManyInputSchema,
        UserCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const UserDeleteArgsSchema: z.ZodType<Prisma.UserDeleteArgs> = z
  .object({
    select: UserSelectSchema.optional(),
    include: UserIncludeSchema.optional(),
    where: UserWhereUniqueInputSchema,
  })
  .strict();

export const UserUpdateArgsSchema: z.ZodType<Prisma.UserUpdateArgs> = z
  .object({
    select: UserSelectSchema.optional(),
    include: UserIncludeSchema.optional(),
    data: z.union([UserUpdateInputSchema, UserUncheckedUpdateInputSchema]),
    where: UserWhereUniqueInputSchema,
  })
  .strict();

export const UserUpdateManyArgsSchema: z.ZodType<Prisma.UserUpdateManyArgs> = z
  .object({
    data: z.union([
      UserUpdateManyMutationInputSchema,
      UserUncheckedUpdateManyInputSchema,
    ]),
    where: UserWhereInputSchema.optional(),
    limit: z.number().optional(),
  })
  .strict();

export const UserUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.UserUpdateManyAndReturnArgs> =
  z
    .object({
      data: z.union([
        UserUpdateManyMutationInputSchema,
        UserUncheckedUpdateManyInputSchema,
      ]),
      where: UserWhereInputSchema.optional(),
      limit: z.number().optional(),
    })
    .strict();

export const UserDeleteManyArgsSchema: z.ZodType<Prisma.UserDeleteManyArgs> = z
  .object({
    where: UserWhereInputSchema.optional(),
    limit: z.number().optional(),
  })
  .strict();

export const OperationalEventCreateArgsSchema: z.ZodType<Prisma.OperationalEventCreateArgs> =
  z
    .object({
      select: OperationalEventSelectSchema.optional(),
      include: OperationalEventIncludeSchema.optional(),
      data: z.union([
        OperationalEventCreateInputSchema,
        OperationalEventUncheckedCreateInputSchema,
      ]),
    })
    .strict();

export const OperationalEventUpsertArgsSchema: z.ZodType<Prisma.OperationalEventUpsertArgs> =
  z
    .object({
      select: OperationalEventSelectSchema.optional(),
      include: OperationalEventIncludeSchema.optional(),
      where: OperationalEventWhereUniqueInputSchema,
      create: z.union([
        OperationalEventCreateInputSchema,
        OperationalEventUncheckedCreateInputSchema,
      ]),
      update: z.union([
        OperationalEventUpdateInputSchema,
        OperationalEventUncheckedUpdateInputSchema,
      ]),
    })
    .strict();

export const OperationalEventCreateManyArgsSchema: z.ZodType<Prisma.OperationalEventCreateManyArgs> =
  z
    .object({
      data: z.union([
        OperationalEventCreateManyInputSchema,
        OperationalEventCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const OperationalEventCreateManyAndReturnArgsSchema: z.ZodType<Prisma.OperationalEventCreateManyAndReturnArgs> =
  z
    .object({
      data: z.union([
        OperationalEventCreateManyInputSchema,
        OperationalEventCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const OperationalEventDeleteArgsSchema: z.ZodType<Prisma.OperationalEventDeleteArgs> =
  z
    .object({
      select: OperationalEventSelectSchema.optional(),
      include: OperationalEventIncludeSchema.optional(),
      where: OperationalEventWhereUniqueInputSchema,
    })
    .strict();

export const OperationalEventUpdateArgsSchema: z.ZodType<Prisma.OperationalEventUpdateArgs> =
  z
    .object({
      select: OperationalEventSelectSchema.optional(),
      include: OperationalEventIncludeSchema.optional(),
      data: z.union([
        OperationalEventUpdateInputSchema,
        OperationalEventUncheckedUpdateInputSchema,
      ]),
      where: OperationalEventWhereUniqueInputSchema,
    })
    .strict();

export const OperationalEventUpdateManyArgsSchema: z.ZodType<Prisma.OperationalEventUpdateManyArgs> =
  z
    .object({
      data: z.union([
        OperationalEventUpdateManyMutationInputSchema,
        OperationalEventUncheckedUpdateManyInputSchema,
      ]),
      where: OperationalEventWhereInputSchema.optional(),
      limit: z.number().optional(),
    })
    .strict();

export const OperationalEventUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.OperationalEventUpdateManyAndReturnArgs> =
  z
    .object({
      data: z.union([
        OperationalEventUpdateManyMutationInputSchema,
        OperationalEventUncheckedUpdateManyInputSchema,
      ]),
      where: OperationalEventWhereInputSchema.optional(),
      limit: z.number().optional(),
    })
    .strict();

export const OperationalEventDeleteManyArgsSchema: z.ZodType<Prisma.OperationalEventDeleteManyArgs> =
  z
    .object({
      where: OperationalEventWhereInputSchema.optional(),
      limit: z.number().optional(),
    })
    .strict();
