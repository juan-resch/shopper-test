import * as path from 'path'

export enum ENVIRONMENTS {
  TEST = 'test',
  LOCAL = 'local',
  DEVELOPMENT = 'development',
  STAGING = 'staging',
  PRODUCTION = 'production',
}

export const ROOT_DIR = path.join(__dirname, '..', '..', '..')
