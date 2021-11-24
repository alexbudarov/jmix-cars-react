import { Model } from "./Model";
export class Car {
  static NAME = "Car";
  id?: string;
  description?: string | null;
  regNumber?: string | null;
  model?: Model | null;
  price?: any | null;
}
export type CarViewName = "_base" | "_instance_name" | "_local";
export type CarView<V extends CarViewName> = V extends "_base"
  ? Pick<Car, "id" | "description" | "regNumber" | "price">
  : V extends "_instance_name"
  ? Pick<Car, "id" | "description">
  : V extends "_local"
  ? Pick<Car, "id" | "description" | "regNumber" | "price">
  : never;
