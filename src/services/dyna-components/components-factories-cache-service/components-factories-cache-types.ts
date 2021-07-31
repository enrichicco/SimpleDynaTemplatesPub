import { ComponentFactory, Type } from "@angular/core";

export interface Component { };

export type ComponentClass = { new (): Component };

export interface Twins<T> {
  name: string;
  component: Type<T>;
}

export interface ComponentCaster<T> {
  name: string;
  component: ComponentClass;
  componentFactory: ComponentFactory<T>;
}