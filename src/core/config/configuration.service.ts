import { Injectable } from '@nestjs/common';
import { MongooseModuleOptions } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';
import { configurationSchema } from './configuration.scehma';
import path = require('path');

@Injectable()
export class ConfigurationService {
  private readonly envConfig: Config;

  constructor(fileName?: string) {
    let config;
    if (fileName) {
      config = dotenv.config({ path: path.join(process.cwd(), fileName) });
    } else {
      config = dotenv.config({
        path: path.join(process.cwd(), '.env'),
      });
    }
    if (config) {
      this.envConfig = this.validateInput(config.parsed);
    } else {
      throw new Error('Unable to load config.');
    }
  }

  private validateInput(envConfig: any): Config {
    const envVarsSchema = configurationSchema;

    const { error, value: validatedEnvConfig } =
      envVarsSchema.validate(envConfig);

    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }
    return validatedEnvConfig;
  }

  private getValue(key: string, throwOnMissing = true): string {
    const value = process.env[key] ? process.env[key] : this.envConfig[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }

    return value;
  }

  public ensureValues(keys: string[]) {
    keys.forEach((k) => this.getValue(k));
    return this;
  }

  get port(): number {
    return parseInt(this.getValue('PORT'));
  }

  get isProduction(): boolean {
    const mode = this.getValue('APP_ENV');
    return mode.toLowerCase() === 'prod';
  }

  get jwtSecret() {
    return {
      secretToken: this.getValue('AUTH_JWT'),
      refreshTokenSecretToken: this.getValue('AUTH_REFRESH_JWT'),
    };
  }

  get jwtExpiry() {
    return {
      tokenExpiry: this.getValue('AUTH_JWT_EXPIRY'),
      refreshTokenExpiry: this.getValue('AUTH_REFRESH_JWT_EXPIRY'),
    };
  }

  get jwtExpiryMagicLink(): string {
    return this.getValue('AUTH_MAGIC_LINK_JWT_EXPIRY');
  }

  get appDetails(): AppConfig {
    const appDetails: AppConfig = {
      name: this.getValue('APP_NAME'),
      version: this.getValue('APP_VERSION'),
      description: this.getValue('APP_DESCRIPTION'),
      schema: this.getValue('APP_SCHEMA'),
      host: this.getValue('APP_HOST'),
      port: parseInt(this.getValue('PORT')),
      env: this.getValue('APP_ENV'),
    };

    return appDetails;
  }

  get mongooseConfig(): MongooseModuleOptions {
    return {
      uri: this.getValue('MONGO_CONNECTION_URL'),
      retryAttempts: 5,
    };
  }
}

interface Config {
  [key: string]: string;
}

interface AppConfig {
  name: string;
  version: string;
  description: string;
  schema: string;
  host: string;
  port: number;
  env: string;
}
