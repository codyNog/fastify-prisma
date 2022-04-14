const HEALTH = "/health";
const UID = "/:uid";

const COMPANIES = "/companies";
const USERS = "/users";

export const routing = {
  health: {
    root: HEALTH,
  },
  companies: {
    root: COMPANIES,
    uid: COMPANIES + UID,
  },
  users: {
    root: USERS,
    uid: USERS + UID,
  },
};
