import type { AccessControlProvider } from "@refinedev/core";
import { authProvider } from "./authProvider";

export const accessControlProvider: AccessControlProvider = {
    can: async ({ resource, action }) => {
        const identity = await authProvider.getIdentity?.();
        const role = identity?.role as string | undefined;

        if (resource === "users") {
            return { can: role === "admin" };
        }
        return { can: true };
    },
};
