export class Model {
  static NAME = "Model";
  id?: string;
  name?: string | null;
  releaseYear?: number | null;
}
export type ModelViewName = "_base" | "_instance_name" | "_local";
export type ModelView<V extends ModelViewName> = V extends "_base"
  ? Pick<Model, "id" | "name" | "releaseYear">
  : V extends "_instance_name"
  ? Pick<Model, "id" | "name">
  : V extends "_local"
  ? Pick<Model, "id" | "name" | "releaseYear">
  : never;
