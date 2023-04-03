import { z } from 'zod';

export const zCheckbox = (defaultValue = false) => z.union([z.literal(!defaultValue), z.literal(defaultValue)]);
