import { HookContext as FeathersHookContext, NextFunction } from '@feathersjs/feathers';
import { Application as FeathersApplication } from '@feathersjs/koa';

// Application type that combines FeathersJS with custom configuration
export type Application = FeathersApplication<any>;

// The types for app.get(name) and app.set(name)
export interface Configuration {
  host: string;
  port: number;
  public: string;
  origins: string[];
}

// A mapping of service names to service types
export interface ServiceTypes {}

// The application instance type that will be used everywhere else
export type HookContext<S = any> = FeathersHookContext<Application, S>;
