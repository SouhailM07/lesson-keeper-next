export enum containers_e {
  Sessions = "SESSIONS",
  Modules = "MODULES",
  Lessons = "LESSONS",
}

export default function Containers({ type }: { type: containers_e }) {
  switch (type) {
    case containers_e.Sessions:
      return;
    default:
      break;
  }
}
