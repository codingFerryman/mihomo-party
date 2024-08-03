import { controledMihomoConfigPath } from '../utils/dirs'
import yaml from 'yaml'
import fs from 'fs'
import { getAxios } from '../core/mihomoApi'

export let controledMihomoConfig: Partial<IMihomoConfig> // mihomo.yaml

export function getControledMihomoConfig(force = false): Partial<IMihomoConfig> {
  if (force || !controledMihomoConfig) {
    controledMihomoConfig = yaml.parse(fs.readFileSync(controledMihomoConfigPath(), 'utf-8'))
  }
  return controledMihomoConfig
}

export function setControledMihomoConfig(patch: Partial<IMihomoConfig>): void {
  controledMihomoConfig = Object.assign(controledMihomoConfig, patch)
  if (patch['external-controller'] || patch.secret) {
    getAxios(true)
  }
  fs.writeFileSync(controledMihomoConfigPath(), yaml.stringify(controledMihomoConfig))
}